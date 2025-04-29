import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIdleTimer } from 'react-idle-timer';
import axios from 'axios';
import { setCookie, deleteCookie, getCookie } from '@/utils/cookie';

// 자동 로그아웃 설정
const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30분
const AUTO_LOGOUT_PROMPT_TIME = 5 * 60 * 1000; // 5분

// API 기본 URL
const API_BASE_URL = '';  // 개발용 프록시를 사용하므로 빈 문자열로 설정

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userInfo: null,
      lastActivity: null,
      showLogoutPrompt: false,
      logoutTimer: null,
      promptTimer: null,
      accessToken: null,

      // 로그인
      login: async (acnt_id, acnt_pw) => {
        try {
          console.log('로그인 시도:', { acnt_id, acnt_pw });
          
          // 직접 axios를 사용하여 로그인 API 호출
          const response = await axiosInstance.post('/api/loginProc', {
            acnt_id,
            acnt_pw,
          });

          console.log('로그인 응답:', response);
          const data = response.data;
          console.log('로그인 데이터:', data);

          // 로그인 실패 처리
          if (data.accessToken === null || data.message) {
            console.log('로그인 실패:', data.message);
            return { 
              success: false, 
              message: data.message || '로그인에 실패했습니다.' 
            };
          }

          // 토큰 저장
          // accessToken은 메모리에만 저장
          set({ accessToken: data.accessToken });
          
          // refreshToken은 쿠키에 저장
          setCookie('refreshToken', data.refreshToken, 7); // 7일 유효
          
          // axios 인스턴스의 헤더에 토큰 설정
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
          
          const userInfo = {
            id: acnt_id,
            username: acnt_id,
            name: data.user?.acnt_nm || acnt_id,
            type: data.roles?.includes('ROLE_ADMIN') ? 'admin' : 'user',
            acnt_seq: data.user?.acnt_seq,
            tel_no: data.user?.tel_no,
            mail_addr: data.user?.mail_addr,
            sms_agree_flag: data.user?.sms_agree_flag,
            email_agree_flag: data.user?.email_agree_flag
          };
          
          console.log('로그인 성공, 사용자 정보:', userInfo);
          
          set({
            isLoggedIn: true,
            userInfo,
            lastActivity: Date.now(),
            showLogoutPrompt: false
          });
          
          get().startAutoLogout();
          return { success: true };
        } catch (error) {
          console.error('로그인 중 오류:', error);
          console.log('오류 세부 정보:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            responseData: error.response?.data
          });
          return { 
            success: false, 
            message: error.response?.data?.message || '로그인 중 오류가 발생했습니다.' 
          };
        }
      },

      // 로그아웃
      logout: () => {
        // 쿠키에서 토큰 삭제
        deleteCookie('refreshToken');
        
        // axios 인스턴스의 헤더에서 토큰 제거
        delete axiosInstance.defaults.headers.Authorization;
        
        set({
          isLoggedIn: false,
          userInfo: null,
          lastActivity: null,
          showLogoutPrompt: false,
          accessToken: null
        });
        
        get().clearTimers();
      },

      // 토큰 갱신
      refreshToken: async () => {
        try {
          const refreshToken = getCookie('refreshToken');
          if (!refreshToken) {
            throw new Error('리프레시 토큰이 없습니다.');
          }

          const response = await axiosInstance.post('/auth/refresh', { refreshToken });
          const data = response.data;

          if (!data.accessToken) {
            throw new Error('토큰 갱신에 실패했습니다.');
          }

          // 새로운 액세스 토큰 저장 (메모리에만)
          set({ accessToken: data.accessToken });
          
          // 새로운 리프레시 토큰이 있으면 쿠키에 저장
          if (data.refreshToken) {
            setCookie('refreshToken', data.refreshToken, 7); // 7일 유효
          }
          
          // axios 인스턴스의 헤더에 새 토큰 설정
          axiosInstance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;

          return { success: true };
        } catch (error) {
          console.error('토큰 갱신 중 오류:', error);
          get().logout();
          return { success: false };
        }
      },

      // 자동 로그아웃 시작
      startAutoLogout: () => {
        get().clearTimers();
        
        // 로그아웃 타이머 설정
        const logoutTimer = setTimeout(() => {
          get().logout();
        }, AUTO_LOGOUT_TIME);

        // 로그아웃 프롬프트 타이머 설정
        const promptTimer = setTimeout(() => {
          set({ showLogoutPrompt: true });
        }, AUTO_LOGOUT_TIME - AUTO_LOGOUT_PROMPT_TIME);

        set({ logoutTimer, promptTimer });
      },

      // 타이머 초기화
      clearTimers: () => {
        const { logoutTimer, promptTimer } = get();
        if (logoutTimer) clearTimeout(logoutTimer);
        if (promptTimer) clearTimeout(promptTimer);
        set({ logoutTimer: null, promptTimer: null });
      },

      // 활동 감지
      updateLastActivity: () => {
        set({ lastActivity: Date.now(), showLogoutPrompt: false });
        get().startAutoLogout();
      },

      // 로그아웃 연장
      extendSession: () => {
        set({ showLogoutPrompt: false });
        get().startAutoLogout();
      },
      
      // 사용자 정보 업데이트
      updateUserInfo: async (userUpdateData) => {
        try {
          const response = await axiosInstance.post('/api/updateUserInfo', userUpdateData);
          
          if (response.data && response.data.success) {
            // 저장된 유저 정보 업데이트
            set({ userInfo: { ...get().userInfo, ...userUpdateData } });
            return { success: true, message: '사용자 정보가 성공적으로 업데이트되었습니다.' };
          } else {
            throw new Error(response.data?.message || '사용자 정보 업데이트 실패');
          }
        } catch (error) {
          console.error('사용자 정보 업데이트 중 오류:', error);
          return { 
            success: false, 
            message: error.response?.data?.message || '사용자 정보 업데이트 중 오류가 발생했습니다.' 
          };
        }
      },

      // 비밀번호 변경
      changePassword: async (currentPassword, newPassword) => {
        try {
          const response = await axiosInstance.post('/api/changePassword', {
            current_password: currentPassword,
            new_password: newPassword
          });
          
          if (response.data && response.data.success) {
            return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.' };
          } else {
            throw new Error(response.data?.message || '비밀번호 변경 실패');
          }
        } catch (error) {
          console.error('비밀번호 변경 중 오류:', error);
          return { 
            success: false, 
            message: error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.' 
          };
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
        accessToken: state.accessToken
      })
    }
  )
);

export const useDupIdCheck = create((set) => ({
  isIdAvailable: false,
  isChecking: false,
  error: null,
  
  checkIdDuplicate: async (id) => {
    set({ isChecking: true, error: null });
    try {
      const response = await axiosInstance.post('/api/checkId', { acnt_id: id });
      const result = {
        isIdAvailable: response.data.isIdAvailable,
        message: response.data.isIdAvailable 
          ? '사용 가능한 아이디입니다.' 
          : '이미 사용 중인 아이디입니다.'
      };
      
      set({ 
        isIdAvailable: result.isIdAvailable, 
        isChecking: false 
      });
      
      return result;
    } catch (error) {
      console.error('아이디 확인 중 오류:', error); // 개발자를 위한 로그만 남김
      
      set({ 
        isChecking: false, 
        error: '아이디 확인 중 오류가 발생했습니다' 
      });
      
      // 일반적인 오류 메시지만 반환
      return {
        isIdAvailable: false,
        message: '아이디 확인 중 오류가 발생했습니다',
        error: true
      };
    }
  }
}));

export const registerUser = create((set) => ({
  register: async (userData) => {
    const response = await axiosInstance.post('/api/loginProc', userData);
    set({ isRegistered: response.data.isRegistered });
  }
}));

// IdleTimer 컴포넌트
export const IdleTimerProvider = ({ children }) => {
  const { updateLastActivity, isLoggedIn } = useAuthStore();

  useIdleTimer({
    timeout: AUTO_LOGOUT_TIME,
    onIdle: () => {
      if (isLoggedIn) {
        updateLastActivity();
      }
    },
    debounce: 500
  });

  return children;
};

// 회원가입 프로세스 관리 스토어
export const useJoinStore = create(
  persist(
    (set) => ({
      // 회원가입 진행 상태
      joinProcess: {
        agreementCompleted: false,
        registerCompleted: false
      },
      
      // 약관 동의 완료 설정
      setAgreementCompleted: (status = true) => {
        set((state) => ({
          joinProcess: {
            ...state.joinProcess,
            agreementCompleted: status
          }
        }));
      },
      
      // 회원정보 등록 완료 설정
      setRegisterCompleted: (status = true) => {
        set((state) => ({
          joinProcess: {
            ...state.joinProcess,
            registerCompleted: status
          }
        }));
      },
      
      // 회원가입 프로세스 초기화 (완료 또는 취소 시)
      resetJoinProcess: () => {
        set({
          joinProcess: {
            agreementCompleted: false,
            registerCompleted: false
          }
        });
      }
    }),
    {
      name: 'join-process-storage',
      partialize: (state) => ({ joinProcess: state.joinProcess })
    }
  )
);

export default useAuthStore;
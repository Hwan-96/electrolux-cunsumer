import { create } from 'zustand';
import { useIdleTimer } from 'react-idle-timer';
import { setCookie, deleteCookie, getCookie } from '@/utils/cookie';
import { axiosInstance } from '@/utils/api';

// 자동 로그아웃 설정
const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30분
const AUTO_LOGOUT_PROMPT_TIME = 5 * 60 * 1000; // 5분
// const AUTO_LOGOUT_TIME = 10 * 1000; // 10초
// const AUTO_LOGOUT_PROMPT_TIME = 5 * 1000; // 5초

export const useAuthStore = create((set, get) => ({
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
      // 테스트용 관리자 계정 설정
      const mockAdminUser = {
        id: 'admin',
        username: 'admin',
        name: '관리자',
        type: 'admin',
        acnt_seq: '1',
        tel_no: '010-0000-0000',
        mail_addr: 'admin@test.com',
        sms_agree_flag: 'Y',
        email_agree_flag: 'Y'
      };

      // 테스트용 토큰
      const mockToken = 'mock-access-token-for-testing';
      
      // 토큰 저장
      set({ accessToken: mockToken });
      
      // axios 인스턴스의 헤더에 토큰 설정
      axiosInstance.defaults.headers.Authorization = `Bearer ${mockToken}`;
      
      console.log('테스트용 관리자 로그인 성공');
      
      set({
        isLoggedIn: true,
        userInfo: mockAdminUser,
        lastActivity: Date.now(),
        showLogoutPrompt: false
      });
      
      get().startAutoLogout();
      return { success: true };
    } catch (error) {
      console.error('로그인 중 오류:', error);
      return { 
        success: false, 
        message: '로그인 중 오류가 발생했습니다.' 
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

      const response = await axiosInstance.post('/api/refreshToken', { refreshToken });
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
  extendSession: async () => {
    try {
      // 토큰 갱신 시도
      const result = await get().refreshToken();
      
      if (result.success) {
        // 토큰 갱신 성공 시 타이머 재설정
        set({ showLogoutPrompt: false });
        get().startAutoLogout();
        return { success: true, message: '세션이 연장되었습니다.' };
      } else {
        // 토큰 갱신 실패 시 로그아웃
        get().logout();
        return { success: false, message: '세션 연장에 실패했습니다. 다시 로그인해주세요.' };
      }
    } catch (error) {
      console.error('세션 연장 중 오류:', error);
      get().logout();
      return { success: false, message: '세션 연장 중 오류가 발생했습니다.' };
    }
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
}));

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
);

export default useAuthStore;
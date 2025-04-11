import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useIdleTimer } from 'react-idle-timer';
import apiService from '@/utils/api';
import { setCookie, deleteCookie, getCookie } from '@/utils/cookie';

// 자동 로그아웃 설정
const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30분
const AUTO_LOGOUT_PROMPT_TIME = 5 * 60 * 1000; // 5분

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userInfo: null,
      lastActivity: null,
      showLogoutPrompt: false,
      logoutTimer: null,
      promptTimer: null,

      // 로그인
      login: async (username, password) => {
        try {
          // 실제 API 호출
          const response = await apiService.post('/auth/login', {
            username,
            password
          });

          if (response.data.success) {
            const { token, refreshToken, userInfo } = response.data;
            
            // 액세스 토큰을 httpOnly 쿠키에 저장
            setCookie('accessToken', token, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: AUTO_LOGOUT_TIME / 1000
            });

            // 리프레시 토큰을 httpOnly 쿠키에 저장
            setCookie('refreshToken', refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60 // 7일
            });

            set({
              isLoggedIn: true,
              userInfo,
              lastActivity: Date.now(),
              showLogoutPrompt: false
            });
            
            get().startAutoLogout();
            return { success: true };
          }
          return { success: false, message: response.data.message };
        } catch (error) {
          console.error('로그인 중 오류:', error);
          return { success: false, message: '로그인 중 오류가 발생했습니다.' };
        }
      },

      // 로그아웃
      logout: () => {
        // 쿠키에서 토큰 삭제
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        
        set({
          isLoggedIn: false,
          userInfo: null,
          lastActivity: null,
          showLogoutPrompt: false
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

          const response = await apiService.post('/auth/refresh', { refreshToken });
          const { token } = response.data;

          // 새로운 액세스 토큰을 httpOnly 쿠키에 저장
          setCookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: AUTO_LOGOUT_TIME / 1000
          });

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
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo
      })
    }
  )
);

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

export default useAuthStore;
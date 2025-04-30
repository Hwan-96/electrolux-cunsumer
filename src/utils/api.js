import axios from 'axios';
import { getCsrfToken, generateCsrfToken, setCsrfToken } from './security';
import { useAuthStore } from '@/stores/authStore';
import { getCookie } from './cookie';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  // baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true
});

// 리퀘스트 인터셉터
// CSRF 공격을 방지하기 위해 모든 요청에 CSRF 토큰을 포함시킵니다.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCsrfToken();
    if (token) {
      config.headers['X-CSRF-TOKEN'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 리스폰스 인터셉터
// CSRF 토큰이 만료되거나 불일치할 경우, 새로운 토큰을 생성하고 요청을 다시 시도합니다.
axiosInstance.interceptors.response.use(
  (response) => {
    const newToken = response.headers['x-csrf-token'];
    if (newToken) {
      setCsrfToken(newToken);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 419) { // CSRF token mismatch
      const newToken = generateCsrfToken();
      error.config.headers['X-CSRF-TOKEN'] = newToken;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
// 401 상태 코드가 발생할 경우, 토큰을 갱신하고 요청을 다시 시도합니다.
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // refreshToken 가져오기
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          throw new Error('리프레시 토큰이 없습니다.');
        }

        // 토큰 갱신 요청
        const response = await axiosInstance.post('/api/refresh', { refreshToken });
        const { accessToken } = response.data;

        if (!accessToken) {
          throw new Error('토큰 갱신에 실패했습니다.');
        }

        // 새로운 액세스 토큰 저장
        useAuthStore.getState().set({ accessToken });
        
        // axios 인스턴스의 헤더에 새 토큰 설정
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        
        // 원래 요청의 헤더에 새 토큰 설정
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 중 오류:', refreshError);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const API_ENDPOINTS = {
  INACTIVE: {
    EVD_CNS: '/api/consulting/save'
  }
}
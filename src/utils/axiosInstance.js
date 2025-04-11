import axios from 'axios';
import { sanitizeInput, sanitizeUrlParam } from './inputValidation';
import { useAuthStore } from '@/stores/authStore';

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // 쿠키를 포함하여 요청
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  }
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // URL 파라미터 sanitize
    if (config.params) {
      Object.keys(config.params).forEach(key => {
        if (typeof config.params[key] === 'string') {
          config.params[key] = sanitizeUrlParam(config.params[key]);
        }
      });
    }

    // 요청 데이터 sanitize
    if (config.data) {
      if (typeof config.data === 'string') {
        try {
          const parsedData = JSON.parse(config.data);
          const sanitizedData = Object.keys(parsedData).reduce((acc, key) => {
            acc[key] = typeof parsedData[key] === 'string' ? sanitizeInput(parsedData[key]) : parsedData[key];
            return acc;
          }, {});
          config.data = JSON.stringify(sanitizedData);
        } catch {
          // JSON 파싱 실패 시 원본 데이터 사용
          config.data = sanitizeInput(config.data);
        }
      } else if (typeof config.data === 'object') {
        config.data = Object.keys(config.data).reduce((acc, key) => {
          acc[key] = typeof config.data[key] === 'string' ? sanitizeInput(config.data[key]) : config.data[key];
          return acc;
        }, {});
      }
    }

    // CSRF 토큰 추가 (서버에서 설정한 쿠키 사용)
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터 sanitize
    if (response.data) {
      if (typeof response.data === 'string') {
        try {
          const parsedData = JSON.parse(response.data);
          const sanitizedData = Object.keys(parsedData).reduce((acc, key) => {
            acc[key] = typeof parsedData[key] === 'string' ? sanitizeInput(parsedData[key]) : parsedData[key];
            return acc;
          }, {});
          response.data = JSON.stringify(sanitizedData);
        } catch {
          // JSON 파싱 실패 시 원본 데이터 사용
          response.data = sanitizeInput(response.data);
        }
      } else if (typeof response.data === 'object') {
        response.data = Object.keys(response.data).reduce((acc, key) => {
          acc[key] = typeof response.data[key] === 'string' ? sanitizeInput(response.data[key]) : response.data[key];
          return acc;
        }, {});
      }
    }

    return response;
  },
  (error) => {
    const { response } = error;
    
    // 에러 처리
    if (response) {
      switch (response.status) {
        case 401:
          // 인증 실패
          useAuthStore.getState().logout();
          window.location.href = '/login';
          break;
        case 403:
          // 권한 없음
          window.location.href = '/';
          break;
        case 404:
          // 리소스 없음
          window.location.href = '/not-found';
          break;
        case 429:
          // 요청 횟수 제한
          alert('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
          break;
        case 500:
          // 서버 에러
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          break;
        default:
          // 기타 에러
          alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    } else if (error.code === 'ECONNABORTED') {
      // 타임아웃
      alert('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    } else if (!window.navigator.onLine) {
      // 오프라인
      alert('인터넷 연결이 끊어졌습니다. 연결을 확인해주세요.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance; 
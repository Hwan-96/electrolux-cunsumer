import axios from 'axios';
import mockApiService from './mockApi';
import useAuthStore from '@/stores/authStore';
import { sanitizeObject, generateCspHeader } from './security';

// 개발 환경에서는 목 데이터 사용, 프로덕션에서는 실제 API 사용
// import.meta.env는 Vite에서 환경 변수에 접근하는 방법
const USE_MOCK = import.meta.env.DEV; // 개발 환경에서는 true, 프로덕션에서는 false

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API 요청 기본 설정
const defaultConfig = {
  retry: 3, // 재시도 횟수
  retryDelay: 1000, // 재시도 간격 (ms)
  timeout: 10000, // 타임아웃 (ms)
};

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: defaultConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
    ...generateCspHeader()
  },
  withCredentials: true, // CSRF 토큰을 위한 설정
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 토큰은 httpOnly 쿠키에서 자동으로 전송되므로 별도로 설정하지 않음
    // XSS 방지를 위해 요청 데이터 sanitize
    if (config.data) {
      config.data = sanitizeObject(config.data);
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
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 토큰 갱신 시도
        const { success } = await useAuthStore.getState().refreshToken();
        
        if (success) {
          // 토큰 갱신 성공 시 원래 요청 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // 권한 없음
          window.location.href = '/';
          break;
        case 429:
          // 요청 횟수 초과
          console.error('Too many requests. Please try again later.');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

// API 요청 메서드 추가
axiosInstance.get = async (url, params = {}, config = {}) => {
  const response = await axiosInstance.get(url, {
    params,
    ...defaultConfig,
    ...config
  });
  return response.data;
};

axiosInstance.post = async (url, data = {}, config = {}) => {
  const response = await axiosInstance.post(url, data, {
    ...defaultConfig,
    ...config
  });
  return response.data;
};

axiosInstance.put = async (url, data = {}, config = {}) => {
  const response = await axiosInstance.put(url, data, {
    ...defaultConfig,
    ...config
  });
  return response.data;
};

axiosInstance.delete = async (url, config = {}) => {
  const response = await axiosInstance.delete(url, {
    ...defaultConfig,
    ...config
  });
  return response.data;
};

// API 요청 유틸리티
const apiService = {
  // GET 요청
  get: async (url, params = {}, config = {}) => {
    const response = await axiosInstance.get(url, {
      params,
      ...defaultConfig,
      ...config
    });
    return response.data;
  },

  // POST 요청
  post: async (url, data = {}, config = {}) => {
    const response = await axiosInstance.post(url, data, {
      ...defaultConfig,
      ...config
    });
    return response.data;
  },

  // PUT 요청
  put: async (url, data = {}, config = {}) => {
    const response = await axiosInstance.put(url, data, {
      ...defaultConfig,
      ...config
    });
    return response.data;
  },

  // DELETE 요청
  delete: async (url, config = {}) => {
    const response = await axiosInstance.delete(url, {
      ...defaultConfig,
      ...config
    });
    return response.data;
  },

  // 파일 업로드
  upload: async (url, file, config = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post(url, formData, {
      ...defaultConfig,
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // 지역 목록 조회
  getRegions: async () => {
    if (USE_MOCK) {
      return mockApiService.getRegions();
    }
    
    try {
      return await axiosInstance.get('/regions');
    } catch (error) {
      console.error('지역 목록 조회 오류:', error);
      throw error;
    }
  },
  
  // 시군구 목록 조회
  getCitiesByRegion: async (region) => {
    if (USE_MOCK) {
      return mockApiService.getCitiesByRegion(region);
    }
    
    try {
      return await axiosInstance.get(`/regions/${region}/cities`);
    } catch (error) {
      console.error('시군구 목록 조회 오류:', error);
      throw error;
    }
  },
  
  // 서비스 센터 목록 조회
  getServiceCenters: async (params) => {
    if (USE_MOCK) {
      return mockApiService.getServiceCenters(params);
    }
    
    try {
      return await axiosInstance.get('/service-centers', { params });
    } catch (error) {
      console.error('서비스 센터 목록 조회 오류:', error);
      throw error;
    }
  },
  
  // 서비스 센터 상세 조회
  getServiceCenterById: async (id) => {
    if (USE_MOCK) {
      return mockApiService.getServiceCenterById(id);
    }
    
    try {
      return await axiosInstance.get(`/service-centers/${id}`);
    } catch (error) {
      console.error('서비스 센터 상세 조회 오류:', error);
      throw error;
    }
  },
  
  // 로그아웃 함수
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    delete axiosInstance.defaults.headers.Authorization;
    return { success: true, message: '로그아웃되었습니다.' };
  },
  
  // 테스트 사용자 로그인 함수
  loginTestUser: () => {
    const testToken = 'test_user_token';
    localStorage.setItem('token', testToken);
    localStorage.setItem('userId', 'test_user');
    axiosInstance.defaults.headers.Authorization = `Bearer ${testToken}`;
    console.log('로컬스토리지에 토큰 저장:', localStorage.getItem('token'));
    console.log('axios 헤더에 토큰 설정:', axiosInstance.defaults.headers.Authorization);
    return { success: true, message: '테스트 사용자로 로그인되었습니다.' };
  },
  
  // 관리자 로그인 함수
  loginAdmin: () => {
    const adminToken = 'test_admin_token';
    localStorage.setItem('token', adminToken);
    localStorage.setItem('userId', 'admin');
    axiosInstance.defaults.headers.Authorization = `Bearer ${adminToken}`;
    return { success: true, message: '관리자로 로그인되었습니다.' };
  },
  
  // 현재 로그인한 사용자 ID 가져오기
  getCurrentUserId: () => {
    return localStorage.getItem('userId');
  },
  
  // 사용자 타입 가져오기
  getUserType: () => {
    return localStorage.getItem('userType');
  }
};

// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    CHECK: '/auth/check',
    REFRESH: '/auth/refresh'
  },
  // 사용자
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update'
  },
  // Q&A
  QNA: {
    LIST: '/qna',
    DETAIL: (id) => `/qna/${id}`,
    CREATE: '/qna',
    UPDATE: (id) => `/qna/${id}`,
    DELETE: (id) => `/qna/${id}`
  },
  // 공지사항
  NOTICE: {
    LIST: '/notice',
    DETAIL: (id) => `/notice/${id}`
  },
  // FAQ
  FAQ: {
    LIST: '/faq',
    DETAIL: (id) => `/faq/${id}`
  },
  // 이벤트
  EVENT: {
    LIST: '/event',
    DETAIL: (id) => `/event/${id}`
  }
};

export default apiService; 
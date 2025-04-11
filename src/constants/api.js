// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    CHECK: '/auth/check'
  },
  
  // 사용자
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    CHANGE_PASSWORD: '/user/change-password'
  },
  
  // 서비스 센터
  SERVICE_CENTER: {
    LIST: '/service-centers',
    DETAIL: (id) => `/service-centers/${id}`,
    SEARCH: '/service-centers/search'
  },
  
  // FAQ
  FAQ: {
    LIST: '/faq',
    DETAIL: (id) => `/faq/${id}`,
    CATEGORIES: '/faq/categories'
  },
  
  // Q&A
  QNA: {
    LIST: '/qna',
    DETAIL: (id) => `/qna/${id}`,
    CREATE: '/qna',
    UPDATE: (id) => `/qna/${id}`,
    DELETE: (id) => `/qna/${id}`
  }
};

// API 응답 코드
export const API_RESPONSE_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
};

// API 에러 메시지
export const API_ERROR_MESSAGES = {
  [API_RESPONSE_CODES.UNAUTHORIZED]: '인증이 필요합니다.',
  [API_RESPONSE_CODES.FORBIDDEN]: '접근 권한이 없습니다.',
  [API_RESPONSE_CODES.NOT_FOUND]: '요청한 리소스를 찾을 수 없습니다.',
  [API_RESPONSE_CODES.TOO_MANY_REQUESTS]: '요청 횟수가 초과되었습니다.',
  [API_RESPONSE_CODES.INTERNAL_SERVER_ERROR]: '서버 오류가 발생했습니다.'
}; 
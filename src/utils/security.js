import DOMPurify from 'dompurify';

// XSS 방지 유틸리티 함수들
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // HTML 태그 제거
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // 특수문자 이스케이프
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  // SQL 인젝션 방지
  sanitized = sanitized.replace(/(['";])/g, '\\$1');
  
  return sanitized;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeHtmlContent = (content) => {
  if (typeof content !== 'string') return content;
  
  // DOMPurify를 사용하여 HTML 정제
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onclick', 'onerror', 'onload', 'onmouseover', 'onmouseout', 'onkeydown', 'onkeypress', 'onkeyup']
  });
};

export const sanitizeObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const sanitized = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === 'object') {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  }
  
  return sanitized;
};

// 파일 업로드 검증
export const validateFileUpload = (file) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!file) {
    throw new Error('파일이 선택되지 않았습니다.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('파일 크기는 5MB를 초과할 수 없습니다.');
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('허용되지 않은 파일 형식입니다.');
  }

  // 파일 이름 검증
  const fileName = sanitizeInput(file.name);
  if (fileName !== file.name) {
    throw new Error('파일 이름에 허용되지 않은 문자가 포함되어 있습니다.');
  }

  return true;
};

// CSRF 토큰 생성
export const generateCsrfToken = () => {
  const token = crypto.randomUUID();
  return token;
};

// CSRF 토큰 검증
export const validateCsrfToken = (token, storedToken) => {
  if (!token || !storedToken) {
    return false;
  }
  return token === storedToken;
};

// 에러 메시지 정제
export const sanitizeErrorMessage = (error) => {
  const safeMessages = {
    'Network Error': '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
    'Request failed with status code 401': '로그인이 필요합니다.',
    'Request failed with status code 403': '접근 권한이 없습니다.',
    'Request failed with status code 404': '요청한 리소스를 찾을 수 없습니다.',
    'Request failed with status code 500': '서버 오류가 발생했습니다.'
  };

  return safeMessages[error.message] || '오류가 발생했습니다. 다시 시도해주세요.';
};

// Content Security Policy 헤더 생성
export const generateCspHeader = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; ')
  };
}; 
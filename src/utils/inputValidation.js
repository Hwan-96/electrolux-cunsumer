import DOMPurify from 'dompurify';

// HTML 태그 제거 및 특수문자 이스케이프
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // 모든 HTML 태그 제거
    ALLOWED_ATTR: [], // 모든 속성 제거
  });
};

// URL 파라미터 검증
export const sanitizeUrlParam = (param) => {
  if (typeof param !== 'string') return '';
  return encodeURIComponent(param);
};

// 파일명 검증
export const sanitizeFilename = (filename) => {
  if (typeof filename !== 'string') return '';
  // 파일명에서 허용되지 않는 문자 제거
  return filename.replace(/[<>:"/\\|?*]/g, '');
};

// 검색어 검증
export const sanitizeSearchTerm = (term) => {
  if (typeof term !== 'string') return '';
  return term.replace(/[<>]/g, '');
};

// HTML 컨텐츠 렌더링을 위한 sanitize
export const sanitizeHtmlContent = (content) => {
  if (typeof content !== 'string') return '';
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style'],
    ALLOW_DATA_ATTR: false
  });
}; 
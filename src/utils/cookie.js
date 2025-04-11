// 쿠키 설정
export const setCookie = (name, value, options = {}) => {
  const defaultOptions = {
    path: '/',
    secure: true,
    sameSite: 'strict',
    ...options
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (defaultOptions.maxAge) {
    cookieString += `; max-age=${defaultOptions.maxAge}`;
  }
  if (defaultOptions.expires) {
    cookieString += `; expires=${defaultOptions.expires.toUTCString()}`;
  }
  if (defaultOptions.path) {
    cookieString += `; path=${defaultOptions.path}`;
  }
  if (defaultOptions.domain) {
    cookieString += `; domain=${defaultOptions.domain}`;
  }
  if (defaultOptions.secure) {
    cookieString += '; secure';
  }
  if (defaultOptions.sameSite) {
    cookieString += `; samesite=${defaultOptions.sameSite}`;
  }
  if (defaultOptions.httpOnly) {
    // httpOnly는 JavaScript에서 설정할 수 없음 (서버에서만 설정 가능)
    console.warn('httpOnly 옵션은 서버에서만 설정 가능합니다.');
  }

  document.cookie = cookieString;
};

// 쿠키 삭제
export const deleteCookie = (name, options = {}) => {
  setCookie(name, '', {
    ...options,
    maxAge: 0
  });
};

// 쿠키 존재 여부 확인
export const hasCookie = (name) => {
  return document.cookie.split(';').some((cookie) => {
    return cookie.trim().startsWith(`${name}=`);
  });
};

// 쿠키 값 가져오기
export const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}; 
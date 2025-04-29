import axios from 'axios';

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
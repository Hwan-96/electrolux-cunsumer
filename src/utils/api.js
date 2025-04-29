import axios from 'axios';

// axios 인스턴스 생성
export const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true
});

export const API_ENDPOINTS = {
  INACTIVE: {
    EVD_CNS: '/inact/evd/save'
  }
}
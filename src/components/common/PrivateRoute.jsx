import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    // 현재 위치를 state로 전달하여 로그인 후 돌아올 수 있도록 함
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute; 
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

const AdminRoute = ({ children }) => {
  const { isLoggedIn, userInfo } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userInfo?.type !== 'admin') {
    // 관리자가 아닌 사용자는 홈으로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute; 
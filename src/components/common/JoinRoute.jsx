import { Navigate } from 'react-router-dom';
import useAuthStore, { useJoinStore } from '@/stores/authStore';

/**
 * 회원가입 단계별 접근 제어를 위한 라우트 가드 컴포넌트
 * - 이미 로그인한 사용자는 홈 페이지로 리다이렉트
 * - 각 단계는 이전 단계가 완료되어야만 접근 가능
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 * @param {string} props.step - 현재 접근하려는 단계 (agreement, register, complete)
 */
const JoinRoute = ({ children, step }) => {
  const { isLoggedIn } = useAuthStore();
  const { joinProcess } = useJoinStore();

  // 이미 로그인한 사용자는 접근 불가
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // 단계별 접근 제어
  switch (step) {
    case 'agreement':
      // 약관 동의 단계는 항상 접근 가능
      return children;
      
    case 'register':
      // 약관 동의가 완료되지 않은 경우 약관 동의 페이지로 리다이렉트
      if (!joinProcess.agreementCompleted) {
        return <Navigate to="/join/agreement" replace />;
      }
      return children;
      
    case 'complete':
      // 회원정보 등록이 완료되지 않은 경우 회원정보 등록 페이지로 리다이렉트
      if (!joinProcess.registerCompleted) {
        if (joinProcess.agreementCompleted) {
          return <Navigate to="/join/register" replace />;
        }
        return <Navigate to="/join/agreement" replace />;
      }
      return children;
      
    default:
      // 잘못된 단계 설정 시 약관 동의 페이지로 리다이렉트
      console.error(`Invalid join step: ${step}`);
      return <Navigate to="/join/agreement" replace />;
  }
};

export default JoinRoute; 
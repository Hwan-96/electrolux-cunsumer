import '@/css/join.css';
import '@/css/join_common.css';
import '@/css/common.css'
import '@/css/layout.css'
import '@/css/pop.css'
import '@/css/style.css'

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import AdminFooter from '@/components/admin/layout/AdminFooter';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/login/Login';
import FindID from '@/components/pages/login/FindID';
import FindPW from '@/components/pages/login/FindPW';
import Agreement from '@/components/pages/join/Agreement';
import Register from '@/components/pages/join/Register';
import Complete from '@/components/pages/join/Complete';
import Warranty from '@/components/pages/service/Warranty';
import AsCharge from '@/components/pages/service/AsCharge';
import FreeAs from '@/components/pages/service/FreeAs';
import CenterSearch from '@/components/pages/center-search/CenterSearch';
import Faq from '@/components/pages/faq/Faq';
import Qna from '@/components/pages/faq/Qna';
import QnaForm from '@/components/pages/faq/QnaForm';
import QnaDetail from '@/components/pages/faq/QnaDetail';
import Notice from '@/components/pages/notice/Notice';
import PrdGuide from '@/components/pages/down/PrdGuide';
import Cleanup from '@/components/pages/down/Cleanup';
import PrdGuideDetail from '@/components/pages/down/PrdGuideDetail';
import CleanupDetail from '@/components/pages/down/CleanupDetail';
import OngoingEvent from '@/components/pages/event/OngoingEvent';
import EndedEvent from '@/components/pages/event/EndedEvent';
import WinnerEvent from '@/components/pages/event/WinnerEvent';
import NotFound from '@/components/pages/NotFound';
import PrivateRoute from '@/components/common/PrivateRoute';
import AdminRoute from '@/components/common/AdminRoute';
import JoinRoute from '@/components/common/JoinRoute';
import UserInfo from '@/components/pages/mypage/UserInfo';
import EvdCns from '@/components/pages/inactive/EvdCns';
import Install from '@/components/pages/inactive/Install';
import Survey from '@/components/pages/inactive/Survey';
import UltraSrch from '@/components/pages/inactive/UltraSrch';
import useAuthStore from './stores/authStore';
import { IdleTimerProvider } from './stores/authStore';
import LogoutPrompt from './components/common/LogoutPrompt';
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminRoutes from '@/components/admin/routes/AdminRoutes';
import Aside from '@/components/admin/layout/Aside';
import Terms from '@/components/pages/terms/Terms';
import Privacy from '@/components/pages/terms/Privacy';
// 관리자 사용자 여부 확인 커스텀 훅
const useIsAdmin = () => {
  const { isLoggedIn, userInfo } = useAuthStore();
  return isLoggedIn && userInfo?.type === 'admin';
};

// 일반 유저 경로 접근 체크 컴포넌트
const UserRouteCheck = ({ children }) => {
  const isAdmin = useIsAdmin();
  const location = useLocation();
  
  // 관리자가 관리자 경로가 아닌 곳에 접근하려고 할 때 관리자 대시보드로 리다이렉트
  if (isAdmin && !location.pathname.startsWith('/mng')) {
    return <Navigate to="/mng" replace />;
  }
  
  return children;
};

// 헤더와 푸터를 포함하는 레이아웃 컴포넌트
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/mng');

  return (
    <div id="wrap">
      <div id="accessibility">
        <a href="#container">본문 바로가기</a>
      </div>
      {isAdminRoute ? <AdminHeader /> : <Header />}
      {isAdminRoute ? 
        <main>
          <Aside />
          {children}
        </main>
        :
        <main>{children}</main>
      }
      {isAdminRoute ? <AdminFooter /> : <Footer />}
    </div>
  );
};

function App() {
  const { showLogoutPrompt, extendSession } = useAuthStore();

  return (
    <ErrorBoundary>
      <IdleTimerProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* 공개 페이지들 - 권한 확인 적용 */}
              <Route path="/" element={
                <UserRouteCheck>
                  <Home />
                </UserRouteCheck>
              } />
              <Route path="/login" element={
                <UserRouteCheck>
                  <Login />
                </UserRouteCheck>
              } />

              <Route path="/find/id" element={
                <UserRouteCheck>
                  <FindID />
                </UserRouteCheck>
              } />

              <Route path="/find/pw" element={
                <UserRouteCheck>
                  <FindPW />
                </UserRouteCheck>
              } />

              <Route path="/svc/wrnt" element={
                <UserRouteCheck>
                  <Warranty />
                </UserRouteCheck>
              } />
              <Route path="/svc/asChr" element={
                <UserRouteCheck>
                  <AsCharge />
                </UserRouteCheck>
              } />
              <Route path="/svc/as" element={
                <UserRouteCheck>
                  <FreeAs />
                </UserRouteCheck>
              } />
              <Route path="/cntLst" element={
                <UserRouteCheck>
                  <CenterSearch />
                </UserRouteCheck>
              } />
              <Route path="/faq" element={
                <UserRouteCheck>
                  <Faq />
                </UserRouteCheck>
              } />
              <Route path="/qna" element={
                <UserRouteCheck>
                  <Qna />
                </UserRouteCheck>
              } />
              <Route path="/ntc/*" element={
                <UserRouteCheck>
                  <Notice />
                </UserRouteCheck>
              } />
              <Route path="/dwn/manual" element={
                <UserRouteCheck>
                  <PrdGuide />
                </UserRouteCheck>
              } />
              <Route path="/dwn/cleanup" element={
                <UserRouteCheck>
                  <Cleanup />
                </UserRouteCheck>
              } />
              <Route path="/dwn/manual/:id" element={
                <UserRouteCheck>
                  <PrdGuideDetail />
                </UserRouteCheck>
              } />
              <Route path="/dwn/cleanup/:id" element={
                <UserRouteCheck>
                  <CleanupDetail />
                </UserRouteCheck>
              } />
              <Route path="/evnt/ongoing" element={
                <UserRouteCheck>
                  <OngoingEvent />
                </UserRouteCheck>
              } />
              <Route path="/evnt/end" element={
                <UserRouteCheck>
                  <EndedEvent />
                </UserRouteCheck>
              } />
              <Route path="/evnt/winner" element={
                <UserRouteCheck>
                  <WinnerEvent />
                </UserRouteCheck>
              } />
              

              {/* 비활성화 페이지들 */}
              <Route path="/consulting" element={
                <UserRouteCheck>
                  <EvdCns />
                </UserRouteCheck>
              } />

              <Route path="/install" element={
                <UserRouteCheck>
                  <Install />
                </UserRouteCheck>
              } />

              <Route path="/survey/:id" element={
                <UserRouteCheck>
                  <Survey />
                </UserRouteCheck>
              } />

              <Route path="/ultra" element={
                <UserRouteCheck>
                  <UltraSrch />
                </UserRouteCheck>
              } />
              
              

              <Route path="/join/agreement" element={
                <UserRouteCheck>
                  <JoinRoute step="agreement">
                    <Agreement />
                  </JoinRoute>
                </UserRouteCheck>
              } />
              <Route path="/join/register" element={
                <UserRouteCheck>
                  <JoinRoute step="register">
                    <Register />
                  </JoinRoute>
                </UserRouteCheck>
              } />
              <Route path="/join/complete" element={
                <UserRouteCheck>
                  <JoinRoute step="complete">
                    <Complete />
                  </JoinRoute>
                </UserRouteCheck>
              } />
              
              {/* 보호된 페이지들 - 로그인 필요 */}
              <Route path="/qna/form" element={
                <UserRouteCheck>
                  <PrivateRoute>
                    <QnaForm />
                  </PrivateRoute>
                </UserRouteCheck>
              } />
              <Route path="/qna/:id" element={
                <UserRouteCheck>
                  <PrivateRoute>
                    <QnaDetail />
                  </PrivateRoute>
                </UserRouteCheck>
              } />

              <Route path="/mem/cs" element={
                <UserRouteCheck>
                  <PrivateRoute>
                    <UserInfo />
                  </PrivateRoute>
                </UserRouteCheck>
              } />

              <Route path="/terms" element={
                <UserRouteCheck>
                  <Terms />
                </UserRouteCheck>
              } />
              <Route path="/privacy" element={
                <UserRouteCheck>
                  <Privacy />
                </UserRouteCheck>
              } />

              {/* 관리자 전용 페이지들 */}
              <Route path="/mng/*" element={
                <AdminRoute>
                  <AdminRoutes />
                </AdminRoute>
              } />
              
              {/* 404 페이지 - 가장 마지막에 배치 */}
              <Route path="*" element={
                <UserRouteCheck>
                  <NotFound />
                </UserRouteCheck>
              } />
            </Routes>
            {showLogoutPrompt && (
              <LogoutPrompt
                onExtendSession={extendSession}
                onLogout={() => {
                  useAuthStore.getState().logout();
                }}
              />
            )}
          </Layout>
        </BrowserRouter>
      </IdleTimerProvider>
    </ErrorBoundary>
  );
}

export default App;

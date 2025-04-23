import '@/css/join.css';
import '@/css/join_common.css';
import '@/css/common.css'
import '@/css/layout.css'
import '@/css/pop.css'
import '@/css/style.css'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdminHeader from '@/components/admin/layout/AdminHeader';
import AdminFooter from '@/components/admin/layout/AdminFooter';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/login/Login';
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
import Event from '@/components/pages/event/Event';
import NotFound from '@/components/pages/NotFound';
import PrivateRoute from '@/components/common/PrivateRoute';
import AdminRoute from '@/components/common/AdminRoute';
import useAuthStore from './stores/authStore';
import { IdleTimerProvider } from './stores/authStore';
import LogoutPrompt from './components/common/LogoutPrompt';
import ErrorBoundary from './components/common/ErrorBoundary';
import AdminRoutes from '@/components/admin/routes/AdminRoutes';
import Aside from '@/components/admin/layout/Aside';
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
              {/* 공개 페이지들 */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/service/warranty" element={<Warranty />} />
              <Route path="/service/as_charge" element={<AsCharge />} />
              <Route path="/service/free_as" element={<FreeAs />} />
              <Route path="/center-search" element={<CenterSearch />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/qna" element={<Qna />} />
              <Route path="/notice/*" element={<Notice />} />
              <Route path="/down/prd_guide" element={<PrdGuide />} />
              <Route path="/down/cleanup" element={<Cleanup />} />
              <Route path="/down/prd_guide/:id" element={<PrdGuideDetail />} />
              <Route path="/down/cleanup/:id" element={<CleanupDetail />} />
              <Route path="/event/*" element={<Event />} />

              <Route path="/join/agreement" element={<Agreement />} />
              <Route path="/join/register" element={<Register />} />
              <Route path="/join/complete" element={<Complete />} />
              
              {/* 보호된 페이지들 - 로그인 필요 */}
              <Route path="/qna/form" element={
                <PrivateRoute>
                  <QnaForm />
                </PrivateRoute>
              } />
              <Route path="/qna/:id" element={
                <PrivateRoute>
                  <QnaDetail />
                </PrivateRoute>
              } />
              
              {/* 관리자 전용 페이지들 */}
              <Route path="/mng/*" element={
                <AdminRoute>
                  <AdminRoutes />
                </AdminRoute>
              } />
              
              {/* 404 페이지 - 가장 마지막에 배치 */}
              <Route path="*" element={<NotFound />} />
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

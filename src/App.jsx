import '@/css/common.css'
import '@/css/layout.css'
import '@/css/pop.css'
import '@/css/style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Home from '@/components/pages/Home';
import Login from '@/components/pages/login/Login';
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

// 헤더와 푸터를 포함하는 레이아웃 컴포넌트
const Layout = ({ children }) => (
  <div id="wrap">
    <div id="accessibility">
      <a href="#container">본문 바로가기</a>
    </div>
    <Header />
    {children}
    <Footer />
  </div>
);

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
              <Route path="/center-search" element={<CenterSearch />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/qna" element={<Qna />} />
              <Route path="/notice/*" element={<Notice />} />
              <Route path="/down/prd_guide" element={<PrdGuide />} />
              <Route path="/down/cleanup" element={<Cleanup />} />
              <Route path="/down/prd_guide/:id" element={<PrdGuideDetail />} />
              <Route path="/down/cleanup/:id" element={<CleanupDetail />} />
              <Route path="/event/*" element={<Event />} />
              
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
              <Route path="/service/warranty" element={
                <PrivateRoute>
                  <Warranty />
                </PrivateRoute>
              } />
              <Route path="/service/as_charge" element={
                <PrivateRoute>
                  <AsCharge />
                </PrivateRoute>
              } />
              <Route path="/service/free_as" element={
                <PrivateRoute>
                  <FreeAs />
                </PrivateRoute>
              } />
              
              {/* 관리자 전용 페이지들 */}
              <Route path="/admin/*" element={
                <AdminRoute>
                  {/* 향후 관리자 페이지 컴포넌트 추가 */}
                  <NotFound />
                </AdminRoute>
              } />
              
              {/* 404 페이지 */}
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

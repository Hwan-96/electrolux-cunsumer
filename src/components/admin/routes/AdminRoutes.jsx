import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import styled from 'styled-components';
import OnlineService from '@/components/admin/pages/Service/OnlineService';
import Induction from '@/components/admin/pages/Service/Induction';
import Counseling from '@/components/admin/pages/Service/Counseling';
import Faq from '@/components/admin/pages/Service/Faq';
import Notice from '@/components/admin/pages/Service/Notice';
import CenterList from '@/components/admin/pages/Service/CenterList';
import Survey from '@/components/admin/pages/Service/Survey';
import CounselStat from '@/components/admin/pages/Statistic/CounselStat';
import PrdGuide from '@/components/admin/pages/Download/PrdGuide';
import CleanUp from '@/components/admin/pages/Download/CleanUp';
import MemberList from '@/components/admin/pages/Member/MemberList';
import ExW from '@/components/admin/pages/Member/ExW';
import Role from '@/components/admin/pages/Member/Role';
import Banner from '@/components/admin/pages/Customize/Banner';
import Video from '@/components/admin/pages/Customize/Video';
import Terms from '@/components/admin/pages/Customize/Terms';
import Family from '@/components/admin/pages/Customize/FamilySite';
import EventList from '@/components/admin/pages/Event/EventList';
import Prd from '@/components/admin/pages/Category/Prd';
import FaqCtgr from '@/components/admin/pages/Category/Faq';
import Qna from '@/components/admin/pages/Category/Qna';
import QnaStat from '@/components/admin/pages/Statistic/QnaStat';
import SurveyStat from '@/components/admin/pages/Statistic/SurveyStat';
import EventWin from '@/components/admin/pages/Event/EventWin';
import NavPath from '@/components/admin/common/NavPath';

/* Detail Pages */
import OnlineServiceDetail from '@/components/admin/pages/Service/OnlineServiceDetail';
import InductionDetail from '@/components/admin/pages/Service/InductionDetail';
import CounselingDetail from '@/components/admin/pages/Service/CounselingDetail';
import FaqDetail from '@/components/admin/pages/Service/FaqDetail';
import NoticeDetail from '@/components/admin/pages/Service/NoticeDetail';
import CenterListDetail from '@/components/admin/pages/Service/CenterListDetail';
import SurveyDetail from '@/components/admin/pages/Service/SurveyDetail';
import PrdGuideDetail from '@/components/admin/pages/Download/PrdGuideDetail';
import CleanUpDetail from '@/components/admin/pages/Download/CleanUpDetail';
import MemberDetail from '@/components/admin/pages/Member/MemberDetail';
import RoleDetail from '@/components/admin/pages/Member/RoleDetail';
import BannerDetail from '@/components/admin/pages/Customize/BannerDetail';
import VideoDetail from '@/components/admin/pages/Customize/VideoDetail';
import TermsDetail from '@/components/admin/pages/Customize/TermsDetail';
import FamilySiteDetail from '@/components/admin/pages/Customize/FamilySiteDetail';
import EventDetail from '@/components/admin/pages/Event/EventListDetail';
import EventWinDetail from '@/components/admin/pages/Event/EventWinDetail';

const AdminRoutesContainer = styled.div`
  width: calc(100% - 230px);
  margin-left: 230px;
  min-height: 100vh;
  background-color: #f3f3f3;
  padding: 120px 40px 100px 30px;
`;

const AdminRoutes = () => {
  return (
    <AdminRoutesContainer>
      <NavPath />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        {/* 서비스 메뉴 */}
        <Route path="/svc/onCns" element={<OnlineService />} />
        <Route path="/svc/onCns/:id" element={<OnlineServiceDetail />} />
        <Route path="/svc/indct" element={<Induction />} />
        <Route path="/svc/indct/:id" element={<InductionDetail />} />
        <Route path="/svc/qna" element={<Counseling />} />
        <Route path="/svc/qna/:id" element={<CounselingDetail />} />
        <Route path="/svc/faq" element={<Faq />} /> 
        <Route path="/svc/faq/:id" element={<FaqDetail />} />
        <Route path="/svc/ntc" element={<Notice />} />
        <Route path="/svc/ntc/:id" element={<NoticeDetail />} />
        <Route path="/svc/cntLst" element={<CenterList />} />
        <Route path="/svc/cntLst/:id" element={<CenterListDetail />} />
        <Route path="/svc/srvy" element={<Survey />} />
        <Route path="/svc/srvy/:id" element={<SurveyDetail />} />

        {/* 통계 메뉴 */}
        <Route path="/stt/onCnsStt" element={<CounselStat />} />
        <Route path="/stt/qnaStt" element={<QnaStat />} />
        <Route path="/stt/srvyStt" element={<SurveyStat />} />

        {/* 다운로드 메뉴 */}
        <Route path="/dwn/manual" element={<PrdGuide />} />
        <Route path="/dwn/cleanup" element={<CleanUp />} />
        <Route path="/dwn/manual/:id" element={<PrdGuideDetail />} />
        <Route path="/dwn/cleanup/:id" element={<CleanUpDetail />} />

        {/* 회원 메뉴 */}
        <Route path="/mem/list" element={<MemberList />} />
        <Route path="/mem/list/:id" element={<MemberDetail />} />
        <Route path="/mem/exw" element={<ExW />} />
        <Route path="/mem/role" element={<Role />} />
        <Route path="/mem/role/:id" element={<RoleDetail />} />

        {/* 카테고리 메뉴 */}
        <Route path="/ctgr/prd" element={<Prd />} />
        <Route path="/ctgr/qna" element={<Qna />} />
        <Route path="/ctgr/faq" element={<FaqCtgr />} />

        {/* 커스텀 메뉴 */}
        <Route path="/cstmz/bnr" element={<Banner />} />
        <Route path="/cstmz/bnr/:id" element={<BannerDetail />} />
        <Route path="/cstmz/video" element={<Video />} />
        <Route path="/cstmz/video/:id" element={<VideoDetail />} />
        <Route path="/cstmz/terms" element={<Terms />} />
        <Route path="/cstmz/terms/:id" element={<TermsDetail />} />
        <Route path="/cstmz/family" element={<Family />} />
        <Route path="/cstmz/family/:id" element={<FamilySiteDetail />} />

        {/* 이벤트 메뉴 */}
        <Route path="/evnt/list" element={<EventList />} />
        <Route path="/evnt/list/:id" element={<EventDetail />} />
        <Route path="/evnt/winner" element={<EventWin />} />
        <Route path="/evnt/winner/:id" element={<EventWinDetail />} />
      </Routes>
    </AdminRoutesContainer>
  );
};

export default AdminRoutes;
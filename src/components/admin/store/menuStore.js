import { create } from 'zustand';

/* 관리자 메뉴 스토어 */
const useMenuStore = create((set) => ({
  subMenus: {
    Service: [
      { name: '온라인상담', path: '/mng/svc/onCns', subMenus: [
        { name: '온라인 상세', path: '/mng/svc/onCns/:id' }
      ] },
      { name: '인덕션 설치요청', path: '/mng/svc/indct', subMenus: [
        { name: '인덕션 상세', path: '/mng/svc/indct/:id' }
      ] },
      { name: '1:1고객상담', path: '/mng/svc/qna',subMenus: [
        { name: '1:1 상세', path: '/mng/svc/qna/:id' }
      ] }, 
      { name: 'FAQ', path: '/mng/svc/faq', subMenus: [
        { name: 'FAQ 상세', path: '/mng/svc/faq/:id' }
      ] },
      { name: '공지사항', path: '/mng/svc/ntc', subMenus: [
        { name: '공지사항 상세', path: '/mng/svc/ntc/:id' }
      ] },
      { name: '센터리스트', path: '/mng/svc/cntLst', subMenus: [
        { name: '센터리스트 상세', path: '/mng/svc/cntLst/:id' },
        { name: '신규 센터 등록', path: '/mng/svc/cntLst/new' }
      ] },
      { name: '설문조사', path: '/mng/svc/srvy', subMenus: [
        { name: 'URL 발행', path: '/mng/svc/srvy/new' },
        { name: '배치 URL 발행', path: '/mng/svc/srvy/batch' },
        { name: '설문 내용 등록', path: '/mng/svc/srvy/add' }
      ] }
    ],
    Statistic: [
      { name: '온라인상담_통계', path: '/mng/stt/onCnsStt' },
      { name: '1:1고객상담_통계', path: '/mng/stt/qnaStt' },
      { name: '설문조사_통계', path: '/mng/stt/srvyStt' }
    ],
    Download: [
      { name: '제품사용설명서', path: '/mng/dwn/manual', subMenus: [
        { name: '제품사용설명서 상세', path: '/mng/dwn/manual/:id' }
      ] },
      { name: '청소기 청소요령', path: '/mng/dwn/cleanup', subMenus: [
        { name: '청소기 청소요령 상세', path: '/mng/dwn/cleanup/:id' }
      ] },
    ],
    Member: [
      { name: '회원 리스트', path: '/mng/mem/list', subMenus: [
        { name: '회원 상세', path: '/mng/mem/list/:id' }
      ] },
      { name: 'ExW', path: '/mng/mem/exw', subMenus: [
        { name: 'ExW 상세', path: '/mng/mem/exw/:id' }
      ] },
      { name: '권한관리', path: '/mng/mem/role', subMenus: [
        { name: '권한관리 상세', path: '/mng/mem/role/:id' }
      ] }
    ],
    Category: [
      { name: '제품', path: '/mng/ctgr/prd' },
      { name: '1:1 문의', path: '/mng/ctgr/qna' },
      { name: 'FAQ', path: '/mng/ctgr/faq' }
    ],
    Customize: [
      { name: '배너', path: '/mng/cstmz/bnr', subMenus: [
        { name: '배너 상세', path: '/mng/cstmz/bnr/:id' }
      ] },
      { name: '동영상', path: '/mng/cstmz/video', subMenus: [
        { name: '동영상 상세', path: '/mng/cstmz/video/:id' }
      ] },
      { name: '약관', path: '/mng/cstmz/terms', subMenus: [
        { name: '약관 상세', path: '/mng/cstmz/terms/:id' }
      ] },
      { name: '패밀리 사이트', path: '/mng/cstmz/family', subMenus: [
        { name: '패밀리 사이트 상세', path: '/mng/cstmz/family/:id' }
      ] }
    ],
    Event: [
      { name: '이벤트 리스트', path: '/mng/evnt/list', subMenus: [
        { name: '이벤트 상세', path: '/mng/evnt/list/:id' }
      ] },
      { name: '이벤트 당첨자', path: '/mng/evnt/winner', subMenus: [
        { name: '이벤트 당첨자 상세', path: '/mng/evnt/winner/:id' }
      ] }
    ]
  },
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
  getCurrentMenu: (path) => {
    const menuKeys = Object.keys(useMenuStore.getState().subMenus);
    for (const menuKey of menuKeys) {
      const subMenus = useMenuStore.getState().subMenus[menuKey];
      if (subMenus.some(subMenu => path.startsWith(subMenu.path))) {
        return menuKey;
      }
    }
    return 'Dashboard'; // 기본값
  },
  setCurrentMenuByPath: (path) => {
    const currentMenu = useMenuStore.getState().getCurrentMenu(path);
    set({ selectedMenu: currentMenu });
  },
  getDetailMenu: (path) => {
    const menuKeys = Object.keys(useMenuStore.getState().subMenus);
    for (const menuKey of menuKeys) {
      const subMenus = useMenuStore.getState().subMenus[menuKey];
      for (const subMenu of subMenus) {
        if (subMenu.path === path) {
          return subMenu; 
        }
      }
    }
  },
  getDetailMenuByPath: (path) => {
    const detailMenu = useMenuStore.getState().getDetailMenu(path);
    set({ selectedMenu: detailMenu });
  }
}));

export default useMenuStore; 
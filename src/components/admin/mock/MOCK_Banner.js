// 배너 목업 데이터
let MOCK_DATA = [
  {
    id: 1,
    key: '1',
    tab: 'main',
    subTab: 'home',
    title: '무선청소기 신제품 출시',
    imageUrl: '/images/banners/wireless_cleaner.jpg',
    linkUrl: '/products/cleaners/wireless',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    status: 'active',
    order: 1,
    createdAt: '2023-09-15',
    updatedAt: '2023-09-15'
  },
  {
    id: 2,
    key: '2',
    tab: 'main',
    subTab: 'home',
    title: '블랙프라이데이 세일',
    imageUrl: '/images/banners/black_friday.jpg',
    linkUrl: '/events/black-friday',
    startDate: '2023-11-15',
    endDate: '2023-11-30',
    status: 'active',
    order: 2,
    createdAt: '2023-10-20',
    updatedAt: '2023-10-20'
  },
  {
    id: 3,
    key: '3',
    tab: 'main',
    subTab: 'home',
    title: '겨울맞이 공기청정기 할인',
    imageUrl: '/images/banners/air_purifier.jpg',
    linkUrl: '/products/air-purifiers',
    startDate: '2023-12-01',
    endDate: '2024-01-31',
    status: 'scheduled',
    order: 3,
    createdAt: '2023-11-10',
    updatedAt: '2023-11-10'
  },
  {
    id: 4,
    key: '4',
    tab: 'main',
    subTab: 'product',
    title: '스마트 인덕션',
    imageUrl: '/images/banners/induction.jpg',
    linkUrl: '/products/kitchen/induction',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    status: 'active',
    order: 1,
    createdAt: '2023-09-20',
    updatedAt: '2023-09-20'
  },
  {
    id: 5,
    key: '5',
    tab: 'main',
    subTab: 'product',
    title: '프리미엄 냉장고',
    imageUrl: '/images/banners/refrigerator.jpg',
    linkUrl: '/products/kitchen/refrigerator',
    startDate: '2023-11-01',
    endDate: '2024-01-31',
    status: 'active',
    order: 2,
    createdAt: '2023-10-15',
    updatedAt: '2023-10-15'
  },
  {
    id: 6,
    key: '6',
    tab: 'sub',
    subTab: 'cleaners',
    title: '스틱청소기 베스트셀러',
    imageUrl: '/images/banners/stick_cleaner.jpg',
    linkUrl: '/products/cleaners/stick',
    startDate: '2023-09-01',
    endDate: '2023-12-31',
    status: 'active',
    order: 1,
    createdAt: '2023-08-20',
    updatedAt: '2023-08-20'
  },
  {
    id: 7,
    key: '7',
    tab: 'sub',
    subTab: 'cleaners',
    title: '로봇청소기 특별 할인',
    imageUrl: '/images/banners/robot_cleaner.jpg',
    linkUrl: '/products/cleaners/robot',
    startDate: '2023-10-15',
    endDate: '2023-12-15',
    status: 'active',
    order: 2,
    createdAt: '2023-09-30',
    updatedAt: '2023-09-30'
  },
  {
    id: 8,
    key: '8',
    tab: 'sub',
    subTab: 'kitchen',
    title: '식기세척기 연말 할인',
    imageUrl: '/images/banners/dishwasher.jpg',
    linkUrl: '/products/kitchen/dishwasher',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    status: 'scheduled',
    order: 1,
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15'
  },
  {
    id: 9,
    key: '9',
    tab: 'sub',
    subTab: 'living',
    title: '공기청정기 특가',
    imageUrl: '/images/banners/air_purifier_sale.jpg',
    linkUrl: '/products/living/air-purifier',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    status: 'active',
    order: 1,
    createdAt: '2023-10-20',
    updatedAt: '2023-10-20'
  },
  {
    id: 10,
    key: '10',
    tab: 'event',
    subTab: 'promotion',
    title: '신규 회원 10% 할인',
    imageUrl: '/images/banners/new_member.jpg',
    linkUrl: '/events/new-member',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'active',
    order: 1,
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01'
  }
];

// 목록 탭 정보
export const TAB_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'main', label: '메인' },
  { value: 'sub', label: '서브' },
  { value: 'event', label: '이벤트' }
];

// 서브 탭 정보
export const SUBTAB_OPTIONS = {
  main: [
    { value: 'all', label: '전체' },
    { value: 'home', label: '홈' },
    { value: 'product', label: '제품' },
    { value: 'event', label: '이벤트' }
  ],
  sub: [
    { value: 'all', label: '전체' },
    { value: 'cleaners', label: '청소기' },
    { value: 'kitchen', label: '주방가전' },
    { value: 'living', label: '생활가전' }
  ],
  event: [
    { value: 'all', label: '전체' },
    { value: 'promotion', label: '프로모션' },
    { value: 'seasonal', label: '시즌' }
  ]
};

// 상태 옵션
export const STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '활성화' },
  { value: 'inactive', label: '비활성화' },
  { value: 'scheduled', label: '예약됨' },
  { value: 'expired', label: '만료됨' }
];

// 전체 배너 데이터 가져오기
export const getBanners = () => {
  return [...MOCK_DATA];
};

// 배너 검색 함수
export const searchBanners = (data, params) => {
  const { searchType, searchValue, status, tab, subTab } = params;
  
  return data.filter(item => {
    // 탭 필터링
    if (tab && tab !== 'all' && item.tab !== tab) {
      return false;
    }
    
    // 서브 탭 필터링
    if (subTab && subTab !== 'all' && item.subTab !== subTab) {
      return false;
    }
    
    // 상태 필터링
    if (status && status !== 'all' && item.status !== status) {
      return false;
    }
    
    // 검색어 필터링
    if (searchValue && searchType !== 'all') {
      if (searchType === 'title') {
        return item.title.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchType === 'id') {
        return item.id.toString() === searchValue;
      }
    } else if (searchValue) {
      // 전체 검색
      return (
        item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.id.toString() === searchValue
      );
    }
    
    return true;
  });
};

// 배너 추가
export const addBanner = (bannerData) => {
  const newId = Math.max(...MOCK_DATA.map(item => item.id)) + 1;
  const newBanner = {
    id: newId,
    key: newId.toString(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    ...bannerData
  };
  
  MOCK_DATA.push(newBanner);
  return [...MOCK_DATA];
};

// 배너 수정
export const updateBanner = (id, bannerData) => {
  const index = MOCK_DATA.findIndex(item => item.id === id);
  if (index !== -1) {
    MOCK_DATA[index] = {
      ...MOCK_DATA[index],
      ...bannerData,
      updatedAt: new Date().toISOString().split('T')[0]
    };
  }
  return [...MOCK_DATA];
};

// 배너 삭제
export const deleteBanner = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
  return [...MOCK_DATA];
};

// 배너 상태 변경
export const updateBannerStatus = (id, status) => {
  return updateBanner(id, { status });
};

// 배너 순서 변경
export const updateBannerOrder = (id, order) => {
  return updateBanner(id, { order });
};

export default MOCK_DATA; 
// 배너 목업 데이터
let MOCK_DATA = [
  {
    id: 1,
    key: '1',
    tab: 'main',
    title: '무선청소기 신제품 출시',
    status: 'active', // 'active'(노출) 또는 'inactive'(미노출)
    pcImageUrl: '/images/banners/pc/wireless_cleaner.jpg',
    mobileImageUrl: '/images/banners/mobile/wireless_cleaner.jpg',
    linkUrl: '/products/cleaners/wireless',
    linkTarget: '_self', // '_self' 또는 '_blank'
    createdAt: '2023-09-15'
  },
  {
    id: 2,
    key: '2',
    tab: 'main',
    title: '블랙프라이데이 세일',
    status: 'active',
    pcImageUrl: '/images/banners/pc/black_friday.jpg',
    mobileImageUrl: '/images/banners/mobile/black_friday.jpg',
    linkUrl: '/events/black-friday',
    linkTarget: '_blank',
    createdAt: '2023-10-20'
  },
  {
    id: 3,
    key: '3',
    tab: 'main',
    title: '겨울맞이 공기청정기 할인',
    status: 'inactive',
    pcImageUrl: '/images/banners/pc/air_purifier.jpg',
    mobileImageUrl: '/images/banners/mobile/air_purifier.jpg',
    linkUrl: '/products/air-purifiers',
    linkTarget: '_self',
    createdAt: '2023-11-10'
  },
  {
    id: 4,
    key: '4',
    tab: 'main',
    title: '스마트 인덕션',
    status: 'active',
    pcImageUrl: '/images/banners/pc/induction.jpg',
    mobileImageUrl: '/images/banners/mobile/induction.jpg',
    linkUrl: '/products/kitchen/induction',
    linkTarget: '_self',
    createdAt: '2023-09-20'
  },
  {
    id: 5,
    key: '5',
    tab: 'main',
    title: '프리미엄 냉장고',
    status: 'active',
    pcImageUrl: '/images/banners/pc/refrigerator.jpg',
    mobileImageUrl: '/images/banners/mobile/refrigerator.jpg',
    linkUrl: '/products/kitchen/refrigerator',
    linkTarget: '_blank',
    createdAt: '2023-10-15'
  },
  {
    id: 6,
    key: '6',
    tab: 'sub',
    title: '스틱청소기 베스트셀러',
    status: 'active',
    pcImageUrl: '/images/banners/pc/stick_cleaner.jpg',
    mobileImageUrl: '/images/banners/mobile/stick_cleaner.jpg',
    linkUrl: '/products/cleaners/stick',
    linkTarget: '_self',
    createdAt: '2023-08-20'
  },
  {
    id: 7,
    key: '7',
    tab: 'sub',
    title: '로봇청소기 특별 할인',
    status: 'active',
    pcImageUrl: '/images/banners/pc/robot_cleaner.jpg',
    mobileImageUrl: '/images/banners/mobile/robot_cleaner.jpg',
    linkUrl: '/products/cleaners/robot',
    linkTarget: '_blank',
    createdAt: '2023-09-30'
  },
  {
    id: 8,
    key: '8',
    tab: 'sub',
    title: '식기세척기 연말 할인',
    status: 'inactive',
    pcImageUrl: '/images/banners/pc/dishwasher.jpg',
    mobileImageUrl: '/images/banners/mobile/dishwasher.jpg',
    linkUrl: '/products/kitchen/dishwasher',
    linkTarget: '_self',
    createdAt: '2023-11-15'
  },
  {
    id: 9,
    key: '9',
    tab: 'sub',
    title: '공기청정기 특가',
    status: 'active',
    pcImageUrl: '/images/banners/pc/air_purifier_sale.jpg',
    mobileImageUrl: '/images/banners/mobile/air_purifier_sale.jpg',
    linkUrl: '/products/living/air-purifier',
    linkTarget: '_blank',
    createdAt: '2023-10-20'
  }
];

// 목록 탭 정보
export const TAB_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'main', label: '메인' },
  { value: 'sub', label: '서브' }
];

// 상태 옵션
export const STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '노출' },
  { value: 'inactive', label: '미노출' }
];

// 링크 타켓 옵션
export const LINK_TARGET_OPTIONS = [
  { value: '_self', label: '현재 창' },
  { value: '_blank', label: '새 창' }
];

// 전체 배너 데이터 가져오기
export const getBanners = () => {
  return [...MOCK_DATA];
};

// Mock 데이터 가져오기 함수
export const getMockData = () => {
  return [...MOCK_DATA];
};

// 배너 검색 함수
export const searchBanners = (data, params) => {
  const { searchType, searchValue, status, tab } = params;
  
  return data.filter(item => {
    // 탭 필터링
    if (tab && tab !== 'all' && item.tab !== tab) {
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
      ...bannerData
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
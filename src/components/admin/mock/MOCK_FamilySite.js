// 패밀리 사이트 모의 데이터
let MOCK_DATA = [
  {
    id: 1,
    name: 'AEG',
    link: 'https://www.aeg.co.kr',
    status: 'active',
    registDate: '2023-03-15'
  },
  {
    id: 2,
    name: 'Electrolux Global',
    link: 'https://www.electrolux.com/global',
    status: 'active',
    registDate: '2023-03-15'
  },
  {
    id: 3,
    name: 'Electrolux Hong Kong',
    link: 'https://www.electrolux.com.hk',
    status: 'active',
    registDate: '2023-03-15'
  },
  {
    id: 4,
    name: 'Electrolux Japan',
    link: 'https://www.electrolux.co.jp',
    status: 'inactive',
    registDate: '2023-03-15'
  },
  {
    id: 5,
    name: 'Electrolux Singapore',
    link: 'https://www.electrolux.com.sg',
    status: 'active',
    registDate: '2023-03-15'
  }
];

// 상태 옵션 정의
export const STATUS_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '활성', value: 'active' },
  { label: '비활성', value: 'inactive' }
];

// 전체 데이터 가져오기
export const getMockData = () => MOCK_DATA;

// ID로 데이터 가져오기
export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
};

// 패밀리 사이트 추가
export const addMockData = (data) => {
  const newId = MOCK_DATA.length + 1;
  MOCK_DATA.push({ id: newId, ...data });
};

// 패밀리 사이트 업데이트
export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => item.id === id ? { ...item, ...data } : item);
};

// 패밀리 사이트 삭제
export const deleteFamilySite = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export default MOCK_DATA; 
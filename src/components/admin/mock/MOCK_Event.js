// 이벤트 데이터 모델
// id: 고유번호
// title: 이벤트명(제목)
// content: 내용
// startDate: 시작일
// endDate: 종료일
// displayStartDate: 표시기간 시작일
// displayEndDate: 표시기간 종료일
// bannerImage: 배너 이미지 경로
// link: 이벤트 링크
// createdAt: 작성일

let mockData = [
  {
    id: 1,
    title: '신제품 출시 기념 이벤트',
    content: '<p>신제품 출시를 기념하여 다양한 혜택을 드립니다.</p>',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    displayStartDate: '2024-06-25',
    displayEndDate: '2024-08-05',
    bannerImage: '/images/events/event_banner_1.jpg',
    link: 'https://www.electrolux.co.kr/event/launch2024',
    createdAt: '2024-06-20'
  },
  {
    id: 2,
    title: '여름맞이 특별 프로모션',
    content: '<p>여름맞이 특별 프로모션을 진행합니다. 많은 참여 부탁드립니다.</p>',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    displayStartDate: '2024-07-25',
    displayEndDate: '2024-09-05',
    bannerImage: '/images/events/event_banner_2.jpg',
    link: 'https://www.electrolux.co.kr/event/summer2024',
    createdAt: '2024-07-15'
  },
  {
    id: 3,
    title: '가을맞이 인기상품 할인 이벤트',
    content: '<p>가을을 맞아 인기 상품을 특별 할인가에 제공합니다.</p>',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    displayStartDate: '2024-08-25',
    displayEndDate: '2024-10-05',
    bannerImage: '/images/events/event_banner_3.jpg',
    link: 'https://www.electrolux.co.kr/event/fall2024',
    createdAt: '2024-08-15'
  },
  {
    id: 4,
    title: '블랙프라이데이 특별 할인',
    content: '<p>블랙프라이데이를 맞아 전 제품 특별 할인을 진행합니다.</p>',
    startDate: '2024-11-25',
    endDate: '2024-12-05',
    displayStartDate: '2024-11-20',
    displayEndDate: '2024-12-10',
    bannerImage: '/images/events/event_banner_4.jpg',
    link: 'https://www.electrolux.co.kr/event/blackfriday2024',
    createdAt: '2024-11-10'
  },
  {
    id: 5,
    title: '연말 감사 이벤트',
    content: '<p>한 해 동안 보내주신 성원에 감사드리며 특별한 혜택을 드립니다.</p>',
    startDate: '2024-12-15',
    endDate: '2024-12-31',
    displayStartDate: '2024-12-10',
    displayEndDate: '2025-01-05',
    bannerImage: '/images/events/event_banner_5.jpg',
    link: 'https://www.electrolux.co.kr/event/yearend2024',
    createdAt: '2024-12-01'
  }
];

// 전체 데이터 조회
export const getMockData = () => {
  return [...mockData];
};

// 데이터 추가
export const addMockData = (newData) => {
  const maxId = mockData.reduce((max, item) => Math.max(max, item.id), 0);
  const newId = maxId + 1;
  const newItem = { ...newData, id: newId };
  mockData = [...mockData, newItem];
  return newItem;
};

// 데이터 수정
export const updateMockData = (id, updatedData) => {
  mockData = mockData.map(item => 
    item.id === id ? { ...item, ...updatedData } : item
  );
  return mockData.find(item => item.id === id);
};

// 데이터 삭제
export const deleteMockData = (id) => {
  mockData = mockData.filter(item => item.id !== id);
  return mockData;
};

// 개별 데이터 조회
export const getItemById = (id) => {
  return mockData.find(item => item.id === parseInt(id));
}; 
// 이벤트 당첨자 데이터 모델
// id: 고유번호
// title: 이벤트명(제목)
// content: 내용(당첨자 발표)
// startDate: 시작일
// endDate: 종료일
// winnerDate: 당첨자 발표일
// createdAt: 작성일

let mockData = [
  {
    id: 1,
    title: '신제품 출시 기념 이벤트 당첨자 발표',
    content: '<p>신제품 출시 기념 이벤트에 참여해주신 모든 분들께 감사드립니다.<br/>아래와 같이 당첨자를 발표합니다.</p><ul><li>홍길동 (010-****-1234)</li><li>김철수 (010-****-5678)</li><li>이영희 (010-****-9012)</li></ul>',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    winnerDate: '2024-08-05',
    createdAt: '2024-08-05'
  },
  {
    id: 2,
    title: '여름맞이 특별 프로모션 당첨자 발표',
    content: '<p>여름맞이 특별 프로모션에 참여해주신 모든 분들께 감사드립니다.<br/>아래와 같이 당첨자를 발표합니다.</p><ul><li>박지성 (010-****-3456)</li><li>손흥민 (010-****-7890)</li><li>황의조 (010-****-1234)</li></ul>',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    winnerDate: '2024-09-05',
    createdAt: '2024-09-05'
  },
  {
    id: 3,
    title: '가을맞이 인기상품 할인 이벤트 당첨자 발표',
    content: '<p>가을맞이 인기상품 할인 이벤트에 참여해주신 모든 분들께 감사드립니다.<br/>아래와 같이 당첨자를 발표합니다.</p><ul><li>김연아 (010-****-5678)</li><li>이상화 (010-****-9012)</li><li>박태환 (010-****-3456)</li></ul>',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    winnerDate: '2024-10-05',
    createdAt: '2024-10-05'
  },
  {
    id: 4,
    title: '블랙프라이데이 특별 할인 당첨자 발표',
    content: '<p>블랙프라이데이 특별 할인 이벤트에 참여해주신 모든 분들께 감사드립니다.<br/>아래와 같이 당첨자를 발표합니다.</p><ul><li>정우성 (010-****-7890)</li><li>전지현 (010-****-1234)</li><li>송강호 (010-****-5678)</li></ul>',
    startDate: '2024-11-25',
    endDate: '2024-12-05',
    winnerDate: '2024-12-10',
    createdAt: '2024-12-10'
  },
  {
    id: 5,
    title: '연말 감사 이벤트 당첨자 발표',
    content: '<p>연말 감사 이벤트에 참여해주신 모든 분들께 감사드립니다.<br/>아래와 같이 당첨자를 발표합니다.</p><ul><li>유재석 (010-****-9012)</li><li>강호동 (010-****-3456)</li><li>신동엽 (010-****-7890)</li></ul>',
    startDate: '2024-12-15',
    endDate: '2024-12-31',
    winnerDate: '2025-01-05',
    createdAt: '2025-01-05'
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
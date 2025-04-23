let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "createdAt": "2025-03-20",
    "status": "completed",
    "consumerNm": "홍길동",
    "phone": "010-1234-5678",
    "store": "코스트코 OO",
    "buyAt": "2025-03-20",
    "modelNm": "NXNAN10",
    "installAt": "2025-03-20",
    "installNm": "김설치",
    "installNum": "010-1234-5678",
    "installAddress": "서울특별시 강남구 테헤란로 14길 6 남도빌딩 4층",
    "request": "설치 희망일 변경",
    "kitchenType": "빌트인",
  },
  {
    "id": 2,
    "key": "2",
    "createdAt": "2025-03-20",
    "status": "pending",
    "consumerNm": "홍길동",
    "phone": "010-1234-5678",
    "store": "코스트코 OO",
    "buyAt": "2025-05-20",
    "modelNm": "NXNAN10",
    "installAt": "2025-05-20",
    "installNm": "김설치",
    "installNum": "010-1234-5678",
    "installAddress": "서울특별시 강남구 테헤란로 14길 6 남도빌딩 4층",
    "request": "설치 희망일 변경",
    "kitchenType": "빌트인",
  },
];

export const updateMockData = (id, updates) => {
  MOCK_DATA = MOCK_DATA.map(item => 
    item.id === id ? { ...item, ...updates } : item
  );
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const getMockData = () => MOCK_DATA;


export default MOCK_DATA;
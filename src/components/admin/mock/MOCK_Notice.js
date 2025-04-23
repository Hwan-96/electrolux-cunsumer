let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "status": "show",
    "title": "일렉트로룩스 코리아 2025년 프리미엄 브랜드 대상 서비스브랜드(서비스센터)부문",
    "file": "/vite.svg",
    "fileStatus": true,
    "createdAt": "2024-03-20",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    "id": 2,
    "key": "2",
    "status": "hide",
    "title": "일렉트로룩스 카카오톡 사칭 계정 주의 안내",
    "file": null,
    "fileStatus": false,
    "createdAt": "2024-03-20",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
];

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
};

export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => item.id === id ? { ...item, ...data } : item);
};

export const addMockData = (data) => {
  const newId = Math.max(...MOCK_DATA.map(item => item.id), 0) + 1;
  const newItem = {
    id: newId,
    key: newId.toString(),
    ...data
  };
  MOCK_DATA = [...MOCK_DATA, newItem];
  return newId;
};

export default MOCK_DATA;
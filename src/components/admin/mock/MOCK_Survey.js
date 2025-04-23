let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "state": "pending",
    "rcpNum": "1591",
    "center": "강남센터",
    "model": "모델1",
    "date": "2024-01-01 ~ 2024-01-02",
    "consumer": "홍길동",
    "phone": "010-1234-5678",
    "url": "https://www.google.com"
  },
  {
    "id": 2,
    "key": "2",
    "state": "completed",
    "rcpNum": "3624",
    "center": "강남센터",
    "model": "모델2",
    "date": "2024-01-01 ~ 2024-01-02",
    "consumer": "홍길동",
    "phone": "010-5844-1752",
    "url": "https://www.google.com"
  },
  {
    "id": 3,
    "key": "3",
    "state": "unavailable",
    "rcpNum": "3624",
    "center": "강남센터",
    "model": "모델2",
    "date": "2024-01-01 ~ 2024-01-02",
    "consumer": "홍길동",
    "phone": "010-5844-1752",
    "url": "https://www.google.com"
  },
  {
    "id": 4,
    "key": "4",
    "state": "closed",
    "rcpNum": "3624",
    "center": "강남센터",
    "model": "모델2",
    "date": "2024-01-01 ~ 2024-01-02",
    "consumer": "홍길동",
    "phone": "010-5844-1752",
    "url": "https://www.google.com"
  },
];

export let Mock_Survey_Content = [
  {
    "id": 1,
    "key": "1",
    "title": "NPS",
    "startScore": 1,
    "maxScore": 5,
  },
  {
    "id": 2,
    "key": "2",
    "title": "CES",
    "startScore": 1,
    "maxScore": 5,
  }
]

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
let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "status": "completed",
    "email": "test@test.com",
    "ctgr1": "서비스",
    "ctgr2": "수리/고장",
    "ctgr3": "작동이 안됩니다",
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "스틱청소기",
    "modelCtgr3": "UltraPower",
    "modelCtgr4": "ZB5021",
    "consumerNm": "홍길동",
    "phone": "010-1234-5678",
    "createdAt": "2024-03-20",
    "answerAt": "2024-03-20",
    "content": "작동이 안되는 경우 전원을 끄고 다시 켜보세요. 또는 전원 코드를 확인해주세요."
  },
  {
    "id": 2,
    "key": "2",
    "status": "pending",
    "ctgr1": "소모품관련",
    "ctgr2": "결제",
    "ctgr3": "결제는 어떻게 하나요?",
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "스틱청소기",
    "modelCtgr3": "UltraPower",
    "modelCtgr4": "ZB5021",
    "consumerNm": "김길",
    "phone": "010-1234-5678",
    "createdAt": "2024-03-20",
    "answerAt": "2024-03-20",
    "content": "결제는 카드 또는 현금으로 가능합니다."
  },
];

export const getMockData = () => {
  return MOCK_DATA;
};

export const updateMockData = (id, updates) => {
  MOCK_DATA = MOCK_DATA.map(item => item.id === id ? { ...item, ...updates } : item);
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export default MOCK_DATA;
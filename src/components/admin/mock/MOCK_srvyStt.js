let MOCK_DATA = [
  {
    "id": 1,
    "createdAt": "2025-04-21",
    "receiptNum": "GC202504210001",
    "center": "PCS ONE KOREA",
    "model": "ZB12051",
    "consumer":"박영의",
    "phone": "010-1235-1235",
    "stat": "10",
    "etc": "응대 및 수리가 좋네요."
  },
  {
    "id": 2,
    "createdAt": "2025-02-11",
    "receiptNum": "GC202502110002",
    "center": "PCS ONE KOREA",
    "model": "ZB12051",
    "consumer":"김군",
    "phone": "010-1235-1235",
    "stat": "10",
    "etc": "AS 센터 위치를 모르겠음."
  },
]

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};
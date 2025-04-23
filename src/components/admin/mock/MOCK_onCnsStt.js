let MOCK_DATA = [
  {
    "id": 1,
    "receiptAt": "2025-04-21",
    "receipt": "123",
    "w12h": "11",
    "w24h": "11",
    "a24h":"11",
    "sum": "11",
    "unprocess": "11"
  },
  {
    "id": 2,
    "receiptAt": "2025-04-21",
    "receipt": "141",
    "w12h": "11",
    "w24h": "11",
    "a24h":"11",
    "sum": "11",
    "unprocess": "11"
  },
]

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};
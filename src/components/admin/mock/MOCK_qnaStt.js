let MOCK_DATA = [
  {
    "id": 1,
    "receiptAt": "2025-04-21",
    "receipt": "789",
    "w12h": "5",
    "w24h": "124",
    "a24h":"12",
    "sum": "5",
    "unprocess": "12"
  },
  {
    "id": 2,
    "receiptAt": "2025-04-21",
    "receipt": "141",
    "w12h": "9",
    "w24h": "141",
    "a24h":"161",
    "sum": "711",
    "unprocess": "11" 
  },
]

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};
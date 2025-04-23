let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "스틱청소기",
    "modelCtgr3": "ErgioRapido",
    "modelCtgr4": "ZB21",
    "title": "마스터9 사용설명서",
    "fileStatus": true,
    "createdAt": "2025-04-20",
    "filePath": "/123123.pdf"
  },
  {
    "id": 2,
    "key": "2",
    "modelCtgr1": "AEG",
    "modelCtgr2": "진공청소기",
    "modelCtgr3": "75Tornado",
    "modelCtgr4": "AO4009",
    "title": "AO4009 사용설명서",
    "fileStatus": false,
    "createdAt": "2025-03-20",
    "filePath": null
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

export const addMockData = (data) => {
  const newId = MOCK_DATA.length + 1;
  MOCK_DATA.push({ id: newId, ...data });
};

export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
};

export default MOCK_DATA;
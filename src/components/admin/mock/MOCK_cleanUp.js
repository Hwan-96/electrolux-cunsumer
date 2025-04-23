let MOCK_DATA = [
  {
    "id": 1,
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "스틱청소기",
    "modelCtgr3": "Well Q6",
    "modelCtgr4": "EFP91835",
    "title": "스틱청소기 필터 청소 방법",
    "fileStatus": true,
    "createdAt": "2025-04-21",
    "filePath": "/uploads/documents/stick_cleaner_filter_EFP91835.pdf"
  },
  {
    "id": 2,
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "진공청소기",
    "modelCtgr3": "Pure C9",
    "modelCtgr4": "PC91-4MG",
    "title": "진공청소기 먼지통 비우기",
    "fileStatus": true,
    "createdAt": "2025-04-15",
    "filePath": "/uploads/documents/vacuum_cleaner_dustbin_PC91-4MG.pdf"
  },
  {
    "id": 3,
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "로봇청소기",
    "modelCtgr3": "Pure i9.2",
    "modelCtgr4": "PI92-4ANM",
    "title": "로봇청소기 센서 청소 방법",
    "fileStatus": true,
    "createdAt": "2025-04-10",
    "filePath": "/uploads/documents/robot_cleaner_sensor_PI92-4ANM.pdf"
  },
  {
    "id": 4,
    "modelCtgr1": "AEG",
    "modelCtgr2": "세탁기",
    "modelCtgr3": "L8FEC68K",
    "modelCtgr4": "L8FEC68K",
    "title": "세탁기 필터 청소 가이드",
    "fileStatus": true,
    "createdAt": "2025-04-05",
    "filePath": "/uploads/documents/washing_machine_filter_L8FEC68K.pdf"
  },
  {
    "id": 5,
    "modelCtgr1": "AEG",
    "modelCtgr2": "건조기",
    "modelCtgr3": "T8DEC68K",
    "modelCtgr4": "T8DEC68K",
    "title": "건조기 먼지 필터 관리법",
    "fileStatus": true,
    "createdAt": "2025-03-28",
    "filePath": "/uploads/documents/dryer_lint_filter_T8DEC68K.pdf"
  },
  {
    "id": 6,
    "modelCtgr1": "Electrolux",
    "modelCtgr2": "에어프라이어",
    "modelCtgr3": "Create 5",
    "modelCtgr4": "E5AF1-4ST",
    "title": "에어프라이어 세척 방법",
    "fileStatus": false,
    "createdAt": "2025-03-20",
    "filePath": ""
  }
];

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => item.id === id ? { ...item, ...data } : item);
};

export const addMockData = (data) => {
  const newId = MOCK_DATA.length + 1;
  MOCK_DATA.push({ id: newId, ...data });
};

export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
};

export default MOCK_DATA; 
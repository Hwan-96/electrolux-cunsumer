let MOCK_DATA = [
  {
    "id": 1,
    "key": "1",
    "region": "부산광역시",
    "city": "연제구",
    "centerNm": "일렉트로룩스 북부산센터",
    "centerAddr": "[ 47520 ] 부산 연제구 반송로 33 (연산동, 샤르망라이프) 4층 402호",
    "centerTel": "0505-306-1238",
    "url": "https://pok.co.kr/center/centermap.aspx?asc=BD",
  },
  {
    "id": 2,
    "key": "2",
    "region": "경기도",
    "city": "김포시",
    "centerNm": "위니아에이드 김포센터",
    "centerAddr": "[ 10090 ] 경기 김포시 태장로 789 (장기동) 금광하이테크시티 326호",
    "centerTel": "1566-1588",
    "url": "https://www.winiaaid.com/support/service/detail/216",
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

export const updateMockData = (id, data) => {
  const index = MOCK_DATA.findIndex(item => item.id === id);
  if (index !== -1) {
    MOCK_DATA[index] = { ...MOCK_DATA[index], ...data };
  }
};

export const getMockDataByRegion = (region) => {
  return MOCK_DATA.filter(item => item.region === region);
};

export const getMockDataByCity = (city) => {
  return MOCK_DATA.filter(item => item.city === city);
};

export const getMockDataByRegionAndCity = (region, city) => {
  return MOCK_DATA.filter(item => item.region === region && item.city === city);
};

export const getMockDataByRegionAndCityAndCenterNm = (region, city, centerNm) => {
  return MOCK_DATA.filter(item => item.region === region && item.city === city && item.centerNm === centerNm);
};

export const getMockDataByRegionAndCityAndCenterAddr = (region, city, centerAddr) => {
  return MOCK_DATA.filter(item => item.region === region && item.city === city && item.centerAddr === centerAddr);
};

export const getMockDataByRegionAndCityAndCenterTel = (region, city, centerTel) => {
  return MOCK_DATA.filter(item => item.region === region && item.city === city && item.centerTel === centerTel);
};

export default MOCK_DATA;
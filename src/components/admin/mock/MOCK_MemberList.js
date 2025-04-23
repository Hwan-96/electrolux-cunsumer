let MOCK_DATA = [
  {
    "id": 1,
    "memTp": 'U',
    "memId": '1234567890',
    "memNm": '홍길동',
    "memTel": '01012345678',
    "memEmail": 'hong@gmail.com',
    "memJoinDate": '2021-01-01',
    "memStatus": '웹회원 / 승인완료(2)',
    "memAddr": '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    "smsYn": 'Y',
    "emailYn": 'Y',
    "birth": '1990-01-01',
    "gender": '남자',
    "marriage": '미혼',
    "childYn": 'N',
    "buyPrd": '브랜드 > 제품군 > 제품명 > 제품모델',
    "PrdSid": '12345678',
    "buyDate": '2021년 8월',
    "buyStore": '신세계백화점 / 강남점'
  },
  {
    "id": 2,
    "memTp": 'N',
    "memId": '1234567890',
    "memNm": '홍길동',
    "memTel": '01012345678',
    "memEmail": 'hong@gmail.com',
    "memJoinDate": '2021-01-01',
    "memStatus": '웹회원 / 승인완료(2)',
    "memAddr": '서울특별시 강남구 테헤란로 14길 6 남도빌딩 2층',
    "smsYn": 'Y',
    "emailYn": 'Y',
    "birth": '1990-01-01',
    "gender": '남자',
    "marriage": '미혼',
    "childYn": 'N',
    "buyPrd": '브랜드 > 제품군 > 제품명 > 제품모델',
    "PrdSid": '12345678',
    "buyDate": '2021년 8월',
    "buyStore": '신세계백화점 / 강남점' 
  }
];

export const getMockData = () => {
  return MOCK_DATA;
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
};

export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => {
    if (item.id === id) {
      return { ...item, ...data };
    }
    return item;
  });
};

export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
};

export const addMockData = (data) => {
  MOCK_DATA.push(data);
};




// FAQ 카테고리 목록을 저장하는 객체
let MOCK_DATA = [
  "통합",
  "무선청소기",
  "유선청소기", 
  "로봇청소기", 
  "생활가전", 
  "주방가전", 
  "식기세척기", 
  "인덕션"
];

// 카테고리 목록 가져오기
export const getCategories = () => {
  return MOCK_DATA;
};

// 카테고리 추가
export const addCategory = (category) => {
  if (!MOCK_DATA.includes(category)) {
    MOCK_DATA.push(category);
    return true;
  }
  return false;
};

// 카테고리 삭제
export const deleteCategory = (category) => {
  const index = MOCK_DATA.indexOf(category);
  if (index !== -1) {
    MOCK_DATA.splice(index, 1);
    return true;
  }
  return false;
};

// 카테고리 이름 변경
export const renameCategory = (oldName, newName) => {
  const index = MOCK_DATA.indexOf(oldName);
  if (index !== -1) {
    MOCK_DATA[index] = newName;
    return true;
  }
  return false;
};

// 카테고리 순서 변경
export const reorderCategories = (newOrder) => {
  MOCK_DATA = newOrder;
  return true;
};

// 전체 데이터 가져오기
export const getMockData = () => {
  return MOCK_DATA;
};

export default MOCK_DATA; 
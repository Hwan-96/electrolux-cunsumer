let MOCK_DATA = {
  // 1단계 카테고리
  서비스: {
    // 2단계 서브 카테고리
    "수리/고장": [
      "작동이 안됩니다",
      "이런 현상은 어떻게 해야 되나요?"
    ],
    "수리비용": [
      "수리비용 견적 문의"
    ],
    "보증기간": [
      "보증기간 확인 방법"
    ],
    "사용방법": [
      "에어프라이어 사용법"
    ],
    "서비스센터": [
      "서비스센터 위치 문의"
    ],
    "A/S신청": [
      "A/S 신청 방법 문의"
    ],
    "기타": [
      "무상점검 서비스 가능한가요?"
    ]
  },
  소모품관련: {
    "청소기 필터": [
      "청소기 필터 교체 주기"
    ]
  },
  사이트이용관련: {
    "회원 관리": [
      "회원 정보 수정 방법"
    ]
  }
};

// 1단계 카테고리 가져오기
export const getCategories = () => {
  return Object.keys(MOCK_DATA);
};

// 2단계 서브 카테고리 가져오기
export const getSubCategories = (category) => {
  if (MOCK_DATA[category]) {
    return Object.keys(MOCK_DATA[category]);
  }
  return [];
};

// 3단계 QNA 항목 가져오기
export const getQnaItems = (category, subCategory) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    return MOCK_DATA[category][subCategory];
  }
  return [];
};

// 카테고리 추가
export const addCategory = (category) => {
  if (!MOCK_DATA[category]) {
    MOCK_DATA[category] = {};
    return true;
  }
  return false;
};

// 서브 카테고리 추가
export const addSubCategory = (category, subCategory) => {
  if (MOCK_DATA[category] && !MOCK_DATA[category][subCategory]) {
    MOCK_DATA[category][subCategory] = [];
    return true;
  }
  return false;
};

// QNA 항목 추가
export const addQnaItem = (category, subCategory, qnaItem) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    if (!MOCK_DATA[category][subCategory].includes(qnaItem)) {
      MOCK_DATA[category][subCategory].push(qnaItem);
      return true;
    }
  }
  return false;
};

// 카테고리 삭제
export const deleteCategory = (category) => {
  if (MOCK_DATA[category]) {
    delete MOCK_DATA[category];
    return true;
  }
  return false;
};

// 서브 카테고리 삭제
export const deleteSubCategory = (category, subCategory) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    delete MOCK_DATA[category][subCategory];
    return true;
  }
  return false;
};

// QNA 항목 삭제
export const deleteQnaItem = (category, subCategory, qnaItem) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    const index = MOCK_DATA[category][subCategory].indexOf(qnaItem);
    if (index !== -1) {
      MOCK_DATA[category][subCategory].splice(index, 1);
      return true;
    }
  }
  return false;
};

// QNA 항목 이름 변경
export const renameQnaItem = (category, subCategory, oldName, newName) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    const index = MOCK_DATA[category][subCategory].indexOf(oldName);
    if (index !== -1) {
      MOCK_DATA[category][subCategory][index] = newName;
      return true;
    }
  }
  return false;
};

// QNA 항목 순서 변경
export const reorderQnaItems = (category, subCategory, newOrder) => {
  if (MOCK_DATA[category] && MOCK_DATA[category][subCategory]) {
    MOCK_DATA[category][subCategory] = newOrder;
    return true;
  }
  return false;
};

// 카테고리 순서 변경
export const reorderCategories = (newOrder) => {
  // 새로운 객체 생성
  const newData = {};
  
  // 새 순서대로 데이터 복사
  newOrder.forEach(category => {
    if (MOCK_DATA[category]) {
      newData[category] = MOCK_DATA[category];
    }
  });
  
  // 기존에 있지만 newOrder에 없는 카테고리도 유지
  Object.keys(MOCK_DATA).forEach(category => {
    if (!newOrder.includes(category)) {
      newData[category] = MOCK_DATA[category];
    }
  });
  
  MOCK_DATA = newData;
  return true;
};

// 서브 카테고리 순서 변경
export const reorderSubCategories = (category, newOrder) => {
  if (!MOCK_DATA[category]) return false;
  
  // 새로운 카테고리 객체 생성
  const newCategoryData = {};
  
  // 새 순서대로 데이터 복사
  newOrder.forEach(subCategory => {
    if (MOCK_DATA[category][subCategory]) {
      newCategoryData[subCategory] = MOCK_DATA[category][subCategory];
    }
  });
  
  // 기존에 있지만 newOrder에 없는 서브카테고리도 유지
  Object.keys(MOCK_DATA[category]).forEach(subCategory => {
    if (!newOrder.includes(subCategory)) {
      newCategoryData[subCategory] = MOCK_DATA[category][subCategory];
    }
  });
  
  MOCK_DATA[category] = newCategoryData;
  return true;
};

// 전체 데이터 가져오기
export const getMockData = () => {
  return MOCK_DATA;
};

export default MOCK_DATA; 
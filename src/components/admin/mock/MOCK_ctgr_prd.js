let MOCK_DATA = {
  // 1단계 브랜드
  Electrolux: {
    // 2단계 제품군
    스틱청소기: {
      // 3단계 제품명
      '1GO': ['ZB2951', 'ZB2952'],
      'ErgoRapido': ['ZB3311', 'ZB3314', 'ZB3411'],
      'UltraPower': ['ZB5022', 'ZB5023', 'ZB5024'],
      'UltraPower Pro': ['ZB5028', 'ZB5029', 'ZB5030'],
      'UniRapido': ['ZB2904', 'ZB2905', 'ZB2906']
    },
    진공청소기: {
      'Pure C9': ['PC91-4MG', 'PC91-6MG', 'PC91-8WG'],
      'Pure D9': ['PD91-4DB', 'PD91-6SB', 'PD91-8SSM'],
      'UltraOne': ['UO9321', 'UO9322', 'UO9323']
    },
    핸디청소기: {
      'Rapido': ['ZB6106', 'ZB6108', 'ZB6114'],
      'QuickCleaner': ['ZB5103', 'ZB5104', 'ZB5105']
    },
    로봇청소기: {
      'Pure i9': ['PI91-5SSM', 'PI91-6DG', 'PI91-8SSM'],
      'Pure i9.2': ['PI92-4ANM', 'PI92-6DGM', 'PI92-8STM']
    },
    공기청정기: {
      'Pure A9': ['PA91-406GY', 'PA91-606DG', 'PA91-606GY'],
      'Flow A3': ['FA31-202GY', 'FA31-202WH', 'FA31-402GY']
    },
    제습공기청정기: {
      'Pure A9 Dehumidifier': ['PA97-406DG', 'PA97-606GY', 'PA97-606WH']
    },
    인덕션홉: {
      'EIS6448': ['EIS6448-KIV', 'EIS6448-SLV'],
      'EIS8134': ['EIS8134-BLK', 'EIS8134-SLV']
    },
    식기세척기: {
      'ESF5512': ['ESF5512-SLV', 'ESF5512-WHT'],
      'ESF8735': ['ESF8735-RXG', 'ESF8735-SLV']
    },
    블렌더: {
      'Creative Collection': ['E7CB1-4GB', 'E7CB1-6GA', 'E7CB1-8GM'],
      'Masterpiece Collection': ['E7TB1-4GB', 'E7TB1-6GA', 'E7TB1-8GM']
    },
    핸드블렌더: {
      'Create 3': ['E3HB1-4GG', 'E3HB1-8GG'],
      'Create 5': ['E5HB1-4GG', 'E5HB1-6SS', 'E5HB1-8GG']
    },
    미니블렌더: {
      'Create 1': ['E1MB1-4GB', 'E1MB1-4GR'],
      'Create 2': ['E2MB1-6GB', 'E2MB1-6GR']
    },
    에어프라이어: {
      'Create 5': ['E5AF1-4GB', 'E5AF1-4ST'],
      'Create 7': ['E7AF1-6GB', 'E7AF1-6ST']
    },
    전자레인지: {
      'EMM20000': ['EMM20000-WH', 'EMM20000-BK'],
      'EMM30000': ['EMM30000-WH', 'EMM30000-SS']
    },
    전기주전자: {
      'EEWA3300': ['EEWA3300-BK', 'EEWA3300-RD', 'EEWA3300-WH'],
      'EEWA5300': ['EEWA5300-BK', 'EEWA5300-RD', 'EEWA5300-WH']
    },
    토스터: {
      'EAT3300': ['EAT3300-BK', 'EAT3300-RD', 'EAT3300-WH'],
      'EAT5300': ['EAT5300-BK', 'EAT5300-RD', 'EAT5300-WH']
    },
    냉장고: {
      'ESE5331': ['ESE5331-SLV', 'ESE5331-WHT'],
      'ESE6141': ['ESE6141-BLK', 'ESE6141-SLV']
    },
    오븐: {
      'EOB9956': ['EOB9956-BLK', 'EOB9956-SLV'],
      'EOC9956': ['EOC9956-BLK', 'EOC9956-SLV']
    },
    건조다리미: {
      'EDB6150': ['EDB6150-BK', 'EDB6150-WH'],
      'EDB8150': ['EDB8150-BL', 'EDB8150-PK']
    },
    스팀다리미: {
      'E8SI1-4WB': ['E8SI1-4WB', 'E8SI1-6WB'],
      'E9SI1-4WB': ['E9SI1-4WB', 'E9SI1-6WB']
    },
    커피메이커: {
      'EKF3300': ['EKF3300-BK', 'EKF3300-WH'],
      'EKF7800': ['EKF7800-BK', 'EKF7800-SS']
    },
    오븐토스터: {
      'EOT3000': ['EOT3000-BK', 'EOT3000-WH'],
      'EOT5000': ['EOT5000-BK', 'EOT5000-SS']
    },
    세탁기: {
      'EWF8025': ['EWF8025-SLV', 'EWF8025-WHT'],
      'EWF9025': ['EWF9025-SLV', 'EWF9025-WHT']
    },
    에스프레소머신: {
      'EEA111': ['EEA111-BK', 'EEA111-SLV'],
      'EEA250': ['EEA250-BK', 'EEA250-SLV']
    },
    와인셀러: {
      'ERW0670A': ['ERW0670A-BK', 'ERW0670A-SLV'],
      'ERW0870A': ['ERW0870A-BK', 'ERW0870A-SLV']
    },
    스팀청소기: {
      'ESC7000': ['ESC7000-BK', 'ESC7000-RD'],
      'ESC9000': ['ESC9000-BK', 'ESC9000-RD']
    },
    푸드프로세서: {
      'EFP7000': ['EFP7000-BK', 'EFP7000-SLV'],
      'EFP9000': ['EFP9000-BK', 'EFP9000-SLV']
    }
  },
  AEG: {
    스틱청소기: {
      'CX7': ['CX7-2-45AN', 'CX7-2-45IW', 'CX7-2-45BM'],
      'FX9': ['FX9-1-IBM', 'FX9-1-MBM', 'FX9-1-SBM'],
      'QX9': ['QX9-1-ANIM', 'QX9-1-ALRG', 'QX9-1-ULTI']
    },
    진공청소기: {
      'VX9': ['VX9-4-8IBM', 'VX9-4-CB-P', 'VX9-4-INDG'],
      'VX8': ['VX8-2-OKO', 'VX8-4-CR-A', 'VX8-4-PSP']
    },
    인덕션홉: {
      'HK854220XB': ['HK854220XB'],
      'IKE85471FB': ['IKE85471FB']
    },
    식기세척기: {
      'FSE62800P': ['FSE62800P'],
      'FFB83806PM': ['FFB83806PM']
    },
    오븐: {
      'BPE742320M': ['BPE742320M'],
      'BPE842720M': ['BPE842720M']
    },
    전자레인지: {
      'MBE2658S-M': ['MBE2658S-M'],
      'MBE2658D-M': ['MBE2658D-M']
    },
    세탁기: {
      'L7FE7461BI': ['L7FE7461BI'],
      'L8FE7661BI': ['L8FE7661BI']
    },
    전기주전자: {
      'EWA7800': ['EWA7800-U', 'EWA7800-S'],
      'EWA7700': ['EWA7700-B', 'EWA7700-W']
    },
    토스터: {
      'AT7800': ['AT7800-U', 'AT7800-B'],
      'AT7700': ['AT7700-B', 'AT7700-W']
    },
    커피메이커: {
      'KF7800': ['KF7800-U', 'KF7800-B'],
      'KF7700': ['KF7700-B', 'KF7700-W']
    },
    에스프레소머신: {
      'LM7000': ['LM7000-S', 'LM7000-B'],
      'LM8000': ['LM8000-S', 'LM8000-B']
    },
    와인셀러: {
      'SWE63001DG': ['SWE63001DG'],
      'SWE66001DG': ['SWE66001DG']
    },
    냉장고: {
      'RCB73831TY': ['RCB73831TY'],
      'RCB73121TY': ['RCB73121TY']
    }
  }
};

// 전체 데이터 가져오기
export const getMockData = () => {
  return MOCK_DATA;
};

// 브랜드 목록 가져오기
export const getBrands = () => {
  return Object.keys(MOCK_DATA);
};

// 특정 브랜드의 제품군 목록 가져오기
export const getProductGroups = (brand) => {
  if (MOCK_DATA[brand]) {
    return Object.keys(MOCK_DATA[brand]);
  }
  return [];
};

// 특정 브랜드와 제품군의 제품명 목록 가져오기
export const getProductNames = (brand, productGroup) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup]) {
    return Object.keys(MOCK_DATA[brand][productGroup]);
  }
  return [];
};

// 특정 브랜드, 제품군, 제품명의 모델명 목록 가져오기
export const getModelNumbers = (brand, productGroup, productName) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup] && MOCK_DATA[brand][productGroup][productName]) {
    return MOCK_DATA[brand][productGroup][productName];
  }
  return [];
};

// 특정 모델 확인하기
export const checkModelExists = (brand, productGroup, productName, modelNumber) => {
  const models = getModelNumbers(brand, productGroup, productName);
  return models.includes(modelNumber);
};

// 브랜드 추가
export const addBrand = (brand) => {
  if (!MOCK_DATA[brand]) {
    MOCK_DATA[brand] = {};
    return true;
  }
  return false;
};

// 제품군 추가
export const addProductGroup = (brand, productGroup) => {
  if (MOCK_DATA[brand] && !MOCK_DATA[brand][productGroup]) {
    MOCK_DATA[brand][productGroup] = {};
    return true;
  }
  return false;
};

// 제품명 추가
export const addProductName = (brand, productGroup, productName) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup] && !MOCK_DATA[brand][productGroup][productName]) {
    MOCK_DATA[brand][productGroup][productName] = [];
    return true;
  }
  return false;
};

// 모델명 추가
export const addModelNumber = (brand, productGroup, productName, modelNumber) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup] && MOCK_DATA[brand][productGroup][productName]) {
    if (!MOCK_DATA[brand][productGroup][productName].includes(modelNumber)) {
      MOCK_DATA[brand][productGroup][productName].push(modelNumber);
      return true;
    }
  }
  return false;
};

// 브랜드 삭제
export const deleteBrand = (brand) => {
  if (MOCK_DATA[brand]) {
    delete MOCK_DATA[brand];
    return true;
  }
  return false;
};

// 제품군 삭제
export const deleteProductGroup = (brand, productGroup) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup]) {
    delete MOCK_DATA[brand][productGroup];
    return true;
  }
  return false;
};

// 제품명 삭제
export const deleteProductName = (brand, productGroup, productName) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup] && MOCK_DATA[brand][productGroup][productName]) {
    delete MOCK_DATA[brand][productGroup][productName];
    return true;
  }
  return false;
};

// 모델명 삭제
export const deleteModelNumber = (brand, productGroup, productName, modelNumber) => {
  if (MOCK_DATA[brand] && MOCK_DATA[brand][productGroup] && MOCK_DATA[brand][productGroup][productName]) {
    const index = MOCK_DATA[brand][productGroup][productName].indexOf(modelNumber);
    if (index !== -1) {
      MOCK_DATA[brand][productGroup][productName].splice(index, 1);
      return true;
    }
  }
  return false;
};

// 브랜드 순서 변경
export const reorderBrands = (newOrder) => {
  // 새로운 객체 생성
  const newData = {};
  
  // 새 순서대로 데이터 복사
  newOrder.forEach(brand => {
    if (MOCK_DATA[brand]) {
      newData[brand] = MOCK_DATA[brand];
    }
  });
  
  // 기존에 있지만 newOrder에 없는 브랜드도 유지
  Object.keys(MOCK_DATA).forEach(brand => {
    if (!newOrder.includes(brand)) {
      newData[brand] = MOCK_DATA[brand];
    }
  });
  
  MOCK_DATA = newData;
  return true;
};

// 제품군 순서 변경
export const reorderProductGroups = (brand, newOrder) => {
  if (!MOCK_DATA[brand]) return false;
  
  // 새로운 브랜드 객체 생성
  const newBrandData = {};
  
  // 새 순서대로 데이터 복사
  newOrder.forEach(productGroup => {
    if (MOCK_DATA[brand][productGroup]) {
      newBrandData[productGroup] = MOCK_DATA[brand][productGroup];
    }
  });
  
  // 기존에 있지만 newOrder에 없는 제품군도 유지
  Object.keys(MOCK_DATA[brand]).forEach(productGroup => {
    if (!newOrder.includes(productGroup)) {
      newBrandData[productGroup] = MOCK_DATA[brand][productGroup];
    }
  });
  
  MOCK_DATA[brand] = newBrandData;
  return true;
};

// 제품명 순서 변경
export const reorderProductNames = (brand, productGroup, newOrder) => {
  if (!MOCK_DATA[brand] || !MOCK_DATA[brand][productGroup]) return false;
  
  // 새로운 제품군 객체 생성
  const newGroupData = {};
  
  // 새 순서대로 데이터 복사
  newOrder.forEach(productName => {
    if (MOCK_DATA[brand][productGroup][productName]) {
      newGroupData[productName] = MOCK_DATA[brand][productGroup][productName];
    }
  });
  
  // 기존에 있지만 newOrder에 없는 제품명도 유지
  Object.keys(MOCK_DATA[brand][productGroup]).forEach(productName => {
    if (!newOrder.includes(productName)) {
      newGroupData[productName] = MOCK_DATA[brand][productGroup][productName];
    }
  });
  
  MOCK_DATA[brand][productGroup] = newGroupData;
  return true;
};

// 모델명 순서 변경
export const reorderModelNumbers = (brand, productGroup, productName, newOrder) => {
  if (!MOCK_DATA[brand] || !MOCK_DATA[brand][productGroup] || !MOCK_DATA[brand][productGroup][productName]) {
    return false;
  }
  
  MOCK_DATA[brand][productGroup][productName] = newOrder;
  return true;
};

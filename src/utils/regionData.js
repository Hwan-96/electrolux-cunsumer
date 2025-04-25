import sidosigunguData from '@/utils/sidosigungu_202504.json';

// 광역시/도 데이터 - sidosigungu_202504.json에서 추출
export const regionData = [
  { value: '광역시/도', label: '광역시/도' },
  ...sidosigunguData.map(item => ({
    value: item.sido,
    label: item.sido
  }))
];

// 시군구 데이터 - sidosigungu_202504.json에서 추출
export const cityData = sidosigunguData.reduce((acc, item) => {
  acc[item.sido] = item.sigungu.map(sigungu => ({
    value: sigungu,
    label: sigungu
  }));
  return acc;
}, {});

// 지역 선택에 따른 시군구 데이터 반환 함수
export const getCitiesByRegion = (region) => {
  return cityData[region] || [];
};

// 모든 지역 데이터 반환
export const getAllRegions = () => {
  return sidosigunguData.map(item => item.sido);
};

// 특정 지역의 모든 시군구 데이터 반환
export const getAllCitiesByRegion = (region) => {
  const foundRegion = sidosigunguData.find(item => item.sido === region);
  return foundRegion ? foundRegion.sigungu : [];
};

// 관리자용 지역 옵션 (전체 포함)
export const getAdminRegionOptions = () => {
  return [
    { value: 'all', label: '전체' },
    ...sidosigunguData.map(item => ({
      value: item.sido,
      label: item.sido
    }))
  ];
};

// 관리자용 시군구 옵션 (전체 포함)
export const getAdminCityOptions = (region) => {
  if (region === 'all') {
    return [{ value: 'all', label: '전체' }];
  }
  
  const foundRegion = sidosigunguData.find(item => item.sido === region);
  if (!foundRegion) return [{ value: 'all', label: '전체' }];
  
  return [
    { value: 'all', label: '전체' },
    ...foundRegion.sigungu.map(sigungu => ({
      value: sigungu,
      label: sigungu
    }))
  ];
}; 
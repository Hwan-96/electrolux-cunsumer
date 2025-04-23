import { create } from 'zustand';
import sidosigunguData from '@/utils/sidosigungu_202504.json';

// JSON 데이터 형식 변환
const transformRegionData = () => {
  const transformedData = {};
  
  sidosigunguData.forEach(item => {
    const sido = item.sido;
    
    // sigungu 배열을 { value, label } 형태로 변환
    const sigunguOptions = item.sigungu.map(sigungu => ({
      value: sigungu,
      label: sigungu
    }));
    
    transformedData[sido] = sigunguOptions;
  });
  
  return transformedData;
};

const useRegionStore = create((set) => ({
  // sidosigungu_202504.json 데이터 활용
  regionData: transformRegionData(),

  // 현재 선택된 지역
  selectedRegion: 'all',
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  // 현재 선택된 시군구
  selectedCity: 'all',
  setSelectedCity: (city) => set({ selectedCity: city }),

  // 시군구 옵션 가져오기
  getCityOptions: (region) => {
    const { regionData } = useRegionStore.getState();
    return region === 'all' ? [] : regionData[region] || [];
  },

  // 지역 옵션 가져오기
  getRegionOptions: () => {
    const { regionData } = useRegionStore.getState();
    return [
      { value: 'all', label: '전체' },
      ...Object.keys(regionData)
        .map(key => ({ value: key, label: key }))
    ];
  },

  // 시군구 셀렉트 박스 활성화 여부 확인
  isCitySelectDisabled: (region) => {
    return region === 'all';
  }
}));

export default useRegionStore;

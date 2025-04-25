import { create } from 'zustand';
import { getAdminRegionOptions, getAdminCityOptions } from '@/utils/regionData';

const useRegionStore = create((set) => ({
  // 현재 선택된 지역
  selectedRegion: 'all',
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  // 현재 선택된 시군구
  selectedCity: 'all',
  setSelectedCity: (city) => set({ selectedCity: city }),

  // 시군구 옵션 가져오기 - regionData 유틸리티 사용
  getCityOptions: (region) => {
    return getAdminCityOptions(region);
  },

  // 지역 옵션 가져오기 - regionData 유틸리티 사용
  getRegionOptions: () => {
    return getAdminRegionOptions();
  },

  // 시군구 셀렉트 박스 활성화 여부 확인
  isCitySelectDisabled: (region) => {
    return region === 'all';
  }
}));

export default useRegionStore;

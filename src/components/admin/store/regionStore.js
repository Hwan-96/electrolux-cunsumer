import { create } from 'zustand';
import { axiosInstance } from '@/utils/api';

const useRegionStore = create((set) => ({
  // 현재 선택된 지역
  selectedRegion: 'all',
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  // 현재 선택된 시군구
  selectedCity: 'all',
  setSelectedCity: (city) => set({ selectedCity: city }),

  // 시군구 옵션 가져오기
  getCityOptions: async (region) => {
    try {
      const response = await axiosInstance.get(`/regions/${region}/cities`);
      return [
        { value: 'all', label: '전체' },
        ...response.data
      ];
    } catch (err) {
      console.error('시군구 목록 조회 실패:', err);
      return [{ value: 'all', label: '전체' }];
    }
  },

  // 지역 옵션 가져오기
  getRegionOptions: async () => {
    try {
      const response = await axiosInstance.get('/regions');
      return [
        { value: 'all', label: '전체' },
        ...response.data
      ];
    } catch (err) {
      console.error('지역 목록 조회 실패:', err);
      return [{ value: 'all', label: '전체' }];
    }
  },

  // 시군구 셀렉트 박스 활성화 여부 확인
  isCitySelectDisabled: (region) => {
    return region === 'all';
  }
}));

export default useRegionStore;

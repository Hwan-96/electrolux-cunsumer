import { create } from 'zustand';
import apiService from '@/utils/api';

const useNoticeStore = create((set) => ({
  notices: [],
  currentNotice: null,
  loading: false,
  error: null,

  // 공지사항 목록 가져오기
  fetchNotices: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/notices');
      set({ notices: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 공지사항 상세 가져오기
  fetchNoticeDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get(`/notices/${id}`);
      set({ currentNotice: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 공지사항 검색
  searchNotices: async (keyword) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/notices/search', {
        params: { keyword }
      });
      set({ notices: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // 상태 초기화
  reset: () => {
    set({ notices: [], currentNotice: null, loading: false, error: null });
  }
}));

export default useNoticeStore; 
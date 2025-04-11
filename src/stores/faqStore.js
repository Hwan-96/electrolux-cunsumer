import { create } from 'zustand';
import apiService from '@/utils/api';

const useFaqStore = create((set) => ({
  // FAQ 목록 상태
  faqs: [],
  loading: false,
  error: null,

  // FAQ 목록 가져오기
  getFaqList: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/faq');
      set({ faqs: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // FAQ 검색
  searchFaqs: async (keyword) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/faq/search', { params: { keyword } });
      set({ faqs: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // FAQ 카테고리별 필터링
  filterFaqsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/faq/category', { params: { category } });
      set({ faqs: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // FAQ 상태 초기화
  resetFaqs: () => {
    set({ faqs: [], error: null });
  }
}));

export default useFaqStore; 
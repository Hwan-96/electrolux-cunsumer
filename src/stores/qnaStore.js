import { create } from 'zustand';
import apiService from '@/utils/api';
import { sanitizeObject } from '@/utils/security';

const useQnaStore = create((set) => ({
  qnas: [],
  currentQna: null,
  loading: false,
  error: null,
  formData: {
    title: '',
    content: '',
    category: '',
    attachments: []
  },

  // QnA 목록 가져오기
  fetchQnas: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/qna');
      set({ qnas: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // QnA 상세 가져오기
  fetchQnaDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get(`/qna/${id}`);
      set({ currentQna: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // QnA 작성
  createQna: async (formData) => {
    set({ loading: true, error: null });
    try {
      // XSS 방지를 위해 입력 데이터 sanitize
      const sanitizedData = sanitizeObject(formData);
      const response = await apiService.post('/qna', sanitizedData);
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // QnA 수정
  updateQna: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const sanitizedData = sanitizeObject(formData);
      const response = await apiService.put(`/qna/${id}`, sanitizedData);
      set({ loading: false });
      return { success: true, data: response.data };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // QnA 삭제
  deleteQna: async (id) => {
    set({ loading: true, error: null });
    try {
      await apiService.delete(`/qna/${id}`);
      set({ loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.message, loading: false });
      return { success: false, message: error.message };
    }
  },

  // 폼 데이터 업데이트
  updateFormData: (field, value) => {
    set(state => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    }));
  },

  // 폼 데이터 초기화
  resetFormData: () => {
    set({
      formData: {
        title: '',
        content: '',
        category: '',
        attachments: []
      }
    });
  },

  // 상태 초기화
  reset: () => {
    set({
      qnas: [],
      currentQna: null,
      loading: false,
      error: null,
      formData: {
        title: '',
        content: '',
        category: '',
        attachments: []
      }
    });
  }
}));

export default useQnaStore; 
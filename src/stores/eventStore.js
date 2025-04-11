import { create } from 'zustand';
import apiService from '@/utils/api';

const useEventStore = create((set) => ({
  // 이벤트 목록 상태
  events: [],
  currentEvent: null,
  loading: false,
  error: null,

  // 이벤트 목록 가져오기
  getEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get('/events');
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 특정 이벤트 가져오기
  getEventById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await apiService.get(`/events/${id}`);
      set({ currentEvent: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 이벤트 참여
  participateEvent: async (eventId, userId) => {
    set({ loading: true, error: null });
    try {
      await apiService.post(`/events/${eventId}/participate`, { userId });
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 이벤트 상태 초기화
  resetEvent: () => {
    set({ currentEvent: null, error: null });
  }
}));

export default useEventStore; 
import { create } from 'zustand';
import { getMockData } from '@/components/admin/mock/MOCK_FAQ';
import { faqSearch } from '@/components/admin/utils/search/faqSearch';

// 관리자 데이터 형식을 프론트엔드 형식으로 변환하는 함수
const transformFaqData = (faqItem) => {
  return {
    id: faqItem.id,
    productType: faqItem.ctgr,
    question: faqItem.q,
    answer: faqItem.a,
    view: faqItem.view || 0
  };
};

const useFaqStore = create((set) => ({
  // FAQ 목록 상태
  faqs: [],
  loading: false,
  error: null,

  // FAQ 목록 가져오기 (관리자 데이터 사용)
  getFaqList: async () => {
    set({ loading: true, error: null });
    try {
      // 관리자 MOCK_FAQ.js 데이터 사용
      const adminFaqData = getMockData();
      
      // 관리자 데이터 형식을 프론트엔드 형식으로 변환
      const transformedData = adminFaqData.map(transformFaqData);
      
      set({ faqs: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // FAQ 검색 (관리자 faqSearch 유틸리티 사용)
  searchFaqs: async (keyword) => {
    set({ loading: true, error: null });
    try {
      // 관리자 MOCK_FAQ.js 데이터 사용
      const adminFaqData = getMockData();
      
      // 관리자 검색 유틸리티 사용
      const searchResults = faqSearch(adminFaqData, {
        searchType: 'all',
        searchValue: keyword
      });
      
      // 검색 결과를 프론트엔드 형식으로 변환
      const transformedData = searchResults.map(transformFaqData);
      
      set({ faqs: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // FAQ 카테고리별 필터링 (관리자 데이터 사용)
  filterFaqsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      let filteredData = [];
      
      if (category === '통합') {
        // 전체 데이터 가져오기
        filteredData = getMockData();
      } else {
        // 카테고리 필터링
        filteredData = getMockData().filter(item => item.ctgr === category);
      }
      
      // 필터링 결과를 프론트엔드 형식으로 변환
      const transformedData = filteredData.map(transformFaqData);
      
      set({ faqs: transformedData, loading: false });
      return transformedData;
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
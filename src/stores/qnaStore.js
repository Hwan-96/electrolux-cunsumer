import { create } from 'zustand';
import { getMockData } from '@/components/admin/mock/MOCK_Counseling';
import { counselingSearch } from '@/components/admin/utils/search/counselingSearch';

// 관리자 데이터 형식을 프론트엔드 형식으로 변환하는 함수
const transformCounselingData = (counselingItem) => {
  return {
    id: counselingItem.id,
    title: counselingItem.ctgr3 || '문의합니다',
    author: counselingItem.consumerNm || '고객',
    authorId: counselingItem.email ? counselingItem.email.split('@')[0] : 'user' + counselingItem.id,
    date: counselingItem.createdAt || '2024-01-01',
    answered: counselingItem.status === 'completed',
    content: counselingItem.content || '문의 내용입니다',
    model: `${counselingItem.modelCtgr1 || ''} > ${counselingItem.modelCtgr2 || ''} > ${counselingItem.modelCtgr3 || ''} > ${counselingItem.modelCtgr4 || ''}`,
    reply: counselingItem.answer || null,
    phone: counselingItem.phone || ''
  };
};

const useQnaStore = create((set) => ({
  // QNA 목록 상태
  qnaList: [],
  loading: false,
  error: null,
  currentQna: null,

  // QNA 목록 가져오기 (관리자 데이터 사용)
  getQnaList: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      // 관리자 MOCK_Counseling.js 데이터 사용
      const adminQnaData = getMockData();
      
      // 검색 파라미터가 있으면 필터링
      let filteredData = adminQnaData;
      
      if (params.searchType && params.searchValue) {
        filteredData = counselingSearch(adminQnaData, {
          searchType: params.searchType,
          searchValue: params.searchValue,
          category1: 'all',
          category2: 'all',
          category3: 'all'
        });
      }
      
      // 페이지네이션 적용
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      // 관리자 데이터 형식을 프론트엔드 형식으로 변환
      const transformedData = paginatedData.map(transformCounselingData);
      
      // 메타데이터 생성
      const meta = {
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
      
      set({ 
        qnaList: transformedData, 
        meta,
        loading: false 
      });
      
      return { data: transformedData, meta };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // QNA 상세 조회
  getQnaDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      // 관리자 MOCK_Counseling.js 데이터에서 해당 ID 찾기
      const adminQnaData = getMockData();
      const qnaItem = adminQnaData.find(item => item.id === parseInt(id));
      
      if (!qnaItem) {
        throw new Error('문의 내용을 찾을 수 없습니다.');
      }
      
      // 데이터 형식 변환
      const transformedData = transformCounselingData(qnaItem);
      
      set({ currentQna: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // QNA 등록
  addQna: async (qnaData) => {
    set({ loading: true, error: null });
    try {
      // 실제 구현 시에는 API 호출
      console.log('QNA 등록 데이터:', qnaData);
      
      // 성공 메시지 반환
      set({ loading: false });
      return { success: true, message: '문의가 등록되었습니다.' };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // QNA 상태 초기화
  resetQna: () => {
    set({ qnaList: [], currentQna: null, error: null });
  }
}));

export default useQnaStore; 
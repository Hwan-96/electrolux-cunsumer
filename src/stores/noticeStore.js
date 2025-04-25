import { create } from 'zustand';
import { 
  getMockData, 
  updateMockData 
} from '@/components/admin/mock/MOCK_Notice';
import { noticeSearch } from '@/components/admin/utils/search/noticeSearch';

// 관리자 데이터 형식을 프론트엔드 형식으로 변환하는 함수
const transformNoticeData = (item) => {
  return {
    id: item.id,
    title: item.title,
    content: item.content,
    createdAt: item.date,
    views: item.views || 0,
    hasAttachment: item.fileStatus,
    files: item.files || [],
    status: item.status, // 노출여부 (show, hide)
    important: item.important || false // 중요공지 여부
  };
};

const useNoticeStore = create((set) => ({
  // 상태
  notices: [],
  currentNotice: null,
  loading: false,
  error: null,
  meta: { total: 0, page: 1, limit: 10, totalPages: 0 },

  // 공지사항 목록 조회
  getNoticeList: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터 사용
      const adminData = getMockData();
      
      // 필터링할 파라미터가 있는 경우
      let filteredData = adminData;
      
      if (params.searchType && params.searchKeyword) {
        filteredData = noticeSearch(adminData, {
          searchType: params.searchType === 'subject|contents' ? 'all' : params.searchType === 'subject' ? 'title' : 'content',
          searchValue: params.searchKeyword
        });
      }

      // 노출 상태 필터링 (프론트엔드에서는 'show' 상태인 공지만 표시)
      filteredData = filteredData.filter(item => item.status === 'show');
      
      // 페이지네이션 적용
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      // 데이터 형식 변환
      const transformedData = paginatedData.map(transformNoticeData);
      
      // 메타데이터 생성
      const meta = {
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
      
      set({ 
        notices: transformedData, 
        meta,
        loading: false 
      });
      
      return { data: transformedData, meta };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 공지사항 상세 조회
  getNoticeDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터에서 ID로 조회
      const adminData = getMockData();
      const item = adminData.find(item => item.id === parseInt(id));
      
      if (!item) {
        throw new Error('공지사항을 찾을 수 없습니다.');
      }
      
      // 노출 상태 체크 (프론트엔드에서는 'show' 상태인 공지만 표시)
      if (item.status !== 'show') {
        throw new Error('삭제되었거나 비공개 상태인 공지사항입니다.');
      }
      
      // 데이터 형식 변환
      const transformedData = transformNoticeData(item);
      
      // 조회수 증가 로직 추가 (실제 API에서는 백엔드에서 처리)
      updateMockData(item.id, { ...item, views: (item.views || 0) + 1 });
      transformedData.views += 1;
      
      set({ currentNotice: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // 상태 초기화
  resetNotice: () => {
    set({ 
      notices: [], 
      currentNotice: null,
      error: null
    });
  }
}));

export default useNoticeStore; 
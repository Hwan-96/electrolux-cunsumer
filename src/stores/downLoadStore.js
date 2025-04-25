import { create } from 'zustand';
import { getMockData as getMockPrdGuideData } from '@/components/admin/mock/MOCK_prdGuide';
import { getMockData as getMockCleanupData } from '@/components/admin/mock/MOCK_cleanUp';
import { prdGuideSearch } from '@/components/admin/utils/search/prdGuideSearch';
import { cleanUpSearch } from '@/components/admin/utils/search/cleanUpSearch';

// 관리자 데이터 형식을 프론트엔드 형식으로 변환하는 함수
const transformPrdGuideData = (item) => {
  return {
    id: item.id,
    brand: item.modelCtgr1,
    category: item.modelCtgr2,
    productName: item.modelCtgr3,
    modelName: item.modelCtgr4,
    title: item.title,
    content: item.content,
    createdAt: item.createdAt,
    hasFile: item.fileStatus,
    files: item.files || []
  };
};

// 관리자 데이터 형식을 프론트엔드 형식으로 변환하는 함수
const transformCleanupData = (item) => {
  return {
    id: item.id,
    brand: item.modelCtgr1,
    category: item.modelCtgr2,
    productName: item.modelCtgr3,
    modelName: item.modelCtgr4,
    title: item.title,
    content: item.content,
    createdAt: item.createdAt,
    hasFile: item.fileStatus,
    files: item.files || []
  };
};

const useDownloadStore = create((set) => ({
  // 제품 사용설명서 상태
  prdGuideList: [],
  currentPrdGuide: null,
  prdGuideMeta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  
  // 청소기 청소요령 상태
  cleanupList: [],
  currentCleanup: null,
  cleanupMeta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  
  // 공통 상태
  loading: false,
  error: null,
  
  // 제품 사용설명서 목록 조회
  getPrdGuideList: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터 사용
      const adminData = getMockPrdGuideData();
      
      // 필터링할 파라미터가 있는 경우
      let filteredData = adminData;
      
      if (
        params.brand || 
        params.category || 
        params.productName || 
        params.modelName || 
        params.searchText
      ) {
        filteredData = prdGuideSearch(adminData, {
          category1: params.brand || 'all',
          category2: params.category || 'all',
          category3: params.productName || 'all',
          category4: params.modelName || 'all',
          searchValue: params.searchText || ''
        });
      }
      
      // 페이지네이션 적용
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      // 데이터 형식 변환
      const transformedData = paginatedData.map(transformPrdGuideData);
      
      // 메타데이터 생성
      const meta = {
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
      
      set({ 
        prdGuideList: transformedData, 
        prdGuideMeta: meta,
        loading: false 
      });
      
      return { data: transformedData, meta };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // 제품 사용설명서 상세 조회
  getPrdGuideDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터에서 ID로 조회
      const adminData = getMockPrdGuideData();
      const item = adminData.find(item => item.id === parseInt(id));
      
      if (!item) {
        throw new Error('제품 사용설명서를 찾을 수 없습니다.');
      }
      
      // 데이터 형식 변환
      const transformedData = transformPrdGuideData(item);
      
      set({ currentPrdGuide: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // 청소기 청소요령 목록 조회
  getCleanupList: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터 사용
      const adminData = getMockCleanupData();
      
      // 필터링할 파라미터가 있는 경우
      let filteredData = adminData;
      
      if (
        params.brand || 
        params.category || 
        params.productName || 
        params.modelName || 
        params.searchText
      ) {
        filteredData = cleanUpSearch(adminData, {
          category1: params.brand || 'all',
          category2: params.category || 'all',
          category3: params.productName || 'all',
          category4: params.modelName || 'all',
          searchValue: params.searchText || ''
        });
      }
      
      // 페이지네이션 적용
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      // 데이터 형식 변환
      const transformedData = paginatedData.map(transformCleanupData);
      
      // 메타데이터 생성
      const meta = {
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
      
      set({ 
        cleanupList: transformedData, 
        cleanupMeta: meta,
        loading: false 
      });
      
      return { data: transformedData, meta };
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // 청소기 청소요령 상세 조회
  getCleanupDetail: async (id) => {
    set({ loading: true, error: null });
    try {
      // 관리자 데이터에서 ID로 조회
      const adminData = getMockCleanupData();
      const item = adminData.find(item => item.id === parseInt(id));
      
      if (!item) {
        throw new Error('청소기 청소요령을 찾을 수 없습니다.');
      }
      
      // 데이터 형식 변환
      const transformedData = transformCleanupData(item);
      
      set({ currentCleanup: transformedData, loading: false });
      return transformedData;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  
  // 상태 초기화
  resetDownload: () => {
    set({ 
      prdGuideList: [], 
      currentPrdGuide: null,
      cleanupList: [],
      currentCleanup: null,
      error: null
    });
  }
}));

export default useDownloadStore; 
import { create } from 'zustand';

// 모델 목록을 위한 목업 데이터
const modelMockData = [
  // 냉장고 카테고리
  { id: 1, category: '냉장고', modelName: 'LNC41242X - 냉장고 412L 콤비 무중력코스모' },
  { id: 2, category: '냉장고', modelName: 'LNT5MF36X2 - 냉장고 506L 양문형 이지워터' },
  { id: 3, category: '냉장고', modelName: 'LTD18VSD - 냉장고 180L 1등급 일반형 화이트' },
  { id: 4, category: '냉장고', modelName: 'ERB3DF78GS - 냉장고 4도어 미스트 올인원' },
  { id: 5, category: '냉장고', modelName: 'ERB3DG85KS - 냉장고 4도어 얼음정수기' },
  
  // 세탁기 카테고리
  { id: 6, category: '세탁기', modelName: 'EW6F4923GB - 전자동 세탁기 9kg 심플리퍼펙트' },
  { id: 7, category: '세탁기', modelName: 'EW7TDR742U - 건조기 7kg 심플 퍼펙트케어' },
  { id: 8, category: '세탁기', modelName: 'EWF1141SESA - 드럼 세탁기 11kg 올인원 케어' },
  { id: 9, category: '세탁기', modelName: 'EWW1141AEWA - 드럼세탁건조기 11kg/7kg 올인원' },
  { id: 10, category: '세탁기', modelName: 'TWD85TB88KR - 세탁건조기 펙티브 울티마케어' },
  
  // 청소기 카테고리
  { id: 11, category: '청소기', modelName: 'PURE Q9 - 무선 청소기 PQ91-3S' },
  { id: 12, category: '청소기', modelName: 'WELL Q7 - 무선 청소기 WQ71-1OG' },
  { id: 13, category: '청소기', modelName: '얼티밋홈 300 로봇청소기 PRO10KR' },
  { id: 14, category: '청소기', modelName: '얼티밋홈 700 진공청소기 ZUO9935' },
  { id: 15, category: '청소기', modelName: '얼티밋홈 800 스팀청소기 E8SI1-6LGM' },
  
  // 주방가전 카테고리
  { id: 16, category: '주방가전', modelName: 'E9KLTS1 - 토스터기 크리에이트7' },
  { id: 17, category: '주방가전', modelName: 'E9K1-6ST - 전기주전자 1.7L 크리에이트7' },
  { id: 18, category: '주방가전', modelName: '에어프라이어 모델 A - 크리에이트4' },
  { id: 19, category: '주방가전', modelName: '에어프라이어 모델 B - 크리에이트5' },
  { id: 20, category: '주방가전', modelName: 'E7CBE420 - 블렌더 1.5L 튜브 클래식' },
  
  // 인덕션 카테고리
  { id: 21, category: '인덕션', modelName: 'EIS64383 - 인덕션 빌트인 3구 플렉스브릿지' },
  { id: 22, category: '인덕션', modelName: 'EIS6648 - 인덕션 빌트인 4구 플렉스브릿지' },
  { id: 23, category: '인덕션', modelName: 'EIP8146 - 인덕션 빌트인 4구 퓨어플렉스' },
  { id: 24, category: '인덕션', modelName: 'EIH6349SK - 인덕션 테이블형 3구 프리스탠딩' },
  { id: 25, category: '인덕션', modelName: 'EHI3348SK - 하이브리드 3구 인덕션+하이라이트' },
  
  // 에어컨 카테고리
  { id: 26, category: '에어컨', modelName: 'E12EAHWP - 에어컨 벽걸이 냉방전용 12평형' },
  { id: 27, category: '에어컨', modelName: 'E16EAHWP - 에어컨 벽걸이 냉방전용 16평형' },
  { id: 28, category: '에어컨', modelName: 'DSPH-Q9M18AWKW - 에어컨 스탠드 냉방전용 18평형' },
  { id: 29, category: '에어컨', modelName: 'E30JOHWW - 에어컨 스탠드 냉난방 30평형' },
  { id: 30, category: '에어컨', modelName: 'E36JAHWW - 에어컨 스탠드 냉난방 36평형' }
];

const useModelStore = create((set, get) => ({
  models: modelMockData,
  searchKeyword: '',
  searchResults: [],
  
  // 모델 검색 함수
  searchModels: (keyword) => {
    const { models } = get();
    
    // 빈 키워드면 전체 목록 반환
    if (!keyword.trim()) {
      set({ searchResults: [...models], searchKeyword: keyword });
      return;
    }
    
    // 키워드로 필터링
    const results = models.filter(model => 
      model.modelName.toLowerCase().includes(keyword.toLowerCase()) ||
      model.category.toLowerCase().includes(keyword.toLowerCase())
    );
    
    set({ searchResults: results, searchKeyword: keyword });
  },
  
  // 모델 상세 정보 가져오기
  getModelById: (id) => {
    const { models } = get();
    return models.find(model => model.id === id);
  },
  
  // 카테고리별 모델 가져오기
  getModelsByCategory: (category) => {
    const { models } = get();
    return models.filter(model => model.category === category);
  },
  
  // 카테고리 목록 가져오기
  getCategories: () => {
    const { models } = get();
    const categories = [...new Set(models.map(model => model.category))];
    return categories;
  }
}));

export default useModelStore; 
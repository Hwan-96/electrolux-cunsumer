import { regionData, cityData } from './regionData';
import { centerAdmin } from './data';
import { getMockData, getMockDataByRegion, getMockDataByCity, getMockDataByRegionAndCity } from '@/components/admin/mock/MOCK_CenterList';

// 서비스 센터 더미 데이터 생성 (파일에서 센터 데이터 가져오기)
const mockServiceCenters = [...centerAdmin];

// QnA 목 데이터 생성
const mockQnaData = [
  {
    id: 16621,
    title: '테스트 사용자 1:1 문의입니다',
    author: '테스트사용자',
    authorId: 'test_user',
    date: '2025-03-01',
    answered: true,
    content: '테스트용 1:1 고객상담 문의입니다. 이 문의는 테스트 토큰으로만 접근 가능합니다.',
    model: 'Electrolux > 스틱청소기 > 얼티밋홈900 > EFP91835',
    reply: '안녕하세요. 테스트 사용자님, 문의 주셔서 감사합니다. 이 답변은 테스트 토큰으로 접근한 사용자에게만 보이는 답변입니다. 추가 문의사항이 있으시면 언제든지 문의해주세요.',
    isTestUserOnly: true,
    files: [
      {
        fileName: 'EFP91835_설명서.pdf',
        fileSize: '2.8MB'
      },
      {
        fileName: '청소기_사용방법.jpg',
        fileSize: '1.5MB'
      }
    ]
  },
  {
    id: 16620,
    title: '이런 현상은 어떻게 해야 되나요?',
    author: '남○직',
    authorId: 'user1',
    date: '2025-02-26',
    answered: false,
    content: '세탁기를 사용하는 중에 이상한 소리가 납니다. 어떻게 해야 할까요?',
    model: 'Electrolux > 드럼세탁기 > EW6FF12141SP',
    reply: '안녕하세요. 테스트 사용자님, 문의 주셔서 감사합니다. 이 답변은 테스트 토큰으로 접근한 사용자에게만 보이는 답변입니다. 추가 문의사항이 있으시면 언제든지 문의해주세요.',
    files: [
      {
        fileName: '소리녹음.mp3',
        fileSize: '1.2MB'
      }
    ]
  },
  {
    id: 16619,
    title: '이런 현상은 어떻게 해야 되나요?',
    author: '안○영',
    authorId: 'user2',
    date: '2025-02-26',
    answered: false,
    content: '냉장고 문이 잘 안 닫힙니다. 해결 방법을 알려주세요.',
    model: 'Electrolux > 냉장고 > ERB3DF89S',
    reply: null,
    files: []
  },
  {
    id: 16618,
    title: '가격이 어떻게 되나요?',
    author: '차○철',
    date: '2025-02-26',
    answered: false,
    authorId: 'user3',
    content: '인덕션 모델 IKE85651FB의 현재 판매 가격이 궁금합니다.',
    model: 'Electrolux > 인덕션 > IKE85651FB',
    reply: null,
    files: []
  },
  {
    id: 16617,
    title: '가격이 어떻게 되나요?',
    author: '차○철',
    date: '2025-02-26',
    answered: true,
    authorId: 'user3',
    content: '청소기 필터 교체 부품의 가격이 얼마인가요?',
    model: 'Electrolux > 청소기 > Z9000',
    reply: '안녕하세요. 문의하신 청소기 필터 교체 부품은 모델에 따라 가격이 다릅니다. 정확한 가격 안내를 위해 제품의 모델명을 알려주시면 도움드리겠습니다.',
    files: [
      {
        fileName: '필터부품가격표.pdf',
        fileSize: '512KB'
      }
    ]
  },
  {
    id: 16616,
    title: '구입방법알려주세요',
    author: '권○혁',
    date: '2025-02-25',
    answered: true,
    content: '일렉트로룩스 정품 필터는 어디서 구매할 수 있나요?',
    reply: '안녕하세요. 일렉트로룩스 정품 필터는 일렉트로룩스 공식 온라인 쇼핑몰(https://www.electrolux.co.kr)에서 구매하실 수 있습니다. 또한 지역별 공식 대리점에서도 판매하고 있으니 가까운 매장을 방문하셔도 됩니다.'
  },
  {
    id: 16615,
    title: '이런 현상은 어떻게 해야 되나요?',
    author: '나○연',
    date: '2025-02-24',
    answered: true,
    content: '건조기 사용 중 에러 코드 E54가 발생했습니다. 어떻게 해야 하나요?',
    reply: '안녕하세요. E54 에러 코드는 배수 문제와 관련이 있습니다. 먼저 배수 호스가 꼬이거나 막히지 않았는지 확인해 주세요. 그래도 문제가 지속된다면 서비스 센터 방문 점검이 필요합니다. 1566-1238로 연락주시면 신속하게 도와드리겠습니다.'
  },
  {
    id: 16614,
    title: '가격이 어떻게 되나요?',
    author: '이○나',
    date: '2025-02-24',
    answered: true,
    content: '퓨어 Q9 청소기 가격이 궁금합니다.',
    reply: '안녕하세요. 퓨어 Q9 청소기의 현재 판매가는 649,000원입니다. 다만, 현재 진행 중인 프로모션에 따라 할인이 적용될 수 있으니 일렉트로룩스 공식 온라인 쇼핑몰에서 확인해 주시기 바랍니다.'
  },
  {
    id: 16613,
    title: '이런 현상은 어떻게 해야 되나요?',
    author: '권○혁',
    date: '2025-02-24',
    answered: true,
    content: '세탁기에서 세제가 잘 녹지 않는 것 같습니다. 어떻게 해야 할까요?',
    reply: '안녕하세요. 세제가 잘 녹지 않는 문제는 수온이 낮거나 세제 투입구가 막혔을 때 발생할 수 있습니다. 먼저 세제 투입구를 청소해보시고, 액체 세제 사용을 권장드립니다. 또한 찬물 세탁 시에는 미리 세제를 물에 녹인 후 사용하시는 것이 좋습니다.'
  },
  {
    id: 16612,
    title: '작동이 안됩니다',
    author: '신○수',
    date: '2025-02-24',
    answered: true,
    content: '식기세척기가 전원은 들어오는데 작동이 안됩니다.',
    reply: '안녕하세요. 식기세척기 작동 문제는 여러 원인이 있을 수 있습니다. 먼저 도어가 완전히 닫혀 있는지, 수도 밸브가 열려 있는지 확인해 주세요. 또한 프로그램 선택 후 시작 버튼을 3초 이상 눌러야 작동합니다. 그래도 문제가 해결되지 않으면 서비스 센터로 연락 바랍니다.'
  },
  {
    id: 16611,
    title: 'A/S신청은 어떻게 하나요?',
    author: '권○혁',
    date: '2025-02-23',
    answered: true,
    content: '에어컨 A/S 신청은 어떻게 하나요?',
    reply: 'A/S 신청은 콜센터(1566-1238) 또는 홈페이지 내 서비스 신청 메뉴를 통해 가능합니다. 전화 접수는 평일 09:00-18:00, 토요일 09:00-13:00까지 가능하며, 홈페이지는 24시간 접수 가능합니다.'
  },
  {
    id: 16610,
    title: '부품은 어디서 구매하나요?',
    author: '김○환',
    date: '2025-02-23',
    answered: true,
    content: '로봇청소기 필터 교체용 부품은 어디서 구매할 수 있나요?',
    reply: '로봇청소기 필터 등 소모품은 일렉트로룩스 공식 온라인 쇼핑몰에서 구매 가능합니다. 홈페이지 내 소모품 섹션에서 제품 모델명으로 검색하시면 적합한 부품을 찾으실 수 있습니다.'
  },
  {
    id: 16609,
    title: '서비스 신청은 어떻게 하나요?',
    author: '박○철',
    date: '2025-02-22',
    answered: true,
    content: '냉장고 문이 이상한데 수리 서비스를 받고 싶습니다.',
    reply: '서비스 신청은 고객센터(1566-1238)로 전화하시거나 홈페이지 내 서비스 신청 페이지를 통해 접수 가능합니다. 제품 모델명, 구입일자, 고장 증상을 미리 확인해 주시면 더 빠른 서비스 제공이 가능합니다.'
  }
];

// FAQ 목 데이터 생성
const mockFaqData = [
  {
    id: 1,
    question: '배터리 교체를 위해 센터 방문시 본체만 들고가면 되나요?',
    answer: '일렉트로룩스 무선청소기의 배터리 수명은 모델에 따라 다르지만, 일반적으로 약 60분까지 사용 가능합니다. 고출력 모드에서는 약 20분 정도 사용할 수 있습니다.',
    productType: '무선청소기',
  },
]

// 지역별 서비스 센터 목 데이터 생성 (추가 더미 데이터)
// 실제 API 연동 시 삭제하고 API 응답으로 대체할 데이터
regionData.forEach(region => {
  if (region.value !== '광역시/도') {
    // 각 지역별로 1-3개의 서비스센터 추가
    const centersCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < centersCount; i++) {
      // 해당 지역에 시군구가 있는 경우 랜덤하게 선택
      const citiesInRegion = cityData[region.value] || [];
      const randomCity = citiesInRegion.length > 0 
        ? citiesInRegion[Math.floor(Math.random() * citiesInRegion.length)].value
        : '';
      
      mockServiceCenters.push({
        id: mockServiceCenters.length + 1,
        name: `일렉트로룩스 ${region.value}${randomCity ? ' ' + randomCity : ''} 센터${i+1}`,
        address: `${region.value} ${randomCity} 서비스센터로 ${100 + i}번길`,
        phone: `1566-1588`,
        desc: `${region.value} 지역 서비스센터입니다. 고객 만족을 위해 최선을 다하겠습니다.`,
        time: '평일 09:00 ~ 18:00',
        lunchtime: '12:00 ~ 13:00',
        image: null,
        src: null
      });
    }
  }
});

// Mock API 지연 시간 설정 (ms)
const DELAY = 500;

// Mock API 응답 생성 함수
const createResponse = (data, meta = {}, status = 200) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        meta,
        status
      });
    }, DELAY);
  });
};

/**
 * Mock API 서비스
 * 백엔드 개발 전 프론트엔드 테스트용
 */
export const mockApiService = {
  // 지역 목록 조회
  getRegions: async () => {
    return createResponse(regionData.filter(region => region.value !== '광역시/도'));
  },
  
  // 시군구 목록 조회
  getCitiesByRegion: async (region) => {
    if (!region || region === '광역시/도') {
      return createResponse([]);
    }
    return createResponse(cityData[region] || []);
  },
  
  // 서비스 센터 조회 - 관리자 페이지에서 등록한 센터 데이터만 반환하도록 수정
  getServiceCenters: async (params = {}) => {
    // 관리자 페이지에서 등록한 MOCK_CenterList 데이터 가져오기
    let adminCenters = getMockData();
    let filteredCenters = [];
    
    // 지역 및 시군구에 따른 필터링
    if (params.region && params.city) {
      filteredCenters = getMockDataByRegionAndCity(params.region, params.city);
    } else if (params.region) {
      filteredCenters = getMockDataByRegion(params.region);
    } else if (params.city) {
      filteredCenters = getMockDataByCity(params.city);
    } else {
      filteredCenters = adminCenters;
    }
    
    // 프론트엔드 표시 형식에 맞게 데이터 변환
    const formattedCenters = filteredCenters.map(center => ({
      id: center.id,
      name: center.centerNm,
      address: center.centerAddr,
      phone: center.centerTel,
      url: center.url
    }));
    
    return createResponse(formattedCenters);
  },
  
  // 서비스 센터 상세 조회 - 관리자 페이지에서 등록한 데이터 사용
  getServiceCenterById: async (id) => {
    const adminCenter = getMockData().find(center => center.id === parseInt(id));
    
    if (!adminCenter) {
      return createResponse({ message: '서비스 센터를 찾을 수 없습니다.' }, {}, 404);
    }
    
    // 프론트엔드 표시 형식으로 변환
    const formattedCenter = {
      id: adminCenter.id,
      name: adminCenter.centerNm,
      address: adminCenter.centerAddr,
      phone: adminCenter.centerTel,
      url: adminCenter.url
    };
    
    return createResponse(formattedCenter);
  },

  // QnA 목록 조회 - 페이지네이션, 검색 기능 포함
  getQnaList: async (params = {}) => {
    // 페이지네이션 파라미터
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 10;
    
    // 검색 파라미터
    const searchType = params.searchType || '';
    const searchKeyword = params.searchKeyword || '';
    
    // 검색 조건에 따라 필터링
    let filteredQna = [...mockQnaData];
    
    if (searchKeyword && searchType) {
      const keyword = searchKeyword.toLowerCase();
      
      if (searchType === 'uname') {
        // 고객명 검색
        filteredQna = filteredQna.filter(qna => 
          qna.author.toLowerCase().includes(keyword)
        );
      } else if (searchType === 'uphone') {
        // 전화번호 검색 (예시 - 실제로는 데이터에 전화번호가 없음)
        // 실제 구현 시 전화번호 필드가 있다면 그에 맞게 수정
        filteredQna = filteredQna.filter(() => true);
      }
    }
    
    // 총 아이템 수
    const total = filteredQna.length;
    
    // 페이지네이션 적용
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedQna = filteredQna.slice(startIndex, endIndex);
    
    // 메타데이터 생성
    const meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
    
    return createResponse(paginatedQna, meta);
  },
  
  // QnA 상세 조회
  getQnaById: async (id, headers = {}) => {
    const qna = mockQnaData.find(qna => qna.id === parseInt(id));
    
    if (!qna) {
      return createResponse({ message: '문의글을 찾을 수 없습니다.' }, {}, 404);
    }
    
    // 토큰 가져오기
    const token = headers.Authorization?.replace('Bearer ', '') || '';
    console.log('토큰 가져오기:', token);

    // 관리자 권한 확인 (관리자는 모든 글에 접근 가능)
    if (token === 'test_admin_token') {
      return createResponse(qna);
    }
    
    // 일반 사용자는 자신의 글만 볼 수 있음
    if (token === 'test_user_token') {
      console.log('테스트 사용자 토큰 확인:', token);
      // 테스트 사용자는 자신의 글(authorId가 test_user인 글)만 볼 수 있음
      if (qna.authorId !== 'test_user' && !qna.isTestUserOnly) {
        return createResponse({ message: '본인이 작성한 글만 확인할 수 있습니다.' }, {}, 403);
      }
    } else {
      console.log('테스트 사용자 토큰 확인:', token);
      // 로그인하지 않은 사용자는 접근 불가
      return createResponse({ message: '로그인이 필요한 서비스입니다.' }, {}, 401);
    }
    
    return createResponse(qna);
  },

  // FAQ 목록 조회
  getFaqs: async (params = {}) => {
    let filteredFaqs = [...mockFaqData];
    
    // 제품 유형 필터링
    if (params.productType) {
      filteredFaqs = filteredFaqs.filter(faq => 
        faq.productType === params.productType
      );
    }
    // 키워드 검색
    if (params.keyword) {
      const keyword = params.keyword.toLowerCase();
      filteredFaqs = filteredFaqs.filter(faq => 
        faq.question.toLowerCase().includes(keyword) || 
        faq.answer.toLowerCase().includes(keyword)
      );
    }
    return createResponse(filteredFaqs);
  }

};

export default mockApiService;
// 비디오 목업 데이터
let MOCK_DATA = [
  {
    id: 1,
    key: '1',
    status: 'active',
    title: '2023 Electrolux 신제품 런칭 영상',
    youtubeLink: 'https://www.youtube.com/watch?v=example1',
    createdAt: '2023-11-15',
    updatedAt: '2023-11-15'
  },
  {
    id: 2,
    key: '2',
    status: 'active',
    title: 'Electrolux 무선청소기 사용법',
    youtubeLink: 'https://www.youtube.com/watch?v=example2',
    createdAt: '2023-10-22',
    updatedAt: '2023-10-22'
  },
  {
    id: 3,
    key: '3',
    status: 'inactive',
    title: 'Electrolux 인덕션 요리 꿀팁',
    youtubeLink: 'https://www.youtube.com/watch?v=example3',
    createdAt: '2023-09-05',
    updatedAt: '2023-09-05'
  },
  {
    id: 4,
    key: '4',
    status: 'inactive',
    title: '로봇청소기 관리 방법',
    youtubeLink: 'https://www.youtube.com/watch?v=example4',
    createdAt: '2023-08-18',
    updatedAt: '2023-08-18'
  }
];

// 상태 옵션
export const STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '노출' },
  { value: 'inactive', label: '미노출' }
];

// 전체 데이터 가져오기
export const getMockData = () => {
  // 최신 데이터의 복사본을 반환하여 참조 문제 방지
  return [...MOCK_DATA];
};

// 비디오 검색 함수
export const searchVideos = (data, params) => {
  const { searchType, searchValue, status } = params;
  
  return data.filter(item => {
    // 상태 필터링
    if (status && status !== 'all' && item.status !== status) {
      return false;
    }
    
    // 검색어 필터링
    if (searchValue) {
      if (searchType === 'title') {
        return item.title.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchType === 'youtubeLink') {
        return item.youtubeLink.toLowerCase().includes(searchValue.toLowerCase());
      } else {
        // 전체 검색
        return (
          item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.youtubeLink.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
    }
    
    return true;
  });
};

// 비디오 추가
export const addVideo = (videoData) => {
  // 배열이 비어있는 경우 ID를 1로 시작
  const newId = MOCK_DATA.length === 0 
    ? 1 
    : Math.max(...MOCK_DATA.map(item => item.id)) + 1;
    
  const newVideo = {
    id: newId,
    key: newId.toString(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    ...videoData
  };
  
  MOCK_DATA.push(newVideo);
  return [...MOCK_DATA];
};

// 비디오 수정
export const updateVideo = (id, videoData) => {
  const index = MOCK_DATA.findIndex(item => item.id === id);
  if (index !== -1) {
    MOCK_DATA[index] = {
      ...MOCK_DATA[index],
      ...videoData,
      updatedAt: new Date().toISOString().split('T')[0]
    };
  }
  return [...MOCK_DATA];
};

// 비디오 삭제
export const deleteVideo = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
  return [...MOCK_DATA];
};

// ID로 비디오 조회
export const getVideoById = (id) => {
  return MOCK_DATA.find(item => item.id === Number(id));
};

export default MOCK_DATA; 
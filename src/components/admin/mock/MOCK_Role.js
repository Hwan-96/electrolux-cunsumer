// Role 모의 데이터
let MOCK_DATA = [
  {
    id: 1,
    userId: 'admin001',
    department: '관리팀',
    name: '김관리',
    position: '팀장',
    phone: '010-1234-5678',
    createdAt: '2023-01-15',
    permissions: {
      Service: {
        all: true,
        '온라인상담': true,
        '인덕션 설치요청': true,
        '1:1고객상담': true,
        'FAQ': true,
        '공지사항': true,
        '센터리스트': true,
        '설문조사': true
      },
      Statistic: {
        all: true,
        '온라인상담_통계': true,
        '1:1고객상담_통계': true,
        '설문조사_통계': true
      },
      Download: {
        all: true,
        '제품사용설명서': true,
        '청소기 청소요령': true
      },
      Member: {
        all: true,
        '회원 리스트': true,
        'ExW': true,
        '권한관리': true
      },
      Category: {
        all: true,
        '제품': true,
        '1:1 문의': true,
        'FAQ': true
      },
      Customize: {
        all: true,
        '배너': true,
        '동영상': true,
        '약관': true,
        '패밀리 사이트': true
      },
      Event: {
        all: true,
        '이벤트 리스트': true,
        '이벤트 당첨자': true
      }
    }
  },
  {
    id: 2,
    userId: 'user002',
    department: '고객서비스팀',
    name: '이서비스',
    position: '주임',
    phone: '010-2345-6789',
    createdAt: '2023-03-20',
    permissions: {
      Service: {
        all: true,
        '온라인상담': true,
        '인덕션 설치요청': true,
        '1:1고객상담': true,
        'FAQ': true,
        '공지사항': true,
        '센터리스트': true,
        '설문조사': true
      },
      Statistic: {
        all: false,
        '온라인상담_통계': true,
        '1:1고객상담_통계': true,
        '설문조사_통계': false
      },
      Download: {
        all: false,
        '제품사용설명서': true,
        '청소기 청소요령': false
      },
      Member: {
        all: false,
        '회원 리스트': true,
        'ExW': false,
        '권한관리': false
      },
      Category: {
        all: false,
        '제품': true,
        '1:1 문의': true,
        'FAQ': true
      },
      Customize: {
        all: false,
        '배너': false,
        '동영상': false,
        '약관': true,
        '패밀리 사이트': false
      },
      Event: {
        all: false,
        '이벤트 리스트': false,
        '이벤트 당첨자': false
      }
    }
  },
  {
    id: 3,
    userId: 'user003',
    department: '마케팅팀',
    name: '박마케팅',
    position: '대리',
    phone: '010-3456-7890',
    createdAt: '2023-05-10',
    permissions: {
      Service: {
        all: false,
        '온라인상담': false,
        '인덕션 설치요청': false,
        '1:1고객상담': false,
        'FAQ': true,
        '공지사항': true,
        '센터리스트': false,
        '설문조사': true
      },
      Statistic: {
        all: true,
        '온라인상담_통계': true,
        '1:1고객상담_통계': true,
        '설문조사_통계': true
      },
      Download: {
        all: false,
        '제품사용설명서': true,
        '청소기 청소요령': true
      },
      Member: {
        all: false,
        '회원 리스트': true,
        'ExW': false,
        '권한관리': false
      },
      Category: {
        all: false,
        '제품': true,
        '1:1 문의': false,
        'FAQ': true
      },
      Customize: {
        all: true,
        '배너': true,
        '동영상': true,
        '약관': true,
        '패밀리 사이트': true
      },
      Event: {
        all: true,
        '이벤트 리스트': true,
        '이벤트 당첨자': true
      }
    }
  },
  {
    id: 4,
    userId: 'user004',
    department: '개발팀',
    name: '정개발',
    position: '과장',
    phone: '010-4567-8901',
    createdAt: '2023-02-05',
    permissions: {
      Service: {
        all: false,
        '온라인상담': false,
        '인덕션 설치요청': false,
        '1:1고객상담': false,
        'FAQ': false,
        '공지사항': false,
        '센터리스트': false,
        '설문조사': false
      },
      Statistic: {
        all: true,
        '온라인상담_통계': true,
        '1:1고객상담_통계': true,
        '설문조사_통계': true
      },
      Download: {
        all: false,
        '제품사용설명서': false,
        '청소기 청소요령': false
      },
      Member: {
        all: false,
        '회원 리스트': false,
        'ExW': false,
        '권한관리': false
      },
      Category: {
        all: false,
        '제품': false,
        '1:1 문의': false,
        'FAQ': false
      },
      Customize: {
        all: false,
        '배너': false,
        '동영상': false,
        '약관': false,
        '패밀리 사이트': false
      },
      Event: {
        all: false,
        '이벤트 리스트': false,
        '이벤트 당첨자': false
      }
    }
  },
  {
    id: 5,
    userId: 'user005',
    department: '운영팀',
    name: '최운영',
    position: '사원',
    phone: '010-5678-9012',
    createdAt: '2023-06-15',
    permissions: {
      Service: {
        all: false,
        '온라인상담': true,
        '인덕션 설치요청': true,
        '1:1고객상담': true,
        'FAQ': false,
        '공지사항': false,
        '센터리스트': false,
        '설문조사': false
      },
      Statistic: {
        all: false,
        '온라인상담_통계': false,
        '1:1고객상담_통계': false,
        '설문조사_통계': false
      },
      Download: {
        all: false,
        '제품사용설명서': false,
        '청소기 청소요령': false
      },
      Member: {
        all: false,
        '회원 리스트': true,
        'ExW': false,
        '권한관리': false
      },
      Category: {
        all: false,
        '제품': false,
        '1:1 문의': true,
        'FAQ': false
      },
      Customize: {
        all: false,
        '배너': false,
        '동영상': false,
        '약관': false,
        '패밀리 사이트': false
      },
      Event: {
        all: false,
        '이벤트 리스트': false,
        '이벤트 당첨자': false
      }
    }
  }
];

export const getMockData = () => {
  return [...MOCK_DATA];
};

export const deleteMockData = (id) => {
  MOCK_DATA = MOCK_DATA.filter(item => item.id !== id);
  return [...MOCK_DATA];
};

export const updateMockData = (id, data) => {
  MOCK_DATA = MOCK_DATA.map(item => {
    if (item.id === id) {
      return { ...item, ...data };
    }
    return item;
  });
};

export const addMockData = (data) => {
  const newId = Math.max(...MOCK_DATA.map(item => item.id), 0) + 1;
  MOCK_DATA.push({ ...data, id: newId });
};

export const getMockDataById = (id) => {
  return MOCK_DATA.find(item => item.id === id);
}; 
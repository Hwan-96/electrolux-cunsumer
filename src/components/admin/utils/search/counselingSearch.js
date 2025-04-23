import { baseSearch } from './baseSearch';

// 카테고리 매핑 객체
const categoryMapping = {
  service: {
    repair: {
      label: '수리/고장',
      options: {
        notwork: '작동이 안됩니다',
        how: '이런 현상은 어떻게 해야하나요?'
      }
    },
    cost: {
      label: '수리비용',
      options: {
        cost: '수리비용이 얼마인가요?'
      }
    },
    warranty: {
      label: '보증기간',
      options: {
        warranty: '보증기간 기준이 어떻게 되나요?'
      }
    },
    usage: {
      label: '사용방법',
      options: {
        usage: '사용방법이 어떻게 되나요?'
      }
    },
    center: {
      label: '서비스센터',
      options: {
        center: '가까운 서비스센터 위치 알려주세요?'
      }
    },
    as: {
      label: 'A/S신청',
      options: {
        as: 'A/S신청은 어떻게 하나요?'
      }
    },
    etc: {
      label: '기타',
      options: {
        etc: '궁금합니다'
      }
    }
  },
  product: {
    order: {
      label: '주문/구입',
      options: {
        order: '구입방법을 알려주세요',
        price: '가격이 어떻게 되나요?'
      }
    },
    payment: {
      label: '결제',
      options: {
        payment: '결제는 어떻게 하나요?'
      }
    },
    delivery: {
      label: '배송',
      options: {
        delivery: '주문 후 배송은 어떻게 되나요?'
      }
    },
    refund: {
      label: '환불',
      options: {
        refund: '환불방법/절차는 어떻게 되나요?'
      }
    }
  },
  site: {
    site: {
      label: '기타',
      options: {
        login: '로그인이 안됩니다',
        proposal: '제안합니다',
        etc: '궁금합니다'
      }
    }
  }
};

export const counselingSearch = (data, searchParams) => {
  const {
    searchType,
    searchValue,
    category1,
    category2,
    category3
  } = searchParams;

  // 기본 검색 로직 적용
  const baseFiltered = baseSearch(data, { searchValue });

  return baseFiltered.filter(item => {
    // 카테고리 필터링
    if (category1 !== 'all') {
      const category1Value = category1 === 'service' ? '서비스' :
        category1 === 'product' ? '소모품관련' :
          category1 === 'site' ? '사이트이용관련' : '';

      if (item.ctgr1 !== category1Value) {
        return false;
      }
    }

    if (category2 !== 'all' && category1 !== 'all') {
      const category2Value = categoryMapping[category1]?.[category2]?.label;
      if (item.ctgr2 !== category2Value) {
        return false;
      }
    }

    if (category3 !== 'all' && category2 !== 'all' && category1 !== 'all') {
      const category3Value = categoryMapping[category1]?.[category2]?.options?.[category3];
      if (item.ctgr3 !== category3Value) {
        return false;
      }
    }

    // 검색어가 없는 경우 카테고리 필터링만 적용
    if (!searchValue) {
      return true;
    }

    // 검색 타입에 따른 필터링
    const searchValueLower = searchValue.toLowerCase();

    // 복합 검색 처리
    if (Array.isArray(searchType)) {
      return searchType.some(type => {
        switch (type) {
          case 'ctgr3':
            return item.ctgr3?.toLowerCase().includes(searchValueLower);
          case 'answer':
            return item.answer?.toLowerCase().includes(searchValueLower);
          default:
            return false;
        }
      });
    }

    // 단일 검색 처리
    switch (searchType) {
      case 'ctgr3':
        return item.ctgr3?.toLowerCase().includes(searchValueLower);
      case 'answer':
        return item.answer?.toLowerCase().includes(searchValueLower);
      case 'all':
        return item.ctgr3?.toLowerCase().includes(searchValueLower) ||
          item.answer?.toLowerCase().includes(searchValueLower);
      default:
        return true;
    }
  });
}; 
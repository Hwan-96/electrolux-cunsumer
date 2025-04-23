const CATEGORY_MAPPING = {
  usage: { label: '기초사용법' },
  wireless: { label: '무선청소기' },
  wired: { label: '유선청소기' },
  robot: { label: '로봇청소기' },
  air: { label: '공기청정기' },
  small: { label: '소형가전' },
  dishwasher: { label: '식기세척기' },
  induction: { label: '인덕션' },
};

export const faqSearch = (data, searchParams) => {
  const { searchType, searchValue, category1 } = searchParams;
  
  // 카테고리 필터링을 먼저 수행
  const categoryFiltered = category1 === 'all' 
    ? data 
    : data.filter(item => {
        const categoryLabel = CATEGORY_MAPPING[category1]?.label;
        return item.ctgr === categoryLabel;
      });

  // 검색어가 없는 경우 카테고리 필터링 결과 반환
  if (!searchValue) {
    return categoryFiltered;
  }

  // 검색어가 있는 경우 검색 타입에 따른 필터링
  return categoryFiltered.filter(item => {
    const searchValueLower = searchValue.toLowerCase();
    
    switch (searchType) {
      case 'all':
        return (
          item.ctgr?.toLowerCase().includes(searchValueLower) ||
          item.q?.toLowerCase().includes(searchValueLower) ||
          item.a?.toLowerCase().includes(searchValueLower)
        );
      case 'q':
        return item.q?.toLowerCase().includes(searchValueLower);
      case 'a':
        return item.a?.toLowerCase().includes(searchValueLower);
      default:
        return true;
    }
  });
}; 
export const surveySearch = (data, searchParams) => {
  const { searchType, searchValue } = searchParams;
  
  // 검색어가 없는 경우 모든 데이터 반환
  if (!searchValue) {
    return data;
  }

  const searchValueLower = searchValue.toLowerCase();

  // 검색 타입에 따른 필터링
  return data.filter(item => {
    switch (searchType) {
      case 'all':
        return true; // 전체는 필터링 없이 모든 데이터 반환
      case 'name_phone':
        return (
          item.consumer?.toLowerCase().includes(searchValueLower) ||
          item.phone?.toLowerCase().includes(searchValueLower)
        );
      case 'rcpNum':
        return item.rcpNum?.toLowerCase().includes(searchValueLower);
      default:
        return true;
    }
  });
}; 
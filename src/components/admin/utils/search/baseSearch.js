export const baseSearch = (data, searchParams) => {
  const { searchValue, status } = searchParams;
  
  if (!searchValue && (!status || status === 'all')) {
    return data;
  }

  return data.filter(item => {
    // 상태 필터링
    if (status && status !== 'all' && item.status !== status) {
      return false;
    }

    // 검색어가 없는 경우 상태 필터링만 적용
    if (!searchValue) {
      return true;
    }

    // 기본 검색 로직
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    );
  });
}; 
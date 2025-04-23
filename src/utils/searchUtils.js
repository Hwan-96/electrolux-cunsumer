export const searchData = (data, searchParams) => {
  const { searchType, searchValue, status } = searchParams;
  
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

    // 검색 타입에 따른 필터링
    switch (searchType) {
      case 'all':
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchValue.toLowerCase())
        );
      case 'customer':
        return item.consumerNm?.toLowerCase().includes(searchValue.toLowerCase());
      case 'phone':
        return item.phone?.toLowerCase().includes(searchValue.toLowerCase());
      case 'request':
        return item.title?.toLowerCase().includes(searchValue.toLowerCase());
      case 'content':
        return item.content?.toLowerCase().includes(searchValue.toLowerCase());
      default:
        return true;
    }
  });
}; 
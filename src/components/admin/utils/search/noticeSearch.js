export const noticeSearch = (data, searchParams) => {
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
        return (
          item.title?.toLowerCase().includes(searchValueLower) ||
          item.content?.toLowerCase().includes(searchValueLower)
        );
      case 'title':
        return item.title?.toLowerCase().includes(searchValueLower);
      case 'content':
        return item.content?.toLowerCase().includes(searchValueLower);
      default:
        return true;
    }
  });
};

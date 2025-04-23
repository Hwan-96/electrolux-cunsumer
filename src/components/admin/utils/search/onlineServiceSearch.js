import { baseSearch } from './baseSearch';

export const onlineServiceSearch = (data, searchParams) => {
  const { searchType, searchValue, status } = searchParams;
  
  // 기본 검색 로직 적용
  const baseFiltered = baseSearch(data, { searchValue, status });

  // 검색어가 없는 경우 기본 필터링 결과 반환
  if (!searchValue) {
    return baseFiltered;
  }

  // 서비스별 특수 검색 로직
  return baseFiltered.filter(item => {
    switch (searchType) {
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
import { baseSearch } from './baseSearch';

const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return true;
  const targetDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return targetDate >= start && targetDate <= end;
};

export const inductionSearch = (data, searchParams) => {
  const { 
    searchType, 
    searchValue, 
    status,
    installStartDate,
    installEndDate,
    regStartDate,
    regEndDate
  } = searchParams;
  
  // 기본 검색 로직 적용
  const baseFiltered = baseSearch(data, { searchValue, status });

  return baseFiltered.filter(item => {
    // 설치일 범위 검색
    if (!isDateInRange(item.installAt, installStartDate, installEndDate)) {
      return false;
    }

    // 등록일 범위 검색
    if (!isDateInRange(item.createdAt, regStartDate, regEndDate)) {
      return false;
    }

    // 검색어가 없는 경우 날짜 필터링만 적용
    if (!searchValue) {
      return true;
    }

    // 검색 타입에 따른 필터링
    switch (searchType) {
      case 'customer':
        return item.consumerNm?.toLowerCase().includes(searchValue.toLowerCase());
      case 'phone':
        return item.phone?.toLowerCase().includes(searchValue.toLowerCase());
      case 'store':
        return item.store?.toLowerCase().includes(searchValue.toLowerCase());
      case 'model':
        return item.modelNm?.toLowerCase().includes(searchValue.toLowerCase());
      default:
        return true;
    }
  });
}; 
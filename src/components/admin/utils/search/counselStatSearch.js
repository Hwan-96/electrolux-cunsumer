import { baseSearch } from './baseSearch';

const isDateInRange = (date, startDate, endDate) => {
  if (!date || !startDate || !endDate) return true;
  const targetDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return targetDate >= start && targetDate <= end;
};

export const counselStatSearch = (data, searchParams) => {
  const { 
    searchValue = '',
    status = 'all',
    startDate,
    endDate 
  } = searchParams || {};
  
  // 기본 검색 로직 적용
  const baseFiltered = baseSearch(data, { searchValue, status });

  return baseFiltered.filter(item => {
    // 접수일 기간 필터링
    if (!isDateInRange(item.receiptAt, startDate, endDate)) {
      return false;
    }
    
    return true;
  });
}; 
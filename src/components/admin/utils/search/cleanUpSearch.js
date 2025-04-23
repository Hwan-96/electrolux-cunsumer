/**
 * CleanUp 페이지 검색 함수
 * @param {Array} data - 검색할 데이터 배열
 * @param {Object} searchParams - 검색 매개변수
 * @param {string} searchParams.searchValue - 검색어
 * @param {string} searchParams.category1 - 브랜드 카테고리
 * @param {string} searchParams.category2 - 제품군 카테고리
 * @param {string} searchParams.category3 - 제품명 카테고리
 * @param {string} searchParams.category4 - 모델명 카테고리
 * @returns {Array} - 필터링된 데이터 배열
 */
export const cleanUpSearch = (data, searchParams) => {
  // searchParams가 undefined인 경우에 대한 방어 코드
  if (!searchParams) {
    return data;
  }

  const { 
    searchValue = '',
    category1 = 'all',
    category2 = 'all', 
    category3 = 'all', 
    category4 = 'all'
  } = searchParams;
  
  // 검색어를 소문자로 변환 (대소문자 구분 없는 검색)
  const searchValueLower = searchValue?.toLowerCase() || '';

  return data.filter(item => {
    // 1. 카테고리 필터링
    const categoryFilterPassed = (
      (category1 === 'all' || item.modelCtgr1 === category1) &&
      (category2 === 'all' || item.modelCtgr2 === category2) &&
      (category3 === 'all' || item.modelCtgr3 === category3) &&
      (category4 === 'all' || item.modelCtgr4 === category4)
    );

    if (!categoryFilterPassed) {
      return false;
    }
    
    // 2. 검색어 필터링 (검색어가 없는 경우 카테고리 필터링만 적용)
    if (!searchValue) {
      return true;
    }
    
    // 검색어 존재 시 관련 필드에서 검색
    return (
      (item.title?.toLowerCase().includes(searchValueLower)) ||
      (item.modelCtgr1?.toLowerCase().includes(searchValueLower)) ||
      (item.modelCtgr2?.toLowerCase().includes(searchValueLower)) ||
      (item.modelCtgr3?.toLowerCase().includes(searchValueLower)) ||
      (item.modelCtgr4?.toLowerCase().includes(searchValueLower))
    );
  });
}; 
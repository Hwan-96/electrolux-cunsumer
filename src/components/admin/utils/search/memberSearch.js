/**
 * 회원 목록 검색 함수
 * @param {Array} data - 검색할 원본 데이터
 * @param {Object} params - 검색 파라미터
 * @param {string} params.searchType - 검색 유형 (all, memNm, memId, memTel 등)
 * @param {string} params.searchValue - 검색어
 * @param {string} params.status - 회원 유형 필터 (all, U, N)
 * @returns {Array} 필터링된 데이터
 */
export const memberSearch = (data, params = {}) => {
  const { searchType = 'all', searchValue = '', status = 'all' } = params;
  
  console.log('Search params:', params); // 디버깅용 로그
  
  if (!data || data.length === 0) {
    return [];
  }
  
  // 검색어와 회원 유형 필터가 모두 없는 경우 전체 데이터 반환
  if (searchValue === '' && status === 'all') {
    return data;
  }

  return data.filter(item => {
    // 회원 유형 필터링 (U: 울트라클럽, N: 일반회원)
    if (status !== 'all' && item.memTp !== status) {
      return false;
    }

    // 검색어가 없으면 회원 유형 필터링 결과만 반환
    if (!searchValue) {
      return true;
    }

    // 검색어 필터링
    const value = searchValue.toLowerCase();
    
    if (searchType === 'all') {
      // 전체 검색 - 모든 필드에서 검색
      return (
        (item.memNm && item.memNm.toLowerCase().includes(value)) ||
        (item.memId && item.memId.toLowerCase().includes(value)) ||
        (item.memTel && item.memTel.toLowerCase().includes(value)) ||
        (item.memEmail && item.memEmail.toLowerCase().includes(value))
      );
    } else {
      // 특정 필드 검색
      const field = item[searchType];
      return field && field.toLowerCase().includes(value);
    }
  });
};

export default memberSearch; 
/**
 * ExW 데이터 검색 함수
 * 
 * @param {Array} data - 검색할 데이터 배열
 * @param {Object} options - 검색 옵션
 * @param {string} options.searchType - 검색 유형 (all, name, model, phone, email)
 * @param {string} options.searchValue - 검색어
 * @param {string} options.status - 필터링할 제품 카테고리 (all 또는 특정 카테고리)
 * @returns {Array} 필터링된 데이터 배열
 */
export const exwSearch = (data, { searchType, searchValue, status }) => {
  if (!searchValue && status === 'all') {
    return data;
  }

  return data.filter(item => {
    // 상태 필터링
    if (status !== 'all') {
      if (item.category !== status) {
        return false;
      }
    }

    // 검색어 필터링
    if (searchValue) {
      if (searchType === 'all') {
        return (
          item.name.includes(searchValue) ||
          item.model.includes(searchValue) ||
          item.phone.includes(searchValue) ||
          item.email.includes(searchValue)
        );
      } else if (searchType === 'name') {
        return item.name.includes(searchValue);
      } else if (searchType === 'model') {
        return item.model.includes(searchValue);
      } else if (searchType === 'phone') {
        return item.phone.includes(searchValue);
      } else if (searchType === 'email') {
        return item.email.includes(searchValue);
      }
    }

    return true;
  });
}; 
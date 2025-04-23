/**
 * Role 데이터 검색 함수
 * 
 * @param {Array} data - 검색할 데이터 배열
 * @param {Object} options - 검색 옵션
 * @param {string} options.searchType - 검색 유형 (all, userId, department, name)
 * @param {string} options.searchValue - 검색어
 * @returns {Array} 필터링된 데이터 배열
 */
export const roleSearch = (data, { searchType, searchValue }) => {
  if (!searchValue) {
    return data;
  }

  return data.filter(item => {
    // 검색어 필터링
    if (searchType === 'all') {
      return (
        item.userId.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.department.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else if (searchType === 'userId') {
      return item.userId.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchType === 'department') {
      return item.department.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchType === 'name') {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    }

    return true;
  });
}; 
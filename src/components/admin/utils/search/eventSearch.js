/**
 * 이벤트 목록 검색 함수
 * @param {Array} data - 검색할 데이터 배열
 * @param {Object} conditions - 검색 조건
 * @returns {Array} 검색 조건에 맞는 데이터 배열
 */
export const eventSearch = (data, conditions) => {
  const { searchType, searchValue } = conditions;
  
  if (!searchValue) {
    return data;
  }

  return data.filter(item => {
    // 검색 타입에 따른 필터링
    switch (searchType) {
      case 'title':
        return item.title && item.title.toLowerCase().includes(searchValue.toLowerCase());
      case 'content':
        return item.content && item.content.toLowerCase().includes(searchValue.toLowerCase());
      case 'all':
      default:
        return (
          (item.title && item.title.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.content && item.content.toLowerCase().includes(searchValue.toLowerCase()))
        );
    }
  });
}; 
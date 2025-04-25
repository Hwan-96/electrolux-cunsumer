/**
 * 서비스 센터 목록 검색을 위한 유틸리티 함수
 * sidosigungu_202504.json 데이터에 맞게 검색 필터링 로직 구현
 */
export const centerListSearch = (data, searchParams) => {
  const { region, city, searchValue } = searchParams;
  
  return data.filter(item => {
    // 지역 필터링
    if (region && region !== 'all' && item.region !== region) {
      return false;
    }

    // 시군구 필터링
    if (city && city !== 'all' && item.city !== city) {
      return false;
    }

    // 검색어 필터링
    if (searchValue) {
      const searchValueLower = searchValue.toLowerCase();
      return (
        item.centerNm?.toLowerCase().includes(searchValueLower) ||
        item.centerAddr?.toLowerCase().includes(searchValueLower) ||
        item.centerTel?.toLowerCase().includes(searchValueLower)
      );
    }

    return true;
  });
}; 
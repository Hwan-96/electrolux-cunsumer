// 광역시/도 데이터
export const regionData = [
  { value: '광역시/도', label: '광역시/도' },
  { value: '강원', label: '강원' },
  { value: '경기', label: '경기' },
  { value: '경남', label: '경남' },
  { value: '경북', label: '경북' },
  { value: '광주', label: '광주' },
  { value: '대구', label: '대구' },
  { value: '대전', label: '대전' },
  { value: '부산', label: '부산' },
  { value: '서울', label: '서울' },
  { value: '세종', label: '세종' },
  { value: '울산', label: '울산' },
  { value: '인천', label: '인천' },
  { value: '전남', label: '전남' },
  { value: '전북', label: '전북' },
  { value: '제주', label: '제주' },
  { value: '충남', label: '충남' },
  { value: '충북', label: '충북' },
];

// 시군구 데이터
export const cityData = {
  '강원': [
    { value: '강릉시', label: '강릉시' },
    { value: '원주시', label: '원주시' },
    { value: '춘천시', label: '춘천시' },
  ],
  '경기': [
    { value: '고양시', label: '고양시' },
    { value: '구리시', label: '구리시' },
    { value: '김포시', label: '김포시' },
    { value: '부천시', label: '부천시' },
    { value: '성남시', label: '성남시' },
    { value: '수원시', label: '수원시' },
    { value: '안산시', label: '안산시' },
    { value: '안양시', label: '안양시' },
    { value: '용인시', label: '용인시' },
    { value: '의정부시', label: '의정부시' },
    { value: '이천시', label: '이천시' },
    { value: '평택시', label: '평택시' },
    { value: '화성시', label: '화성시' },
  ],
  '경남': [
    { value: '거제시', label: '거제시' },
    { value: '진주시', label: '진주시' },
    { value: '창원시', label: '창원시' },
    { value: '통영시', label: '통영시' },
  ],
  '경북': [
    { value: '구미시', label: '구미시' },
    { value: '안동시', label: '안동시' },
    { value: '포항시', label: '포항시' },
  ],
  '광주': [
    { value: '광산구', label: '광산구' },
    { value: '북구', label: '북구' },
    { value: '서구', label: '서구' },
  ],
  '대구': [
    { value: '달서구', label: '달서구' },
    { value: '동구', label: '동구' },
    { value: '서구', label: '서구' },
    { value: '중구', label: '중구' },
    { value: '수성구', label: '수성구' },
  ],
  '대전': [
    { value: '동구', label: '동구' },
    { value: '유성구', label: '유성구' },
    { value: '중구', label: '중구' },
  ],
  '부산': [
    { value: '부산진구', label: '부산진구' },
    { value: '북구', label: '북구' },
    { value: '사상구', label: '사상구' },
    { value: '연제구', label: '연제구' },
  ],
  '서울': [
    { value: '강남구', label: '강남구' },
    { value: '강북구', label: '강북구' },
    { value: '강서구', label: '강서구' },
    { value: '관악구', label: '관악구' },
    { value: '광진구', label: '광진구' },
    { value: '금천구', label: '금천구' },
    { value: '노원구', label: '노원구' },
    { value: '마포구', label: '마포구' },
    { value: '서초구', label: '서초구' },
    { value: '성동구', label: '성동구' },
    { value: '성북구', label: '성북구' },
    { value: '송파구', label: '송파구' },
    { value: '양천구', label: '양천구' },
    { value: '영등포구', label: '영등포구' },
    { value: '용산구', label: '용산구' },
  ],
  '세종': [
    { value: '세종', label: '세종' },
  ],
  '울산': [
    { value: '남구', label: '남구' },
  ],
  '인천': [
    { value: '남동구', label: '남동구' },
    { value: '부평구', label: '부평구' },
  ],
  '전남': [
    { value: '목포시', label: '목포시' },
    { value: '순천시', label: '순천시' },
    { value: '여수시', label: '여수시' },
  ],
  '전북': [
    { value: '군산시', label: '군산시' },
    { value: '익산시', label: '익산시' },
    { value: '전주시', label: '전주시' },
  ],
  '제주': [
    { value: '제주시', label: '제주시' },
  ],
  '충남': [
    { value: '논산시', label: '논산시' },
    { value: '서산시', label: '서산시' },
    { value: '천안시', label: '천안시' },
    { value: '홍성군', label: '홍성군' },
  ],
  '충북': [
    { value: '청주시', label: '청주시' },
    { value: '충주시', label: '충주시' },
  ],
};

// 지역 선택에 따른 시군구 데이터 반환 함수
export const getCitiesByRegion = (region) => {
  return cityData[region] || [];
}; 
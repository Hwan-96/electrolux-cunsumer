import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  width: 100%;
`;
const Selects = styled.ul`
  display: flex;
  gap: 10px;
  li{
    flex: 1;
    &:last-child{
      flex: 0;
    }
  }
`

const CenterSearchOpts = ({ 
  selectedRegion, 
  selectedCity, 
  cities, 
  loading,
  onRegionChange,
  onCityChange 
}) => {
  
  const handleRegionChange = (e) => {
    onRegionChange(e.target.value);
  };

  const handleCityChange = (e) => {
    onCityChange(e.target.value);
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 추가 동작이 필요한 경우
    console.log('Search button clicked:', selectedRegion, selectedCity);
  };

  return (
    <>
      <div className="center-search-opts">
        <p className="tit">서비스센터 조회</p>
        <Selects>
          <li>
            <Select 
              className="sel01"
              name="si" 
              value={selectedRegion}
              onChange={handleRegionChange}
              disabled={loading}
            >
              <option value="">광역시/도</option>
              {/* 광역시/도를 이미 선택한 경우 "광역시/도" 옵션을 제외 */}
              {[
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
                { value: '충북', label: '충북' }
              ].map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </Select>
          </li>
          <li>
            <Select 
              className="sel01"
              name="gu" 
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedRegion || cities.length === 0 || loading}
            >
              <option value="">시군구</option>
              {cities.map(city => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </Select>
          </li>
          <li className="btn">
            <button 
              type="button" 
              className="hgbtn blue02"
              onClick={handleSearch}
            >
              검색
            </button>
          </li>
        </Selects>
      </div>
    </>
  );
};

export default CenterSearchOpts;
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { regionData, getCitiesByRegion } from '@/utils/regionData';

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
  onRegionChange,
  onCityChange 
}) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 지역 데이터 로드
  useEffect(() => {
    setRegions([
      { value: '', label: '광역시/도' },
      ...regionData.filter(region => region.value !== '광역시/도')
    ]);
  }, []);
  
  // 선택된 지역에 따라 시군구 데이터 업데이트
  useEffect(() => {
    setLoading(true);
    if (selectedRegion) {
      const citiesForRegion = getCitiesByRegion(selectedRegion);
      setCities([
        { value: '', label: '시군구' },
        ...citiesForRegion
      ]);
    } else {
      setCities([{ value: '', label: '시군구' }]);
    }
    setLoading(false);
  }, [selectedRegion]);
  
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
              {regions.map(region => (
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
              disabled={!selectedRegion || cities.length <= 1 || loading}
            >
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
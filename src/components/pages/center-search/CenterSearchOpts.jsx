import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '@/utils/api';

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
    const fetchRegions = async () => {
      try {
        const response = await axiosInstance.get('/regions');
        setRegions([
          { value: '', label: '광역시/도' },
          ...response.data
        ]);
      } catch (err) {
        console.error('지역 목록 조회 실패:', err);
        setRegions([{ value: '', label: '광역시/도' }]);
      }
    };
    
    fetchRegions();
  }, []);
  
  // 선택된 지역에 따라 시군구 데이터 업데이트
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      if (selectedRegion) {
        try {
          const response = await axiosInstance.get(`/regions/${selectedRegion}/cities`);
          setCities([
            { value: '', label: '시군구' },
            ...response.data
          ]);
        } catch (err) {
          console.error('시군구 목록 조회 실패:', err);
          setCities([{ value: '', label: '시군구' }]);
        }
      } else {
        setCities([{ value: '', label: '시군구' }]);
      }
      setLoading(false);
    };
    
    fetchCities();
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
              {regions.map((region, index) => (
                <option key={`region-${region.value}-${index}`} value={region.value}>
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
              {cities.map((city, index) => (
                <option key={`city-${city.value}-${index}`} value={city.value}>
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
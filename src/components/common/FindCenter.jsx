import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regionData, getCitiesByRegion } from '@/utils/regionData';

const FindCenter = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('광역시/도');
  const [selectedCity, setSelectedCity] = useState('시군구');

  useEffect(() => {
    setRegions(regionData);
    // 초기 시군구 데이터 설정
    setCities([{ value: '시군구', label: '시군구' }]);
  }, []);

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity('시군구');
    
    // 새로운 시군구 데이터 가져오기
    if (region && region !== '광역시/도') {
      const citiesForRegion = getCitiesByRegion(region);
      setCities([{ value: '시군구', label: '시군구' }, ...citiesForRegion]);
    } else {
      setCities([{ value: '시군구', label: '시군구' }]);
    }
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    if (selectedRegion !== '광역시/도' && selectedCity !== '시군구') {
      // 서비스 센터 검색 결과 페이지로 이동
      navigate(`/center-search?region=${selectedRegion}&city=${selectedCity}`);
    }
  };

  return (
    <section id="main-center-search">
      <div className="inner">
        <h2>서비스 센터 찾기</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="sh-box">
            <ul className="ip-list1">
              <li>
                <select 
                  name="region" 
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                <select 
                  name="city" 
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </li>
              <li className="btn">
                <button 
                  type="button" 
                  className="hgbtn blue02"
                  onClick={handleSearch}
                >
                  찾기
                </button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FindCenter;

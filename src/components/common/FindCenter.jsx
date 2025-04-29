import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/api';

const FindCenter = () => {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('광역시/도');
  const [selectedCity, setSelectedCity] = useState('시군구');

  // 지역 목록 가져오기
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axiosInstance.get('/regions');
        setRegions([
          { value: '광역시/도', label: '광역시/도' },
          ...response.data
        ]);
      } catch (err) {
        console.error('지역 목록 조회 실패:', err);
        setRegions([{ value: '광역시/도', label: '광역시/도' }]);
      }
    };
    
    fetchRegions();
    // 초기 시군구 데이터 설정
    setCities([{ value: '시군구', label: '시군구' }]);
  }, []);

  const handleRegionChange = async (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity('시군구');
    
    // 새로운 시군구 데이터 가져오기
    if (region && region !== '광역시/도') {
      try {
        const response = await axiosInstance.get(`/regions/${region}/cities`);
        setCities([{ value: '시군구', label: '시군구' }, ...response.data]);
      } catch (err) {
        console.error('시군구 목록 조회 실패:', err);
        setCities([{ value: '시군구', label: '시군구' }]);
      }
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
                  {regions.map((region, index) => (
                    <option key={`region-${region.value}-${index}`} value={region.value}>
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
                  {cities.map((city, index) => (
                    <option key={`city-${city.value}-${index}`} value={city.value}>
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

export { FindCenter };
export default FindCenter;

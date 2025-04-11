import React, { useState, useEffect } from 'react';
import useApi from '../utils/useApi';
import apiService from '../utils/api';

const ServiceCenterList = () => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [cities, setCities] = useState([]);
  
  // 지역 목록 데이터 가져오기
  const { 
    data: regions = [], 
    loading: regionsLoading 
  } = useApi('/regions', {}, true);
  
  // 서비스센터 데이터 가져오기
  const { 
    data: centers = [], 
    loading, 
    error,
    updateParams,
    fetchData
  } = useApi('/service-centers', {
    region: selectedRegion,
    city: selectedCity,
    keyword: keyword
  });
  
  // 지역 선택 시 시군구 목록 가져오기
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedRegion) {
        setCities([]);
        return;
      }
      
      try {
        const response = await apiService.getCitiesByRegion(selectedRegion);
        setCities(response.data || []);
      } catch (err) {
        console.error('시군구 목록 조회 실패:', err);
        setCities([]);
      }
    };
    
    fetchCities();
  }, [selectedRegion]);
  
  // 지역 선택 변경 핸들러
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedCity(''); // 지역이 변경되면 시군구 초기화
    
    // API 파라미터 업데이트
    updateParams({ 
      region,
      city: ''
    });
  };
  
  // 시군구 선택 변경 핸들러
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    
    // API 파라미터 업데이트
    updateParams({ city });
  };
  
  // 키워드 검색 핸들러
  const handleSearch = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.keyword.value;
    setKeyword(searchKeyword);
    
    // API 파라미터 업데이트
    updateParams({ keyword: searchKeyword });
  };
  
  // 로딩 중 표시
  if (loading) {
    return <div className="loading">데이터를 불러오는 중입니다...</div>;
  }
  
  // 에러 표시
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => fetchData()} className="retry-button">다시 시도</button>
      </div>
    );
  }
  
  return (
    <div className="service-center-container">
      <h2>서비스 센터 찾기</h2>
      
      <div className="search-options">
        {/* 지역 선택 */}
        <div className="select-group">
          <label htmlFor="region-select">지역 선택</label>
          <select 
            id="region-select" 
            value={selectedRegion} 
            onChange={handleRegionChange}
            disabled={regionsLoading}
          >
            <option value="">전체 지역</option>
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* 시군구 선택 (지역 선택 시 활성화) */}
        <div className="select-group">
          <label htmlFor="city-select">시군구 선택</label>
          <select 
            id="city-select" 
            value={selectedCity} 
            onChange={handleCityChange}
            disabled={!selectedRegion || cities.length === 0}
          >
            <option value="">전체 시군구</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* 키워드 검색 */}
        <form className="keyword-search" onSubmit={handleSearch}>
          <input
            type="text"
            name="keyword"
            placeholder="검색어를 입력하세요"
            defaultValue={keyword}
          />
          <button type="submit">검색</button>
        </form>
      </div>
      
      {/* 검색 결과 */}
      {centers.length === 0 ? (
        <p className="no-results">검색 결과가 없습니다.</p>
      ) : (
        <div className="center-list">
          {centers.map((center) => (
            <div key={center.id} className="center-item">
              <h3>{center.name}</h3>
              <div className="center-info">
                <p>
                  <strong>주소:</strong> {center.address}
                </p>
                <p>
                  <strong>연락처:</strong> {center.phone}
                </p>
                {center.time && (
                  <p>
                    <strong>영업시간:</strong> {center.time}
                  </p>
                )}
                {center.lunchtime && (
                  <p>
                    <strong>점심시간:</strong> {center.lunchtime}
                  </p>
                )}
                {center.desc && (
                  <p className="center-desc">{center.desc}</p>
                )}
                {center.src && (
                  <a
                    href={center.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="center-link"
                  >
                    상세정보 보기
                  </a>
                )}
              </div>
              
              {center.image && (
                <div className="center-image">
                  <img src={center.image} alt={center.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceCenterList; 
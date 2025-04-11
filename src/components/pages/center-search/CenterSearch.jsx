import React, { useState, useEffect } from 'react';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import CenterSearchOpts from './CenterSearchOpts';
import LocalMap from './LocalMap';
import CenterList from './CenterList';
import apiService from '@/utils/api';

const CenterSearch = () => {
  // 지역 및 필터 상태 관리
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 지역 선택 시 시군구 목록 가져오기
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedRegion || selectedRegion === '광역시/도') {
        setCities([]);
        return;
      }
      
      try {
        setLoading(true);
        const response = await apiService.getCitiesByRegion(selectedRegion);
        setCities(response.data || []);
      } catch (err) {
        console.error('시군구 목록 조회 실패:', err);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCities();
  }, [selectedRegion]);
  
  // 지역 선택 변경 핸들러
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedCity(''); // 지역이 변경되면 시군구 초기화
  };
  
  // 시군구 선택 변경 핸들러
  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="서비스 센터 찾기" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="서비스 센터 찾기"
            description="서비스를 받기 위해서 고객님께서 원하시는 지역을 선택하시면 가까운 서비스 센터를 찾으실 수 있습니다."
          />

          <div className="center-search-wrap clearfix">
            <LocalMap selectedRegion={selectedRegion} />
            <div className="opts-list-box">
              <CenterSearchOpts 
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
                cities={cities}
                loading={loading}
                onRegionChange={handleRegionChange}
                onCityChange={handleCityChange}
              />
              <CenterList 
                selectedRegion={selectedRegion}
                selectedCity={selectedCity}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CenterSearch;
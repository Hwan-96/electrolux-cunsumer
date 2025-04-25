import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import CenterSearchOpts from './CenterSearchOpts';
import LocalMap from './LocalMap';
import CenterList from './CenterList';

const CenterSearch = () => {
  // URL 파라미터 처리
  const [searchParams] = useSearchParams();
  
  // 지역 및 필터 상태 관리
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  
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
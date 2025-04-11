import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import PopupTitle from './PopupTitle';
import { centerAdmin } from '@/utils/data.js';

const ContentContainer = styled.div`
  display: flex;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const IframeContainer = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 800px;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }
`;

const InfoList = styled.dl`
  margin: 0;
  padding: 10px 0;
  flex: 1;
  font-size: 12px;
  
  dt:not(:first-child) {
    margin: 0 15px;
    padding: 0 10px;
    font-size: 13px;
    background-color: #BCBCBC;
    color: #fff;
    font-weight: 700;
    height: 27px;
    line-height: 27px;
    border-radius: 5px;
  }
  
  dt:first-child {
    text-align: center;
    margin-bottom: 10px;
    
    img {
      max-width: 100%;
      height: auto;
    }
  }
  
  dd {
    padding: 10px 15px;
    line-height: 1.4;
  }
`;

const MapContainer = styled.div`
  flex: 4;
  margin: 20px;
  margin-left: 0;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  min-height: 250px;
  
  @media (max-width: 767px) {
    margin: 15px;
  }
`;

const CenterInfo = ({ isOpen, onClose, center }) => {
  const [centerData, setCenterData] = useState(null);
  const [isWiniaCenter, setIsWiniaCenter] = useState(false);

  useEffect(() => {
    if (center) {
      // 센터 ID나 이름을 기준으로 centerAdmin 배열에서 일치하는 센터 데이터 찾기
      const foundCenter = centerAdmin.find(item => item.name === center.name || item.id === center.id);
      
      if (foundCenter) {
        setCenterData(foundCenter);
        // 위니아에이드 센터인지 확인 (대소문자 구분 없이)
        setIsWiniaCenter(
          foundCenter.name?.toLowerCase().includes('위니아') || 
          foundCenter.name?.toLowerCase().includes('winia')
        );
      } else {
        // 일치하는 데이터가 없을 경우 첫번째 데이터 사용
        setCenterData(centerAdmin[0]);
        setIsWiniaCenter(
          centerAdmin[0]?.name?.toLowerCase().includes('위니아') || 
          centerAdmin[0]?.name?.toLowerCase().includes('winia')
        );
      }
    }
  }, [center]);

  if (!center || !centerData) return null;

  if (isWiniaCenter) {
    return (
      <Popup isOpen={isOpen} onClose={onClose}>
        <PopupTitle>{centerData.name}</PopupTitle>
        <IframeContainer>
          <iframe 
            src={centerData.src} 
            title={`${centerData.name} 상세정보`}
            allowFullScreen
          />
        </IframeContainer>
      </Popup>
    );
  }

  // 일반 센터인 경우
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupTitle>{centerData.name}</PopupTitle>
      <ContentContainer>
        <InfoList>
          <dt>{centerData.image && <img src={centerData.image} alt={`${centerData.name} 소장 이미지`} />}</dt>
          <dd>{centerData.desc}</dd>

          <dt>센터명</dt>
          <dd>{centerData.name}</dd>
          
          <dt>주소</dt>
          <dd>{centerData.address}</dd>
          
          <dt>전화번호</dt>
          <dd>{centerData.phone}</dd>
          
          <dt>영업시간</dt>
          <dd>{centerData.time}</dd>
          
          <dt>점심시간</dt>
          <dd>{centerData.lunchtime}</dd>
          
          <dt>휴무일</dt>
          <dd>{centerData.holiday}</dd>
        </InfoList>
        
        <MapContainer>
          "지도가 표시될 영역입니다."
        </MapContainer>
      </ContentContainer>
    </Popup>
  );
};

export default CenterInfo; 
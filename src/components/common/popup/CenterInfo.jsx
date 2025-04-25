import React from 'react';
import styled from 'styled-components';
import Popup from './Popup';
import PopupTitle from './PopupTitle';

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

const InfoContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  p {
    text-align: center;
    padding: 20px;
    color: #666;
    font-size: 16px;
  }
`;

const CenterInfo = ({ isOpen, onClose, center }) => {
  if (!center) return null;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <PopupTitle>{center.name}</PopupTitle>
      {center.url ? (
        <IframeContainer>
          <iframe 
            src={center.url} 
            title={`${center.name} 상세정보`}
            allowFullScreen
          />
        </IframeContainer>
      ) : (
        <InfoContainer>
          <p>
            이 서비스 센터는 약도 정보가 없습니다.<br />
            전화번호: {center.phone || '정보 없음'}
          </p>
        </InfoContainer>
      )}
    </Popup>
  );
};

export default CenterInfo; 
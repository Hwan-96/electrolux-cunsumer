import { React } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const PopupContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PopupContent = styled.div`
  width: 100%;
  height: 70vh;
`;

const CenterPopup = ({ isOpen, onClose, centerInfo }) => {
  if (!centerInfo) return null;

  return (
    <Modal 
      open={isOpen} 
      onCancel={onClose} 
      footer={null}
      width={1200}
      height={800}
      title={centerInfo.centerNm}
    >
      <PopupContainer>
        <PopupContent>
          <iframe 
            src={centerInfo.url} 
            width="100%" 
            height="100%" 
            frameBorder="0"
            title={`${centerInfo.url} 약도`}
          />
        </PopupContent>
      </PopupContainer>
    </Modal>
  );
};

export default CenterPopup;

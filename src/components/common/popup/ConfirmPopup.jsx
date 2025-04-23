import React from 'react';
import styled from 'styled-components';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const PopupTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 18px;
`;

const PopupMessage = styled.p`
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &.cancel {
    background-color: #f0f0f0;
    color: #333;
  }

  &.confirm {
    background-color: #1a2753;
    color: white;
  }
`;

const ConfirmPopup = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContent>
        <PopupTitle>{title}</PopupTitle>
        <PopupMessage>{message}</PopupMessage>
        <ButtonContainer>
          <Button className="cancel" onClick={onClose}>
            취소
          </Button>
          <Button className="confirm" onClick={onConfirm}>
            확인
          </Button>
        </ButtonContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default ConfirmPopup; 
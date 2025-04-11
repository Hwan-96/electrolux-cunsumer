import React, { useEffect } from 'react';
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
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;

  &.max_1200{
    max-width: 1200px;
  }
  &.max_700{
    max-width: 700px;
  }
  &.max_500{
    max-width: 500px;
  }
  &.max_300{
    max-width: 300px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px;
  color: #fff;
`;

const Popup = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // 팝업이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 원래 padding-right 값 저장
      const originalPaddingRight = document.body.style.paddingRight;
      
      // 스크롤바 너비 계산
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // 스크롤바 너비만큼 padding-right 추가 (레이아웃 이동 방지)
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // 클린업 함수
      return () => {
        // 팝업이 닫힐 때 원래 상태로 복원
        document.body.style.overflow = '';
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()} className="max_1200">
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;

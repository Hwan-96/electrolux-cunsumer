import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  font-size: 18px;
  color: #333;
`;

const Message = styled.p`
  margin: 0 0 20px 0;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &.primary {
    background-color: #007bff;
    color: white;
  }
  
  &.secondary {
    background-color: #6c757d;
    color: white;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const LogoutPrompt = ({ onExtendSession, onLogout }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>세션 만료 예정</Title>
        <Message>
          현재 세션이 곧 만료됩니다. 계속 사용하시려면 세션을 연장해주세요.
        </Message>
        <ButtonGroup>
          <Button className="secondary" onClick={onLogout}>
            로그아웃
          </Button>
          <Button className="primary" onClick={onExtendSession}>
            세션 연장
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogoutPrompt; 
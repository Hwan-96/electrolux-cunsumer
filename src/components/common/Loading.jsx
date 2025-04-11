import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.span`
  font-size: 14px;
  color: inherit;
`;

const Loading = ({ text = '로딩 중...', showText = true }) => {
  return (
    <LoadingContainer>
      <Spinner />
      {showText && <Text>{text}</Text>}
    </LoadingContainer>
  );
};

export default Loading; 
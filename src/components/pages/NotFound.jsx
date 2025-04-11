import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 스타일드 컴포넌트 정의
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: "나눔고딕", 'NanumGothic', "맑은고딕", "Malgun Gothic", sans-serif;
`;

const ErrorCode = styled.h1`
  font-size: 9rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(45deg, #192452, #041e50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 10px rgba(25, 36, 82, 0.1);
  letter-spacing: -3px;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0 2rem;
  color: #333;
  letter-spacing: -1px;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 500px;
  margin-bottom: 2rem;
  line-height: 1.6;
  letter-spacing: -0.5px;
  word-break: keep-all;
`;

const HomeButton = styled(Link)`
  padding: 0 2rem;
  height: 50px;
  line-height: 48px;
  background-color: #192452;
  color: white !important;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0;
  transition: all 0.3s ease;
  text-align: center;
  font-size: 1rem;
  border: 1px solid #192452;
  
  &:hover {
    background-color: #041e50;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>페이지를 찾을 수 없습니다</ErrorTitle>
      <ErrorDescription>
        죄송합니다. 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        올바른 URL을 입력했는지 확인해주세요.
      </ErrorDescription>
      <HomeButton to="/">홈으로 돌아가기</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;

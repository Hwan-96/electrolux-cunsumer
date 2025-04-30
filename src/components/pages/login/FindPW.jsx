import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import styled from 'styled-components';

const StyledForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;
`;

const StyledInput = styled(Input)`
  margin-bottom: 16px;
`;

const FindPW = () => {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id || !email) {
      message.error('ID와 이메일을 모두 입력해주세요.');
      return;
    }
    // API 호출 로직 추가
    message.success('비밀번호 찾기 요청이 전송되었습니다.');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>비밀번호 찾기</h2>
      <StyledInput
        type="text"
        placeholder="ID를 입력하세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <StyledInput
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="primary" htmlType="submit" block>
        비밀번호 찾기
      </Button>
    </StyledForm>
  );
};

export default FindPW;
import React, { useState } from 'react';
import { Input, Select, Button, message } from 'antd';
import styled from 'styled-components';
import InputNum from '@/components/common/InputNum';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ContentsWrap = styled.div`
  margin-top: 40px;
`;

const FormWrap = styled.div`
  margin: 0 auto;
`;

const FormTitle = styled.div`
  font-size: 24px;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid #192452;
  text-align: left;
  font-weight: bold;
  margin-bottom: 30px;
`;

const FindWrap = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
`;

const PhoneAuth = styled.div`
  flex: 1;
  padding: 30px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  text-align: center;

  .top_tit {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .txt01 {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  .img {
    margin: 20px 0;
    img {
      max-width: 100px;
    }
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #192452;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #192452;
    }
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 30px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .top_tit {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .form {
    li {
      display: flex;
      margin-bottom: 15px;
      align-items: center;

      dt:first-child {
        width: 80px;
        color: #666;
      }

      dt:last-child {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #192452;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    &:hover {
      background-color: #192452;
    }
  }
`;

const BottomText = styled.div`
  color: #666;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;

  ul {
    margin-bottom: 5px;
  }
`;

const FindID = () => {
  const [formData, setFormData] = useState({
    name: '',
    hp1: '',
    hp2: '',
    hp3: '',
    emailId: '',
    emailDomain: '',
    selectEmailDomain: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailDomainChange = (value) => {
    setFormData(prev => ({
      ...prev,
      selectEmailDomain: value,
      emailDomain: value
    }));
  };

  const handlePhoneAuth = () => {
    message.info('휴대폰 인증 기능은 준비 중입니다.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.hp2 || !formData.hp3 || !formData.emailId || !formData.emailDomain) {
      message.error('모든 필드를 입력해주세요.');
      return;
    }
    message.success('ID 찾기 요청이 전송되었습니다.');
  };

  return (
    <Container>
      <ContentsWrap>
        <FormWrap>
          <FormTitle>아이디를 찾을 방법을 선택해주세요.</FormTitle>
          
          <FindWrap>
            <PhoneAuth>
              <ul className="top_tit">실명인증으로 아이디 찾기</ul>
              <ul className="txt01">
                고객님 명의로 등록된 휴대폰을 통해<br />인증을 받으실 수 있습니다.
              </ul>
              <ul className="img">
                <img src="/join/img_phone.png" alt="phone" />
              </ul>
              <ul className="btn" onClick={handlePhoneAuth}>
                휴대폰 인증하기
              </ul>
            </PhoneAuth>

            <InfoSection>
              <ul className="top_tit">내 회원정보로 아이디 찾기</ul>
              <form onSubmit={handleSubmit}>
                <ul className="form">
                  <li>
                    <dt>이름</dt>
                    <dt>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </dt>
                  </li>
                  <li>
                    <dt>휴대폰</dt>
                    <dt>
                      <InputNum
                        name="hp1"
                        value={formData.hp1}
                        onChange={handleInputChange}
                        maxLength={3}
                      />
                      -
                      <InputNum
                        name="hp2"
                        value={formData.hp2}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                      -
                      <InputNum
                        name="hp3"
                        value={formData.hp3}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                    </dt>
                  </li>
                  <li>
                    <dt>이메일</dt>
                    <dt>
                      <Input
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleInputChange}
                      />
                      @
                      <Input
                        name="emailDomain"
                        value={formData.emailDomain}
                        onChange={handleInputChange}
                        disabled={formData.selectEmailDomain !== ''}
                      />
                      <Select
                        name="selectEmailDomain"
                        value={formData.selectEmailDomain}
                        onChange={handleEmailDomainChange}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="">직접입력</Select.Option>
                        <Select.Option value="naver.com">naver.com</Select.Option>
                        <Select.Option value="gmail.com">gmail.com</Select.Option>
                        <Select.Option value="daum.net">daum.net</Select.Option>
                      </Select>
                    </dt>
                  </li>
                </ul>
                <ul className="btn" onClick={handleSubmit}>
                  확인
                </ul>
              </form>
            </InfoSection>
          </FindWrap>

          <BottomText>
            <ul>※ 입력하신 정보는 본인확인용으로 사용됩니다.</ul>
            <ul>※ 타인의 정보 및 주민등록번호를 부정하게 사용하는 경우 3년 이하의 징역 또는 1천만원 이하의 벌금에 처해지게 됩니다.</ul>
          </BottomText>
        </FormWrap>
      </ContentsWrap>
    </Container>
  );
};

export default FindID;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input, Select, Modal, message } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { getMockDataById, updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_MemberList';
import styled from 'styled-components';
import DaumPost from '@/components/common/popup/DaumPost';
import useDetail from '@/hooks/useDetail';

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const AddressWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const AddressField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ZipCodeInput = styled(Input)`
  width: 100px;
`;

const TextValue = styled.div`
  padding: 4px 0;
`;

const MemberDetail = () => {
  const { id } = useParams();
  
  // useDetail 훅 사용
  const {
    detail,
    loading,
    handleDelete,
    handleCancel
  } = useDetail({
    id,
    mockData: [getMockDataById(parseInt(id))].filter(Boolean),
    updateMockData,
    deleteMockData,
    listPath: '/mng/mem/list'
  });

  // 로컬 상태 관리 (주소, 수신동의를 위한 추가 상태)
  const [localData, setLocalData] = useState({
    memAddr: '',          // 주소
    memAddrDetail: '',    // 상세주소
    memZipCode: '',       // 우편번호
    smsYn: 'N',           // SMS 수신동의
    emailYn: 'N'          // 이메일 수신동의
  });

  // detail 데이터가 로드되면 로컬 상태 업데이트
  useEffect(() => {
    if (detail) {
      setLocalData({
        memAddr: detail.memAddr || '',
        memAddrDetail: detail.memAddrDetail || '',
        memZipCode: detail.memZipCode || '',
        smsYn: detail.smsYn || 'N',
        emailYn: detail.emailYn || 'N'
      });
    }
  }, [detail]);

  // 로컬 데이터 변경 처리
  const handleLocalDataChange = (key, value) => {
    setLocalData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 주소 설정
  const handleAddressChange = (addressData) => {
    setLocalData(prev => ({
      ...prev,
      memAddr: addressData.address,
      memZipCode: addressData.zipCode,
      memAddrDetail: '' // 상세주소 초기화
    }));
  };

  // 저장 처리 (커스텀)
  const handleSave = () => {
    try {
      // 기존 데이터와 로컬 데이터 병합
      const updatedData = {
        ...detail,
        ...localData
      };
      
      // useDetail의 handleSave 대신 직접 호출
      updateMockData(parseInt(id), updatedData);
      message.success('저장되었습니다.');
      handleCancel(); // 목록으로 이동
    } catch (error) {
      console.error('Error saving member:', error);
      message.error('저장 중 오류가 발생했습니다.');
    }
  };

  if (loading || !detail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <CardTitle>기본정보</CardTitle>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="회원구분">
            <TextValue>
              {detail.memTp === 'U' ? '울트라클럽' : '일반회원'}
            </TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="상태">
            <TextValue>{detail.memStatus}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="아이디">
            <TextValue>{detail.memId}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="이름">
            <TextValue>{detail.memNm}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="전화번호">
            <TextValue>{detail.memTel}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="이메일">
            <TextValue>{detail.memEmail}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="주소">
            <AddressWrapper>
              <AddressField>
                <ZipCodeInput 
                  value={localData.memZipCode}
                  disabled
                  placeholder="우편번호"
                />
                <DaumPost setAddress={handleAddressChange} />
              </AddressField>
              <Input 
                value={localData.memAddr}
                onChange={(e) => handleLocalDataChange('memAddr', e.target.value)}
                placeholder="주소"
              />
              <Input 
                value={localData.memAddrDetail || ''}
                onChange={(e) => handleLocalDataChange('memAddrDetail', e.target.value)}
                placeholder="상세주소를 입력하세요"
              />
            </AddressWrapper>
          </Descriptions.Item>
          <Descriptions.Item label="SMS 수신동의">
            <Radio.Group
              value={localData.smsYn}
              onChange={(e) => handleLocalDataChange('smsYn', e.target.value)}
            >
              <Radio value="Y">동의</Radio>
              <Radio value="N">미동의</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="이메일 수신동의">
            <Radio.Group
              value={localData.emailYn}
              onChange={(e) => handleLocalDataChange('emailYn', e.target.value)}
            >
              <Radio value="Y">동의</Radio>
              <Radio value="N">미동의</Radio>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card style={{ marginBottom: '20px' }}>
        <CardTitle>추가정보</CardTitle>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="생년월일">
            <TextValue>{detail.birth}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="성별">
            <TextValue>{detail.gender}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="결혼유무">
            <TextValue>{detail.marriage}</TextValue>
          </Descriptions.Item>
          <Descriptions.Item label="자녀유무">
            <TextValue>{detail.childYn === 'Y' ? '있음' : '없음'}</TextValue>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {detail.memTp === 'N' ? (
        <Card style={{ marginBottom: '20px' }}>
          <CardTitle>등록제품정보(비울트라)</CardTitle>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="구매제품">
              <TextValue>{detail.buyPrd}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="제품시리얼번호">
              <TextValue>{detail.PrdSid}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="구매시기">
              <TextValue>{detail.buyDate}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="구매처/지점명">
              <TextValue>{detail.buyStore}</TextValue>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <Card style={{ marginBottom: '20px' }}>
          <CardTitle>등록제품정보(울트라클럽)</CardTitle>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="모델명">
              <TextValue>{detail.modelNm || detail.buyPrd}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="상태">
              <TextValue>{detail.status}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="제품시리얼번호">
              <TextValue>{detail.PrdSid}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="KIT SN">
              <TextValue>{detail.kitSn}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="구매시기">
              <TextValue>{detail.buyDate}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="울트라클럽 종료일">
              <TextValue>{detail.ultraEndDate}</TextValue>
            </Descriptions.Item>
            <Descriptions.Item label="구매처/지점명">
              <TextValue>{detail.buyStore}</TextValue>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}

      <ButtonGroup>
        <ButtonGroupLeft>
          <Button danger onClick={handleDelete}>삭제</Button>
        </ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleSave}>확인</CommonButton>
        <Button onClick={handleCancel}>취소</Button>
        <ButtonGroupRight>
          <Button onClick={handleCancel}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </>
  );
};

export default MemberDetail; 
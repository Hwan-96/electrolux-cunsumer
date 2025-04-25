import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';
import MOCK_DATA, { updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_Induction';
import { CommonButton } from '@/components/admin/common/Button';
import useDetail from '@/hooks/useDetail';

const InductionDetail = () => {
  const { id } = useParams();
  const {
    detail,
    loading,
    status,
    handleStatusChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useDetail({
    id,
    mockData: MOCK_DATA,
    updateMockData,
    deleteMockData,
    listPath: '/mng/svc/indct',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions
          bordered column={2}
          labelStyle={{ width: '10%' }}
        >
          <Descriptions.Item label="처리상태" span={2}>
            <Radio.Group value={status} onChange={handleStatusChange}>
              <Radio value="completed">처리완료</Radio>
              <Radio value="pending">처리대기</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="작성일">
            {detail.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="구매처">
            {detail.store}
          </Descriptions.Item>
          <Descriptions.Item label="구매자명">
            {detail.consumerNm}
          </Descriptions.Item>
          <Descriptions.Item label="구매자연락처">
            {detail.phone}
          </Descriptions.Item>
          <Descriptions.Item label="구매일">
            {detail.buyAt}
          </Descriptions.Item>
          <Descriptions.Item label="모델명">
            {detail.modelNm}
          </Descriptions.Item>
          <Descriptions.Item label="설치희망일">
            {detail.installAt}
          </Descriptions.Item>
          <Descriptions.Item label="설치대상자연락처">
            {detail.installNum}
          </Descriptions.Item>
          <Descriptions.Item label="설치대상자">
            {detail.installNm}
          </Descriptions.Item>
          <Descriptions.Item label="주방형태">
            {detail.kitchenType}
          </Descriptions.Item>
          <Descriptions.Item label="설치대상자주소" span={2}>
            {detail.installAddress}
          </Descriptions.Item>
          <Descriptions.Item label="요청사항" span={2}>
            {detail.request}
          </Descriptions.Item>
        </Descriptions>
      </Card>

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

export default InductionDetail;

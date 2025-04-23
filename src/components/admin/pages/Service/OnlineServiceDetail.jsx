import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input, Image } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';
import MOCK_DATA, { updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_Online';
import { CommonButton } from '@/components/admin/common/Button';
import styled from 'styled-components';
import useDetail from '@/hooks/useDetail';

const ImageGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OnlineServiceDetail = () => {
  const { id } = useParams();
  const {
    detail,
    loading,
    status,
    answer,
    handleStatusChange,
    handleAnswerChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useDetail({
    id,
    mockData: MOCK_DATA,
    updateMockData,
    deleteMockData,
    listPath: '/mng/svc/onCns',
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
        <Descriptions bordered column={1}>
          <Descriptions.Item label="처리상태">
            <Radio.Group value={status} onChange={handleStatusChange}>
              <Radio value="completed">처리완료</Radio>
              <Radio value="pending">처리대기</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="등록일">
            {detail.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="고객명">
            {detail.consumerNm}
          </Descriptions.Item>
          <Descriptions.Item label="연락처">
            {detail.phone}
          </Descriptions.Item>
          <Descriptions.Item label="문의내용">
            {detail.content}
          </Descriptions.Item>
          <Descriptions.Item label="첨부파일">
            {detail.file && (
              <Image.PreviewGroup>
                <ImageGroup>
                  {detail.file.map((file, index) => (
                    <Image
                      key={index}
                      width={200}
                      src={file}
                      alt="첨부된 이미지"
                    />
                  ))}
                </ImageGroup>
              </Image.PreviewGroup>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="상담사">
            <Input.TextArea 
              rows={4} 
              value={answer}
              onChange={handleAnswerChange}
              placeholder="답변을 입력하세요"
            />
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

export default OnlineServiceDetail;

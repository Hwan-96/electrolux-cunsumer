import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import MOCK_DATA, { updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_Counseling';
import useDetail from '@/hooks/useDetail';
import QuillEditor from '@/components/admin/common/QuillEditor';

const CounselingDetail = () => {
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
    listPath: '/mng/svc/qna',
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
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
          <Descriptions.Item label="처리상태">
            <Radio.Group value={status} onChange={handleStatusChange}>
              <Radio value="completed">답변완료</Radio>
              <Radio value="pending">답변대기</Radio>
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
          <Descriptions.Item label="이메일">
            {detail.email}
          </Descriptions.Item>
          <Descriptions.Item label="모델명">
            {[detail.modelCtgr1, detail.modelCtgr2, detail.modelCtgr3, detail.modelCtgr4].filter(Boolean).join(' > ')}
          </Descriptions.Item>
          <Descriptions.Item label="문의 카테고리">
            {[detail.ctgr1, detail.ctgr2, detail.ctgr3, detail.ctgr4].filter(Boolean).join(' > ')}
          </Descriptions.Item>
          <Descriptions.Item label="문의내용">
            {detail.content}
          </Descriptions.Item>
          <Descriptions.Item label="답변">
            <QuillEditor
              value={answer}
              onChange={handleAnswerChange}
              placeholder="답변을 입력하세요"
              height="300px"
              editorHeight="250px"
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

export default CounselingDetail;

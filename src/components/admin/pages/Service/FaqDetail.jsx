import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, message } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { getMockData, updateMockData, deleteMockData, addMockData } from '@/components/admin/mock/MOCK_FAQ';
import useDetail from '@/hooks/useDetail';
import QuillEditor from '@/components/admin/common/QuillEditor';

const FaqDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewMode = id === 'new';
  
  const initialNewState = {
    product: 'all',
    question: '',
    answer: '',
    ctgr: '통합',
    q: '',
    a: '',
    view: 0
  };

  const [newItem, setNewItem] = useState(initialNewState);

  const {
    detail,
    loading,
    product,
    question,
    answer,
    handleProductChange,
    handleQuestionChange,
    handleAnswerChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useDetail({
    id: isNewMode ? null : id,
    mockData: getMockData(),
    updateMockData,
    deleteMockData,
    listPath: '/mng/svc/faq',
  });

  // 새 글 작성 모드 처리 함수
  const handleNewItemStatusChange = (e) => {
    setNewItem({...newItem, product: e.target.value});
  };

  const handleNewItemQuestionChange = (content) => {
    setNewItem({...newItem, question: content, q: content});
  };

  const handleNewItemAnswerChange = (content) => {
    setNewItem({...newItem, answer: content, a: content});
  };

  const handleNewItemSave = () => {
    if (!newItem.question) {
      message.error('질문을 입력하세요');
      return;
    }

    try {
      // 필드명 매핑
      const productMap = {
        'all': '통합',
        'wireless': '무선청소기',
        'wired': '유선청소기',
        'robot': '로봇청소기',
        'household': '생활가전',
        'dishwasher': '식기세척기',
        'induction': '인덕션'
      };

      const saveData = {
        ...newItem,
        ctgr: productMap[newItem.product] || newItem.product,
        q: newItem.question,
        a: newItem.answer
      };

      addMockData(saveData);
      message.success('등록되었습니다');
      navigate('/mng/svc/faq');
    } catch {
      message.error('등록 실패');
    }
  };

  if (loading && !isNewMode) {
    return <div>Loading...</div>;
  }

  if (!detail && !isNewMode) {
    return <div>Not Found</div>;
  }

  // 새 글 작성 모드 렌더링
  if (isNewMode) {
    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
            <Descriptions.Item label="제품군">
              <Radio.Group value={newItem.product} onChange={handleNewItemStatusChange}>
                <Radio value="all">통합</Radio>
                <Radio value="wireless">무선청소기</Radio>
                <Radio value="wired">유선청소기</Radio>
                <Radio value="robot">로봇청소기</Radio>
                <Radio value="household">생활가전</Radio>
                <Radio value="dishwasher">식기세척기</Radio>
                <Radio value="induction">인덕션</Radio>
              </Radio.Group>
            </Descriptions.Item>
            <Descriptions.Item label="질문">
              <QuillEditor
                value={newItem.question}
                onChange={handleNewItemQuestionChange}
                placeholder="질문을 입력하세요"
                height="200px" 
                editorHeight="150px"
              />
            </Descriptions.Item>
            <Descriptions.Item label="답변">
              <QuillEditor
                value={newItem.answer}
                onChange={handleNewItemAnswerChange}
                placeholder="답변을 입력하세요"
                height="300px" 
                editorHeight="250px"
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <CommonButton type="primary" onClick={handleNewItemSave}>확인</CommonButton>
          <Button onClick={() => navigate('/mng/svc/faq')}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={() => navigate('/mng/svc/faq')}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>
      </>
    );
  }

    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
          <Descriptions.Item label="제품군">
            <Radio.Group value={product} onChange={handleProductChange}>
              <Radio value="all">통합</Radio>
              <Radio value="wireless">무선청소기</Radio>
              <Radio value="wired">유선청소기</Radio>
              <Radio value="robot">로봇청소기</Radio>
              <Radio value="household">생활가전</Radio>
              <Radio value="dishwasher">식기세척기</Radio>
              <Radio value="induction">인덕션</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="질문">
            <QuillEditor
              value={question}
              onChange={handleQuestionChange}
              placeholder="질문을 입력하세요"
              height="200px"
              editorHeight="150px"
            />
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

export default FaqDetail;

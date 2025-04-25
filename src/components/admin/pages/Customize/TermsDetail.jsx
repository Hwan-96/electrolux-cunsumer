import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Descriptions, Input, message, Modal } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';
import { CommonButton } from '@/components/admin/common/Button';
import MOCK_DATA, { 
  getTermById, 
  updateTerm,
  addTerm,
  deleteTerm,
  TAB_OPTIONS
} from '@/components/admin/mock/MOCK_Terms';
import QuillEditor from '@/components/admin/common/QuillEditor';
import styled from 'styled-components';

const EditorContainer = styled.div`
  height: 400px;
  margin-bottom: 50px;
`;

const TermsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState(null);
  const isNewMode = id === 'new';

  // URL 파라미터에서 활성 탭 가져오기
  const queryParams = new URLSearchParams(location.search);
  const activeTabFromUrl = queryParams.get('tab') || 'privacy';

  // 이용약관/개인정보처리방침 필드 상태
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tab, setTab] = useState(activeTabFromUrl);

  useEffect(() => {
    const fetchTerm = () => {
      setLoading(true);
      try {
        if (isNewMode) {
          // 신규 모드인 경우 기본값 설정
          setTerm(null);
          setTitle('');
          setContent('');
          // 탭은 URL 파라미터에서 가져온 값으로 설정
          setTab(activeTabFromUrl);
          setLoading(false);
          return;
        }
        
        // ID가 숫자인지 확인
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          message.error('유효하지 않은 ID입니다.');
          navigate('/mng/cstmz/terms');
          return;
        }
        
        // Mock 데이터에서 항목 가져오기
        const data = getTermById(numericId);
        
        if (!data) {
          message.error('항목을 찾을 수 없습니다.');
          navigate('/mng/cstmz/terms');
          return;
        }
        
        // 데이터 설정
        setTerm(data);
        setTitle(data.title);
        setContent(data.content);
        setTab(data.tab);
      } catch (error) {
        console.error('Error fetching term:', error);
        message.error('항목을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTerm();
  }, [id, navigate, isNewMode, activeTabFromUrl]);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 내용 변경 핸들러
  const handleContentChange = (value) => {
    setContent(value);
  };

  // 저장 핸들러
  const handleSave = () => {
    // 필수 필드 검증
    if (!title) {
      message.error('제목을 입력해주세요.');
      return;
    }
    
    if (!content) {
      message.error('내용을 입력해주세요.');
      return;
    }
    
    try {
      if (isNewMode) {
        // 신규 항목 추가
        const newTerm = {
          title,
          content,
          tab,
          author: '관리자'
        };
        
        addTerm(newTerm);
        message.success('항목이 성공적으로 추가되었습니다.');
      } else {
        // 기존 항목 업데이트
        const updatedTerm = {
          ...term,
          title,
          content
        };
        
        updateTerm(term.id, updatedTerm);
        message.success('항목이 성공적으로 수정되었습니다.');
      }
      
      navigate('/mng/cstmz/terms');
    } catch (error) {
      console.error('Error saving term:', error);
      message.error('저장 중 오류가 발생했습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = () => {
    if (isNewMode) {
      navigate('/mng/cstmz/terms');
      return;
    }
    
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 항목을 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        try {
          deleteTerm(term.id);
          message.success('항목이 성공적으로 삭제되었습니다.');
          navigate('/mng/cstmz/terms');
        } catch (error) {
          console.error('Error deleting term:', error);
          message.error('삭제 중 오류가 발생했습니다.');
        }
      }
    });
  };

  // 취소 핸들러
  const handleCancel = () => {
    navigate('/mng/cstmz/terms');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // 탭 레이블 가져오기
  const getTabLabel = () => {
    const option = TAB_OPTIONS.find(o => o.value === tab);
    return option ? option.label : '';
  };

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions bordered column={1}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="구분">
            {getTabLabel()}
          </Descriptions.Item>
          <Descriptions.Item label="제목">
            <Input value={title} onChange={handleTitleChange} placeholder="제목을 입력하세요" />
          </Descriptions.Item>
          <Descriptions.Item label="내용">
            <EditorContainer>
              <QuillEditor 
                value={content}
                onChange={handleContentChange}
                placeholder="내용을 입력하세요"
                height="400px"
                editorHeight="350px"
              />
            </EditorContainer>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ButtonGroup>
        <ButtonGroupLeft>
          {!isNewMode && <Button danger onClick={handleDelete}>삭제</Button>}
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

export default TermsDetail; 
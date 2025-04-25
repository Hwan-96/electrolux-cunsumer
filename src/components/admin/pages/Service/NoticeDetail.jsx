import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input, Upload, message } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { getMockData, updateMockData, deleteMockData, addMockData } from '@/components/admin/mock/MOCK_Notice';
import useDetail from '@/hooks/useDetail';
import { UploadOutlined } from '@ant-design/icons';
import QuillEditor from '@/components/admin/common/QuillEditor';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewMode = id === 'new';
  
  // 새 글 작성 모드용 초기 상태
  const initialNewState = {
    title: '',
    content: '',
    status: 'show',
    fileStatus: false,
    file: null,
    date: new Date().toISOString().split('T')[0]
  };

  const [newItem, setNewItem] = useState(initialNewState);

  const {
    detail,
    loading,
    status,
    handleStatusChange,
    handleTitleChange,
    handleContentChange,
    handleSave,
    handleDelete,
    handleCancel,
  } = useDetail({
    id: isNewMode ? null : id,
    mockData: getMockData(),
    updateMockData,
    deleteMockData,
    listPath: '/mng/svc/ntc',
  });

  // 새 글 작성 모드 처리 함수
  const handleNewItemStatusChange = (e) => {
    setNewItem({...newItem, status: e.target.value});
  };

  const handleNewItemTitleChange = (e) => {
    setNewItem({...newItem, title: e.target.value});
  };

  const handleNewItemContentChange = (content) => {
    setNewItem({...newItem, content: content});
  };

  const handleNewItemSave = () => {
    if (!newItem.title) {
      message.error('제목을 입력하세요');
      return;
    }

    try {
      addMockData(newItem);
      message.success('등록되었습니다');
      navigate('/mng/svc/ntc');
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
          <Descriptions bordered column={1}>
            <Descriptions.Item label="제품군">
              <Radio.Group value={newItem.status} onChange={handleNewItemStatusChange}>
                <Radio value="show">표시</Radio>
                <Radio value="hide">숨김</Radio>
              </Radio.Group>
            </Descriptions.Item>
            <Descriptions.Item label="제목">
              <Input value={newItem.title} onChange={handleNewItemTitleChange} placeholder="제목을 입력하세요" />
            </Descriptions.Item>
            <Descriptions.Item label="내용">
              <QuillEditor
                value={newItem.content}
                onChange={handleNewItemContentChange}
                placeholder="내용을 입력하세요"
                height="300px"
                editorHeight="250px"
              />
            </Descriptions.Item>
            <Descriptions.Item label="첨부파일">
              <Upload
                showUploadList={{
                  showDownloadIcon: true,
                  showRemoveIcon: true,
                }}
              >
                <Button icon={<UploadOutlined />}>첨부파일 업로드</Button>
              </Upload>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <ButtonGroupLeft>
          </ButtonGroupLeft>
          <CommonButton type="primary" onClick={handleNewItemSave}>확인</CommonButton>
          <Button onClick={() => navigate('/mng/svc/ntc')}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={() => navigate('/mng/svc/ntc')}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>
      </>
    );
  }

  // 첨부파일이 있을 경우 defaultFileList 형식으로 변환
  const defaultFileList = detail.file ? [{
    uid: detail.file.id, // 임시 ID
    name: detail.file.split('/').pop(), // 파일명 추출
    status: 'done',
    url: detail.file, // 파일 경로
  }] : [];

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions
          bordered column={1}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="제품군">
            <Radio.Group value={status} onChange={handleStatusChange}>
              <Radio value="show">표시</Radio>
              <Radio value="hide">숨김</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="제목">
            <Input value={detail.title} onChange={handleTitleChange} />
          </Descriptions.Item>
          <Descriptions.Item label="내용">
            <QuillEditor
              value={detail.content}
              onChange={handleContentChange}
              placeholder="내용을 입력하세요"
              height="300px"
              editorHeight="250px"
            />
          </Descriptions.Item>
          <Descriptions.Item label="첨부파일">
            <Upload
              defaultFileList={defaultFileList}
              showUploadList={{
                showDownloadIcon: true,
                showRemoveIcon: true,
              }}
            >
              <Button icon={<UploadOutlined />}>첨부파일 업로드</Button>
            </Upload>
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

export default NoticeDetail;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Input, Upload, DatePicker, message, ConfigProvider } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { updateMockData, deleteMockData, addMockData, getItemById } from '@/components/admin/mock/MOCK_Event';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ko_KR from 'antd/es/locale/ko_KR';
import QuillEditor from '@/components/admin/common/QuillEditor';

const { RangePicker } = DatePicker;

const EventListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewMode = id === 'new';
  
  // 새 글 작성 모드용 초기 상태
  const initialNewState = {
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    displayStartDate: '',
    displayEndDate: '',
    bannerImage: '',
    link: '',
    createdAt: new Date().toISOString().split('T')[0]
  };

  const [item, setItem] = useState(isNewMode ? initialNewState : getItemById(parseInt(id)));

  // 아이템이 없는 경우
  if (!isNewMode && !item) {
    return <div>아이템을 찾을 수 없습니다.</div>;
  }

  const handleInputChange = (field, value) => {
    setItem({...item, [field]: value});
  };

  const handleSave = () => {
    if (!item.title) {
      message.error('제목을 입력하세요');
      return;
    }

    try {
      if (isNewMode) {
        addMockData(item);
        message.success('등록되었습니다');
      } else {
        updateMockData(parseInt(id), item);
        message.success('수정되었습니다');
      }
      navigate('/mng/evnt/list');
    } catch {
      message.error(isNewMode ? '등록 실패' : '수정 실패');
    }
  };

  const handleDelete = () => {
    if (isNewMode) return;
    
    deleteMockData(parseInt(id));
    message.success('삭제되었습니다');
    navigate('/mng/evnt/list');
  };

  const handleCancel = () => {
    navigate('/mng/evnt/list');
  };

  const handleBannerUpload = (info) => {
    if (info.file.status === 'done') {
      handleInputChange('bannerImage', info.file.name); // 실제로는 서버에 업로드된 파일 경로를 저장
      message.success(`${info.file.name} 파일이 업로드되었습니다.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 파일 업로드 실패.`);
    }
  };

  // 진행기간 변경 핸들러
  const handlePeriodChange = (dates) => {
    if (dates && dates.length === 2) {
      setItem({
        ...item,
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD')
      });
    } else {
      setItem({
        ...item,
        startDate: '',
        endDate: ''
      });
    }
  };

  // 표시기간 변경 핸들러
  const handleDisplayPeriodChange = (dates) => {
    if (dates && dates.length === 2) {
      setItem({
        ...item,
        displayStartDate: dates[0].format('YYYY-MM-DD'),
        displayEndDate: dates[1].format('YYYY-MM-DD')
      });
    } else {
      setItem({
        ...item,
        displayStartDate: '',
        displayEndDate: ''
      });
    }
  };

  // 내용 변경 핸들러 (QuillEditor용)
  const handleContentChange = (content) => {
    handleInputChange('content', content);
  };

  // 기존 배너 파일이 있을 경우 defaultFileList 형식으로 변환
  const defaultFileList = item.bannerImage ? [{
    uid: '1', // 임시 ID
    name: item.bannerImage.split('/').pop(), // 파일명 추출
    status: 'done',
    url: item.bannerImage, // 파일 경로
    thumbUrl: item.bannerImage, // 썸네일 경로
  }] : [];

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions bordered column={1}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="제목">
            <Input 
              value={item.title} 
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="이벤트 제목을 입력하세요" 
            />
          </Descriptions.Item>

          <Descriptions.Item label="내용">
            <QuillEditor
              value={item.content}
              onChange={handleContentChange}
              placeholder="이벤트 내용을 입력하세요"
              height="200px"
              editorHeight="150px"
            />
          </Descriptions.Item>

          <Descriptions.Item label="진행기간">
            <ConfigProvider locale={ko_KR}>
              <RangePicker
                value={
                  item.startDate && item.endDate 
                    ? [dayjs(item.startDate), dayjs(item.endDate)] 
                    : null
                }
                onChange={handlePeriodChange}
                style={{ width: '380px' }}
                format="YYYY-MM-DD"
              />
            </ConfigProvider>
          </Descriptions.Item>

          <Descriptions.Item label="표시기간">
            <ConfigProvider locale={ko_KR}>
              <RangePicker
                value={
                  item.displayStartDate && item.displayEndDate 
                    ? [dayjs(item.displayStartDate), dayjs(item.displayEndDate)] 
                    : null
                }
                onChange={handleDisplayPeriodChange}
                style={{ width: '380px' }}
                format="YYYY-MM-DD"
              />
            </ConfigProvider>
          </Descriptions.Item>

          <Descriptions.Item label="배너 이미지">
            <Upload
              name="bannerImage"
              listType="picture"
              defaultFileList={defaultFileList}
              onChange={handleBannerUpload}
              showUploadList={{
                showDownloadIcon: true,
                showRemoveIcon: true,
                showPreviewIcon: true,
              }}
            >
              <Button icon={<UploadOutlined />}>배너 이미지 업로드</Button>
            </Upload>
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
              권장 크기: 1200 x 400px, 최대 파일 크기: 2MB
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="링크">
            <Input 
              value={item.link} 
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder="이벤트 페이지 링크를 입력하세요 (예: https://example.com)" 
            />
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

export default EventListDetail; 
import React, { useState, useEffect } from 'react';
import { Card, Descriptions, Radio, Input, Button, message, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getVideoById, 
  updateVideo, 
  addVideo,
  deleteVideo,
  STATUS_OPTIONS 
} from '@/components/admin/mock/MOCK_Video';
import { CommonButton, ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isNewMode = id === 'new';

  // 비디오 필드 상태
  const [status, setStatus] = useState('active');
  const [title, setTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideo = () => {
      setLoading(true);
      try {
        if (isNewMode) {
          // 신규 모드인 경우 기본값 설정
          setVideoData(null);
          setStatus('active');
          setTitle('');
          setYoutubeLink('');
          setLoading(false);
          return;
        }
        
        // ID가 숫자인지 확인
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          message.error('유효하지 않은 비디오 ID입니다.');
          navigate('/mng/cstmz/video');
          return;
        }
        
        // Mock 데이터에서 비디오 가져오기
        const data = getVideoById(numericId);
        
        if (!data) {
          // console.log을 추가하여 디버깅하고 중복 메시지 방지
          console.log(`Video with ID ${numericId} not found`);
          message.error('비디오를 찾을 수 없습니다.');
          // 콜백으로 처리하여 즉시 실행되지 않도록 함
          setTimeout(() => {
            navigate('/mng/cstmz/video');
          }, 100);
          return;
        }
        
        // 비디오 데이터 설정
        setVideoData(data);
        setStatus(data.status);
        setTitle(data.title);
        setYoutubeLink(data.youtubeLink);
      } catch (error) {
        console.error('Error fetching video:', error);
        message.error('비디오를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideo();
  }, [id, navigate, isNewMode]);

  // 상태 변경 핸들러
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 유튜브 링크 변경 핸들러
  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  };

  // 저장 핸들러
  const handleSave = () => {
    // 필수 필드 검증
    if (!title.trim()) {
      message.error('제목을 입력해주세요.');
      return;
    }
    
    // 유튜브 링크 유효성 검사
    const youtubeLinkRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i;
    if (!youtubeLink.trim() || !youtubeLinkRegex.test(youtubeLink)) {
      message.error('올바른 유튜브 링크 형식이 아닙니다.');
      return;
    }
    
    try {
      if (isNewMode) {
        // 신규 비디오 추가
        const newVideo = {
          status,
          title,
          youtubeLink
        };
        
        addVideo(newVideo);
        message.success('비디오가 성공적으로 등록되었습니다.');
      } else {
        // 기존 비디오 업데이트
        const updatedVideo = {
          ...videoData,
          status,
          title,
          youtubeLink
        };
        
        updateVideo(parseInt(id), updatedVideo);
        message.success('비디오가 성공적으로 수정되었습니다.');
      }
      
      navigate('/mng/cstmz/video');
    } catch (error) {
      console.error('Error saving video:', error);
      message.error('비디오 저장 중 오류가 발생했습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = () => {
    if (isNewMode) {
      navigate('/mng/cstmz/video');
      return;
    }
    
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 비디오를 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        try {
          deleteVideo(parseInt(id));
          message.success('비디오가 성공적으로 삭제되었습니다.');
          navigate('/mng/cstmz/video');
        } catch (error) {
          console.error('Error deleting video:', error);
          message.error('비디오 삭제 중 오류가 발생했습니다.');
        }
      }
    });
  };

  // 취소 핸들러
  const handleCancel = () => {
    navigate('/mng/cstmz/video');
  };

  // 상태 옵션 필터링
  const statusOptions = STATUS_OPTIONS.filter(option => option.value !== 'all');

  return (
    <>
      <Card style={{ marginBottom: '20px' }} loading={loading}>
        <Descriptions bordered column={1} title={isNewMode ? "비디오 등록" : "비디오 수정"}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="상태">
            <Radio.Group value={status} onChange={handleStatusChange}>
              {statusOptions.map(option => (
                <Radio key={option.value} value={option.value}>{option.label}</Radio>
              ))}
            </Radio.Group>
          </Descriptions.Item>
          
          <Descriptions.Item label="제목">
            <Input 
              value={title} 
              onChange={handleTitleChange}
              placeholder="비디오 제목을 입력해주세요." 
              maxLength={100} 
            />
          </Descriptions.Item>
          
          <Descriptions.Item label="유튜브 링크">
            <Input 
              value={youtubeLink} 
              onChange={handleYoutubeLinkChange}
              placeholder="https://www.youtube.com/watch?v=XXXXXX" 
            />
          </Descriptions.Item>
          
          {!isNewMode && videoData && (
            <Descriptions.Item label="등록일">
              {videoData.createdAt || '-'}
            </Descriptions.Item>
          )}
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

export default VideoDetail; 
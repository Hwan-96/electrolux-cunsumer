import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input, Upload, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';
import { CommonButton } from '@/components/admin/common/Button';
import MOCK_DATA, { 
  getMockData, 
  updateBanner,
  addBanner,
  deleteBanner,
  STATUS_OPTIONS,
  LINK_TARGET_OPTIONS,
  TAB_OPTIONS
} from '@/components/admin/mock/MOCK_Banner';
import styled from 'styled-components';

const ImagePreview = styled.div`
  margin-top: 10px;
  img {
    max-width: 300px;
    max-height: 150px;
    border: 1px solid #d9d9d9;
  }
`;

const BannerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null);
  const isNewMode = id === 'new';

  // URL 파라미터에서 활성 탭 가져오기
  const queryParams = new URLSearchParams(location.search);
  const activeTabFromUrl = queryParams.get('tab') || 'main';

  // 배너 필드 상태
  const [status, setStatus] = useState('active');
  const [tab, setTab] = useState(activeTabFromUrl);
  const [title, setTitle] = useState('');
  const [pcImageUrl, setPcImageUrl] = useState('');
  const [mobileImageUrl, setMobileImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTarget, setLinkTarget] = useState('_self');
  
  // 파일 업로드 상태
  const [pcFileList, setPcFileList] = useState([]);
  const [mobileFileList, setMobileFileList] = useState([]);

  useEffect(() => {
    const fetchBanner = () => {
      setLoading(true);
      try {
        if (isNewMode) {
          // 신규 모드인 경우 기본값 설정
          setBanner(null);
          setStatus('active');
          setTitle('');
          // 탭은 URL 파라미터에서 가져온 값으로 설정
          setTab(activeTabFromUrl);
          setPcImageUrl('');
          setMobileImageUrl('');
          setLinkUrl('');
          setLinkTarget('_self');
          setPcFileList([]);
          setMobileFileList([]);
          setLoading(false);
          return;
        }
        
        // ID가 숫자인지 확인
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          message.error('유효하지 않은 배너 ID입니다.');
          navigate('/mng/cstmz/bnr');
          return;
        }
        
        // Mock 데이터에서 배너 가져오기
        const data = getMockData().find(item => item.id === numericId);
        
        if (!data) {
          message.error('배너를 찾을 수 없습니다.');
          navigate('/mng/cstmz/bnr');
          return;
        }
        
        // 배너 데이터 설정
        setBanner(data);
        setStatus(data.status);
        setTab(data.tab);
        setTitle(data.title);
        setPcImageUrl(data.pcImageUrl);
        setMobileImageUrl(data.mobileImageUrl);
        setLinkUrl(data.linkUrl);
        setLinkTarget(data.linkTarget);
        
        // 파일 목록 설정
        if (data.pcImageUrl) {
          setPcFileList([{
            uid: '-1',
            name: data.pcImageUrl.split('/').pop(),
            status: 'done',
            url: data.pcImageUrl
          }]);
        }
        
        if (data.mobileImageUrl) {
          setMobileFileList([{
            uid: '-1',
            name: data.mobileImageUrl.split('/').pop(),
            status: 'done',
            url: data.mobileImageUrl
          }]);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
        message.error('배너를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBanner();
  }, [id, navigate, isNewMode, activeTabFromUrl]);

  // 상태 변경 핸들러
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 링크 변경 핸들러
  const handleLinkUrlChange = (e) => {
    setLinkUrl(e.target.value);
  };

  // 링크 타입 변경 핸들러
  const handleLinkTargetChange = (e) => {
    setLinkTarget(e.target.value);
  };

  // PC 배너 파일 변경 핸들러
  const handlePcFileChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // 최근 파일만 유지
    
    // 성공적으로 업로드된 경우
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    
    setPcFileList(fileList);
    
    // 파일이 선택된 경우 이미지 URL 업데이트 (실제로는 서버 응답으로 처리됨)
    if (fileList.length > 0 && fileList[0].originFileObj) {
      // 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        setPcImageUrl(reader.result);
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    } else if (fileList.length === 0) {
      setPcImageUrl('');
    }
  };

  // 모바일 배너 파일 변경 핸들러
  const handleMobileFileChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1); // 최근 파일만 유지
    
    // 성공적으로 업로드된 경우
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    
    setMobileFileList(fileList);
    
    // 파일이 선택된 경우 이미지 URL 업데이트 (실제로는 서버 응답으로 처리됨)
    if (fileList.length > 0 && fileList[0].originFileObj) {
      // 파일 미리보기 URL 생성
      const reader = new FileReader();
      reader.onload = () => {
        setMobileImageUrl(reader.result);
      };
      reader.readAsDataURL(fileList[0].originFileObj);
    } else if (fileList.length === 0) {
      setMobileImageUrl('');
    }
  };

  // 파일 업로드 전 검증
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('이미지 파일만 업로드 가능합니다!');
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('이미지 크기는 2MB 이하여야 합니다!');
    }
    
    return false; // 자동 업로드 방지
  };

  // 저장 핸들러
  const handleSave = () => {
    // 필수 필드 검증
    if (!title) {
      message.error('제목을 입력해주세요.');
      return;
    }
    
    if (!pcImageUrl) {
      message.error('PC 배너 이미지를 업로드해주세요.');
      return;
    }
    
    if (!mobileImageUrl) {
      message.error('모바일 배너 이미지를 업로드해주세요.');
      return;
    }
    
    if (!linkUrl) {
      message.error('링크 URL을 입력해주세요.');
      return;
    }
    
    try {
      if (isNewMode) {
        // 신규 배너 추가
        const newBanner = {
          status,
          title,
          tab,
          pcImageUrl,
          mobileImageUrl,
          linkUrl,
          linkTarget
        };
        
        addBanner(newBanner);
        message.success('배너가 성공적으로 추가되었습니다.');
      } else {
        // 기존 배너 업데이트
        const updatedBanner = {
          ...banner,
          status,
          title,
          pcImageUrl,
          mobileImageUrl,
          linkUrl,
          linkTarget
        };
        
        updateBanner(banner.id, updatedBanner);
        message.success('배너가 성공적으로 수정되었습니다.');
      }
      
      navigate('/mng/cstmz/bnr');
    } catch (error) {
      console.error('Error saving banner:', error);
      message.error('배너 저장 중 오류가 발생했습니다.');
    }
  };

  // 삭제 핸들러
  const handleDelete = () => {
    if (isNewMode) {
      navigate('/mng/cstmz/bnr');
      return;
    }
    
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 배너를 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        try {
          deleteBanner(banner.id);
          message.success('배너가 성공적으로 삭제되었습니다.');
          navigate('/mng/cstmz/bnr');
        } catch (error) {
          console.error('Error deleting banner:', error);
          message.error('배너 삭제 중 오류가 발생했습니다.');
        }
      }
    });
  };

  // 취소 핸들러
  const handleCancel = () => {
    navigate('/mng/cstmz/bnr');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // 파일 업로드 설정
  const uploadProps = {
    listType: 'picture',
    beforeUpload: beforeUpload,
    showUploadList: true,
    maxCount: 1
  };

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions bordered column={1}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="상태">
            <Radio.Group value={status} onChange={handleStatusChange}>
              {STATUS_OPTIONS.filter(option => option.value !== 'all').map(option => (
                <Radio key={option.value} value={option.value}>{option.label}</Radio>
              ))}
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="제목">
            <Input value={title} onChange={handleTitleChange} placeholder="배너 제목을 입력하세요" />
          </Descriptions.Item>
          <Descriptions.Item label="PC 배너">
            <Upload
              {...uploadProps}
              fileList={pcFileList}
              onChange={handlePcFileChange}
            >
              <Button icon={<UploadOutlined />}>PC 배너 업로드</Button>
            </Upload>
            {pcImageUrl && (
              <ImagePreview>
                <img src={pcImageUrl} alt="PC Banner Preview" />
              </ImagePreview>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="모바일 배너">
            <Upload
              {...uploadProps}
              fileList={mobileFileList}
              onChange={handleMobileFileChange}
            >
              <Button icon={<UploadOutlined />}>모바일 배너 업로드</Button>
            </Upload>
            {mobileImageUrl && (
              <ImagePreview>
                <img src={mobileImageUrl} alt="Mobile Banner Preview" />
              </ImagePreview>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="링크 URL">
            <Input value={linkUrl} onChange={handleLinkUrlChange} placeholder="링크 URL을 입력하세요" />
          </Descriptions.Item>
          <Descriptions.Item label="링크 타입">
            <Radio.Group value={linkTarget} onChange={handleLinkTargetChange}>
              {LINK_TARGET_OPTIONS.map(option => (
                <Radio key={option.value} value={option.value}>{option.label}</Radio>
              ))}
            </Radio.Group>
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

export default BannerDetail; 
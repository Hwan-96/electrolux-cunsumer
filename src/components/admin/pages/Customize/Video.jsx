import React, { useEffect, useRef, useCallback } from 'react';
import { Button, Modal, message, Tag, Alert } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import DataTable from '@/components/admin/common/DataTable';
import useList from '@/hooks/useList';
import MOCK_DATA, { 
  searchVideos, 
  deleteVideo,
  updateVideo,
  getMockData
} from '@/components/admin/mock/MOCK_Video';
import { CommonButton } from '@/components/admin/common/Button';
import { ColumnLink } from '@/components/admin/common/Style';
import styled from 'styled-components';

const AlertWrapper = styled.div`
  margin-bottom: 20px;
`;

const Video = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDataLoaded = useRef(false);

  const {
    data,
    loading,
    selectedRowKeys,
    rowSelection,
    handleBatchDelete,
    handleSearch
  } = useList({
    mockData: getMockData(), // getMockData() 사용하여 최신 데이터 참조
    searchFunction: searchVideos,
    deleteMockData: deleteVideo,
    updateMockData: updateVideo,
    initialSearchType: 'all',
    initialSearchValue: '',
    initialStatus: 'all'
  });

  // 안정적인 데이터 로드 함수 생성
  const loadData = useCallback(() => {
    if (!isDataLoaded.current) {
      isDataLoaded.current = true;
      console.log('Loading video data');
      handleSearch();
    }
  }, [handleSearch]);

  // 네비게이션 발생 시 데이터 로드 상태 초기화
  useEffect(() => {
    return () => {
      isDataLoaded.current = false;
    };
  }, [location.key]);

  // 컴포넌트 마운트시 한 번만 데이터 로드
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 항목 삭제 핸들러
  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    // 직접 handleBatchDelete 호출 (useList 훅의 handleBatchDelete는 내부적으로 확인 모달을 표시하므로 여기서는 중복 모달을 보여주지 않습니다)
    handleBatchDelete();
    // 삭제 후 데이터 로드 상태 초기화
    isDataLoaded.current = false;
  };

  // 비디오 등록 페이지로 이동 핸들러
  const handleAddVideo = () => {
    navigate('/mng/cstmz/video/new');
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (status) => {
        return <Tag color={status === 'active' ? 'blue' : 'red'}>{status === 'active' ? '노출' : '미노출'}</Tag>
      }
    },
    {
      title: <div style={{ textAlign: 'center' }}>제목</div>,
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/cstmz/video/${record.id}`)}>{text}</ColumnLink>
      )
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center'
    }
  ];

  // 테이블 설정
  const tableSettings = {
    loading: loading,
    rowSelection
  };

  return (
    <div>
      <AlertWrapper>
        <Alert 
          message="영상은 가장 상단에 등록 된 1개만 노출 됩니다." 
          type="info" 
          showIcon 
        />
      </AlertWrapper>

      <DataTable 
        columns={columns} 
        dataSource={data} 
        settings={tableSettings}
        buttonPosition="mixed"
        leftButtons={<Button danger onClick={handleDelete}>삭제</Button>}
        rightButtons={<CommonButton onClick={handleAddVideo}>등록</CommonButton>}
      />
    </div>
  );
};

export default Video;

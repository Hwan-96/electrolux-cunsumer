import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, message, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import useList from '@/hooks/useList';
import DataTable from '@/components/admin/common/DataTable';
import MOCK_DATA, { 
  searchBanners, 
  deleteBanner,
  getMockData,
  TAB_OPTIONS, 
  STATUS_OPTIONS 
} from '@/components/admin/mock/MOCK_Banner';
import { CommonButton } from '@/components/admin/common/Button';
import { ColumnLink } from '@/components/admin/common/Style';

// 카드 탭 설정
const cardTabs = [
  { key: 'main', tab: '메인' },
  { key: 'sub', tab: '서브' }
];

const Banner = () => {
  const navigate = useNavigate();
  // 탭 상태
  const [activeTab, setActiveTab] = useState('main');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // useList 훅 사용 - 더이상 사용하지 않음
  useList({
    mockData: MOCK_DATA,
    searchFunction: searchBanners,
    deleteMockData: deleteBanner,
    initialSearchType: 'all',
    initialSearchValue: '',
    initialStatus: 'all',
    additionalParams: { 
      tab: activeTab
    }
  });
  
  // 데이터 로딩 함수
  const loadData = () => {
    setLoading(true);
    try {
      // 최신 데이터 가져오기
      const updatedData = getMockData();
      // 현재 선택된 탭에 맞게 필터링
      const filteredData = searchBanners(updatedData, { tab: activeTab });
      setData(filteredData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // 탭 변경 시 데이터 리로드
  useEffect(() => {
    loadData();
  }, [activeTab]);
  
  // 탭 변경 핸들러
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // 선택 항목 삭제 핸들러
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    Modal.confirm({
      title: '삭제 확인',
      content: `선택한 ${selectedRowKeys.length}개의 항목을 삭제하시겠습니까?`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          setLoading(true);
          // 삭제 처리
          selectedRowKeys.forEach(id => {
            deleteBanner(id);
          });
          
          // 검색 조건 유지하면서 데이터 갱신
          const updatedData = getMockData();
          const filteredData = searchBanners(updatedData, { tab: activeTab });
          setData(filteredData);
          
          setSelectedRowKeys([]);
          message.success('선택된 항목이 삭제되었습니다.');
        } catch (error) {
          console.error('Error deleting data:', error);
          message.error('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
          setLoading(false);
        }
      }
    });
  };
  
  // 배너 등록 페이지로 이동 핸들러
  const handleAddBanner = () => {
    navigate(`/mng/cstmz/bnr/new?tab=${activeTab}`);
  };
  
  // 행 선택 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
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
        <ColumnLink onClick={() => navigate(`/mng/cstmz/bnr/${record.id}`)}>{text}</ColumnLink>
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
      <Card 
        tabList={cardTabs}
        activeTabKey={activeTab}
        onTabChange={handleTabChange}
      >
        <DataTable 
          columns={columns} 
          dataSource={data} 
          settings={tableSettings}
          buttonPosition="mixed"
          leftButtons={<Button danger onClick={handleBatchDelete}>삭제</Button>}
          rightButtons={<CommonButton onClick={handleAddBanner}>등록</CommonButton>}
        />
      </Card>
    </div>
  );
};

export default Banner;

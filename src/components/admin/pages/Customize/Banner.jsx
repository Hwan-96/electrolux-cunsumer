import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import useList from '@/hooks/useList';
import DataTable from '@/components/admin/common/DataTable';
import MOCK_DATA, { 
  searchBanners, 
  TAB_OPTIONS, 
  STATUS_OPTIONS 
} from '@/components/admin/mock/MOCK_Banner';

// 카드 탭 설정
const cardTabs = [
  { key: 'main', tab: '메인' },
  { key: 'sub', tab: '서브' }
];

const Banner = () => {
  // 탭 상태
  const [activeTab, setActiveTab] = useState('main');
  
  // useList 훅 사용
  const { 
    data, 
    loading, 
    handleSearch
  } = useList({
    mockData: MOCK_DATA,
    searchFunction: searchBanners,
    initialSearchType: 'all',
    initialSearchValue: '',
    initialStatus: 'all',
    additionalParams: { 
      tab: activeTab
    }
  });
  
  // 탭 변경 시 데이터 리로드
  useEffect(() => {
    handleSearch();
  }, [activeTab]);
  
  // 탭 변경 핸들러
  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  // 테이블 컬럼 정의
  const columns = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '탭',
      dataIndex: 'tab',
      key: 'tab',
      render: (tab) => {
        const option = TAB_OPTIONS.find(o => o.value === tab);
        return option ? option.label : tab;
      }
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const option = STATUS_OPTIONS.find(o => o.value === status);
        return option ? option.label : status;
      }
    },
    {
      title: '순서',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ];
  
  // 테이블 설정
  const tableSettings = {
    enableSelection: false,
    loading: loading
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
        />
      </Card>
    </div>
  );
};

export default Banner;

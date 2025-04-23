import React, { useState } from 'react';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import { Tag, Button } from 'antd';
import { inductionSearch } from '@/components/admin/utils/search/inductionSearch';
import { OrangeButton } from '@/components/admin/common/Button';
import { useNavigate } from 'react-router-dom';
import { getMockData } from '@/components/admin/mock/MOCK_Induction';
import { ColumnLink } from '@/components/admin/common/Style';
import useList from '@/hooks/useList';

const Induction = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  
  const {
    searchType,
    searchValue,
    status,
    data,
    loading,
    rowSelection,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleStatusChange,
    handleSearch: originalHandleSearch,
    handleBatchStatusUpdate,
  } = useList({
    mockData: getMockData(),
    searchFunction: inductionSearch,
    deleteMockData: (id) => {
      // TODO: 실제 API 호출로 변경
      console.log('Delete mock data:', id);
    },
    updateMockData: (id, data) => {
      // TODO: 실제 API 호출로 변경
      console.log('Update mock data:', id, data);
    },
    additionalParams: {
      regStartDate: dateRange.startDate,
      regEndDate: dateRange.endDate
    }
  });

  const handleBatchComplete = () => {
    handleBatchStatusUpdate('completed');
  };

  const handleBatchPending = () => {
    handleBatchStatusUpdate('pending');
  };

  const handleStartDateChange = (e) => {
    setDateRange(prev => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndDateChange = (e) => {
    setDateRange(prev => ({ ...prev, endDate: e.target.value }));
  };

  const handleSearch = () => {
    originalHandleSearch({
      regStartDate: dateRange.startDate,
      regEndDate: dateRange.endDate
    });
  };

  const columns = [
    {
      title: '작성일',
      dataIndex: 'createdAt',
      align: 'center',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/indct/${record.id}`)}>
          {text}
        </ColumnLink>
      ),
    },
    {
      title: '처리상태',
      dataIndex: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={status === 'completed' ? 'blue' : 'red'}>
          {status === 'completed' ? '처리완료' : '처리대기'}
        </Tag>
      ),
    },
    {
      title: '고객명',
      dataIndex: 'consumerNm',
      align: 'center',
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '구매처',
      dataIndex: 'store',
      align: 'center',
    },
    {
      title: '구매일',
      dataIndex: 'buyAt',
      align: 'center',
    },
    {
      title: '모델명',
      dataIndex: 'modelNm',
      align: 'center',
    },
    {
      title: '설치일',
      dataIndex: 'installAt',
      align: 'center',
    },
    {
      title: '설치대상자',
      dataIndex: 'installNm',
      align: 'center',
    },
    {
      title: '설치대상자 연락처',
      dataIndex: 'installNum',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>설치장소 주소</div>,
      dataIndex: 'installAddress',
    }
  ];

  const searchRows = [
    {
      title: '검색분류',
      type: 'radio',
      name: 'searchType',
      value: searchType,
      onChange: handleSearchTypeChange,
      options: [
        { value: 'all', label: '전체' },
        { value: 'customer', label: '고객명' },
        { value: 'phone', label: '연락처' },
        { value: 'request', label: '요청사항' },
        { value: 'content', label: '상담내용' }
      ]
    },
    {
      title: '처리상태',
      type: 'radio',
      name: 'status',
      value: status,
      onChange: handleStatusChange,
      options: [
        { value: 'all', label: '전체' },
        { value: 'pending', label: '처리대기' },
        { value: 'completed', label: '처리완료' }
      ]
    },
    {
      title: '기간설정',
      type: 'date',
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      onStartDateChange: handleStartDateChange,
      onEndDateChange: handleEndDateChange,
      showButton: false
    },
    {
      title: '검색어',
      type: 'text',
      value: searchValue,
      onChange: handleSearchValueChange,
      placeholder: '검색어를 입력하세요',
      showButton: true
    }
  ];

  return (
    <div>
      <Search 
        rows={searchRows}
        onSearch={handleSearch}
        showButton={false}
      />

      <DataTable 
        columns={columns} 
        dataSource={data}
        settings={{ 
          loading,
          rowSelection,
        }}
        buttonPosition="left"
        leftButtons={
          <>
            <Button danger onClick={handleBatchComplete}>처리완료</Button>
            <OrangeButton onClick={handleBatchPending}>처리대기</OrangeButton>
          </>
        }
      />
    </div>
  );
};

export default Induction;

import React from 'react';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import { Tag } from 'antd';
import { getMockData } from '@/components/admin/mock/MOCK_Online';
import { onlineServiceSearch } from '@/components/admin/utils/search/onlineServiceSearch';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';
import useList from '@/hooks/useList';

const OnlineService = () => {
  const navigate = useNavigate();
  const {
    searchType,
    searchValue,
    status,
    data,
    loading,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleStatusChange,
    handleSearch,
  } = useList({
    mockData: getMockData(),
    searchFunction: onlineServiceSearch,
    deleteMockData: (id) => {
      // TODO: 실제 API 호출로 변경
      console.log('Delete mock data:', id);
    },
    updateMockData: (id, data) => {
      // TODO: 실제 API 호출로 변경
      console.log('Update mock data:', id, data);
    },
  });

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>제목</div>,
      dataIndex: 'title',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/onCns/${record.id}`)}>
          {text}
        </ColumnLink>
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
      title: '등록일',
      dataIndex: 'createdAt',
      align: 'center',
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
      title: '담당자',
      dataIndex: 'counselor',
      align: 'center',
    },
    {
      title: '답변일',
      dataIndex: 'answeredAt',
      align: 'center',
    },
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
      title: '검색어',
      type: 'text',
      value: searchValue,
      onChange: handleSearchValueChange,
      placeholder: '검색어를 입력하세요'
    }
  ];

  return (
    <div>
      <Search 
        rows={searchRows}
        onSearch={handleSearch}
      />

      <DataTable 
        columns={columns} 
        dataSource={data}
        settings={{
          loading,
          enableSelection: false,
          enableNumbering: true
        }}
      />
    </div>
  );
};

export default OnlineService;

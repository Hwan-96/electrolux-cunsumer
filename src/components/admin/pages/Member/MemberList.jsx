import React from 'react';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import { getMockData, deleteMockData, updateMockData } from '@/components/admin/mock/MOCK_MemberList';
import { memberSearch } from '@/components/admin/utils/search/memberSearch';
import useList from '@/hooks/useList';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';

const MemberList = () => {
  const navigate = useNavigate();

  const {
    data,
    loading,
    searchType,
    searchValue,
    status,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleStatusChange,
    handleSearch,
  } = useList({
    mockData: getMockData(),
    searchFunction: memberSearch,
    deleteMockData: deleteMockData,
    updateMockData: updateMockData,
    initialSearchType: 'all',
    initialSearchValue: '',
    initialStatus: 'all'
  });

  const searchRows = [
    {
      title: '회원구분',
      type: 'radio',
      name: 'status',
      value: status,
      onChange: handleStatusChange,
      options: [
        { value: 'all', label: '전체' },
        { value: 'U', label: '울트라클럽' },
        { value: 'N', label: '일반회원' },
      ],
    },
    {
      title: '검색',
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: '전체' },
            { value: 'memNm', label: '이름' },
            { value: 'memId', label: '아이디' },
            { value: 'memTel', label: '연락처' },
          ]
        }
      ],
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: '검색어를 입력하세요'
      },
      showButton: true
    }
  ];

  const columns = [
    {
      title: '회원구분',
      dataIndex: 'memTp',
      render: (memTp) => memTp === 'U' ? '울트라클럽' : '일반회원',
    },
    {
      title: '아이디',
      dataIndex: 'memId',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/mem/list/${record.id}`)}>
          {text}
        </ColumnLink>
      ),
    },
    {
      title: '이름',
      dataIndex: 'memNm',
    },
    {
      title: '전화번호',
      dataIndex: 'memTel',
    },
    {
      title: '이메일',
      dataIndex: 'memEmail',
    },
    {
      title: '가입일',
      dataIndex: 'memJoinDate',
    },
    {
      title: '상태',
      dataIndex: 'memStatus',
    },
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
        }}
      />
    </div>
  );
};

export default MemberList;

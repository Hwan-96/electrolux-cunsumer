import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import useList from '@/hooks/useList';
import { getMockData, deleteMockData, updateMockData } from '@/components/admin/mock/MOCK_Role';
import { roleSearch } from '@/components/admin/utils/search/roleSearch';
import { CommonButton } from '@/components/admin/common/Button';

const Role = () => {
  const navigate = useNavigate();

  // useList 훅 사용
  const {
    data,
    loading,
    searchType,
    searchValue,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleSearch,
    rowSelection,
    handleBatchDelete
  } = useList({
    mockData: getMockData(),
    searchFunction: roleSearch,
    deleteMockData: deleteMockData,
    updateMockData: updateMockData,
    initialSearchType: 'all',
    initialSearchValue: ''
  });

  // 검색 설정
  const searchRows = [
    {
      title: '검색',
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: '전체' },
            { value: 'userId', label: '아이디' },
            { value: 'department', label: '소속' },
            { value: 'name', label: '이름' }
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

  // 상세페이지 이동
  const handleDetailClick = (id) => {
    navigate(`/mng/mem/role/${id}`);
  };

  // 신규 등록
  const handleAddClick = () => {
    navigate('/mng/mem/role/new');
  };

  // 테이블 컬럼 설정
  const columns = [
    {
      title: '아이디',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '소속',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '권한설정',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" size="small" onClick={() => handleDetailClick(record.id)}>
          권한설정
        </Button>
      ),
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
          rowSelection
        }}
        buttonPosition="mixed"
        leftButtons={
            <Button danger onClick={handleBatchDelete}>
              삭제
            </Button>
        }
        rightButtons={
          <CommonButton type="primary" onClick={handleAddClick}>
            등록
          </CommonButton>
        }
      />
    </div>
  );
};

export default Role;

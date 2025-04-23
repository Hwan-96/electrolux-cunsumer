import React from 'react';
import Search from '@/components/admin/common/Search';
import { sanitizeInput } from '@/utils/inputValidation';
import { DataTable } from '@/components/admin/common/DataTable';
import { getMockData, updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_Notice';
import { noticeSearch } from '@/components/admin/utils/search/noticeSearch';
import { CommonButton } from '@/components/admin/common/Button';
import useList from '@/hooks/useList';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';
import { Tag } from 'antd';

const Notice = () => {
  const navigate = useNavigate();
  const {
    searchType,
    searchValue,
    data,
    loading,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleSearch,
  } = useList({
    mockData: getMockData(),
    searchFunction: noticeSearch,
    deleteMockData: (id) => {
      deleteMockData(id);
      handleSearch();
    },
    updateMockData: (id, data) => {
      updateMockData(id, data);
      handleSearch();
    },
  });

  const searchRows = [
    {
      title: sanitizeInput('검색어'),
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: sanitizeInput('전체') },
            { value: 'title', label: sanitizeInput('제목') },
            { value: 'content', label: sanitizeInput('내용') }
          ]
        }
      ],
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: sanitizeInput('검색어를 입력하세요')
      }
    }
  ];

  const columns = [
    {
      title: '노출여부',
      dataIndex: 'status',
      width: 200,
      align: 'center',
      render: (text) => (
        // <Tag color={text === 'show' ? 'blue' : 'red'}>{text === 'show' ? '노출' : '미노출'}</Tag>
        text === 'hide' ? (
          <Tag color="red">미노출</Tag>
        ): null
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>제목</div>,
      dataIndex: 'title',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/ntc/${record.id}`)}>
          {text}
        </ColumnLink>
      )
    },
    {
      title: '첨부파일',
      dataIndex: 'fileStatus',
      width: 200,
      align: 'center',
      render: (fileStatus) => (
        fileStatus ? (
          <img src="/admin/icon/i_file_download.png" alt="첨부파일" />
        ) : null
      )
    },
    {
      title: '작성일',
      dataIndex: 'date',
      width: 200,
      align: 'center',
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <Search 
        rows={searchRows}
        onSearch={handleSearch}
      />

      <DataTable 
        columns={columns} 
        dataSource={data}
        settings={{ 
          loading,
        }}
        buttonPosition="right"
        rightButtons={<CommonButton onClick={() => navigate('/mng/svc/ntc/new')}>작성하기</CommonButton>}
      />
    </div>
  );
};

export default Notice;

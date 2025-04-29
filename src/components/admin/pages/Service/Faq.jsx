import React, { useState } from 'react';
import Search from '@/components/admin/common/Search';
import { sanitizeInput } from '@/utils/security';
import { DataTable } from '@/components/admin/common/DataTable';
import { getMockData, updateMockData, deleteMockData } from '@/components/admin/mock/MOCK_FAQ';
import { faqSearch } from '@/components/admin/utils/search/faqSearch';
import { CommonButton } from '@/components/admin/common/Button';
import useList from '@/hooks/useList';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';

const Faq = () => {
  const [category1, setCategory1] = useState('all');
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
    searchFunction: faqSearch,
    deleteMockData: (id) => {
      deleteMockData(id);
      handleSearch();
    },
    updateMockData: (id, data) => {
      updateMockData(id, data);
      handleSearch();
    },
    additionalParams: {
      category1
    }
  });

  const handleCategory1Change = (e) => {
    setCategory1(e.target.value);
  };

  const searchRows = [
    {
      title: '검색분류',
      type: 'select',
      selects: [
        {
          value: category1,
          onChange: handleCategory1Change,
          options: [
            { value: 'all', label: '전체' },
            { value: 'usage', label: '기초사용법' },
            { value: 'wireless', label: '무선청소기' },
            { value: 'wired', label: '유선청소기' },
            { value: 'robot', label: '로봇청소기' },
            { value: 'air', label: '공기청정기' },
            { value: 'small', label: '소형가전' },
            { value: 'dishwasher', label: '식기세척기' },
            { value: 'induction', label: '인덕션' },
          ]
        },
      ]
    },
    {
      title: sanitizeInput('검색어'),
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: sanitizeInput('전체') },
            { value: 'q', label: sanitizeInput('질문') },
            { value: 'a', label: sanitizeInput('답변') }
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
      title: '제품군',
      dataIndex: 'ctgr',
      align: 'center',
      width: 200,
      render: (product) => product
    },
    {
      title: <div style={{ textAlign: 'center' }}>질문</div>,
      dataIndex: 'q',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/faq/${record.id}`)}>
          {text}
        </ColumnLink>
      )   
    },
    {
      title: '조회수',
      dataIndex: 'view',
      render: (view) => view || '-',
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
        rightButtons={<CommonButton onClick={() => navigate('/mng/svc/faq/new')}>작성하기</CommonButton>}
      />
    </div>
  );
};

export default Faq;

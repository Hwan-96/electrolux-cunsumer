import React, { useState } from 'react';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import { Tag } from 'antd';
import { getMockData } from '@/components/admin/mock/MOCK_Counseling';
import { counselingSearch } from '@/components/admin/utils/search/counselingSearch';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';
import useList from '@/hooks/useList';

const Counseling = () => {
  const [category1, setCategory1] = useState('all');
  const [category2, setCategory2] = useState('all');
  const [category3, setCategory3] = useState('all');
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
    searchFunction: counselingSearch,
    deleteMockData: (id) => {
      // TODO: 실제 API 호출로 변경
      console.log('Delete mock data:', id);
    },
    updateMockData: (id, data) => {
      // TODO: 실제 API 호출로 변경
      console.log('Update mock data:', id, data);
    },
    additionalParams: {
      category1,
      category2,
      category3
    }
  });

  // 카테고리 옵션 데이터
  const categoryOptions = {
    all: [
      { value: 'all', label: '전체' }
    ],
    service: [
      { value: 'repair', label: '수리/고장' },
      { value: 'cost', label: '수리비용' },
      { value: 'warranty', label: '보증기간' },
      { value: 'usage', label: '사용방법' },
      { value: 'center', label: '서비스센터' },
      { value: 'as', label: 'A/S신청' },
      { value: 'etc', label: '기타' },
    ],
    product: [
      { value: 'order', label: '주문/구입' },
      { value: 'payment', label: '결제' },
      { value: 'delivery', label: '배송' },
      { value: 'refund', label: '환불' }
    ],
    site: [
      { value: 'site', label: '기타' },
    ]
  };

  // 2뎁스 카테고리 옵션
  const getCategory2Options = () => {
    if (category1 === 'all') return categoryOptions.all;
    if (category1 === 'service') return categoryOptions.service;
    if (category1 === 'product') return categoryOptions.product;
    if (category1 === 'site') return categoryOptions.site;
    return categoryOptions.all;
  };

  // 3뎁스 카테고리 옵션
  const getCategory3Options = () => {
    if (category2 === 'all') return categoryOptions.all;
    if (category2 === 'repair') return [
      { value: 'notwork', label: '작동이 안됩니다' },
      { value: 'how', label: '이런 현상은 어떻게 해야하나요?' }
    ];
    if (category2 === 'cost') return [
      { value: 'cost', label: '수리비용이 얼마인가요?' }
    ];
    if (category2 === 'warranty') return [
      { value: 'warranty', label: '보증기간 기준이 어떻게 되나요?' }
    ];
    if (category2 === 'usage') return [
      { value: 'usage', label: '사용방법이 어떻게 되나요?' }
    ];
    if (category2 === 'center') return [
      { value: 'center', label: '가까운 서비스센터 위치 알려주세요?' }
    ];
    if (category2 === 'as') return [
      { value: 'as', label: 'A/S신청은 어떻게 하나요?' }
    ];
    if (category2 === 'etc') return [
      { value: 'etc', label: '궁금합니다' }
    ];
    if (category2 === 'order') return [
      { value: 'order', label: '구입방법을 알려주세요' },
      { value: 'price', label: '가격이 어떻게 되나요?' },
    ];
    if (category2 === 'payment') return [
      { value: 'payment', label: '결제는 어떻게 하나요?' }
    ];
    if (category2 === 'delivery') return [
      { value: 'delivery', label: '주문 후 배송은 어떻게 되나요?' }
    ];
    if (category2 === 'refund') return [
      { value: 'refund', label: '환불방법/절차는 어떻게 되나요?' }
    ];
    if (category2 === 'site') return [
      { value: 'login', label: '로그인이 안됩니다' },
      { value: 'proposal', label: '제안합니다' },
      { value: 'etc', label: '궁금합니다' },
    ];

    return categoryOptions.all;
  };

  // 1뎁스 변경 시 2뎁스, 3뎁스 초기화
  const handleCategory1Change = (e) => {
    setCategory1(e.target.value);
    setCategory2('all');
    setCategory3('all');
  };

  // 2뎁스 변경 시 3뎁스 초기화
  const handleCategory2Change = (e) => {
    setCategory2(e.target.value);
    setCategory3('all');
  };

  const handleCategory3Change = (e) => {
    setCategory3(e.target.value);
  };

  const columns = [
    {
      title: '처리상태',
      dataIndex: 'status',
      align: 'center',
      render: (status) => (
        <Tag color={status === 'completed' ? 'blue' : 'red'}>
          {status === 'completed' ? '답변완료' : '답변대기'}
        </Tag>
      ),
    },
    {
      title: '구분1',
      dataIndex: 'ctgr1',
      align: 'center',
    },
    {
      title: '구분2',
      dataIndex: 'ctgr2',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>제목</div>,
      dataIndex: 'ctgr3',
      width: '30%',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/qna/${record.id}`)}>
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
      title: '작성일',
      dataIndex: 'createdAt',
      align: 'center',
    },
    {
      title: '답변일',
      dataIndex: 'answerAt',
      align: 'center',
    }
  ];

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
            { value: 'service', label: '서비스' },
            { value: 'product', label: '소모품관련' },
            { value: 'site', label: '사이트이용관련' }
          ]
        },
        {
          value: category2,
          onChange: handleCategory2Change,
          options: getCategory2Options(),
          disabled: category1 === 'all'
        },
        {
          value: category3,
          onChange: handleCategory3Change,
          options: getCategory3Options(),
          disabled: category2 === 'all'
        }
      ]
    },
    {
      title: '검색어',
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: '전체' },
            { value: 'ctgr3', label: '문의내용' },
            { value: ['ctgr3','answer'], label: '문의내용+답변' },
            { value: 'answer', label: '답변' }
          ]
        }
      ],
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: '검색어를 입력하세요'
      }
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
        }}
      />
    </div>
  );
};

export default Counseling;

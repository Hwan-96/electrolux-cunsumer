import React, { useCallback } from 'react';
import Search from '@/components/admin/common/Search';
import { DataTable } from '@/components/admin/common/DataTable';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useList from '@/hooks/useList';
import { getMockData } from '@/components/admin/mock/MOCK_cleanUp';
import { cleanUpSearch } from '@/components/admin/utils/search/cleanUpSearch';
import { ColumnLink } from '@/components/admin/common/Style';
import { CommonButton } from '@/components/admin/common/Button';
// API 호출 시 사용할 axios - 추후 주석 해제 예정
// import axios from 'axios';

const CleanUp = () => {
  const [category1, setCategory1] = useState('all');
  const [category2, setCategory2] = useState('all');
  const [category3, setCategory3] = useState('all');
  const [category4, setCategory4] = useState('all');
  
  // 카테고리 옵션 상태 관리
  const [category1Options, setCategory1Options] = useState([
    { value: 'all', label: '전체' }
  ]);
  const [category2Options, setCategory2Options] = useState([]);
  const [category3Options, setCategory3Options] = useState([]);
  const [category4Options, setCategory4Options] = useState([]);
  
  // 옵션 로딩 상태
  const [optionsLoading, setOptionsLoading] = useState({
    category1: false,
    category2: false,
    category3: false,
    category4: false
  });

  const navigate = useNavigate();
  
  const {
    searchValue,
    data,
    loading,
    handleSearchValueChange,
    handleSearch: originalHandleSearch,
  } = useList({
    mockData: getMockData(),
    searchFunction: cleanUpSearch,
    deleteMockData: (id) => {
      console.log('Delete mock data:', id);
    },
    updateMockData: (id, data) => {
      console.log('Update mock data:', id, data);
    },
    additionalParams: useMemo(() => ({
      category1,
      category2,
      category3,
      category4
    }), [category1, category2, category3, category4])
  });

  // searchValue를 포함한 검색 핸들러 함수 생성
  const handleSearch = useCallback(() => {
    originalHandleSearch({
      category1,
      category2,
      category3,
      category4,
      searchValue // 현재 searchValue 값을 전달
    });
  }, [originalHandleSearch, category1, category2, category3, category4, searchValue]);

  // 브랜드 카테고리(category1) 옵션 불러오기
  useEffect(() => {
    const fetchCategory1Options = async () => {
      try {
        setOptionsLoading(prev => ({ ...prev, category1: true }));
        
        // 실제 API 호출로 교체 필요
        // const response = await axios.get('/api/categories/brands');
        // const data = response.data;
        
        // 임시 데이터 (실제 API 호출로 교체 필요)
        const data = [
          { value: 'Electrolux', label: 'Electrolux' },
          { value: 'AEG', label: 'AEG' }
        ];
        
        setCategory1Options([
          { value: 'all', label: '전체' },
          ...data
        ]);
      } catch (error) {
        console.error('브랜드 카테고리 로드 중 오류 발생:', error);
      } finally {
        setOptionsLoading(prev => ({ ...prev, category1: false }));
      }
    };
    
    fetchCategory1Options();
  }, []);

  // 제품군 카테고리(category2) 옵션 불러오기
  useEffect(() => {
    const fetchCategory2Options = async () => {
      if (category1 === 'all') {
        setCategory2Options([]);
        return;
      }
      
      try {
        setOptionsLoading(prev => ({ ...prev, category2: true }));
        
        // 실제 API 호출로 교체 필요
        // const response = await axios.get(`/api/categories/product-groups?brand=${category1}`);
        // const data = response.data;
        
        // 임시 데이터 (실제 API 호출로 교체 필요)
        let data = [];
        if (category1 === 'Electrolux') {
          data = [
            { value: '스틱청소기', label: '스틱청소기' },
            { value: '진공청소기', label: '진공청소기' },
            { value: '로봇청소기', label: '로봇청소기' },
            { value: '에어프라이어', label: '에어프라이어' }
          ];
        } else if (category1 === 'AEG') {
          data = [
            { value: '세탁기', label: '세탁기' },
            { value: '건조기', label: '건조기' }
          ];
        }
        
        setCategory2Options([
          { value: 'all', label: '전체' },
          ...data
        ]);
      } catch (error) {
        console.error('제품군 카테고리 로드 중 오류 발생:', error);
      } finally {
        setOptionsLoading(prev => ({ ...prev, category2: false }));
      }
    };
    
    fetchCategory2Options();
  }, [category1]);

  // 제품명 카테고리(category3) 옵션 불러오기
  useEffect(() => {
    const fetchCategory3Options = async () => {
      if (category1 === 'all' || category2 === 'all') {
        setCategory3Options([]);
        return;
      }
      
      try {
        setOptionsLoading(prev => ({ ...prev, category3: true }));
        
        // 실제 API 호출로 교체 필요
        // const response = await axios.get(`/api/categories/products?brand=${category1}&productGroup=${category2}`);
        // const data = response.data;
        
        // 임시 데이터 (실제 API 호출로 교체 필요)
        let data = [];
        if (category1 === 'Electrolux' && category2 === '스틱청소기') {
          data = [
            { value: 'Well Q6', label: 'Well Q6' },
            { value: 'Well Q7', label: 'Well Q7' },
            { value: 'Well Q8', label: 'Well Q8' }
          ];
        } else if (category1 === 'Electrolux' && category2 === '진공청소기') {
          data = [
            { value: 'Pure C9', label: 'Pure C9' }
          ];
        } else if (category1 === 'Electrolux' && category2 === '로봇청소기') {
          data = [
            { value: 'Pure i9.2', label: 'Pure i9.2' }
          ];
        } else if (category1 === 'AEG' && category2 === '세탁기') {
          data = [
            { value: 'L8FEC68K', label: 'L8FEC68K' }
          ];
        }
        
        setCategory3Options([
          { value: 'all', label: '전체' },
          ...data
        ]);
      } catch (error) {
        console.error('제품명 카테고리 로드 중 오류 발생:', error);
      } finally {
        setOptionsLoading(prev => ({ ...prev, category3: false }));
      }
    };
    
    fetchCategory3Options();
  }, [category1, category2]);

  // 모델명 카테고리(category4) 옵션 불러오기
  useEffect(() => {
    const fetchCategory4Options = async () => {
      if (category1 === 'all' || category2 === 'all' || category3 === 'all') {
        setCategory4Options([]);
        return;
      }
      
      try {
        setOptionsLoading(prev => ({ ...prev, category4: true }));
        
        // 실제 API 호출로 교체 필요
        // const response = await axios.get(`/api/categories/models?brand=${category1}&productGroup=${category2}&product=${category3}`);
        // const data = response.data;
        
        // 임시 데이터 (실제 API 호출로 교체 필요)
        let data = [];
        if (category1 === 'Electrolux' && category2 === '스틱청소기' && category3 === 'Well Q6') {
          data = [
            { value: 'EFP91835', label: 'EFP91835' },
            { value: 'EFP91836', label: 'EFP91836' }
          ];
        } else if (category1 === 'Electrolux' && category2 === '진공청소기' && category3 === 'Pure C9') {
          data = [
            { value: 'PC91-4MG', label: 'PC91-4MG' }
          ];
        }
        
        setCategory4Options([
          { value: 'all', label: '전체' },
          ...data
        ]);
      } catch (error) {
        console.error('모델명 카테고리 로드 중 오류 발생:', error);
      } finally {
        setOptionsLoading(prev => ({ ...prev, category4: false }));
      }
    };
    
    fetchCategory4Options();
  }, [category1, category2, category3]);

  const handleCategory1Change = (e) => {
    setCategory1(e.target.value);
    setCategory2('all');
    setCategory3('all');
    setCategory4('all');
  };

  const handleCategory2Change = (e) => {
    setCategory2(e.target.value);
    setCategory3('all');
    setCategory4('all');
  };

  const handleCategory3Change = (e) => {
    setCategory3(e.target.value);
    setCategory4('all');
  };

  const handleCategory4Change = (e) => {
    setCategory4(e.target.value);
  };
    
  const searchRows = [
    {
      title: '검색분류',
      type: 'select',
      selects: [
        {
          value: category1,
          onChange: handleCategory1Change,
          placeholder: '브랜드 선택',
          options: category1Options,
          disabled: optionsLoading.category1
        },
        {
          value: category2,
          onChange: handleCategory2Change,
          placeholder: '제품군 선택',
          options: category2Options,
          disabled: category1 === 'all' || optionsLoading.category2
        },
        {
          value: category3,
          onChange: handleCategory3Change,
          placeholder: '제품명 선택',
          options: category3Options,
          disabled: category2 === 'all' || optionsLoading.category3
        },
        {
          value: category4,
          onChange: handleCategory4Change,
          placeholder: '모델명 선택',
          options: category4Options,
          disabled: category3 === 'all' || optionsLoading.category4
        }
      ]
    },
    {
      title: '검색어',
      type: 'text',
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: '검색어를 입력하세요'
      }
    }
  ];

  const columns = [
    {
      title: '브랜드',
      dataIndex: 'modelCtgr1',
      align: 'center',
    },
    {
      title: '제품군',
      dataIndex: 'modelCtgr2',
      align: 'center',
    },
    {
      title: '제품명',
      dataIndex: 'modelCtgr3',
      align: 'center',
    },
    {
      title: '모델명',
      dataIndex: 'modelCtgr4',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>제목</div>,
      dataIndex: 'title',
      width: '30%',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/dwn/cleanup/${record.id}`)}>
          {text}
        </ColumnLink>
      ),
    },
    {
      title: '첨부',
      dataIndex: 'fileStatus',
      align: 'center',
      render: (fileStatus) => (
        fileStatus ? (
          <img src="/admin/icon/i_file_download.png" alt="첨부파일" />
        ) : null
      )
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      align: 'center',
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
        buttonPosition="right"
        rightButtons={<CommonButton onClick={() => navigate('/mng/dwn/cleanup/new')}>작성하기</CommonButton>}
      />
    </div>
  );
};

export default CleanUp;

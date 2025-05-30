import React, { useState, useEffect, useCallback } from 'react';
import Search from '@/components/admin/common/Search';
import useRegionStore from '@/components/admin/store/regionStore';
import { sanitizeInput } from '@/utils/security';
import { getMockData, deleteMockData } from '@/components/admin/mock/MOCK_CenterList';
import { DataTable } from '@/components/admin/common/DataTable';
import CenterPopup from '@/components/admin/common/CenterPopup';
import { centerListSearch } from '@/components/admin/utils/search/centerListSearch';
import { CommonButton } from '@/components/admin/common/Button';
import { Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';

const CenterList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [regionOptions, setRegionOptions] = useState([{ value: 'all', label: '전체' }]);
  const [cityOptions, setCityOptions] = useState([{ value: 'all', label: '전체' }]);
  const navigate = useNavigate();
  // regionStore에서 필요한 상태와 함수 가져오기
  const {
    selectedRegion,
    selectedCity,
    setSelectedRegion,
    setSelectedCity,
    getCityOptions,
    getRegionOptions,
    isCitySelectDisabled
  } = useRegionStore();

  // 지역 옵션 로드
  useEffect(() => {
    const loadRegionOptions = async () => {
      try {
        const options = await getRegionOptions();
        setRegionOptions(options);
      } catch (error) {
        console.error('지역 옵션 로드 실패:', error);
      }
    };
    loadRegionOptions();
  }, [getRegionOptions]);

  // 시군구 옵션 로드
  useEffect(() => {
    const loadCityOptions = async () => {
      try {
        const options = await getCityOptions(selectedRegion);
        setCityOptions(options);
      } catch (error) {
        console.error('시군구 옵션 로드 실패:', error);
      }
    };
    loadCityOptions();
  }, [selectedRegion, getCityOptions]);

  const handleRegionTypeChange = useCallback((e) => {
    const region = sanitizeInput(e.target.value);
    setSelectedRegion(region);
    setSelectedCity('all'); // 지역 변경 시 시군구 초기화
  }, [setSelectedRegion, setSelectedCity]);

  const handleCityTypeChange = useCallback((e) => {
    const city = sanitizeInput(e.target.value);
    setSelectedCity(city);
  }, [setSelectedCity]);

  const handleSearchValueChange = useCallback((e) => {
    setSearchValue(sanitizeInput(e.target.value));
  }, []);

  const handleSearch = useCallback(() => {
    setLoading(true);
    try {
      console.log('검색 파라미터:', { region: selectedRegion, city: selectedCity, searchValue });
      
      const filteredData = centerListSearch(getMockData(), {
        region: selectedRegion,
        city: selectedCity,
        searchValue
      });
      
      console.log('필터링된 데이터:', filteredData);
      
      setData(filteredData);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedRegion, selectedCity, searchValue]);

  const handleMapClick = (center) => {
    setSelectedCenter(center);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedCenter(null);
  };

  const searchRows = [
    {
      title: sanitizeInput('검색어'),
      type: 'mixed',
      selects: [
        {
          value: selectedRegion,
          onChange: handleRegionTypeChange,
          options: regionOptions.map(option => ({
            ...option,
            label: sanitizeInput(option.label)
          }))
        },
        {
          value: selectedCity,
          onChange: handleCityTypeChange,
          options: cityOptions.map(option => ({
            ...option,
            label: sanitizeInput(option.label)
          })),
          disabled: isCitySelectDisabled(selectedRegion)
        }
      ],
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: sanitizeInput('검색어를 입력하세요')
      }
    }
  ];

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
          // TODO: 실제 API 호출로 변경 
          // await axios.post('/api/centerList/batch-delete', { ids: selectedRowKeys });
          
          // 임시로 Mock 데이터 삭제
          selectedRowKeys.forEach(id => {
            deleteMockData(id);
          });
          
          // 검색 조건 유지하면서 데이터 갱신
          const updatedData = getMockData();
          const filteredData = centerListSearch(updatedData, {
            region: selectedRegion,
            city: selectedCity,
            searchValue 
          });
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // 초기 데이터 로드
  useEffect(() => {
    // 초기 지역 및 시군구 값을 'all'로 설정
    setSelectedRegion('all');
    setSelectedCity('all');
    
    // 지연 시간을 주어 상태가 업데이트된 후 검색 실행
    const timer = setTimeout(() => {
      handleSearch();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      title: '지역',
      dataIndex: 'region',
      align: 'center',
    },
    {
      title: '시군구',
      dataIndex: 'city',
      align: 'center',
    },
    {
      title: '센터명',
      dataIndex: 'centerNm',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>주소</div>,
      dataIndex: 'centerAddr',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/svc/cntLst/${record.id}`)}>
          {text}
        </ColumnLink>
      )
    },
    {
      title: '전화번호',
      dataIndex: 'centerTel',
      align: 'center',
    },
    {
      title: '약도',
      dataIndex: 'map',
      align: 'center',
      render: (_, record) => (
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleMapClick(record);
          }}
        >
          <img src="/admin/icon/i_magnify_small.png" alt="약도" />
        </a>
      ),
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
          rowSelection,
        }}
        buttonPosition="mixed"
        leftButtons={<Button danger onClick={handleBatchDelete}>삭제</Button>}
        rightButtons={<CommonButton onClick={() => navigate('/mng/svc/cntLst/new')}>작성하기</CommonButton>}
      />

      <CenterPopup 
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        centerInfo={selectedCenter}
      />
    </div>
  );
};

export default CenterList;

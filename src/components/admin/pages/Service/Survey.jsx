import React, { useState, useEffect, useMemo } from 'react';
import Search from '@/components/admin/common/Search';
import { sanitizeInput } from '@/utils/security';
import { getMockData, deleteMockData } from '@/components/admin/mock/MOCK_Survey';
import { DataTable } from '@/components/admin/common/DataTable';
import { Tag, message, Modal } from 'antd';
import { surveySearch } from '@/components/admin/utils/search/surveySearch';
import URLButton from '@/components/admin/common/URLButton';
import { CommonButton } from '@/components/admin/common/Button';
import { Button } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, GreenButtonGroup, GreenButton } from '@/components/admin/common/Button';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';

const Survey = () => {
  const [searchType, setSearchType] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();

  // 상태별 데이터 개수 계산
  const statusCounts = useMemo(() => {
    const total = allData.length;
    const available = allData.filter(item => item.state === 'pending').length;
    const completed = allData.filter(item => item.state === 'completed').length;
    const unavailable = allData.filter(item => item.state === 'unavailable').length;
    const closed = allData.filter(item => item.state === 'closed').length;

    return {
      total,
      available,
      completed,
      unavailable,
      closed
    };
  }, [allData]);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(sanitizeInput(e.target.value));
  };

  const handleSearch = () => {
    setLoading(true);
    try {
      // TODO: 실제 API 호출로 변경
      // const response = await axios.get('/api/survey', {
      //   params: { 
      //     searchType, 
      //     searchValue, 
      //   }
      // });
      // setData(response.data);
      
      // 임시로 Mock 데이터 사용
      const filteredData = surveySearch(getMockData(), {
        searchType,
        searchValue
      });
      setData(filteredData);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          // await axios.post('/api/survey/batch-delete', { ids: selectedRowKeys });
          
          // 임시로 Mock 데이터 삭제
          selectedRowKeys.forEach(id => {
            deleteMockData(id);
          });

          // 검색 조건 유지하면서 데이터 갱신
          const updatedData = getMockData();
          setAllData(updatedData); // 전체 데이터 업데이트
          
          const filteredData = surveySearch(updatedData, {
            searchType,
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

  const handleTabChange = (key) => {
    setActiveTab(key);
    // 선택된 탭에 따라 데이터 필터링
    let filteredData = allData;
    if (key === 'available') {
      filteredData = filteredData.filter(item => item.state === 'pending');
    } else if (key === 'completed') {
      filteredData = filteredData.filter(item => item.state === 'completed');
    } else if (key === 'unavailable') {
      filteredData = filteredData.filter(item => item.state === 'unavailable');
    } else if (key === 'closed') {
      filteredData = filteredData.filter(item => item.state === 'closed');
    }
    
    // 필터링된 데이터로 업데이트
    setData(filteredData);
  };

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
            { value: 'name_phone', label: sanitizeInput('이름+연락처') },
            { value: 'rcpNum', label: sanitizeInput('접수번호') }
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // 초기 데이터 로드
  useEffect(() => {
    const mockData = getMockData();
    setAllData(mockData);
    setData(mockData);
    setLoading(false);
  }, []);

  const columns = [
    {
      title: '상태',
      dataIndex: 'state',
      align: 'center',
      render: (state) => {
        let color = 'blue';
        let text = '접수완료';

        if (state === 'pending') {
          color = 'green';
          text = '접수가능';
        } else if (state === 'completed') {
          color = 'blue';
          text = '접수완료';
        } else if (state === 'unavailable') {
          color = 'red';
          text = '접수불가';
        } else if (state === 'closed') {
          color = 'gray';
          text = '접수마감';
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '접수번호',
      dataIndex: 'rcpNum',
      align: 'center',
    },
    {
      title: '센터',
      dataIndex: 'center',
      align: 'center',
    },
    {
      title: '모델',
      dataIndex: 'model',
      align: 'center',
    },
    {
      title: '활성기간',
      dataIndex: 'date',
      align: 'center',
    },
    {
      title: '고객명',
      dataIndex: 'consumer',
      align: 'center',
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      render: (url) => (
        <URLButton url={url} />
      ),
    }
  ];

  return (
    <div>
      <Search 
        rows={searchRows}
        onSearch={handleSearch}
      />

      <ButtonGroup $btnPosition="top">
        <ButtonGroupLeft>
          <GreenButtonGroup activeKey={activeTab} onChange={handleTabChange}>
            <GreenButton value="all">전체: {statusCounts.total.toLocaleString()}</GreenButton>
            <GreenButton value="available">접수가능: {statusCounts.available.toLocaleString()}</GreenButton>
            <GreenButton value="completed">접수완료: {statusCounts.completed.toLocaleString()}</GreenButton>
            <GreenButton value="unavailable">접수불가: {statusCounts.unavailable.toLocaleString()}</GreenButton>
            <GreenButton value="closed">접수마감: {statusCounts.closed.toLocaleString()}</GreenButton>
          </GreenButtonGroup>
        </ButtonGroupLeft>
      </ButtonGroup>

      <DataTable
        columns={columns}
        dataSource={data}
        settings={{
          loading,
          rowSelection,
        }}
        buttonPosition="mixed"
        leftButtons={
          <>
            <Button danger onClick={handleBatchDelete}>삭제</Button>
            <Button danger>다운로드</Button>
          </>
        }
        rightButtons={
          <>
            <CommonButton onClick={() => navigate('/mng/svc/srvy/add')}>설문내용등록</CommonButton>
            <CommonButton onClick={() => navigate('/mng/svc/srvy/batch')}>URL EXCEL 발생</CommonButton>
            <CommonButton onClick={() => navigate('/mng/svc/srvy/new')}>URL 발행</CommonButton>
          </>
        }
      />
    </div>
  );
};

export default Survey;

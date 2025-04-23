import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Search from '@/components/admin/common/Search';
import { DataTable } from '@/components/admin/common/DataTable';
import MonthSelector from '@/components/admin/common/MonthSelect';
import useList from '@/hooks/useList';
import { getMockData } from '@/components/admin/mock/MOCK_qnaStt';
import { qnaStatSearch } from '@/components/admin/utils/search/qnaStatSearch';

const QnaStat = () => {
  // 날짜 범위 상태
  const [date, setDate] = useState({
    startDate: '',
    endDate: ''
  });

  // useList 훅 사용
  const {
    data,
    loading,
    handleSearch: originalHandleSearch
  } = useList({
    mockData: getMockData(),
    searchFunction: qnaStatSearch,
    deleteMockData: (id) => {
      console.log('Delete mock data:', id);
    },
    updateMockData: (id, data) => {
      console.log('Update mock data:', id, data);
    },
    additionalParams: useMemo(() => ({
      startDate: date.startDate,
      endDate: date.endDate
    }), [date.startDate, date.endDate])
  });

  // 검색 핸들러 - useCallback으로 메모이제이션
  const handleSearch = useCallback(() => {
    if (!date.startDate || !date.endDate) return;
    
    originalHandleSearch({
      startDate: date.startDate,
      endDate: date.endDate,
      searchValue: '',
      status: 'all'
    });
  }, [originalHandleSearch, date.startDate, date.endDate]);

  // 날짜가 변경될 때만 검색 실행
  useEffect(() => {
    if (date.startDate && date.endDate) {
      handleSearch();
    }
  }, [date.startDate, date.endDate]); // handleSearch 제거하여 무한루프 방지

  // 월 변경 핸들러
  const handleMonthChange = useCallback(({ startDate, endDate }) => {
    setDate({ startDate, endDate });
  }, []);

  // 개별 날짜 필드 변경 핸들러
  const handleStartDateChange = useCallback((e) => {
    setDate(prev => ({ ...prev, startDate: e.target.value }));
  }, []);

  const handleEndDateChange = useCallback((e) => {
    setDate(prev => ({ ...prev, endDate: e.target.value }));
  }, []);
  
  // 검색행 설정
  const searchRow = useMemo(() => [
    {
      title: '기간설정',
      type: 'date',
      startDate: date.startDate,
      endDate: date.endDate,
      onStartDateChange: handleStartDateChange,
      onEndDateChange: handleEndDateChange,
    },
  ], [date.startDate, date.endDate, handleStartDateChange, handleEndDateChange]);

  // 테이블 컬럼 설정
  const columns = useMemo(() => [
    {
      title: '접수일',
      dataIndex: 'receiptAt',
      align: 'center',
    },
    {
      title: '접수건',
      dataIndex: 'receipt',
      align: 'center',
    },
    {
      title: '처리건',
      children: [
      {
        title: '12시간내',
        dataIndex: 'w12h',
        align: 'center',
      },
      {
        title: '24시간내',
        dataIndex: 'w24h',
        align: 'center',
        },  
      {
        title: '24시간이후',
        dataIndex: 'a24h',
        align: 'center',
      },
      {
        title: '합계',
        dataIndex: 'sum',
        align: 'center',
      },
      {
        title: '미처리',
        dataIndex: 'unprocess',
          align: 'center',
        }
      ]
    }
  ], []);

  return (
    <>
      <Search 
        rows={searchRow}
        onSearch={handleSearch}
        showButton={true}
      />
      
      <MonthSelector onMonthChange={handleMonthChange} />
      
      <DataTable
        dataSource={data}
        columns={columns}
        settings={{
          loading,
          enableSelection: false,
          enableNumbering: false
        }}
      />
    </>
  );
};

export default QnaStat;

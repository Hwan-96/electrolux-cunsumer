import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Select, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const { Text } = Typography;

// 스타일 컴포넌트
const MonthSelectContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled(Text)`
  font-weight: 500;
  white-space: nowrap;
`;

/**
 * 월별 선택 컴포넌트
 * @param {Object} props
 * @param {Function} props.onMonthChange - 선택된 월이 변경될 때 호출되는 콜백
 * @param {string} props.label - 레이블 텍스트 (기본값: '월별 조회:')
 * @param {number} props.width - Select 컴포넌트의 너비 (기본값: 180)
 * @param {boolean} props.showLabel - 레이블 표시 여부 (기본값: true)
 * @param {Object} props.style - 추가 스타일 객체
 */
const MonthSelector = ({ 
  onMonthChange,
  width = 180,
  style = {}
}) => {
  // 현재 날짜 정보 (컴포넌트 마운트 시 한 번만 계산)
  const today = useMemo(() => new Date(), []);
  
  // 월 옵션 생성 (현재월부터 2018년 3월까지)
  const monthOptions = useMemo(() => {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    
    // 최소 날짜 설정 (2018년 3월)
    const minYear = 2018;
    const minMonth = 3;
    
    const options = [];
    
    // 현재 날짜의 년월 조합 (YYYYMM 형식)
    let currentYearMonth = currentYear * 12 + currentMonth;
    
    // 최소 날짜의 년월 조합 (YYYYMM 형식)
    const minYearMonth = minYear * 12 + minMonth;
    
    // 현재 날짜부터 최소 날짜까지 반복
    while (currentYearMonth >= minYearMonth) {
      // 년월 계산
      const year = Math.floor(currentYearMonth / 12);
      const month = currentYearMonth % 12 || 12; // 0이면 12월로 변경
      
      // 년월 값 생성 (YYYY-MM 형식)
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
      
      // 표시용 라벨 생성 (YYYY년 MM월 형식)
      const optionLabel = `${year}년 ${month.toString().padStart(2, '0')}월`;
      
      options.push({ 
        value: yearMonth, 
        label: optionLabel 
      });
      
      // 이전 월로 이동
      currentYearMonth--;
    }
    
    return options;
  }, []);
  
  // 선택된 년월 상태 (초기값으로 첫 번째 월 설정)
  const [selectedMonth, setSelectedMonth] = useState(() => 
    monthOptions.length > 0 ? monthOptions[0].value : '');
  
  // 날짜 계산 유틸리티 함수
  const calculateMonthDates = useCallback((yearMonth) => {
    if (!yearMonth) return null;
    
    const [year, month] = yearMonth.split('-');
    
    // 해당 월의 첫째 날
    const startDate = `${year}-${month}-01`;
    
    // 해당 월의 마지막 날 계산
    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    const endDate = `${year}-${month}-${lastDay}`;
    
    return { startDate, endDate, yearMonth };
  }, []);
  
  // 월 선택 변경 핸들러
  const handleMonthChange = useCallback((value) => {
    setSelectedMonth(value);
    
    const dates = calculateMonthDates(value);
    if (dates && onMonthChange) {
      onMonthChange(dates);
    }
  }, [calculateMonthDates, onMonthChange]);
  
  // 컴포넌트 마운트 시 한 번만 초기화 (무한루프 방지를 위해 의존성 배열 최소화)
  useEffect(() => {
    // 초기 선택된 월의 날짜 범위 계산 및 상위 컴포넌트에 전달
    const initialMonth = monthOptions.length > 0 ? monthOptions[0].value : '';
    
    if (initialMonth) {
      const dates = calculateMonthDates(initialMonth);
      if (dates && onMonthChange) {
        onMonthChange(dates);
      }
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행
  
  // Select 스타일 설정
  const selectStyle = {
    width,
    ...style
  };
  
  return (
    <MonthSelectContainer>
      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
        style={selectStyle}
        options={monthOptions}
        popupMatchSelectWidth={false}
        showSearch
        optionFilterProp="label"
        suffixIcon={<CalendarOutlined />}
        placeholder="월을 선택하세요"
      />
    </MonthSelectContainer>
  );
};

export default React.memo(MonthSelector); 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventLayout from './EventLayout';
import Pagination from '@/components/common/Pagination';
import SearchForm from '@/components/common/SearchForm';
import styled from 'styled-components';
import { axiosInstance } from '@/utils/api';

const WinnerTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  .event-title {
    text-align: left;
    cursor: pointer;
    color: #333;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .winner-info {
    text-align: left;
  }
`;

// 페이지당 아이템 수
const ITEMS_PER_PAGE = 10;

const WinnerEvent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('subject|contents');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 이벤트 목록 조회
  const fetchEvents = async (params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/events', { 
        params: {
          ...params,
          flag: '3' // 당첨자 발표
        }
      });
      setEvents(response.data.data || []);
      setTotalItems(response.data.meta?.total || 0);
    } catch (err) {
      setError(err.message);
      setEvents([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchEvents({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      searchType: searchKey,
      searchKeyword: searchValue
    });
  }, [currentPage]);

  // 검색 기능
  const handleSearch = () => {
    fetchEvents({
      searchType: searchKey,
      searchKeyword: searchValue,
      page: 1,
      limit: ITEMS_PER_PAGE
    });
    setCurrentPage(1);
  };

  // 검색 초기화
  const handleReset = () => {
    setSearchKey('subject|contents');
    setSearchValue('');
    fetchEvents({
      searchType: 'subject|contents',
      searchKeyword: '',
      page: 1,
      limit: ITEMS_PER_PAGE
    });
    setCurrentPage(1);
  };

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 이벤트 상세 페이지로 이동
  const handleEventClick = (eventId) => {
    navigate(`/evnt/detail/${eventId}`);
  };

  const searchOptions = [
    { value: 'subject|contents', label: '전체' },
    { value: 'subject', label: '제목' },
    { value: 'contents', label: '내용' }
  ];

  return (
    <EventLayout
      currentPage="당첨자 발표"
      activeTab="winner"
      title="Event"
    >
      <div className="event-area view" style={{ display: 'block' }}>
        {loading ? (
          <div className="tac" style={{ padding: '50px 0' }}>데이터를 불러오는 중입니다...</div>
        ) : error ? (
          <div className="tac" style={{ padding: '50px 0' }}>데이터를 불러오는데 실패했습니다. {error}</div>
        ) : events.length > 0 ? (
          <>
            <WinnerTable>
              <thead>
                <tr>
                  <th style={{ width: '10%' }}>번호</th>
                  <th style={{ width: '50%' }}>이벤트명</th>
                  <th style={{ width: '20%' }}>당첨자</th>
                  <th style={{ width: '20%' }}>당첨일</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event.id}>
                    <td>{totalItems - ((currentPage - 1) * ITEMS_PER_PAGE + index)}</td>
                    <td>
                      <span 
                        className="event-title"
                        onClick={() => handleEventClick(event.id)}
                      >
                        {event.title}
                      </span>
                    </td>
                    <td className="winner-info">{event.winners || '-'}</td>
                    <td>{event.winnerAnnounceDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </WinnerTable>

            {/* 페이징 영역 */}
            {totalPages > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="event-not-txt">
            <p>당첨자 발표가 없습니다.</p>
          </div>
        )}

        <SearchForm
          searchOptions={searchOptions}
          searchKey={searchKey}
          searchValue={searchValue}
          onSearchKeyChange={setSearchKey}
          onSearchValueChange={setSearchValue}
          onSearch={handleSearch}
          onReset={handleReset}
          placeholder="검색어를 입력해 주세요."
          formId="form_search"
        />
      </div>
    </EventLayout>
  );
};

export default WinnerEvent; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventLayout from './EventLayout';
import Pagination from '@/components/common/Pagination';
import styled from 'styled-components';
import { axiosInstance } from '@/utils/api';

const EventListUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const EventListLi = styled.li`
  width: 100% !important;
`

// 페이지당 아이템 수
const ITEMS_PER_PAGE = 10;

const EndedEvent = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
          flag: '2' // 종료된 이벤트
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
    });
  }, [currentPage]);

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 이벤트 상세 페이지로 이동
  const handleEventClick = (eventId) => {
    navigate(`/evnt/detail/${eventId}`);
  };

  return (
    <EventLayout
      currentPage="종료 이벤트"
      activeTab="end"
      title="Event"
    >
      <div className="event-area view" style={{ display: 'block' }}>
        <div className="cf evt-list" style={{ zoom: 1, position: 'static' }}>
          {loading ? (
            <div className="tac" style={{ padding: '50px 0' }}>데이터를 불러오는 중입니다...</div>
          ) : error ? (
            <div className="tac" style={{ padding: '50px 0' }}>데이터를 불러오는데 실패했습니다. {error}</div>
          ) : events.length > 0 ? (
            <EventListUl className="evt-list" style={{ zoom: 1, position: 'static' }}>
              {events.map(event => (
                <EventListLi key={event.id}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      handleEventClick(event.id);
                    }}
                  >
                    <div className="img">
                      <img src={event.imageUrl} alt={event.title} />
                    </div>
                    <div className="tit">{event.title}</div>
                    <div className="date">{event.eventPeriod}</div>
                  </a>
                </EventListLi>
              ))}
            </EventListUl>
          ) : (
            <div className="event-not-txt">
              <p>종료된 이벤트가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 페이징 영역 */}
        {!loading && !error && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </EventLayout>
  );
};

export default EndedEvent; 
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import SearchForm from '@/components/common/SearchForm';
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

const EventList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [flag, setFlag] = useState(searchParams.get('flag') || '1');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState('TITLE');
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
      const response = await axiosInstance.get('/events', { params });
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

  // flag에 따라 탭 변경 (1: 진행중, 2: 종료, 3: 당첨자발표)
  useEffect(() => {
    setFlag(searchParams.get('flag') || '1');
  }, [searchParams]);

  // flag 변경 시 데이터 재요청
  useEffect(() => {
    fetchEvents({
      page: 1,
      limit: ITEMS_PER_PAGE,
      flag,
      searchType: searchKey,
      searchKeyword: searchValue
    });
    setCurrentPage(1);
  }, [flag]);

  // 페이지 변경 시 데이터 재요청
  useEffect(() => {
    fetchEvents({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      flag,
      searchType: searchKey,
      searchKeyword: searchValue
    });
  }, [currentPage]);

  // 검색 기능
  const handleSearch = () => {
    fetchEvents({
      searchType: searchKey,
      searchKeyword: searchValue,
      flag,
      page: 1,
      limit: ITEMS_PER_PAGE
    });
    setCurrentPage(1);
  };

  // 검색 초기화
  const handleReset = () => {
    setSearchKey('TITLE');
    setSearchValue('');
    fetchEvents({
      searchType: 'TITLE',
      searchKeyword: '',
      flag,
      page: 1,
      limit: ITEMS_PER_PAGE
    });
    setCurrentPage(1);
  };

  // 탭 변경 처리
  const handleTabChange = (tabFlag) => {
    setSearchParams({ flag: tabFlag });
  };

  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 이벤트 상세 페이지로 이동
  const handleEventClick = (eventId) => {
    navigate(`detail/${eventId}`);
  };

  // 검색 옵션
  const searchOptions = [
    { value: 'TITLE', label: '제목' }
  ];

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="이벤트" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox 
            title="Event" 
            description="일렉트로룩스와 함께 하는 다양한 혜택과 이벤트" 
          />
          
          {/* 탭 네비게이션 */}
          <div className="link-tab event-tab">
            <ul>
              <li className={flag === '1' ? 'on' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('1'); }}>
                  진행 이벤트
                </a>
              </li>
              <li className={flag === '2' ? 'on' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('2'); }}>
                  종료 이벤트
                </a>
              </li>
              <li className={flag === '3' ? 'on' : ''}>
                <a href="#" onClick={(e) => { e.preventDefault(); handleTabChange('3'); }}>
                  당첨자 발표
                </a>
              </li>
            </ul>
          </div>

          {/* 진행중/종료된 이벤트 뷰 */}
          {(flag === '1' || flag === '2') && (
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
                    <p>현재 {flag === '1' ? '진행중인' : '종료된'} 이벤트가 없습니다.</p>
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
              
              {/* 검색 영역 */}
              <SearchForm
                searchOptions={searchOptions}
                searchKey={searchKey}
                searchValue={searchValue}
                onSearchKeyChange={setSearchKey}
                onSearchValueChange={setSearchValue}
                onSearch={handleSearch}
                onReset={handleReset}
                placeholder="검색어를 입력해 주세요."
                formId="eventSearchForm"
              />
            </div>
          )}

          {/* 당첨자 발표 뷰 */}
          {flag === '3' && (
            <div className="event-area winner" style={{ display: 'block' }}>
              <table className="type1 list1">
                <caption>당첨자 발표 리스트</caption>
                <colgroup>
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '50%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">이벤트 기간</th>
                    <th scope="col">발표일</th>
                  </tr>
                </thead>
                <tbody className="win-view">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="tac">데이터를 불러오는 중입니다...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="tac">데이터를 불러오는데 실패했습니다. {error}</td>
                    </tr>
                  ) : events.length > 0 ? (
                    events.map(event => (
                      <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              handleEventClick(event.id);
                            }}
                          >
                            {event.title}
                          </a>
                        </td>
                        <td>{event.eventPeriod}</td>
                        <td>{event.announcementDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">검색 된 게시물이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* 페이징 영역 */}
              {!loading && !error && totalPages > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
              
              {/* 검색 영역 */}
              <SearchForm
                searchOptions={searchOptions}
                searchKey={searchKey}
                searchValue={searchValue}
                onSearchKeyChange={setSearchKey}
                onSearchValueChange={setSearchValue}
                onSearch={handleSearch}
                onReset={handleReset}
                placeholder="검색어를 입력해 주세요."
                formId="winnerSearchForm"
              />
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default EventList; 
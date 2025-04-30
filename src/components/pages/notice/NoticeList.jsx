import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import SearchForm from '@/components/common/SearchForm';
import useNoticeStore from '@/stores/noticeStore';

const NoticeList = () => {
  const navigate = useNavigate();
  
  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 표시할 항목 수
  
  // 검색 상태
  const [searchKey, setSearchKey] = useState('subject|contents');
  const [searchValue, setSearchValue] = useState('');
  
  // 공지사항 스토어 사용
  const {
    notices,
    meta,
    loading,
    error,
    getNoticeList
  } = useNoticeStore();

  // 총 페이지 수 계산
  const totalPages = meta?.totalPages || 0;
  
  // 검색 옵션
  const searchOptions = [
    { value: 'subject|contents', label: '전체' },
    { value: 'subject', label: '제목' },
    { value: 'contents', label: '내용' }
  ];
  
  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      await getNoticeList({
        page: 1,
        limit: itemsPerPage
      });
    };
    
    fetchInitialData();
  }, [getNoticeList, itemsPerPage]);
  
  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    // 첫 번째 useEffect에서 이미 처리했으므로 페이지가 1보다 클 때만 호출
    if (currentPage > 1) {
      const fetchData = async () => {
        await getNoticeList({
          page: currentPage,
          limit: itemsPerPage,
          searchType: searchKey,
          searchKeyword: searchValue
        });
      };
      
      fetchData();
    }
  }, [currentPage, getNoticeList, itemsPerPage, searchKey, searchValue]);
  
  // 검색 처리
  const handleSearch = () => {
    getNoticeList({
      page: 1,
      limit: itemsPerPage,
      searchType: searchKey,
      searchKeyword: searchValue
    });
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };
  
  // 검색 초기화
  const handleReset = () => {
    setSearchKey('subject|contents');
    setSearchValue('');
    setCurrentPage(1);
    
    // 초기화 후 검색 실행
    getNoticeList({
      page: 1,
      limit: itemsPerPage,
      searchType: 'subject|contents',
      searchKeyword: ''
    });
  };
  
  // 페이지 이동 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 게시물 번호 계산 (역순)
  const calculateItemNumber = (index) => {
    // 전체 아이템 개수 - (현재 페이지 - 1) * 페이지당 아이템 수 - 현재 페이지 내 인덱스
    return meta.total - ((currentPage - 1) * itemsPerPage + index);
  };

  // 공지사항 상세 페이지로 이동
  const handleNoticeClick = (id) => {
    navigate(`/ntc/${id}`);
  };

  return (
    <div id="sub-container">
      {/* 경로 표시 */}
      <PathNav currentPage={["고객지원", "공지사항"]} />

      {/* 콘텐츠 */}
      <div id="contents">
        <article className="sub-article">
          {/* 제목 영역 */}
          <SubTitleBox 
            title="공지사항" 
            description="일렉트로룩스의 고객센터 공지사항입니다." 
          />

          {/* 게시판 목록 */}
          <table className="type1 list1">
            <caption>공지사항 리스트</caption>
            <colgroup>
              <col />
              <col style={{ width: '60%' }} />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
                <th scope="col">첨부</th>
                <th scope="col">작성일</th>
                <th scope="col">조회</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="tac">데이터를 불러오는 중입니다...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="tac">데이터를 불러오는데 실패했습니다. {error}</td>
                </tr>
              ) : notices.length > 0 ? (
                notices.map((notice, index) => (
                  <tr key={notice.id}>
                    <td>{calculateItemNumber(index)}</td>
                    <td className="tit">
                      <a 
                        href="#" 
                        className="txt"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNoticeClick(notice.id);
                        }}
                      >
                        {notice.title}
                      </a>
                    </td>
                    <td>
                      {notice.hasAttachment && (
                        <img src='/images/ico-file.png' alt="첨부파일" />
                      )}
                    </td>
                    <td>{notice.createdAt}</td>
                    <td>{notice.views.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="tac">등록된 게시물이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* 페이징 - 공통 컴포넌트 사용 */}
          {!loading && !error && totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* 검색 폼 - 공통 컴포넌트 사용 */}
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
        </article>
      </div>
    </div>
  );
};

export default NoticeList;

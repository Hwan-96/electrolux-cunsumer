import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import SearchForm from '@/components/common/SearchForm';
import fileIco from '@/images/ico-file.png';
import useApi from '@/utils/useApi';

const NoticeList = () => {
  const navigate = useNavigate();
  
  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 표시할 항목 수
  
  // 검색 상태
  const [searchKey, setSearchKey] = useState('subject|contents');
  const [searchValue, setSearchValue] = useState('');
  
  // API 요청을 위한 useApi 훅 사용
  const {
    data: apiResponse,
    loading,
    error,
    updateParams
  } = useApi('/notices', {
    page: currentPage,
    limit: itemsPerPage,
    searchType: searchKey,
    searchKeyword: searchValue
  });

  // API로부터 데이터 추출
  const notices = apiResponse?.data || [];
  const totalItems = apiResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 검색 옵션
  const searchOptions = [
    { value: 'subject|contents', label: '전체' },
    { value: 'subject', label: '제목' },
    { value: 'contents', label: '내용' }
  ];
  
  // 페이지 변경 시 데이터 재요청
  useEffect(() => {
    updateParams({ page: currentPage });
  }, [currentPage, updateParams]);
  
  // 검색 처리
  const handleSearch = () => {
    // 검색 필터링 로직
    updateParams({
      searchType: searchKey,
      searchKeyword: searchValue,
      page: 1
    });
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };
  
  // 검색 초기화
  const handleReset = () => {
    setSearchKey('subject|contents');
    setSearchValue('');
    setCurrentPage(1);
    updateParams({
      searchType: 'subject|contents',
      searchKeyword: '',
      page: 1
    });
  };
  
  // 페이지 이동 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // 게시물 번호 계산 (역순)
  const calculateItemNumber = (index) => {
    // 전체 아이템 개수 - (현재 페이지 - 1) * 페이지당 아이템 수 - 현재 페이지 내 인덱스
    return totalItems - ((currentPage - 1) * itemsPerPage + index);
  };

  // 공지사항 상세 페이지로 이동
  const handleNoticeClick = (id) => {
    navigate(`/notice/${id}`);
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
                        <img src={fileIco} alt="첨부파일" />
                      )}
                    </td>
                    <td>{notice.date}</td>
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

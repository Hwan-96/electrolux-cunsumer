import React, { useState, useEffect } from 'react';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import SearchForm from '@/components/common/SearchForm';
import { Link, useNavigate } from 'react-router-dom';
import useQnaStore from '@/stores/qnaStore';
import useAuthStore from '@/stores/authStore';

const Qna = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('ctgr3'); // ctgr3: 문의내용, answer: 답변
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 페이지당 표시할 항목 수
  
  // QNA 스토어에서 필요한 상태와 메서드 가져오기
  const { qnaList, loading, error, meta, getQnaList } = useQnaStore();
  
  // 로그인 스토어에서 로그인 상태 가져오기
  const { isLoggedIn, userInfo } = useAuthStore();
  
  // 컴포넌트 마운트 시 QNA 목록 가져오기
  useEffect(() => {
    const fetchQnas = async () => {
      await getQnaList({
        page: currentPage,
        limit: itemsPerPage,
        searchType,
        searchValue: searchKeyword
      });
    };
    
    fetchQnas();
  }, [getQnaList, currentPage, itemsPerPage]);

  // 검색 옵션
  const searchOptions = [
    { value: 'ctgr3', label: '문의내용' },
    { value: 'answer', label: '답변' }
  ];
  
  // 총 페이지 수 계산
  const totalPages = meta?.totalPages || 1;

  // 검색 실행
  const handleSearch = () => {
    getQnaList({
      page: 1, // 검색 시 첫 페이지로 이동
      limit: itemsPerPage,
      searchType,
      searchValue: searchKeyword
    });
    setCurrentPage(1);
  };
  
  // 페이지 변경 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
    getQnaList({
      page,
      limit: itemsPerPage,
      searchType,
      searchValue: searchKeyword
    });
  };
  
  // QNA 상세 페이지로 이동
  const handleQuestionClick = (id, authorId) => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    
    // 관리자는 모든 글에 접근 가능
    if (userInfo?.type === 'admin') {
      navigate(`/qna/${id}`);
      return;
    }
    
    // 일반 사용자는 자신의 글만 볼 수 있음
    if (authorId !== userInfo?.id) {
      alert('본인이 작성한 글만 확인할 수 있습니다.');
      return;
    }
    
    // 자신의 글이면 접근 가능
    navigate(`/qna/${id}`);
  };

  // 새 QNA 등록 페이지로 이동
  const handleRegisterClick = () => {
    if (!isLoggedIn) {
      alert('로그인 후 등록이 가능합니다.');
      navigate('/login');
    } else {
      // 상담 등록 페이지로 이동
      navigate('/qna/form');
    }
  };
  
  // 검색 초기화
  const handleReset = () => {
    setSearchType('ctgr3');
    setSearchKeyword('');
    setCurrentPage(1);
    getQnaList({
      page: 1,
      limit: itemsPerPage,
      searchType: 'ctgr3',
      searchValue: ''
    });
  };

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="고객상담" lastPage="1:1 상담" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="1:1 상담"
            description={[
              "제품 사용 중 궁금증을 무엇이든 물어보세요. 빠른 시간 내 답변 드리겠습니다.",
              <br key="br" />,
              "잠깐 ! 자주하시는 질문에서 증상을 먼저 확인하시면 더욱 빠른 처리가 가능합니다."
            ]}
          />

          {/* 링크 탭 */}
          <div className="link-tab">
            <ul>
              <li><Link to="/faq">자주묻는 질문</Link></li>
              <li className="on"><Link to="/qna">1:1 고객상담</Link></li>
            </ul>
          </div>

          {/* 상담등록 버튼 */}
          <div className="ta-top">
            <a href="#" className="hgbtn blue02 fr" onClick={(e) => {
              e.preventDefault();
              handleRegisterClick();
            }}>상담등록</a>
          </div>

          {/* 상담 목록 */}
          <table className="type1 list1 qna-list1">
            <caption>1:1상담 리스트</caption>
            <thead>
              <tr>
                <th scope="col" className="w1">번호</th>
                <th scope="col" className="w2">제목</th>
                <th scope="col" className="w3">고객명</th>
                <th scope="col" className="w4">작성일</th>
                <th scope="col" className="w5">답변여부</th>
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
              ) : qnaList.length > 0 ? (
                qnaList.map((qna) => (
                  <tr key={qna.id}>
                    <td>{qna.id}</td>
                    <td className="tit">
                      <a 
                        href="#" 
                        className="txt"
                        onClick={(e) => {
                          e.preventDefault();
                          handleQuestionClick(qna.id, qna.authorId);
                        }}
                      >
                        {qna.title}
                      </a>
                    </td>
                    <td>{qna.author}</td>
                    <td>{qna.date}</td>
                    <td>
                      {qna.answered ? (
                        '답변완료'
                      ) : (
                        <span style={{ color: '#CC0000' }}>답변대기중</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="tac">등록된 상담 내역이 없습니다.</td>
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
            searchKey={searchType}
            searchValue={searchKeyword}
            onSearchKeyChange={setSearchType}
            onSearchValueChange={setSearchKeyword}
            onSearch={handleSearch}
            onReset={handleReset}
            placeholder="검색어를 입력해 주세요."
          />

          <input type="hidden" name="uqid" id="uqid" value="" />
        </article>
      </div>
    </div>
  );
};

export default Qna;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';

const Header = () => {
  const [isGnbOpen, setIsGnbOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMyMenuOpen, setIsMyMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const { isLoggedIn, userInfo, logout } = useAuthStore();
  const location = useLocation();

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsGnbOpen(false);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, isMobile]);

  const toggleGnb = () => setIsGnbOpen(!isGnbOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMyMenu = () => setIsMyMenuOpen(!isMyMenuOpen);

  const handleMouseEnter = (menuId) => {
    setActiveSubmenu(menuId);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  // 로그아웃 처리 함수
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  // 모바일일 때만 적용될 스타일
  const mobileGnbStyle = isMobile ? {
    left: isGnbOpen ? '0' : '-150%',
    opacity: isGnbOpen ? '1' : '0',
    transition: 'all 0.3s ease-in-out'
  } : {};

  // 링크 클릭 핸들러
  const handleLinkClick = () => {
    if (isMobile) {
      setIsGnbOpen(false);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div id="header-wrap">
      <header id="header">
        <h1 className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src='/images/logo.png' alt="Electrolux 고객센터" />
          </Link>
        </h1>

        <button 
          type="button" 
          className={isGnbOpen ? 'hgbtn btn-gnb-open open' : 'hgbtn btn-gnb-open'}
          onClick={toggleGnb}
        >
          전체메뉴 열기
        </button>

        {/* my-menu */}
        <div 
          className="my-menu-wrap"
          onMouseLeave={() => setIsMyMenuOpen(false)}
        >
          <button 
            type="button"
            className="hgbtn btn-mypage"
            onClick={toggleMyMenu}
          >
            마이페이지
          </button>
          <div className={`my-menu ${isMyMenuOpen ? 'open' : ''}`}>
            {isLoggedIn ? (
              // 로그인된 경우
              <ul>
                {userInfo?.type === 'admin' && (
                  <li><Link to="/mng" onClick={handleLinkClick}>관리자페이지</Link></li>
                )}
                <li>
                  <Link to="/mem/cs" onClick={handleLinkClick}>회원정보수정</Link>
                </li>
                <li><Link to="/qna" onClick={handleLinkClick}>1:1상담내역</Link></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>로그아웃</a></li>
              </ul>
            ) : (
              // 로그인되지 않은 경우
              <ul>
                <li><Link to="/login" onClick={handleLinkClick}>로그인</Link></li>
                <li><Link to="/join/agreement" onClick={handleLinkClick}>회원가입</Link></li>
              </ul>
            )}
          </div>
        </div>
        {/* //my-menu */}

        <button 
          type="button" 
          className="hgbtn btn-top-sh"
          onClick={toggleSearch}
        >
          검색열기
        </button>

        {/* 모바일 gnb 상단 */}
        <nav id="gnb-wrap" className={isGnbOpen ? 'open' : ''} style={mobileGnbStyle}>
          <div className="m-top">
            {isLoggedIn ? (
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>로그아웃</a>
            ) : (
              <Link to="/login" onClick={handleLinkClick}>로그인</Link>
            )}
            <a href="https://www.electrolux.co.kr/" target="_blank" rel="noopener noreferrer" title="새창">
              소모품 구매
            </a>
          </div>

          <ul id="gnb">
            <li>
              <a href="https://www.electrolux.co.kr/about-us/our-company/" target="_blank" rel="noopener noreferrer" title="새창">
                회사소개
              </a>
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('service')}
              onMouseLeave={handleMouseLeave}
              className={activeSubmenu === 'service' ? 'active dep1-2' : ''}
            >
              <Link to="/svc/wrnt" onClick={handleLinkClick}>서비스정책 안내</Link>
              <ul className="dep2">
                <li><Link to="/svc/wrnt" onClick={handleLinkClick}>제품 보증 기간</Link></li>
                <li><Link to="/svc/as" onClick={handleLinkClick}>유ㆍ무상 기준</Link></li>
                <li><Link to="/svc/asChr" onClick={handleLinkClick}>수리 요금 구성</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/cntLst" onClick={handleLinkClick}>서비스센터 찾기</Link>
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('customer')}
              onMouseLeave={handleMouseLeave}
              className={activeSubmenu === 'customer' ? 'active dep1-4' : ''}
            >
              <Link to="/faq" onClick={handleLinkClick}>고객 상담</Link>
              <ul className="dep2">
                <li><Link to="/faq" onClick={handleLinkClick}>자주하는 질문</Link></li>
                <li><Link to="/qna" onClick={handleLinkClick}>1:1 상담</Link></li>
              </ul>
            </li>
            <li 
              onMouseEnter={() => handleMouseEnter('download')}
              onMouseLeave={handleMouseLeave}
              className={activeSubmenu === 'download' ? 'active dep1-5' : ''}
            >
              <Link to="/dwn/manual" onClick={handleLinkClick}>다운로드</Link>
              <ul className="dep2">
                <li><Link to="/dwn/manual" onClick={handleLinkClick}>제품 사용 설명서</Link></li>
                <li><Link to="/dwn/cleanup" onClick={handleLinkClick}>청소기 관리 방법</Link></li>
              </ul>
            </li>
            <li><Link to="/ntc" onClick={handleLinkClick}>공지사항</Link></li>
            <li>
              <Link to="/evnt/ongoing" onClick={handleLinkClick}>이벤트</Link>
            </li>

            {/* pc만 노출 */}
            <li className="pc-only">
              <a href="https://www.electrolux.co.kr/" target="_blank" rel="noopener noreferrer" title="새창">
                소모품 구매
              </a>
            </li>

            {/* 모바일만 노출 - 로그인 상태에 따라 다른 메뉴 표시 */}
            <li 
              className={`mypage-menu ${activeSubmenu === 'mypage' ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter('mypage')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={isLoggedIn ? "/member/my-cs.php" : "/login"} onClick={handleLinkClick}>마이페이지</Link>
              <ul className="dep2">
                {isLoggedIn ? (
                  // 로그인된 경우
                  <>
                    {userInfo?.type === 'admin' && (
                      <li><Link to="/admin" onClick={handleLinkClick}>관리자페이지</Link></li>
                    )}
                    <li>
                      <a href="https://member.electroluxconsumer.co.kr/mypage/?contents=mypage_info" target="_blank" rel="noopener noreferrer" title="새창">
                        회원정보수정
                      </a>
                    </li>
                    <li><Link to="/member/my-cs.php" onClick={handleLinkClick}>1:1상담내역</Link></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>로그아웃</a></li>
                  </>
                ) : (
                  // 로그인되지 않은 경우
                  <>
                    <li><Link to="/login" onClick={handleLinkClick}>로그인</Link></li>
                    <li><Link to="/join/agreement" onClick={handleLinkClick}>회원가입</Link></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
          <div className={`gnb-sub-bg ${activeSubmenu ? 'active' : ''}`}></div>
        </nav>
      </header>

      {/* hd-search-box */}
      <div className={`hd-search-box ${isSearchOpen ? 'open' : ''}`}>
        <form method="post" name="form_search_top" id="form_search_top" action="/dwn/manual">
          <div className="sh-box">
            <label htmlFor="search_top" className="hid">모델명을 검색해주세요.</label>
            <input 
              type="text" 
              name="search_top" 
              id="search_top"
              placeholder="모델명을 검색해주세요." 
              className="ip01" 
            />
            <button type="submit" className="hgbtn blue02 btn-smit">검색</button>
          </div>
          <p className="txt">예시) 모델명 검색 : MEGAPOWER.3, EBR9804S</p>
        </form>
        <button 
          type="button" 
          className="hgbtn btn-sh-close"
          onClick={toggleSearch}
        >
          검색창닫기
        </button>
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '@/stores/authStore';
import useMenuStore from '@/components/admin/store/menuStore';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1180px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.27);
  z-index: 1000;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding-right: 40px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  min-width: 230px;
  height: inherit;
  overflow: hidden;
`;

const HeaderMiddle = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 230px;
  margin-left: auto;
`;

const HeaderLogo = styled.div`
  min-width: 230px;

  h1{
    text-align: center;

    a{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-height: 40px;
      }
    }
  }
`;

const HeaderNav = styled.nav`
  ul{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #ebebeb;

    li{
      width: 14%;
      height: 100%;
      margin: 0 2px;
      &.on,
      &:hover{
        a{
          font-weight: bold;
          background-color: #fff;
          box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
        }
      }

      &:first-child,
      &:last-child{
        margin-left: 0;
      }
      
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        color: #464646;
      }
    }
  }
`

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;

  button{
    width: 100%;
    max-width: 100px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    padding: 0 5px;
    border-radius: 5px;
    color: #fff;
    border: 1px solid #354255;
    background-color: #354255;
    transition: 0.35s;
    transition-property: box-shadow;

    &:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

const AdminHeader = () => {
  const { logout } = useAuthStore();
  const { setSelectedMenu } = useMenuStore();
  const location = useLocation();

  // 현재 경로에 따라 메뉴 선택
  React.useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/mng/svc')) setSelectedMenu('Service');
    else if (path.startsWith('/mng/stat')) setSelectedMenu('Statistic');
    else if (path.startsWith('/mng/dwn')) setSelectedMenu('Download');
    else if (path.startsWith('/mng/mem')) setSelectedMenu('Member');
    else if (path.startsWith('/mng/ctgr')) setSelectedMenu('Category');
    else if (path.startsWith('/mng/cstmz')) setSelectedMenu('Customize');
    else if (path.startsWith('/mng/evnt')) setSelectedMenu('Event');
  }, [location.pathname, setSelectedMenu]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLeft>
          <HeaderLogo>
            <h1>
              <Link to="/mng">
                <img src="/admin/header_logo.png" alt="Electrolux 고객센터 관리자센터" />
              </Link>
            </h1>
          </HeaderLogo>
        </HeaderLeft>
        <HeaderMiddle>
          <HeaderNav>
            <ul>
              <li className={location.pathname.startsWith('/mng/svc') ? 'on' : ''}>
                <Link to="/mng/svc/onCns" onClick={() => setSelectedMenu('Service')}>
                  Service
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/stt') ? 'on' : ''}>
                <Link to="/mng/stt/onCnsStt" onClick={() => setSelectedMenu('Statistic')}>
                  Statistic
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/dwn') ? 'on' : ''}>
                <Link to="/mng/dwn/manual" onClick={() => setSelectedMenu('Download')}>
                  Download
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/mem') ? 'on' : ''}>
                <Link to="/mng/mem/list" onClick={() => setSelectedMenu('Member')}>
                  Member
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/ctgr') ? 'on' : ''}>
                <Link to="/mng/ctgr/prd" onClick={() => setSelectedMenu('Category')}>
                  Category
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/cstmz') ? 'on' : ''}>
                <Link to="/mng/cstmz/bnr" onClick={() => setSelectedMenu('Customize')}>
                  Customize
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/evnt') ? 'on' : ''}>
                <Link to="/mng/evnt/list" onClick={() => setSelectedMenu('Event')}>
                  Event
                </Link>
              </li>
            </ul>
          </HeaderNav>
        </HeaderMiddle>
        <HeaderRight>
          <HeaderUser>
            <button onClick={handleLogout}>로그아웃</button>
          </HeaderUser>
        </HeaderRight>
      </HeaderWrap>
    </HeaderContainer>
  );
};

export default AdminHeader;

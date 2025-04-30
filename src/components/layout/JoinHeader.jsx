/* import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoImages } from '@/utils/data.js';
import styled from 'styled-components';

const TopWrap = styled.div`
  position:fixed; top:0px; left:0px; width:100%; height:60px; line-height:60px; background-color:#1a2753; z-index:1000;
`;

const Logo = styled.ul`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
`;

const MMenu = styled.div`
  position:absolute; top:0px; right:0px; padding-right:10px; display:none;
`;

const MMenuImg = styled.img`
  height:60px; cursor:pointer;
`;

const TopBlank = styled.div`
  height:120px;
`;

const TopMenu = styled.div`
  position:fixed; top:60px; left:0px; width:100%; border-bottom:solid 1px #e1e1e1; background-color:#fff; display:block; z-index:100;
`;

const TopMenuInbox = styled.div`
  width:1000px; margin:0 auto;
`;

const LeftMenu = styled.ul`
  float:left;

  li {
    display:inline-table; margin-left:20px; height:59px; line-height:59px; font-size:14px; letter-spacing:-1px; position:relative; cursor:pointer;

    &:first-child {
      margin-left: 0px;
    }
  }
`;

const RightMenu = styled.ul`
  float: right; text-align:center;

  li {
    display:inline-table; margin-left:20px; height:59px; line-height:59px; font-size:15px; letter-spacing:-1px; position:relative; cursor:pointer; font-weight:bold; color:#1a2753;
  }
  &.mobile {
    display:none;
  }
`;  

const Fend = styled.div`
  clear:both;
`;




const JoinHeader = () => {
  const navigate = useNavigate();
  return (
    <TopWrap>
      <Logo onClick={() => window.location.href = '/'}>
        <img src={logoImages.join} alt="Electrolux" />
      </Logo>
      <MMenu>
        <MMenuImg src={null} alt="로그인" onClick={() => window.location.href = '/login'} />
      </MMenu>
      <TopBlank></TopBlank>
      <TopMenu>
        <TopMenuInbox>
          <LeftMenu>
            <li onClick={() => window.location.href = '/login'}>
              <div></div>로그인
            </li>
            <li>
              <div></div>
              <span onClick={() => window.location.href = '/find-id'}>아이디</span> /
              <span onClick={() => window.location.href = '/find-password'}>비밀번호</span> 찾기
            </li>
          </LeftMenu>
          <RightMenu className="right_menu pc">
            <li className="off" onClick={() => window.location.href = 'https://www.electrolux.co.kr/'}>
              <div></div>일렉트로룩스
            </li>
            <li className="off" onClick={() => navigate('/ntc')}>
              <div></div>고객센터
            </li>
            <li className="off" onClick={() => navigate('/ntc')}>
              <div></div>캠페인
            </li>
          </RightMenu>
          <RightMenu className="right_menu mobile">
            <li className="off" onClick={() => window.location.href = '/member/info'}>
              <div></div>회원정보수정
            </li>
            <li className="off" onClick={() => window.location.href = '/member/withdraw'}>
              <div></div>회원탈퇴
            </li>
            <li className="off" onClick={() => window.location.href = '/logout'}>
              <div></div>로그아웃
            </li>
          </RightMenu>
          <Fend></Fend>
        </TopMenuInbox>
      </TopMenu>
    </TopWrap>
  );
};

export default JoinHeader;  */
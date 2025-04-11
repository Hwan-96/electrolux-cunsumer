import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PathWrap = styled.div`
  a{
    color: #fff;
  }
  nav{
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 10px;
  }
`;

const PathNav = ({ currentPage, prevPage = "Home" }) => {
  // currentPage가 문자열이면 배열로 변환, 이미 배열이면 그대로 사용
  const pages = Array.isArray(currentPage) ? currentPage : [currentPage];

  return (
    <PathWrap>
      <div className="path-wrap">
        <nav>
          <Link to="/" className="home">{prevPage}</Link>
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              <span className="arr">&gt;</span>
              <span className="cur">{page}</span>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </PathWrap>
  );
};

export default PathNav; 
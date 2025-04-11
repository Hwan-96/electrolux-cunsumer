import React from 'react';
import styled from 'styled-components';

const County = styled.li`
  cursor: pointer;
`;

const LocalMap = () => {
  return (
    <>
      <div id="all_map" className="local_map">
        <p className="tit">광역 지도</p>
        <p className="txt">원하시는 광역시/도를 선택해주세요.</p>
        <ul>
          <County className="gangwon">
            <a href="#n"><span>강원도</span></a>
          </County>
          <County className="gyeonggi">
            <a href="#n"><span>경기도</span></a>
          </County>
          <County className="gyeongnam">
            <a href="#n"><span>경상남도</span></a>
          </County>
          <County className="gyeongbuk">
            <a href="#n"><span>경상북도</span></a>
          </County>
          <County className="gwangju">
            <a href="#n"><span>광주광역시</span></a>
          </County>
          <County className="daegu">
            <a href="#n"><span>대구광역시</span></a>
          </County>
          <County className="daejeon">
            <a href="#n"><span>대전광역시</span></a>
          </County>
          <County className="busan">
            <a href="#n"><span>부산광역시</span></a>
          </County>
          <County className="seoul">
            <a href="#n"><span>서울특별시</span></a>
          </County>
          <County className="ulsan">
            <a href="#n"><span>울산광역시</span></a>
          </County>
          <County className="incheon">
            <a href="#n"><span>인천광역시</span></a>
          </County>
          <County className="jeollanam">
            <a href="#n"><span>전라남도</span></a>
          </County>
          <County className="jeollabuk">
            <a href="#n"><span>전라북도</span></a>
          </County>
          <County className="jeju">
            <a href="#n"><span>제주도</span></a>
          </County>
          <County className="chungnam">
            <a href="#n"><span>충청남도</span></a>
          </County>
          <County className="chungbuk">
            <a href="#n"><span>충청북도</span></a>
          </County>
        </ul>
      </div>
    </>
  );
};

export default LocalMap; 
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleFamilySiteChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      window.open(selectedValue, '_blank');
    }
  };

  return (
    <footer id="footer">
      <div className="inner">
        <div className="fmenu">
          <p className="flogo">
            <img src='/images/logo-footer.png' alt="Electrolux" />
          </p>
          <ul>
            <li><Link to="/terms">이용약관</Link></li>
            <li><Link to="/privacy">개인정보처리방침</Link></li>
          </ul>
        </div>
        <select 
          id="fm-site" 
          className="sel01"
          onChange={handleFamilySiteChange}
        >
          <option value="">Family Site</option>
          <option value="https://www.electrolux.co.kr/">일렉트로룩스 쇼핑몰</option>
          <option value="https://www.electrolux.co.kr/">일렉트로룩스 홈페이지</option>
          <option value="http://www.myelectrolux.co.kr/">마이 일렉트로룩스</option>
        </select>
        <address>
          <span className="addr">
            주소 : 서울특별시 종로구 청계천로41 영풍빌딩 22층&nbsp;|&nbsp;
            <span>대표자 : Martin Runschke (마틴 룬츠케)</span>&nbsp;|&nbsp;
            <span>법인단체명 : 일렉트로룩스코리아㈜</span>
          </span>
          <span className="bs-num">사업자등록번호 : 220-86-40895&nbsp;|&nbsp;</span>
          <span className="tel-num">
            고객센터 : <a href="tel:1566-1238">1566-1238</a>
          </span>
        </address>
        <p className="copy">Copyright 2025 by Electrolux Korea. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

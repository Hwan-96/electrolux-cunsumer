import React from 'react';
import { Link } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';

const ServiceLayout = ({ children, currentPage, activeTab, title }) => {
  return (
    <div id="sub-container">
      <PathNav 
        prevPage="Home" 
        currentPage={["서비스 정책 안내", currentPage]}
      />

      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title={title}
            description="일렉트로룩스의 서비스 정책을 확인하실 수 있습니다."
          />

          <div className="link-tab mb0 sevice1-tab">
            <ul>
              <li className={activeTab === 'warranty' ? 'on' : ''}>
                <Link to="/service/warranty">제품의 보증기간</Link>
              </li>
              <li className={activeTab === 'free_as' ? 'on' : ''}>
                <Link to="/service/free_as">유ㆍ무상 기준</Link>
              </li>
              <li className={activeTab === 'as_charge' ? 'on' : ''}>
                <Link to="/service/as_charge">수리요금 구성</Link>
              </li>
            </ul>
          </div>

          <div id="top-pic" className="service-top-pic">
            <dl>
              <dt>일렉트로룩스 고객센터</dt>
              <dd><a href="tel:1566-1238">1566-1238</a></dd>
              <dt className="cs-num">대형가전 서비스 문의 (위니아서비스) : <a href="tel:1644-8746">1644-8746</a> / <a href="tel:1566-1588">1566-1588</a></dt>
            </dl>
          </div>

          {children}
        </article>
      </div>
    </div>
  );
};

export default ServiceLayout; 
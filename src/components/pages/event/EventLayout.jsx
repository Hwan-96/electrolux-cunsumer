import React from 'react';
import { Link } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';

const EventLayout = ({ children, currentPage, activeTab, title }) => {
  return (
    <div id="sub-container">
      <PathNav 
        prevPage="Home" 
        currentPage={["이벤트", currentPage]}
      />

      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title={title}
            description="일렉트로룩스와 함께 하는 다양한 혜택과 이벤트"
          />

          <div className="link-tab event-tab">
            <ul>
              <li className={activeTab === 'ongoing' ? 'on' : ''}>
                <Link to="/evnt/ongoing">진행 이벤트</Link>
              </li>
              <li className={activeTab === 'end' ? 'on' : ''}>
                <Link to="/evnt/end">종료 이벤트</Link>
              </li>
              <li className={activeTab === 'winner' ? 'on' : ''}>
                <Link to="/evnt/winner">당첨자 발표</Link>
              </li>
            </ul>
          </div>

          {children}
        </article>
      </div>
    </div>
  );
};

export default EventLayout; 
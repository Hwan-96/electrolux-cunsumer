import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../common/Carousel';
import { FindCenter } from '../common/FindCenter';
import { mainBoardData, mainBannerData, mainVideoImage, mainVideoUrl } from '@/utils/data.js';

const Home = () => {
  return (
    <div>
      <Carousel />
      <FindCenter />
      
      {/* 메인 게시판 */}
      <section id="main-bd">
        <div className="inner">
          <h2 className="hid">메인 게시판</h2>
          <article>
            <ul>
              {mainBoardData.map((item, index) => (
                <li key={index}>
                  <div className="dlbox">
                    <Link to={item.link}>
                      <div className="txtbox">
                        <h3>{item.title}</h3>
                        <p className="btn-dir">
                          <span className="hgbtn blue01">FAQ &gt;</span>
                        </p>
                      </div>
                      <p className="pic">
                        <img src={item.image} alt={item.title} />
                      </p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 메인 중간 배너 */}
      <section id="main-mid-banner">
        <article className="inner">
          <h2 className="hid">배너</h2>
          <ul>
            {mainBannerData.map((banner) => (
              <li key={banner.id}>
                <Link to={banner.link} target="_blank" title={banner.title}>
                  <img src={banner.image} alt={banner.title} />
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* 메인 영상 */}
      <section id="main-video">
        <article className="inner">
          <h2 className="hid">메인 영상</h2>
          <div className="vid-box">
            <div className="inner">
              <img src={mainVideoImage} alt="메인 영상 썸네일" />
              <iframe 
                width="100%" 
                height="100%" 
                src={mainVideoUrl}
                frameBorder="0" 
                gesture="media" 
                allow="encrypted-media" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Home;

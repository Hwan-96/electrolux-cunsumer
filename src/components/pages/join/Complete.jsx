import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Top } from './JoinStyles';
import { useJoinStore } from '@/stores/authStore';

const Complete = () => {
  const navigate = useNavigate();
  const { resetJoinProcess } = useJoinStore();
  
  // 컴포넌트 언마운트 시 회원가입 프로세스 초기화
  useEffect(() => {
    return () => {
      resetJoinProcess();
    };
  }, [resetJoinProcess]);

  return (
    <div className='contents_wrap' style={{ backgroundColor: '#fff', paddingTop: '0px' }}>
      <div className='join_top'>
        <Inbox>
          <ul><img src="../../../join/top_logo.png" alt="Electrolux" /></ul>
          <ul>일렉트로룩스 회원가입을 환영합니다.</ul>
        </Inbox>
      </div>
      <Top>
        <ul>회원가입</ul>
        <ul>HOME &gt; 회원가입</ul>
      </Top>
      <div id="contents">
        <article className="sub-article">
          <div className="cont_wrap">
            <div className="step_box p03">
              <ul className="ico">
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className="tit"><span>STEP 03</span>가입완료</ul>
              <ul className="line"></ul>
              <ul className="txt">일렉트로룩스 회원가입이<br />정상적으로 처리되었습니다.</ul>
            </div>

            <div className="end_box">
              <div className="txt">일렉트로룩스<br />회원가입을 축하드립니다!</div>
              <img src="../../../join/img_end.jpg" alt="회원가입 완료" />
              <div className="btn">
                <ul onClick={() => navigate('/notice')}>
                  <li className="top">캠페인 사이트로 이동</li>
                  <li>캠페인 사이트에서는 일렉트로룩스의<br />다양한 제품과 이벤트를 확인하실 수 있습니다.</li>
                </ul>
                <ul onClick={() => navigate('/')}>
                  <li className="top">고객센터 사이트로 이동</li>
                  <li>고객센터 사이트에서는 일렉트로룩스 제품에 대한<br />문의와 1:1상담, FAQ를 확인하실 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Complete; 
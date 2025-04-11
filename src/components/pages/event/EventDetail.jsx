import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import useEventStore from '@/stores/eventStore';
import DOMPurify from 'dompurify';

// 이벤트 더미 데이터 - 실제 구현에서는 API 요청 등을 통해 데이터를 가져옵니다

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventDetail } = useEventStore();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventDetail(id);
        setEvent(data);
      } catch (err) {
        setError('이벤트를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching event detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEventDetail]);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  if (loading) {
    return (
      <div id="sub-container">
        <PathNav prevPage="Home" currentPage="이벤트" lastPage="이벤트 상세" />
        <div id="contents">
          <article className="sub-article">
            <div className="loading">로딩 중...</div>
          </article>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="sub-container">
        <PathNav prevPage="Home" currentPage="이벤트" lastPage="이벤트 상세" />
        <div id="contents">
          <article className="sub-article">
            <div className="error">{error}</div>
          </article>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div id="sub-container">
        <PathNav prevPage="Home" currentPage="이벤트" lastPage="이벤트 상세" />
        <div id="contents">
          <article className="sub-article">
            <div className="not-found">이벤트를 찾을 수 없습니다.</div>
          </article>
        </div>
      </div>
    );
  }

  // DOMPurify를 사용하여 HTML 컨텐츠를 안전하게 처리
  const sanitizedContent = DOMPurify.sanitize(event.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style'],
    ALLOW_DATA_ATTR: false
  });

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="이벤트" lastPage={event.status === 'winner' ? '당첨자 발표' : '이벤트 상세'} />
      <div id="contents">
        <article className="sub-article">
          {event.status === 'winner' ? (
            <>
              {/* 당첨자 발표일 경우 청소기 관리 방법 페이지 UI 적용 */}
              <div className="sub-tit-box">
                <h2>당첨자 발표</h2>
                <p className="txt1">일렉트로룩스 이벤트 당첨자 발표를 안내해 드립니다.</p>
              </div>
              
              <div className="bd-view1">
                <div className="tit-area">
                  <h4 className="tit">
                    {event.title}
                  </h4>
                  <div className="bd-info-wrap">
                    <dl className="tit-info">
                      <dt className="date">작성일</dt>
                      <dd className="date">
                        {event.announcementDate}
                      </dd>
                    </dl>
                  </div>
                </div>
                
                <div className="output-cts">
                  <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                </div>
                
                {/* 첨부파일 영역 - 필요시 활성화 
                <dl className="dl-tr down">
                  <dt>첨부파일</dt>
                  <dd>
                    <ul>
                      <li><a href="#">첨부파일명.pdf</a></li>
                    </ul>
                  </dd>
                </dl>
                */}
              </div>
              
              <div className="btn-area1 ta-btm">
                <a href="#" onClick={(e) => { e.preventDefault(); handleGoBack(); }} className="hgbtn blue01">목록</a>
              </div>
            </>
          ) : (
            <>
              {/* 일반 이벤트 상세 화면 (기존 UI 유지) */}
              <SubTitleBox 
                title="Event" 
                description="일렉트로룩스와 함께 하는 다양한 혜택과 이벤트" 
              />
              
              <div className="event-detail-container">
                <div className="event-image-only">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }}
                  />
                </div>
                
                <div className="btn-wrap" style={{ marginTop: '30px', textAlign: 'center' }}>
                  <button 
                    type="button" 
                    className="hgbtn blue02"
                    onClick={handleGoBack}
                  >
                    목록으로
                  </button>
                </div>
              </div>
            </>
          )}
        </article>
      </div>
    </div>
  );
};

export default EventDetail; 
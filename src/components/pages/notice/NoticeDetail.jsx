import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import useNoticeStore from '@/stores/noticeStore';
import DOMPurify from 'dompurify';

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNoticeDetail } = useNoticeStore();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNoticeDetail(id);
        setNotice(data);
      } catch (err) {
        setError('공지사항을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching notice detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotice();
  }, [id, getNoticeDetail]);

  // 파일 다운로드 처리
  const handleDownload = (fileName) => {
    console.log(`파일 다운로드: ${fileName}`);
    // 실제 다운로드 로직 구현 필요
    alert('파일 다운로드를 시작합니다.');
  };
  
  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate('/notice');
  };

  if (loading) {
    return (
      <div id="sub-container">
        <PathNav currentPage={["고객지원", "공지사항"]} />
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
        <PathNav currentPage={["고객지원", "공지사항"]} />
        <div id="contents">
          <article className="sub-article">
            <div className="error">{error}</div>
          </article>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div id="sub-container">
        <PathNav currentPage={["고객지원", "공지사항"]} />
        <div id="contents">
          <article className="sub-article">
            <div className="not-found">공지사항을 찾을 수 없습니다.</div>
          </article>
        </div>
      </div>
    );
  }

  // DOMPurify를 사용하여 HTML 컨텐츠를 안전하게 처리
  const sanitizedContent = DOMPurify.sanitize(notice.content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style'],
    ALLOW_DATA_ATTR: false
  });

  return (
    <div id="sub-container">
      {/* 경로 표시 */}
      <PathNav currentPage={["고객지원", "공지사항"]} />

      {/* 콘텐츠 */}
      <div id="contents">
        <article className="sub-article">
          {/* 제목 영역 */}
          <SubTitleBox 
            title="공지사항" 
            description="일렉트로룩스의 고객센터 공지사항입니다." 
          />

          {/* HTML 템플릿 구조에 맞춘 상세 내용 */}
          <div className="bd-view1">
            {/* 제목 영역 */}
            <div className="tit-area">
              <h4 className="tit">
                {notice.title}
              </h4>
              <div className="bd-info-wrap">
                <dl className="tit-info">
                  <dt className="date">작성일</dt>
                  <dd className="date">
                    {notice.createdAt}
                  </dd>
                  <dt className="view">조회수</dt>
                  <dd className="view">
                    {notice.views.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>

            {/* 내용 영역 */}
            <div className="output-cts">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>

            {/* 첨부파일 영역 - 파일이 있는 경우만 표시 */}
            {notice.files && notice.files.length > 0 && (
              <dl className="dl-tr down">
                <dt>첨부파일</dt>
                <dd>
                  <ul>
                    {notice.files.map((file, index) => (
                      <li key={index}>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleDownload(file.fileName); }}>
                          {file.fileName} ({file.fileSize})
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
            )}
          </div>

          {/* 목록 버튼 */}
          <div className="btn-area1 ta-btm">
            <a href="#" onClick={(e) => { e.preventDefault(); handleBackToList(); }} className="hgbtn blue01">목록</a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NoticeDetail; 
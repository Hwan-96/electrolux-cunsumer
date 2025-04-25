import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Loading from '@/components/common/Loading';
import useDownloadStore from '@/stores/downLoadStore';

const CleanupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 다운로드 스토어 사용
  const { currentCleanup: product, getCleanupDetail } = useDownloadStore();
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        await getCleanupDetail(id);
      } catch (err) {
        console.error('청소기 청소요령 상세 정보 조회 오류:', err);
        setError('청소기 청소요령을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, getCleanupDetail]);
  
  // 파일 다운로드 처리
  const handleDownload = (fileName) => {
    console.log(`파일 다운로드: ${fileName}`);
    // 실제 다운로드 로직 구현 필요
    alert('파일 다운로드를 시작합니다.');
  };
  
  // 목록으로 돌아가기
  const handleBackToList = () => {
    navigate('/down/cleanup');
  };

  return (
    <div id="sub-container">
      {/* 경로 표시 */}
      <PathNav currentPage={["다운로드", "청소기 관리 방법"]} />

      {/* 콘텐츠 */}
      <div id="contents">
        <article className="sub-article">
          {/* 제목 영역 */}
          <SubTitleBox 
            title="청소기 청소요령" 
            description="구매하신 청소기 제품의 청소요령을 보실 수 있습니다." 
          />

          {/* 탭 메뉴 */}
          <div className="link-tab mb0">
            <ul>
              <li><Link to="/down/prd_guide">제품 사용설명서</Link></li>
              <li className="on"><Link to="/down/cleanup">청소기 청소요령</Link></li>
            </ul>
          </div>

          {loading ? (
            <div className="loading-container" style={{textAlign: 'center', padding: '50px 0'}}>
              <Loading text="데이터를 불러오는 중입니다" showText={true} />
            </div>
          ) : error ? (
            <div className="error-container" style={{textAlign: 'center', padding: '50px 0', color: '#CC0000'}}>
              {error}
            </div>
          ) : product ? (
            <>
              {/* HTML 템플릿 구조에 맞춘 상세 내용 */}
              <div className="bd-view1">
                {/* 제목 영역 */}
                <div className="tit-area">
                  <h4 className="tit">
                    {product.title}
                  </h4>
                  <div className="bd-info-wrap">
                    <dl className="tit-info">
                      <dt className="date">작성일</dt>
                      <dd className="date">
                        {product.createdAt}
                      </dd>
                    </dl>
                  </div>
                </div>

                {/* 내용 영역 */}
                <div className="output-cts">
                  <p><b>○ 제품 정보 : {product.brand} {' > '} {product.category} {' > '} {product.productName} {' > '} {product.modelName}</b></p>
                  <br />
                  {product.content && product.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '15px' }}>{paragraph}</p>
                  ))}
                </div>

                {/* 첨부파일 영역 */}
                {product.files && product.files.length > 0 && (
                  <dl className="dl-tr down">
                    <dt>첨부파일</dt>
                    {product.files.map((file, index) => (
                      <dd key={index}>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleDownload(file.fileName); }}>
                          {file.fileName} ({file.fileSize})
                        </a>
                      </dd>
                    ))}
                  </dl>
                )}
              </div>

              {/* 목록 버튼 */}
              <div className="btn-area1 ta-btm">
                <a href="#" onClick={(e) => { e.preventDefault(); handleBackToList(); }} className="hgbtn blue01">목록</a>
              </div>
            </>
          ) : (
            <div className="no-data-container" style={{textAlign: 'center', padding: '50px 0'}}>
              제품 정보가 없습니다.
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default CleanupDetail; 
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';

const CleanupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 상세 정보 조회를 위한 제품 데이터 (실제로는 API로 가져올 데이터)
  const product = {
    id: Number(id) || 12,
    title: '청소기 청소요령',
    date: '2024-04-10',
    content: '일렉트로룩스 UltraOne 진공청소기의 청소 방법을 안내합니다. 정기적인 청소와 필터 교체로 청소기의 성능을 최적으로 유지하세요.\n\n' +
      '1. 먼지통 비우기: 먼지통은 사용 후 매번 비우는 것이 좋습니다. 먼지통 분리 버튼을 눌러 먼지통을 분리한 후 쓰레기통 위에서 비우세요.\n\n' +
      '2. 필터 청소: 프리 필터와 헤파 필터는 한 달에 한 번 정도 물로 씻어 청소하세요. 완전히 건조한 후 다시 장착하는 것이 중요합니다.\n\n' +
      '3. 브러시 롤 청소: 브러시 롤에 머리카락이나 실밥 등이 감겨있으면 성능이 저하됩니다. 정기적으로 확인하고 가위나 청소 도구로 제거하세요.\n\n' +
      '4. 흡입구 확인: 흡입구가 막히지 않았는지 정기적으로 확인하세요. 막힌 부분은 청소 도구를 이용해 제거합니다.',
    files: [
      {
        fileName: 'UltraOne_Z90_청소요령.pdf',
        fileSize: '2.8MB'
      }
    ]
  };
  
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
                    {product.date}
                  </dd>
                </dl>
              </div>
            </div>

            {/* 내용 영역 */}
            <div className="output-cts">
              {product.content.split('\n\n').map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '15px' }}>{paragraph}</p>
              ))}
            </div>

            {/* 첨부파일 영역 */}
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

export default CleanupDetail; 
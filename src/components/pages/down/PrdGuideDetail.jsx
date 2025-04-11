import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';

const PrdGuideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 상세 정보 조회를 위한 제품 데이터 (실제로는 API로 가져올 데이터)
  const product = {
    id: Number(id) || 1,
    title: 'ESM6307KG 사용설명서',
    date: '2024-04-15',
    content: '일렉트로룩스 양문형 냉장고 ESM6307KG 사용설명서입니다. 제품 사용 전 반드시 사용설명서를 읽어보시고 올바르게 사용해 주시기 바랍니다.',
    files: [
      {
        fileName: 'ESM6307KG_사용설명서.pdf',
        fileSize: '3.5MB'
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
    navigate('/down/prd_guide');
  };

  return (
    <div id="sub-container">
      {/* 경로 표시 */}
      <PathNav currentPage={["다운로드", "제품사용설명서"]} />

      {/* 콘텐츠 */}
      <div id="contents">
        <article className="sub-article">
          {/* 제목 영역 */}
          <SubTitleBox 
            title="제품 사용설명서" 
            description="구매하신 제품의 사용설명서를 다운로드 받으실 수 있습니다." 
          />

          {/* 탭 메뉴 */}
          <div className="link-tab mb0">
            <ul>
              <li className="on"><Link to="/down/prd_guide">제품 사용설명서</Link></li>
              <li><Link to="/down/cleanup">청소기 청소요령</Link></li>
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
              {product.content}
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

export default PrdGuideDetail; 
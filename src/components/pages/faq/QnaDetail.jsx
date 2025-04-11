import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Loading from '@/components/common/Loading';
import apiService from '@/utils/api';

const QnaDetail = () => {
  const { id } = useParams(); // URL 파라미터에서 ID 가져오기
  const navigate = useNavigate();
  const [qnaData, setQnaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // 파일 다운로드 처리
  const handleDownload = (fileName) => {
    console.log(`파일 다운로드: ${fileName}`);
    // 실제 다운로드 로직 구현 필요
    alert('파일 다운로드를 시작합니다.');
  };
  
  // 데이터 로드
  useEffect(() => {
    const fetchQnaDetail = async () => {
      try {
        setLoading(true);
        // ID가 숫자인지 확인
        const numericId = parseInt(id);
        if (isNaN(numericId)) {
          setError('유효하지 않은 문의 ID입니다.');
          setLoading(false);
          return;
        }
        
        console.log('문의 상세 조회 시작:', numericId);
        const response = await apiService.getData(`/qna/${numericId}`);
        console.log('문의 상세 응답:', response);
        
        // 응답 데이터 구조 확인 및 데이터 설정
        if (!response) {
          setError('문의 데이터를 불러올 수 없습니다.');
          setLoading(false);
          return;
        }
        
        // mock API 환경에서는 response.data로 데이터가 오고
        // 실제 API 환경에서는 response 자체가 데이터일 수 있음
        const qnaItem = response.data || response;
        
        setQnaData(qnaItem);
        setError(null);
      } catch (err) {
        console.error('상담 상세 조회 에러:', err);
        if (err.status === 403) {
          alert('본인이 작성한 글만 확인할 수 있습니다.');
          navigate('/qna');
        } else if (err.status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        } else {
          setError('상담 내용을 불러오는데 실패했습니다: ' + (err.message || '알 수 없는 오류'));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchQnaDetail();
  }, [id, navigate]);
  
  // 이전 목록으로 이동
  const handleBackToList = () => {
    navigate('/qna');
  };

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="고객상담" lastPage="1:1 상담" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="1:1 상담"
            description={[
              "제품 사용 중 궁금증을 무엇이든 물어보세요. 빠른 시간 내 답변 드리겠습니다.",
              <br key="br" />,
              "잠깐 ! 자주하시는 질문에서 증상을 먼저 확인하시면 더욱 빠른 처리가 가능합니다."
            ]}
          />

          {/* 링크 탭 */}
          <div className="link-tab mb0">
            <ul>
              <li><Link to="/faq">자주묻는 질문</Link></li>
              <li className="on"><Link to="/qna">1:1 고객상담</Link></li>
            </ul>
          </div>

          {loading ? (
            <div className="loading-container" style={{textAlign: 'center', padding: '50px 0'}}>
              <Loading text="상담 내용을 불러오는 중입니다" showText={true} />
            </div>
          ) : error ? (
            <div className="error-container" style={{textAlign: 'center', padding: '50px 0', color: '#CC0000'}}>
              {error}
            </div>
          ) : qnaData ? (
            <div className="bd-view1">
              {/* 제목 영역 */}
              <div className="tit-area">
                <h4 className="tit">
                  {qnaData.title}
                </h4>
                <div className="bd-info-wrap">
                  <dl className="tit-info">
                    <dt className="date">작성일</dt>
                    <dd className="date">
                      {qnaData.date}
                    </dd>
                    <dt className="state">상태</dt>
                    <dd className="state">
                      {qnaData.answered ? '답변완료' : '답변대기중'}
                    </dd>
                  </dl>
                </div>
              </div>
              
              {/* 문의 내용 영역 */}
              <div className="output-cts">
                <p style={{ fontWeight: 'bold', margin: '0 0 30px 0' }}>
                  ○ 문의 모델 : {qnaData.model}
                </p>
                <p>{qnaData.content}</p>
              </div>
              
              {/* 답변 내용 영역 (있는 경우에만 표시) */}
              {qnaData.answered && qnaData.reply && (
                <>
                  <div className="admin-reply">
                    <p className="tit">답변</p>
                    <p className="date">{qnaData.date}</p>
                  </div>
                  <p className="admin-reply-txt">{qnaData.reply}</p>
                </>
              )}
 
              {/* 첨부파일 영역 */}
              {qnaData.files && qnaData.files.length > 0 && (
                <dl className="dl-tr down">
                  <dt>첨부파일</dt>
                  {qnaData.files.map((file, index) => (
                    <dd key={index}>
                      <a href="#" onClick={(e) => { e.preventDefault(); handleDownload(file.fileName); }}>
                        {file.fileName} ({file.fileSize})
                      </a>
                    </dd>
                  ))}
                </dl>
              )}
              
              {/* 버튼 영역 */}
              <div className="btn-area1 ta-btm">
                <a href="#" onClick={(e) => { e.preventDefault(); handleBackToList(); }} className="hgbtn blue01">목록</a>
              </div>
            </div>
          ) : (
            <div className="no-data-container" style={{textAlign: 'center', padding: '50px 0'}}>
              상담 정보가 없습니다.
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default QnaDetail; 
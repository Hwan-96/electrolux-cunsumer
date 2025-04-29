import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import { axiosInstance } from '@/utils/api';

const PrdGuideDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prdGuide, setPrdGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPrdGuideDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/prd-guide/${id}`);
      setPrdGuide(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrdGuideDetail();
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(`/api/prd-guide/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${prdGuide.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      error
      setError('다운로드 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!prdGuide) return <div>제품 사용설명서를 찾을 수 없습니다.</div>;

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="다운로드" lastPage="제품 사용설명서" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="제품 사용설명서"
            description="제품 사용설명서를 다운로드하실 수 있습니다."
          />

          <div className="prd-guide-detail">
            <h2>{prdGuide.title}</h2>
            <div className="meta-info">
              <span>작성일: {prdGuide.createdAt}</span>
              <span>조회수: {prdGuide.viewCount}</span>
            </div>
            <div className="content">
              <p>{prdGuide.description}</p>
            </div>
            <div className="actions">
              <button onClick={handleDownload}>다운로드</button>
              <button onClick={() => navigate('/down/prd-guide')}>목록으로</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrdGuideDetail; 
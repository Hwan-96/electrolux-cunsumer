import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import { axiosInstance } from '@/utils/api';

const CleanupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cleanup, setCleanup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCleanupDetail = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/api/cleanup/${id}`);
      setCleanup(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCleanupDetail();
  }, [id]);

  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(`/api/cleanup/${id}/download`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cleanup.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('다운로드 중 오류:', error);
      setError('다운로드 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!cleanup) return <div>청소기 청소요령을 찾을 수 없습니다.</div>;

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="다운로드" lastPage="청소기 청소요령" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="청소기 청소요령"
            description="청소기 청소요령을 다운로드하실 수 있습니다."
          />

          <div className="cleanup-detail">
            <h2>{cleanup.title}</h2>
            <div className="meta-info">
              <span>작성일: {cleanup.createdAt}</span>
              <span>조회수: {cleanup.viewCount}</span>
            </div>
            <div className="content">
              <p>{cleanup.description}</p>
            </div>
            <div className="actions">
              <button onClick={handleDownload}>다운로드</button>
              <button onClick={() => navigate('/dwn/cleanup')}>목록으로</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CleanupDetail; 
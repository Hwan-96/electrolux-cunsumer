import React, { useState, useEffect } from 'react';
import searchIco from '@/images/ico-sh1.png';
import CenterInfo from '@/components/common/popup/CenterInfo';
import Pagination from '@/components/common/Pagination';
import apiService from '@/utils/api';
const ITEMS_PER_PAGE = 5;

const CenterList = ({ selectedRegion, selectedCity }) => {
  const [centers, setCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 서비스 센터 데이터 로드 - 상위 컴포넌트에서 전달받은 필터 사용
  useEffect(() => {
    const fetchServiceCenters = async () => {
      try {
        setLoading(true);
        
        // 파라미터 설정
        const params = {
          region: selectedRegion,
          city: selectedCity
        };
        
        // apiService를 통해 데이터 요청
        const response = await apiService.getServiceCenters(params);
        setCenters(response.data || []);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
        setError(null);
      } catch (err) {
        console.error('서비스 센터 데이터 로드 실패:', err);
        setError('서비스 센터 정보를 불러오는데 실패했습니다.');
        setCenters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceCenters();
  }, [selectedRegion, selectedCity]);

  const totalPages = Math.ceil(centers.length / ITEMS_PER_PAGE);

  const currentCenters = centers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCenterClick = (center) => {
    setSelectedCenter(center);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCenter(null);
  };
  
  // 역순 번호 계산 함수
  const getReverseNumber = (index) => {
    return centers.length - ((currentPage - 1) * ITEMS_PER_PAGE + index);
  };

  return (
    <>
      <div id="center_load">
        <p style={{ color: 'red', fontSize: '14px' }}>
          ※ 일렉트로룩스 서비스센터(위니아에이드 미포함)는 토요일 격주로 운영되므로 방문 전 당일 운영여부를 반드시 확인하여 주시기 바랍니다
        </p>
        
        {loading ? (
          <div className="loading-message">데이터를 불러오는 중입니다...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <p className="total">총 {centers.length}개의 센터가 검색되었습니다.</p>

            <div id="m-result" className="m-only">
              <ul>
                {currentCenters.length > 0 ? (
                  currentCenters.map((center, index) => (
                    <li key={center.id}>
                      <dl>
                        <dt>
                          <span style={{ marginRight: '5px', fontWeight: 'bold' }}>[{getReverseNumber(index)}]</span>
                          {center.name}
                          <a href="#" onClick={(e) => {
                            e.preventDefault();
                            handleCenterClick(center);
                          }}>
                            <img src={searchIco} alt="상세" style={{ width: '15px' }} />
                          </a>
                        </dt>
                        <dd className="addr">{center.address || '주소 정보가 없습니다.'}</dd>
                        <dd className="tel">
                          {center.phone ? (
                            <a href={`tel:${center.phone}`}>☎ {center.phone}</a>
                          ) : (
                            '전화번호 정보가 없습니다.'
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))
                ) : (
                  <li className="no-results">검색 결과가 없습니다.</li>
                )}
              </ul>
            </div>

            <div id="pc-result" className="pc-only">
              <table className="type1 list1 line1">
                <caption></caption>
                <colgroup>
                  <col style={{ width: '55px' }} />
                  <col />
                  <col />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '100px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" className="w1 bln">번호</th>
                    <th scope="col" className="w2">서비스센터명</th>
                    <th scope="col" className="w3">주소</th>
                    <th scope="col" className="w4">전화번호</th>
                    <th scope="col" className="w5">상세정보</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCenters.length > 0 ? (
                    currentCenters.map((center, index) => (
                      <tr key={center.id}>
                        <td className="bln">{getReverseNumber(index)}</td>
                        <td>{center.name}</td>
                        <td>{center.address || '주소 정보가 없습니다.'}</td>
                        <td>
                          {center.phone ? (
                            <a href={`tel:${center.phone}`}>{center.phone}</a>
                          ) : (
                            '전화번호 정보가 없습니다.'
                          )}
                        </td>
                        <td>
                          <a href="#" onClick={(e) => {
                            e.preventDefault();
                            handleCenterClick(center);
                          }}>
                            <img src={searchIco} alt="상세" />
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-results">검색 결과가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 - 공통 컴포넌트 사용 */}
            {centers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {selectedCenter && (
        <CenterInfo
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          center={selectedCenter}
        />
      )}
    </>
  );
};

export default CenterList; 
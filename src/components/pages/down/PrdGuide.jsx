import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import { axiosInstance } from '@/utils/api';

const PrdGuide = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState({
    brand: '',
    category: '',
    productName: '',
    modelName: '',
    searchText: ''
  });
  const [availableProductNames, setAvailableProductNames] = useState([{ value: '', label: '제품명 선택' }]);
  const [availableModelNames, setAvailableModelNames] = useState([{ value: '', label: '모델명 선택' }]);
  const [prdGuideList, setPrdGuideList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  // 옵션 데이터 관리
  const [options, setOptions] = useState({
    brands: [{ value: '', label: '브랜드 선택' }],
    categories: [{ value: '', label: '제품군 선택' }],
    productNames: {},
    modelNames: {}
  });
  
  // 옵션 데이터 로딩 상태
  const [optionsLoading, setOptionsLoading] = useState(false);

  const fetchPrdGuideList = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/prd-guide', { params });
      setPrdGuideList(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    fetchPrdGuideList();
  }, []);

  // 옵션 데이터 로드 (임시 데이터)
  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true);
      try {
        // 실제 API 연동 시 이 부분을 변경해야 함
        const mockOptionsData = {
          brands: [
            { value: '', label: '브랜드 선택' },
            { value: 'Electrolux', label: 'Electrolux' },
            { value: 'AEG', label: 'AEG' }
          ],
          categories: [
            { value: '', label: '제품군 선택' },
            { value: 'stick', label: '스틱청소기' },
            { value: 'vacuum', label: '진공청소기' },
            { value: 'robot', label: '로봇청소기' },
            { value: 'consumable', label: '소모품' }
          ],
          productNames: {
            'stick': [
              { value: '', label: '제품명 선택' },
              { value: 'well-q6', label: 'Well Q6' },
              { value: 'well-q7', label: 'Well Q7' },
              { value: 'well-q8', label: 'Well Q8' }
            ],
            'vacuum': [
              { value: '', label: '제품명 선택' },
              { value: 'pure-c9', label: 'Pure C9' }
            ]
          },
          modelNames: {
            'well-q6': [
              { value: '', label: '모델명 선택' },
              { value: 'EFP91835', label: 'EFP91835' },
              { value: 'EFP91836', label: 'EFP91836' }
            ],
            'pure-c9': [
              { value: '', label: '모델명 선택' },
              { value: 'PC91-4MG', label: 'PC91-4MG' }
            ]
          }
        };
        
        setOptions(mockOptionsData);
      } catch (error) {
        console.error('옵션 데이터 로드 중 오류:', error);
      } finally {
        setOptionsLoading(false);
      }
    };
    
    fetchOptions();
  }, []);

  // 카테고리 변경 시 제품명 옵션 업데이트
  useEffect(() => {
    if (searchParams.category && options.productNames) {
      setAvailableProductNames(options.productNames[searchParams.category] || [{ value: '', label: '제품명 선택' }]);
      // 카테고리가 변경되면 제품명과 모델명을 초기화
      setSearchParams(prev => ({
        ...prev,
        productName: '',
        modelName: ''
      }));
    } else {
      setAvailableProductNames([{ value: '', label: '제품명 선택' }]);
    }
  }, [searchParams.category, options.productNames]);

  // 제품명 변경 시 모델명 옵션 업데이트
  useEffect(() => {
    if (searchParams.productName && options.modelNames) {
      setAvailableModelNames(options.modelNames[searchParams.productName] || [{ value: '', label: '모델명 선택' }]);
      // 제품명이 변경되면 모델명을 초기화
      setSearchParams(prev => ({
        ...prev,
        modelName: ''
      }));
    } else {
      setAvailableModelNames([{ value: '', label: '모델명 선택' }]);
    }
  }, [searchParams.productName, options.modelNames]);

  // 검색 처리
  const handleSearch = (searchParams) => {
    fetchPrdGuideList(searchParams);
  };

  // 필드 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 초기화
  const handleReset = () => {
    const resetParams = {
      brand: '',
      category: '',
      productName: '',
      modelName: '',
      searchText: ''
    };
    setSearchParams(resetParams);
    setCurrentPage(1);
    
    fetchPrdGuideList(resetParams);
  };

  // 페이지 이동 처리
  const handlePageChange = (page) => {
    fetchPrdGuideList({ ...meta, page });
  };

  // 항목 클릭 처리 - 상세 페이지로 이동
  const handleProductClick = (productId) => {
    navigate(`/down/prd_guide/${productId}`);
  };

  return (
    <div id="sub-container">
      {/* 경로 표시 */}
      <PathNav currentPage={["다운로드", "제품 사용설명서"]} />

      {/* 콘텐츠 */}
      <div id="contents">
        <article className="sub-article">
          {/* 제목 영역 */}
          <SubTitleBox 
            title="제품 사용설명서" 
            description="구매하신 제품의 사용설명서를 보실 수 있습니다." 
          />

          {/* 탭 메뉴 */}
          <div className="link-tab mb0">
            <ul>
              <li className="on"><Link to="/down/prd_guide">제품 사용설명서</Link></li>
              <li><Link to="/down/cleanup">청소기 청소요령</Link></li>
            </ul>
          </div>

          {/* 검색 옵션 */}
          <form id="form_search" onSubmit={(e) => { e.preventDefault(); handleSearch(searchParams); }}>
            <div className="top-search-option">
              <p className="tit">제품 검색하기</p>
              <div className="option-box">
                <ul className="ip-list1">
                  <li>
                    <select 
                      name="brand" 
                      className="sel01" 
                      style={{ width: '98%' }}
                      value={searchParams.brand}
                      onChange={handleInputChange}
                      disabled={optionsLoading}
                    >
                      {options.brands.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <select 
                      name="category" 
                      className="sel01" 
                      style={{ width: '98%' }}
                      value={searchParams.category}
                      onChange={handleInputChange}
                      disabled={optionsLoading}
                    >
                      {options.categories.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <select 
                      name="productName" 
                      className="sel01" 
                      style={{ width: '98%' }}
                      value={searchParams.productName}
                      onChange={handleInputChange}
                      disabled={!searchParams.category || optionsLoading}
                    >
                      {availableProductNames.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <select 
                      name="modelName" 
                      className="sel01" 
                      style={{ width: '100%' }}
                      value={searchParams.modelName}
                      onChange={handleInputChange}
                      disabled={!searchParams.productName || optionsLoading}
                    >
                      {availableModelNames.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </li>
                </ul>
              </div>

              <div className="txtbox">
                <ul className="ip-list1">
                  <li>
                    <input 
                      type="text" 
                      name="searchText" 
                      className="ip01" 
                      style={{ width: '98%' }}
                      placeholder="검색어를 입력해주세요."
                      value={searchParams.searchText}
                      onChange={handleInputChange}
                    />
                  </li>
                  <li className="btn">
                    <button type="button" className="hgbtn blue02" onClick={(e) => { e.preventDefault(); handleSearch(searchParams); }}>
                      검색
                    </button>
                  </li>
                  <li className="btn-reset">
                    <button type="button" className="hgbtn grey01" onClick={handleReset}>
                      초기화
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>

          <div className="ta-top">
            <p className="tac">
              ※ 모든 문서는 PDF 파일로 되어 있습니다. PDF 파일 뷰어 설치 후 이용 부탁드립니다. 
              <a href="https://get.adobe.com/kr/reader/" target="_blank" rel="noopener noreferrer" className="hgbtn blue02">
                PDF 파일 뷰어 다운로드
              </a>
            </p>
          </div>

          <div className="hscr_box">
            <div className="scr_area">
              <table className="type1 list1 line1" style={{ minWidth: '600px' }}>
                <caption>제품 사용설명서 리스트</caption>
                <colgroup>
                  <col style={{ width: '60px' }} />
                  <col style={{ width: '120px' }} />
                  <col />
                  <col />
                  <col />
                  <col />
                  <col style={{ width: '60px' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" className="bln">번호</th>
                    <th scope="col">브랜드</th>
                    <th scope="col">제품군</th>
                    <th scope="col">제품명</th>
                    <th scope="col">모델명</th>
                    <th scope="col">제목</th>
                    <th scope="col">파일</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="tac">데이터를 불러오는 중입니다...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="7" className="tac">데이터를 불러오는데 실패했습니다. {error}</td>
                    </tr>
                  ) : prdGuideList.length > 0 ? (
                    prdGuideList.map(product => (
                      <tr 
                        key={product.id} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <td className="bln">{product.id}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.productName}</td>
                        <td>{product.modelName}</td>
                        <td>{product.title}</td>
                        <td>
                          {product.hasFile && (
                            <img src='/images/ico-file.png' alt="첨부파일" />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="tac">등록된 자료가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 페이징 - 공통 컴포넌트 사용 */}
          {!loading && !error && meta.totalPages > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default PrdGuide;

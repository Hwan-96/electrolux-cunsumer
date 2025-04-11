import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import fileIco from '@/images/ico-file.png';
import useApi from '@/utils/useApi';

const PrdGuide = () => {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useState({
    brand: '',
    category: '',
    productName: '',
    modelName: '',
    searchText: ''
  });
  const [availableProductNames, setAvailableProductNames] = useState([{ value: '', label: '제품명 선택' }]);
  const [availableModelNames, setAvailableModelNames] = useState([{ value: '', label: '모델명 선택' }]);

  // API 요청을 위한 useApi 훅 사용
  const {
    data: apiResponse,
    loading,
    error,
    updateParams
  } = useApi('/product-guides', {
    page: currentPage,
    limit: itemsPerPage,
    ...searchParams
  });

  // API로부터 데이터 추출
  const products = apiResponse?.data || [];
  const totalItems = apiResponse?.meta?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 옵션 데이터를 가져오는 API 호출
  const { 
    data: optionsData,
    loading: optionsLoading
  } = useApi('/product-options', {}, true);

  // 옵션 데이터 관리
  const [options, setOptions] = useState({
    brands: [{ value: '', label: '브랜드 선택' }],
    categories: [{ value: '', label: '제품군 선택' }],
    productNames: {},
    modelNames: {}
  });

  // 옵션 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (optionsData) {
      setOptions(optionsData);
    }
  }, [optionsData]);

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

  // 페이지 변경 시 데이터 재요청
  useEffect(() => {
    updateParams({ page: currentPage });
  }, [currentPage, updateParams]);

  // 검색 처리
  const handleSearch = () => {
    updateParams({
      ...searchParams,
      page: 1
    });
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
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
    updateParams({
      ...resetParams,
      page: 1
    });
  };

  // 페이지 이동 처리
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 파일 다운로드 처리
  const handleProductClick = (product) => {
    console.log('다운로드 요청:', product);
    // 파일 다운로드 로직은 실제 서버 API 연동시 구현
    window.open(`/api/product-guides/download/${product.id}`, '_blank');
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
          <form id="form_search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
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
                    <button type="button" className="hgbtn blue02" onClick={handleSearch}>
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
                  ) : products.length > 0 ? (
                    products.map(product => (
                      <tr 
                        key={product.id} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleProductClick(product)}
                      >
                        <td className="bln">{product.id}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.productName}</td>
                        <td>{product.modelName}</td>
                        <td>{product.title}</td>
                        <td>
                          {product.hasFile && (
                            <img src={fileIco} alt="첨부파일" />
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
          {!loading && !error && totalPages > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </article>
      </div>
    </div>
  );
};

export default PrdGuide;

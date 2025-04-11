import React, { useState, useEffect } from 'react';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import Pagination from '@/components/common/Pagination';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { faqImages } from '@/utils/data.js';
import SearchForm from '@/components/common/SearchForm';
import useApi from '@/utils/useApi';
import useFaqStore from '@/stores/faqStore';
import DOMPurify from 'dompurify';


// FAQ 관련 스타일 추가
const faqStyles = {
  hidden: {
    height: '0',
    opacity: 0,
    overflow: 'hidden',
    display: 'table-row',
    visibility: 'collapse'
  },
  visible: {
    height: 'auto',
    opacity: 1,
    overflow: 'visible',
    transition: 'all 0.35s ease-out',
    display: 'table-row',
    visibility: 'visible'
  },
  activeAnswer: {
    display: 'table-row'
  }
};

// 페이지당 표시할 항목 수 상수
const ITEMS_PER_PAGE = 10;

const productTypes = ['통합', '무선청소기', '유선청소기', '로봇청소기', '공기청정기', '소형가전', '식기세척기', '인덕션'];

const Faq = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [formProductType, setFormProductType] = useState('');
  const [formSearchKeyword, setFormSearchKeyword] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [answerStyles, setAnswerStyles] = useState({});
  
  const { getFaqList } = useFaqStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 요청을 위한 useApi 훅 사용
  const {
    data: faqResponse,
    loading: apiLoading,
    error: apiError,
    updateParams,
  } = useApi('/faq', { 
    productType: selectedProductType,
    keyword: searchKeyword
  });

  // FAQ 데이터 추출
  const faqData = faqResponse?.data || [];
  const filteredFaqs = faqData;

  // 검색 옵션 설정
  const searchOptions = productTypes.map(type => ({
    value: type,
    label: type
  }));

  // URL 파라미터에서 productType 가져오기
  useEffect(() => {
    const productTypeFromUrl = searchParams.get('productType');
    if (productTypeFromUrl) {
      setSelectedProductType(productTypeFromUrl);
      setFormProductType(productTypeFromUrl);
    }
  }, [searchParams, location]);

  // 검색 조건 변경 시 API 파라미터 업데이트
  useEffect(() => {
    updateParams({ 
      productType: selectedProductType,
      keyword: searchKeyword
    });
  }, [selectedProductType, searchKeyword, updateParams]);

  useEffect(() => {
    const initialStyles = {};
    faqData.forEach(faq => {
      initialStyles[faq.id] = faqStyles.hidden;
    });
    setAnswerStyles(initialStyles);
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        await getFaqList();
      } catch (err) {
        setError('FAQ를 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [getFaqList]);

  const toggleQuestion = (id) => {
    const isActive = activeQuestions.includes(id);
    
    if (isActive) {
      setActiveQuestions(activeQuestions.filter(q => q !== id));
    } else {
      setActiveQuestions([...activeQuestions, id]);
    }
    
    setAnswerStyles(prev => {
      const newStyles = { ...prev };
      
      if (isActive) {
        newStyles[id] = faqStyles.hidden;
      } else {
        newStyles[id] = faqStyles.visible;
      }
      
      return newStyles;
    });
  };

  const handleSearch = () => {
    setSelectedProductType(formProductType);
    setSearchKeyword(formSearchKeyword);
    
    // URL 업데이트
    if (formProductType && formProductType !== '통합') {
      setSearchParams({ productType: formProductType });
    } else if (formSearchKeyword) {
      setSearchParams({});
    }
  };

  const handleReset = () => {
    setFormProductType('');
    setFormSearchKeyword('');
    setSelectedProductType('');
    setSearchKeyword('');
    setSearchParams({});
  };

  const totalPages = Math.ceil(filteredFaqs.length / ITEMS_PER_PAGE);
  
  const currentFaqs = filteredFaqs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryClick = (type) => {
    setFormProductType(type);
    setSelectedProductType(type);
    
    // Update URL with the selected product type
    if (type === '통합') {
      // 통합인 경우 파라미터 제거
      setSearchParams({});
    } else {
      // 특정 제품 카테고리인 경우 URL 파라미터 설정
      setSearchParams({ productType: type });
    }
    
    // FAQ 아코디언 초기화
    setActiveQuestions([]);
    const resetStyles = {};
    faqData.forEach(faq => {
      resetStyles[faq.id] = faqStyles.hidden;
    });
    setAnswerStyles(resetStyles);
  };

  const handlePageChange = (page) => {
    setActiveQuestions([]);
    
    const resetStyles = {};
    faqData.forEach(faq => {
      resetStyles[faq.id] = faqStyles.hidden;
    });
    setAnswerStyles(resetStyles);
    
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="고객상담" lastPage="자주묻는 질문" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="고객 상담"
            description="일렉트로룩스 제품에 대해 자주 문의하시는 내용입니다. 1:1 고객상담 전 확인해주세요."
          />

          <div className="link-tab mb0">
            <ul>
              <li className="on"><Link to="/faq">자주묻는 질문</Link></li>
              <li><Link to="/qna">1:1 고객상담</Link></li>
            </ul>
          </div>

          <div id="top-pic" className="faq-top-pic">
            <dl className="dl1">
              <dt>일렉트로룩스 고객센터</dt>
              <dd className="txt1">소모품 구매, 제품 및 AS 상담문의</dd>
              <dd className="tel"><a href="tel:1566-1238">1566-1238</a></dd>
            </dl>
            <dl className="dl2">
              <dt className="tit"><span>운영시간</span></dt>
              <dd className="t"><span className="lb">평&nbsp;&nbsp;&nbsp;&nbsp;일</span> 09:00 ~ 18:00</dd>
              <dd className="txt1">※ 평일 점심시간(12:00~13:00) 상담 불가</dd>
              <dd className="txt1">※ 토요일, 일요일 및 법정공휴일(임시공휴일) 휴무</dd>
              <dd className="txt2">상담 전 모델명과 시리얼번호 확인 후 전화 주시면 빠른 상담이 가능합니다.</dd>
            </dl>
          </div>

          <div className="faq-tit-list">
            <ul>
              {productTypes.map((type, index) => (
                <li key={index} className={index === productTypes.length - 1 ? 'last' : ''}>
                  <a href="#" onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(type);
                  }}>
                    <div className="dlbox">
                      <div className="txtbox">
                        <p className="tit">{type}</p>
                        <p className="btn-dir"><span className="hgbtn blue01">FAQ &gt;</span></p>
                      </div>
                      <p className="pic">
                        <img src={faqImages[index]} alt={type} />
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <SearchForm
            searchOptions={searchOptions}
            searchKey={formProductType}
            searchValue={formSearchKeyword}
            onSearchKeyChange={setFormProductType}
            onSearchValueChange={setFormSearchKeyword}
            onSearch={handleSearch}
            onReset={handleReset}
            placeholder="검색어를 입력해 주세요."
            formId="faqSearchForm"
          />

          <p className="total" style={{ margin: '15px 0' }}>
            총 {filteredFaqs.length}개의 자주묻는 질문이 있습니다.
            {searchKeyword && ` (검색어: ${searchKeyword})`}
          </p>

          <div className="faq-wrap">
            <style jsx>{`
              .faq-list tr.q {
                cursor: pointer;
                transition: background-color 0.3s;
              }
              .faq-list tr.q:hover {
                background-color: #f9f9f9;
              }
              .faq-list tr.q.on {
                background-color: #f5f5f5;
              }
              .faq-list tr.a {
                transition: all 0.35s ease-out;
              }
            `}</style>
            {apiLoading ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                FAQ 데이터를 불러오는 중입니다...
              </div>
            ) : apiError ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'red' }}>
                FAQ 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.
              </div>
            ) : (
              <table className="type1 faq-list">
                <thead>
                  <tr className="tit">
                    <th scope="col" className="tit1">&nbsp;</th>
                    <th scope="col" className="tit2">제품군</th>
                    <th scope="col" className="tit3">질문</th>
                  </tr>
                </thead>
                <tbody>
                  {currentFaqs.length > 0 ? (
                    currentFaqs.map((faq) => (
                      <React.Fragment key={faq.id}>
                        <tr 
                          className={`q ${activeQuestions.includes(faq.id) ? 'on' : ''}`} 
                          onClick={() => toggleQuestion(faq.id)}
                        >
                          <td className="lb">Q</td>
                          <td className="tit">{faq.productType}</td>
                          <td className="txt"><span>{faq.question}</span></td>
                        </tr>
                        <tr 
                          className="a" 
                          style={answerStyles[faq.id] || faqStyles.hidden}
                        >
                          <td className="lb">A</td>
                          <td colSpan="2" className="acts" dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(faq.answer, {
                              ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'img', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                              ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style'],
                              ALLOW_DATA_ATTR: false
                            })
                          }}></td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '30px 0' }}>
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {filteredFaqs.length > 0 && (
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

export default Faq;
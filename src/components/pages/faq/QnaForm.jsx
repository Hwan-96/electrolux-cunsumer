import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PathNav from '@/components/common/PathNav';
import SubTitleBox from '@/components/common/SubTitleBox';
import { Link } from 'react-router-dom';
import hintIco from '@/images/serial_hint.png';
import serialHint from '@/images/serialkch2.jpg';
import useQnaStore from '@/stores/qnaStore';
import useAuthStore from '@/stores/authStore';
import { sanitizeInput, sanitizeHtmlContent } from '@/utils/inputValidation';

const TextEditor = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const EditorContent = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  resize: vertical;
  min-height: 200px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  line-height: 1.5;
`;


const QnaForm = () => {
  const navigate = useNavigate();
  const { createQna } = useQnaStore();
  const { userInfo, isLoggedIn } = useAuthStore();
  
  // Form state
  const [formData, setFormData] = useState({
    uname: '',
    uphone1: '010',
    uphone2: '',
    uphone3: '',
    uemail1: '',
    uemail2: '',
    cate_qna1: '',
    cate_qna2: '',
    cate_qna3: '',
    cate_brand: '',
    cate_ptype: '',
    cate_pname: '',
    cate_model: '',
    contents_qna: '',
    title: '',
    files: [],
    category: 'product'
  });
  
  // Email domain selection - changed from useState to a constant
  const emailDomains = [
    { value: '', label: '직접입력' },
    { value: 'naver.com', label: '네이버' },
    { value: 'daum.net', label: '다음' },
    { value: 'nate.com', label: '네이트' },
    { value: 'gmail.com', label: 'Gmail' }
  ];
  
  // Options for dropdowns
  const [options, setOptions] = useState({
    qna1: [{ value: '', label: '선택해 주세요' }],
    qna2: [{ value: '', label: '선택해 주세요' }],
    qna3: [{ value: '', label: '선택해 주세요' }],
    brand: [{ value: '', label: '브랜드 선택' }],
    ptype: [{ value: '', label: '제품군 선택' }],
    pname: [{ value: '', label: '제품명 선택' }],
    model: [{ value: '', label: '모델명 선택' }]
  });
  
  // Model search
  const [modelSearchName, setModelSearchName] = useState('');
  
  // File upload
  const [fileList, setFileList] = useState([]);
  
  // 힌트 이미지 호버 상태 추가
  const [isHintVisible, setIsHintVisible] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력값 sanitize
    const sanitizedValue = name === 'contents_qna' 
      ? sanitizeHtmlContent(value)
      : sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };
  
  // Handle email domain selection
  const handleEmailDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setFormData({
      ...formData,
      uemail2: selectedDomain
    });
  };
  
  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      const newFiles = [...fileList, e.target.files[0]];
      setFileList(newFiles);
    }
  };
  
  // Remove file
  const removeFile = (index) => {
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);
  };
  
  // Add file upload field
  const addFileField = () => {
    document.getElementById('upfile').click();
  };
  
  // Model search functionality
  const handleModelSearch = () => {
    if (modelSearchName.trim() === '') {
      alert('모델명을 입력해주세요.');
      return;
    }
    
    // API call to search model would go here
    console.log('Searching for model:', modelSearchName);
    // For now, just simulate finding a model
    alert('모델 검색 기능은 현재 개발 중입니다.');
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const submissionData = {
      ...formData,
      phone: `${formData.uphone1}-${formData.uphone2}-${formData.uphone3}`,
      email: `${formData.uemail1}@${formData.uemail2}`,
      user_id: isLoggedIn ? userInfo.id : null // Include user ID if logged in
    };

    try {
      await createQna(submissionData);
      navigate('/qna');
    } catch (error) {
      console.error('Q&A 작성 실패:', error);
      alert('Q&A 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };
  
  // Reset form
  const handleReset = () => {
    if (window.confirm('작성한 내용을 취소하시겠습니까?')) {
      navigate('/qna');
    }
  };
  
  // Initialize options (mock data for now)
  useEffect(() => {
    // In a real application, these would come from API calls
    setOptions({
      qna1: [
        { value: '', label: '선택해 주세요' },
        { value: '1', label: '제품 문의' },
        { value: '2', label: 'A/S 문의' },
        { value: '3', label: '기타 문의' }
      ],
      qna2: [
        { value: '', label: '선택해 주세요' },
        { value: '1', label: '사용 방법' },
        { value: '2', label: '기능 문의' },
        { value: '3', label: '부품 문의' }
      ],
      qna3: [
        { value: '', label: '선택해 주세요' },
        { value: '1', label: '작동 관련' },
        { value: '2', label: '소음 관련' },
        { value: '3', label: '기타' }
      ],
      brand: [
        { value: '', label: '브랜드 선택' },
        { value: '1', label: '일렉트로룩스' },
        { value: '2', label: 'AEG' }
      ],
      ptype: [
        { value: '', label: '제품군 선택' },
        { value: '1', label: '무선청소기' },
        { value: '2', label: '유선청소기' },
        { value: '3', label: '로봇청소기' },
        { value: '4', label: '공기청정기' },
        { value: '5', label: '소형가전' },
        { value: '6', label: '식기세척기' },
        { value: '7', label: '인덕션' }
      ],
      pname: [
        { value: '', label: '제품명 선택' }
      ],
      model: [
        { value: '', label: '모델명 선택' }
      ]
    });
  }, []);
  
  // Initialize form data with user info
  useEffect(() => {
    if (userInfo) {
      // 이름 설정
      const name = userInfo.name || '';
      
      // 전화번호 파싱
      let phone1 = '010';
      let phone2 = '';
      let phone3 = '';
      
      if (userInfo.tel_no) {
        const phoneMatch = userInfo.tel_no.match(/^(\d{3})(\d{3,4})(\d{4})$/);
        if (phoneMatch) {
          [, phone1, phone2, phone3] = phoneMatch;
        } else {
          const phoneParts = userInfo.tel_no.split('-');
          if (phoneParts.length === 3) {
            [phone1, phone2, phone3] = phoneParts;
          }
        }
      }
      
      // 이메일 파싱
      let emailId = '';
      let emailDomain = '';
      
      if (userInfo.mail_addr) {
        const emailParts = userInfo.mail_addr.split('@');
        if (emailParts.length === 2) {
          emailId = emailParts[0];
          emailDomain = emailParts[1];
        }
      }
      
      setFormData(prev => ({
        ...prev,
        uname: name,
        uphone1: phone1,
        uphone2: phone2,
        uphone3: phone3,
        uemail1: emailId,
        uemail2: emailDomain
      }));
    }
  }, [userInfo]);
  
  // Handle on Enter for model search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleModelSearch();
    }
  };
  
  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage={["고객상담", "1:1 상담"]} lastPage="1:1 상담" />
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="1:1 상담"
            description={[
              "제품 사용 중 궁금증을 무엇이든 물어보세요. 빠른 시간 내 답변 드리겠습니다.",
              <br key="br1" />,
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

          <form id="form_qna" className="qna-form" onSubmit={handleSubmit}>
            
            <table className="type1 write1 bdtn qna-write1">
              <caption>1:1상담 작성</caption>
              <tbody>
                <tr>
                  <th className="w1"><label htmlFor="uname" className="lb1">작성자</label></th>
                  <td className="w2">
                    <input 
                      type="text" 
                      name="uname" 
                      id="uname" 
                      className="ip01" 
                      style={{ width: '60%' }} 
                      title="작성자" 
                      value={formData.uname}
                      onChange={handleInputChange}
                      readOnly={isLoggedIn}
                    />
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="uphone1" className="lb1">연락처</label></th>
                  <td>
                    <ul className="ip-list1 ip-phone" style={{ maxWidth: '90%' }}>
                      <li className="ip1">
                        <select 
                          name="uphone1" 
                          id="uphone1" 
                          className="sel01" 
                          title="연락처"
                          value={formData.uphone1}
                          onChange={handleInputChange}
                          disabled={isLoggedIn}
                        >
                          <option value="010">010</option>
                          <option value="011">011</option>
                          <option value="017">017</option>
                          <option value="018">018</option>
                          <option value="019">019</option>
                        </select>
                      </li>
                      <li className="ip2">
                        <input 
                          type="tel" 
                          name="uphone2" 
                          id="uphone2" 
                          className="ip01" 
                          maxLength="4" 
                          title="연락처" 
                          value={formData.uphone2}
                          onChange={handleInputChange}
                          readOnly={isLoggedIn}
                        />
                      </li>
                      <li className="ip3">
                        <input 
                          type="tel" 
                          name="uphone3" 
                          id="uphone3" 
                          className="ip01" 
                          maxLength="4" 
                          title="연락처" 
                          value={formData.uphone3}
                          onChange={handleInputChange}
                          readOnly={isLoggedIn}
                        />
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th><label htmlFor="uemail1" className="lb1">이메일</label></th>
                  <td>
                    <ul className="ip-list1 ip-mail" style={{ maxWidth: '90%' }}>
                      <li className="ip1">
                        <input 
                          type="text" 
                          name="uemail1" 
                          id="uemail1" 
                          className="ip01" 
                          value={formData.uemail1}
                          onChange={handleInputChange}
                          readOnly={isLoggedIn}
                        />
                      </li>
                      <li>@</li>
                      <li className="ip2">
                        <input 
                          type="text" 
                          name="uemail2" 
                          id="uemail2" 
                          className="ip01" 
                          value={formData.uemail2}
                          onChange={handleInputChange}
                          readOnly={isLoggedIn}
                        />
                      </li>
                      <li className="ip3">
                        <select 
                          name="uemail2_sel" 
                          id="uemail2_sel" 
                          className="sel01"
                          onChange={handleEmailDomainChange}
                          value={formData.uemail2}
                          disabled={isLoggedIn}
                        >
                          {emailDomains.map((domain, index) => (
                            <option key={index} value={domain.value}>{domain.label}</option>
                          ))}
                        </select>
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th><label htmlFor="cate_qna1" className="lb1">문의내용</label></th>
                  <td>
                    <ul className="ip-list1">
                      <li>
                        <select 
                          name="cate_qna1" 
                          id="cate_qna1" 
                          className="sel01" 
                          style={{ width: '96%' }}
                          value={formData.cate_qna1}
                          onChange={handleInputChange}
                        >
                          {options.qna1.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <select 
                          name="cate_qna2" 
                          id="cate_qna2" 
                          className="sel01" 
                          style={{ width: '96%' }}
                          value={formData.cate_qna2}
                          onChange={handleInputChange}
                        >
                          {options.qna2.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <select 
                          name="cate_qna3" 
                          id="cate_qna3" 
                          className="sel01" 
                          style={{ width: '100%' }} 
                          title="문의내용"
                          value={formData.cate_qna3}
                          onChange={handleInputChange}
                        >
                          {options.qna3.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th><label htmlFor="cate_brand" className="lb1">모델</label></th>
                  <td>
                    <ul className="ip-list1">
                      <li>
                        <select 
                          name="cate_brand" 
                          id="cate_brand" 
                          className="sel01" 
                          style={{ width: '96%' }}
                          value={formData.cate_brand}
                          onChange={handleInputChange}
                        >
                          {options.brand.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <select 
                          name="cate_ptype" 
                          id="cate_ptype" 
                          className="sel01" 
                          style={{ width: '96%' }}
                          value={formData.cate_ptype}
                          onChange={handleInputChange}
                        >
                          {options.ptype.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <select 
                          name="cate_pname" 
                          id="cate_pname" 
                          className="sel01" 
                          style={{ width: '96%' }}
                          value={formData.cate_pname}
                          onChange={handleInputChange}
                        >
                          {options.pname.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                      <li>
                        <select 
                          name="cate_model" 
                          id="cate_model" 
                          className="sel01" 
                          style={{ width: '100%' }} 
                          title="모델명"
                          value={formData.cate_model}
                          onChange={handleInputChange}
                        >
                          {options.model.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </li>
                    </ul>

                    <ul className="ip-list1 mt5">
                      <li>
                        <input 
                          type="text" 
                          id="modelSearchName" 
                          className="ip01" 
                          style={{ width: '99%' }}
                          value={modelSearchName}
                          onChange={(e) => setModelSearchName(e.target.value)}
                          onKeyPress={handleKeyPress}
                        />
                      </li>
                      <li className="btn-sh">
                        <button type="button" className="hgbtn blue02" onClick={handleModelSearch}>
                          모델명 검색
                        </button>
                      </li>
                      <li className="btn-hint">
                        <img 
                          className="question_icon" 
                          src={hintIco} 
                          alt="모델명 검색 힌트" 
                          onMouseEnter={() => setIsHintVisible(true)}
                          onMouseLeave={() => setIsHintVisible(false)}
                        />
                        <span 
                          className="btn-hint-image" 
                          style={{ display: isHintVisible ? 'block' : 'none' }}
                        >
                          <img src={serialHint} alt="모델명 검색 힌트 이미지" />
                        </span>
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th><label htmlFor="qna_title" className="lb1">제목</label></th>
                  <td>
                    <input 
                      type="text" 
                      name="title" 
                      id="qna_title" 
                      className="ip01" 
                      style={{ width: '100%' }} 
                      title="제목" 
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="문의 제목을 입력해주세요."
                    />
                  </td>
                </tr>

                <tr>
                  <th className="vat"><label htmlFor="contents_qna" className="lb1">내용</label></th>
                  <td>
                    <TextEditor>
                      <EditorContent
                        id="contents_qna"
                        name="contents_qna"
                        value={formData.contents_qna}
                        onChange={handleInputChange}
                        placeholder="문의 내용을 작성해주세요."
                        rows="10"
                      ></EditorContent>
                    </TextEditor>
                  </td>
                </tr>

                <tr>
                  <th><label htmlFor="upfile" className="lb1">첨부파일</label></th>
                  <td id="file_upload">
                    {fileList.map((file, index) => (
                      <div key={index} style={{ display: 'block', padding: '0 10px 5px 5px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginLeft: '5px',
                            fontSize: '17px',
                            border: '1px solid #CC0000',
                            color: '#CC0000',
                            fontWeight: 'bold',
                            width: '25px',
                            height: '25px'
                          }}
                          onClick={() => removeFile(index)}
                        >
                          -
                        </span>
                        <a href="#">{file.name}</a>
                      </div>
                    ))}
                    <div>
                      <input
                        type="file"
                        name="upfile"
                        id="upfile"
                        className="ip_file01"
                        style={{ width: '95%', display: 'inline-block' }}
                        placeholder="첨부파일"
                        onChange={handleFileUpload}
                      />
                      <span
                        className="file_plus"
                        style={{
                          display: 'inline-block',
                          textAlign: 'center',
                          cursor: 'pointer',
                          marginLeft: '5px',
                          fontSize: '20px',
                          border: '1px solid #CCCCCC',
                          width: '25px',
                          height: '30px'
                        }}
                        onClick={addFileField}
                      >
                        +
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="btn-area1 ta-btm">
              <button type="submit" className="hgbtn blue02">등록</button>
              <button type="button" className="hgbtn grey01" onClick={handleReset}>취소</button>
            </div>
          </form>
        </article>
      </div>
      
    </div>
  );
};

export default QnaForm; 
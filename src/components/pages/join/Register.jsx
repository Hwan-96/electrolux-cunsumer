import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Top, BotBtn } from './JoinStyles';
import { sanitizeInput } from '@/utils/security';
import AlertPopup from '@/components/common/popup/AlertPopup';
import ConfirmPopup from '@/components/common/popup/ConfirmPopup';
import DaumPost from '@/components/common/popup/DaumPost';
import { useDupIdCheck, registerUser, useJoinStore } from '@/stores/authStore';

const Register = () => {
  const navigate = useNavigate();
  const { checkIdDuplicate } = useDupIdCheck();
  const { register } = registerUser();
  const [formData, setFormData] = useState({
    MemberId: '',
    MemberPwd: '',
    reMemberPwd: '',
    MemberName: '',
    MemberHp: '',
    EmailId: '',
    EmailDomain: '',
    Zip: '',
    Address: '',
    AddressJiBun: '',
    AddrDetail: '',
    BirthYear: '',
    BirthMonth: '',
    BirthDate: '',
    MemberSex: '',
    phone1: '',
    phone2: '',
    phone3: '',
    IsMarried: '',
    IsChild: '',
    IsSmsReceive: '',
    IsEmailReceive: '',
    selectEmailDomain: ''
  });
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [productList, setProductList] = useState([1]);
  const [showProductSection, setShowProductSection] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);

  const handleAddProduct = () => {
    setShowProductSection(prev => !prev);
  }

  const handleAddProductItem = () => {
    if (productList.length < 10) {
      setProductList(prev => [...prev, prev.length + 1]);
    } else {
      setAlertMessage('최대 10개까지만 추가 가능합니다.');
      setShowAlert(true);
    }
  }

  const handleRemoveProductItem = (index) => {
    setProductList(prev => prev.filter((_, i) => i !== index));
  }

  const handleShowProfileSection = () => {
    setShowProfileSection(prev => !prev);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // 입력 필드별 sanitization 적용
    switch (name) {
      case 'MemberId':
      case 'MemberName':
      case 'EmailId':
      case 'EmailDomain':
      case 'Address':
      case 'AddrDetail':
      case 'BuyPlace':
      case 'BuyBrench':
        sanitizedValue = sanitizeInput(value);
        break;
      case 'MemberHp':
      case 'phone1':
      case 'phone2':
      case 'phone3':
        // 전화번호는 숫자만 허용
        sanitizedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'Zip':
        // 우편번호는 숫자만 허용
        sanitizedValue = value.replace(/[^0-9]/g, '');
        break;
      case 'ProductSerial1':
      case 'ProductSerial2':
      case 'ProductSerial3':
      case 'ProductSerial4':
      case 'ProductSerial5':
      case 'ProductSerial6':
      case 'ProductSerial7':
      case 'ProductSerial8':
        // 시리얼 번호는 영문자와 숫자만 허용
        sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
        break;
      default:
        sanitizedValue = sanitizeInput(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleIdCheck = async () => {
    // 아이디 필드 검증
    if (!formData.MemberId) {
      setAlertMessage('아이디를 입력해주세요.');
      setShowAlert(true);
      return;
    }
    
    // 아이디 유효성 검사 (4~16자의 영문소문자, 숫자)
    const idRegex = /^[a-z0-9]{4,16}$/;
    if (!idRegex.test(formData.MemberId)) {
      setAlertMessage('아이디는 4~16자의 영문 소문자, 숫자만 사용 가능합니다.');
      setShowAlert(true);
      return;
    }
    
    // 중복 확인 전 상태 초기화
    setIsIdAvailable(false);
    
    // 아이디 중복 확인 API 호출 - 스토어에서 오류 처리까지 담당
    const result = await checkIdDuplicate(formData.MemberId);
    
    // 결과를 UI에 표시
    setIsIdAvailable(result.isIdAvailable);
    setAlertMessage(result.message || (result.isIdAvailable 
      ? '사용 가능한 아이디입니다.' 
      : '이미 사용 중인 아이디입니다.'));
    setShowAlert(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isIdAvailable) {
      setAlertMessage('아이디 중복 확인이 필요합니다.');
      setShowAlert(true);
      return;
    }

    setConfirmMessage('회원가입을 진행하시겠습니까?');
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    
    // 폼 제출 전 최종 검증
    const finalFormData = {
      ...formData,
      MemberId: sanitizeInput(formData.MemberId),
      MemberName: sanitizeInput(formData.MemberName),
      EmailId: sanitizeInput(formData.EmailId),
      EmailDomain: sanitizeInput(formData.EmailDomain),
      Address: sanitizeInput(formData.Address),
      AddrDetail: sanitizeInput(formData.AddrDetail),
      BuyPlace: sanitizeInput(formData.BuyPlace),
      BuyBrench: sanitizeInput(formData.BuyBrench)
    };

    try {
      await register(finalFormData);
      
      // 회원정보 등록 완료 상태 업데이트
      const { setRegisterCompleted } = useJoinStore.getState();
      setRegisterCompleted(true);
      
      // 가입 완료 페이지로 이동
      navigate('/join/complete');
    } catch (_) { // eslint-disable-line no-unused-vars
      setAlertMessage('회원가입 중 오류가 발생했습니다.');
      setShowAlert(true);
    }
  };

  const handleAddressSelect = (address) => {
    setFormData(prev => ({
      ...prev,
      Zip: address.zipCode,
      Address: address.address,
      AddressJiBun: address.jibunAddress
    }));
  };

  return (
    <div className="contents_wrap" style={{ backgroundColor: '#fff', paddingTop: '0px' }}>
      <div className="join_top">
        <Inbox>
          <ul><img src="../../../join/top_logo.png" alt="Electrolux" /></ul>
          <ul>일렉트로룩스 회원가입을 환영합니다.</ul>
        </Inbox>
      </div>
      <Top>
        <ul>회원가입</ul>
        <ul>HOME &gt; 회원가입</ul>
      </Top>
      <div className="cont_wrap">
        <div className="step_box p02">
          <ul className="ico">
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className="tit"><span>STEP 02</span>정보입력</ul>
          <ul className="line"></ul>
          <ul className="txt">회원가입을 위한 필수정보 및<br />선택정보를 입력해주세요.</ul>
        </div>

        <form name="regsiterFrm" id="regsiterFrm" onSubmit={handleSubmit}>
          <div className="form_wrap">
            <div className="form_tit">필수항목</div>
            <div className="form_bd">
              <ul>
                <li>아이디</li>
                <li>
                  <input name="MemberId" type="text" style={{ width: '200px' }} maxLength={16} value={formData.MemberId} onChange={handleChange} />
                  <div className="btn_bd" id="btn_id_check" onClick={handleIdCheck}>중복확인</div>
                  <div className="extxt">(4~16자의 영문소문자, 영문소문자/숫자)</div>
                </li>
              </ul>
              <ul>
                <li>비밀번호</li>
                <li>
                  <input name="MemberPwd" type="password" style={{ width: '200px' }} maxLength={20} value={formData.MemberPwd} onChange={handleChange} />
                  <div className="extxt">(8자 이상의 영문 대소문자, 숫자, 특수문자 중 3개 이상)</div>
                </li>
              </ul>
              <ul>
                <li>비밀번호 확인</li>
                <li>
                  <input name="reMemberPwd" type="password" style={{ width: '200px' }} value={formData.reMemberPwd} onChange={handleChange} />
                </li>
              </ul>
              <ul>
                <li>이름</li>
                <li>
                  <input name="MemberName" type="text" style={{ width: '200px' }} value={formData.MemberName} onChange={handleChange} />
                </li>
              </ul>
              <ul>
                <li>휴대폰</li>
                <li>
                  <input name="MemberHp" type="text" style={{ width: '200px' }} value={formData.MemberHp} onChange={handleChange} />
                  <div className="smsrd">
                    <span>SMS 수신동의</span>
                    <input name="IsSmsReceive" type="radio" value="1" checked={formData.IsSmsReceive === '1'} onChange={handleChange} />동의함
                    <input name="IsSmsReceive" type="radio" value="0" checked={formData.IsSmsReceive === '0'} onChange={handleChange} />동의안함
                  </div>
                  <div className="smsinfo">
                    <div className="bd">
                      <dt className="t01">수집 및 이용항목</dt>
                      <dt>휴대폰번호</dt>
                    </div>
                    <div className="bd">
                      <dt className="t01">이용목적</dt>
                      <dt>비밀번호 분실 시 임시비빌번호발송, 1:1상담답변, 기타문의사항답변, 이벤트알림, 마케팅활용</dt>
                    </div>
                    <div className="ip">※ 임시비밀번호 발송 등 서비스 이용과 관련된 중요한 사항은 동의 여부와 관계없이 발송됩니다.</div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>이메일</li>
                <li>
                  <input name="EmailId" type="text" style={{ width: '140px' }} value={formData.EmailId} onChange={handleChange} /> @ 
                  <input 
                    name="EmailDomain" 
                    type="text" 
                    style={{ width: '140px' }} 
                    value={formData.EmailDomain} 
                    onChange={handleChange}
                    disabled={formData.selectEmailDomain !== ''}
                  />
                  <select 
                    name="selectEmailDomain" 
                    className="mailsel"
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value !== '') {
                        setFormData(prev => ({
                          ...prev,
                          EmailDomain: e.target.value
                        }));
                      }
                    }}
                  >
                    <option value="">직접입력</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                  </select>
                  <div className="smsrd">
                    <span>메일 수신동의</span>
                    <input name="IsEmailReceive" type="radio" value="1" checked={formData.IsEmailReceive === '1'} onChange={handleChange} />동의함
                    <input name="IsEmailReceive" type="radio" value="0" checked={formData.IsEmailReceive === '0'} onChange={handleChange} />동의안함
                  </div>
                  <div className="smsinfo">
                    <div className="bd">
                      <dt className="t01">수집 및 이용항목</dt>
                      <dt>이메일주소</dt>
                    </div>
                    <div className="bd">
                      <dt className="t01">이용목적</dt>
                      <dt>신규/개편 서비스 안내, 이벤트알림, 마케팅활용</dt>
                    </div>
                    <div className="ip">※ 개인정보 이용 내역 및 서비스 이용과 관련된 중요한 사항은 동의 여부와 관계없이 발송됩니다.</div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>주소</li>
                <li>
                  <div>
                    <input name="Zip" id="ZipCode" type="text" style={{ width: '100px', marginBottom: '2px' }} placeholder="우편번호" readOnly value={formData.Zip} onChange={handleChange} />
                    <DaumPost setAddress={handleAddressSelect} />
                  </div>
                  <div>
                    <input name="Address" id="Address" type="text" style={{ width: '96%', marginBottom: '2px' }} placeholder="주소" readOnly value={formData.Address} onChange={handleChange} />
                    <input name="AddressJiBun" id="AddressJiBun" type="hidden" value={formData.AddressJiBun} onChange={handleChange} />
                  </div>
                  <div>
                    <input name="AddrDetail" type="text" style={{ width: '96%', marginBottom: '7px' }} placeholder="상세주소" value={formData.AddrDetail} onChange={handleChange} />
                  </div>
                  <div className="smsinfo">
                    <div className="bd">
                      <dt className="t01">수집 및 이용항목</dt>
                      <dt>주소</dt>
                    </div>
                    <div className="bd">
                      <dt className="t01">이용목적</dt>
                      <dt>신규/개편 서비스 안내, 이벤트알림, 마케팅활용, 특정 맞춤 서비스 제공, 회원제 서비스 제공, 사은품 배송</dt>
                    </div>
                    <div className="ip">※ 개인정보 이용 내역 및 서비스 이용과 관련된 중요한 사항은 동의 여부와 관계없이 발송됩니다.</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="form_tit">
              (선택) 일렉트로룩스 제품을 구매한적이 있으신가요?<br />
              <span>※ 제품정보를 입력하실 경우 상담 진행 시 빠른 상담을 받으실 수 있습니다.</span>
              <div className="join_add_product_btn" onClick={handleAddProduct}>구매정보등록</div>
            </div>

            <div className="add_product" style={{ display: showProductSection ? 'block' : 'none' }}>
              <div className="product_list">
                {productList.map((_, index) => (
                  <div className="product" key={index}>
                    <div className="form_bd add">
                      <div className="pdel_prod" style={{ display: index > 0 ? 'block' : 'none' }} onClick={() => handleRemoveProductItem(index)}>X 삭제</div>
                      <ul>
                        <li>구매제품명</li>
                        <li>
                          <select name="ProductBrand[]" className="product_sel" id={`product${index + 1}_1`}>
                            <option value="">브랜드 선택</option>
                          </select>
                          <select name="ProductGroup[]" className="product_sel" id={`product${index + 1}_2`}>
                            <option value="">제품군 선택</option>
                          </select>
                          <select name="ProductName[]" className="product_sel" id={`product${index + 1}_3`}>
                            <option value="">제품명 선택</option>
                          </select>
                          <select name="ProductModel[]" className="product_sel" id={`product${index + 1}_4`} data-ultra="0">
                            <option value="">제품모델선택</option>
                          </select>
                        </li>
                      </ul>
                      <ul>
                        <li>제품 시리얼번호</li>
                        <li>
                          <input name="ProductSerial1[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial2[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial3[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial4[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial5[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial6[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial7[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial8[]" type="text" style={{ width: '20px' }} maxLength={1} className="serial" />
                          <input name="ProductSerial[]" type="hidden" />
                          <div className="extxt">(구매하신 제품의 시리얼넘버 8자리를 넣어주세요.제품 바닥면 스티커 내 기재되어있습니다.)</div>
                        </li>
                      </ul>
                      <ul>
                        <li>구매시기</li>
                        <li>
                          <select name="ProductBuyYear[]">
                            <option value="">년도 선택</option>
                          </select>
                          <select name="ProductBuyMonth[]">
                            <option value="">월 선택</option>
                          </select>
                        </li>
                      </ul>
                      <ul>
                        <li>구매처/지점명</li>
                        <li>
                          <dt>구매처 <input name="BuyPlace[]" type="text" style={{ width: '200px' }} maxLength={20} /></dt>
                          <dt>지점명 <input name="BuyBrench[]" type="text" style={{ width: '200px' }} maxLength={20} /></dt>
                          <div className="extxt2">(매장에서 구입 시 지점명까지 입력해주세요. ex) 구매처:신세계백화점 / 지점:강남점)</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="form_bd_add">
                ※ 최대 10개까지 등록가능합니다.
                <div onClick={handleAddProductItem}>제품추가등록</div>
              </div>
            </div>

            <div className="form_tit">
              (선택) 추가항목을 기입하시면 맞춤 혜택정보를 제공해드립니다.
              <div className="join_add_profile_btn" onClick={handleShowProfileSection}>추가정보등록</div>
            </div>

            <div className="add_profile" style={{ display: showProfileSection ? 'block' : 'none' }}>
              <div className="form_bd add">
                <ul>
                  <li>생년월일</li>
                  <li>
                    <select name="BirthYear" className="product_sel" value={formData.BirthYear} onChange={handleChange}>
                      <option value="">년도 선택</option>
                    </select>
                    <select name="BirthMonth" className="product_sel" value={formData.BirthMonth} onChange={handleChange}>
                      <option value="">월 선택</option>
                    </select>
                    <select name="BirthDate" className="product_sel" value={formData.BirthDate} onChange={handleChange}>
                      <option value="">일 선택</option>
                    </select>
                  </li>
                </ul>
                <ul>
                  <li>성별</li>
                  <li>
                    <input name="MemberSex" type="radio" value="M" checked={formData.MemberSex === 'M'} onChange={handleChange} />남성
                    <input name="MemberSex" type="radio" value="F" checked={formData.MemberSex === 'F'} onChange={handleChange} />여성
                  </li>
                </ul>
                <ul>
                  <li>주소지 전화번호</li>
                  <li>
                    <select name="phone1" value={formData.phone1} onChange={handleChange}>
                      <option value="">선 택</option>
                    </select> -
                    <input name="phone2" type="text" style={{ width: '80px' }} maxLength={5} value={formData.phone2} onChange={handleChange} /> -
                    <input name="phone3" type="text" style={{ width: '80px' }} maxLength={5} value={formData.phone3} onChange={handleChange} />
                  </li>
                </ul>
                <ul>
                  <li>결혼유무</li>
                  <li>
                    <input name="IsMarried" type="radio" value="0" checked={formData.IsMarried === '0'} onChange={handleChange} />미혼
                    <input name="IsMarried" type="radio" value="1" checked={formData.IsMarried === '1'} onChange={handleChange} />기혼
                  </li>
                </ul>
                <ul>
                  <li>자녀유무</li>
                  <li>
                    <input name="IsChild" type="radio" value="0" checked={formData.IsChild === '0'} onChange={handleChange} />없음
                    <input name="IsChild" type="radio" value="1" checked={formData.IsChild === '1'} onChange={handleChange} />있음
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <BotBtn>
            <div id="btn_member_reg_cancle">취소</div>
            <div onClick={handleSubmit}>가입하기</div>
          </BotBtn>
        </form>
      </div>

      <AlertPopup
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="알림"
        message={alertMessage}
      />

      <ConfirmPopup
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        title="확인"
        message={confirmMessage}
      />
    </div>
  );
};

export default Register; 
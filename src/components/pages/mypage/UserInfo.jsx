import React, { useState, useEffect } from 'react';
import { BotBtn } from '@/components/pages/join/JoinStyles';
import { sanitizeInput } from '@/utils/security';
import AlertPopup from '@/components/common/popup/AlertPopup';
import ConfirmPopup from '@/components/common/popup/ConfirmPopup';
import DaumPost from '@/components/common/popup/DaumPost';
import useAuthStore from '@/stores/authStore';
import styled from 'styled-components';
import Popup from '@/components/common/popup/Popup';

// 비밀번호 변경 팝업 스타일
const PasswordChangePopup = styled.div`
  padding: 30px;
  
  .pop-title {
    font-size: 24px;
    font-weight: bold;
    color: #1a2753;
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input[type="password"] {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  
  .btn-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
  }
  
  .btn {
    min-width: 100px;
    height: 40px;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
  
  .btn-cancel {
    background-color: #f0f0f0;
    color: #333;
  }
  
  .btn-submit {
    background-color: #1a2753;
    color: white;
  }
`;

const UserInfo = () => {
  const { userInfo, updateUserInfo, changePassword } = useAuthStore();
  const [formData, setFormData] = useState({
    MemberId: '',
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
  
  // 비밀번호 변경 팝업 상태
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  
  // 비밀번호 변경 상태
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // 비밀번호 변경 오류 상태
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    general: ''
  });
  
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [productList, setProductList] = useState([1]);
  const [showProductSection, setShowProductSection] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  
  // 사용자 정보 초기화
  useEffect(() => {
    if (userInfo) {
      // 이메일 파싱
      let emailId = '';
      let emailDomain = '';
      if (userInfo.mail_addr) {
        const parts = userInfo.mail_addr.split('@');
        if (parts.length === 2) {
          emailId = parts[0];
          emailDomain = parts[1];
        }
      }
      
      setFormData({
        MemberId: userInfo.id || '',
        MemberName: userInfo.name || '',
        MemberHp: userInfo.tel_no || '',
        EmailId: emailId,
        EmailDomain: emailDomain,
        IsSmsReceive: userInfo.sms_agree_flag === 'Y' ? '1' : '0',
        IsEmailReceive: userInfo.email_agree_flag === 'Y' ? '1' : '0',
        MemberSex: userInfo.gender || '',
        IsMarried: userInfo.marriage_status || '0',
        IsChild: userInfo.child_status || '0',
        Zip: userInfo.zipCode || '',
        Address: userInfo.address || '',
        AddressJiBun: userInfo.addressJiBun || '',
        AddrDetail: userInfo.addressDetail || '',
        // 전화번호 파싱 (있는 경우)
        phone1: userInfo.phone?.split('-')[0] || '',
        phone2: userInfo.phone?.split('-')[1] || '',
        phone3: userInfo.phone?.split('-')[2] || '',
        // 생년월일 파싱 (있는 경우)
        BirthYear: userInfo.birth_date?.substring(0, 4) || '',
        BirthMonth: userInfo.birth_date?.substring(5, 7) || '',
        BirthDate: userInfo.birth_date?.substring(8, 10) || '',
        selectEmailDomain: ''
      });
    }
  }, [userInfo]);

  // 비밀번호 변경 팝업 열기
  const openPasswordPopup = () => {
    setIsPasswordPopupOpen(true);
    // 비밀번호 상태 초기화
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordErrors({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    });
  };
  
  // 비밀번호 변경 팝업 닫기
  const closePasswordPopup = () => {
    setIsPasswordPopupOpen(false);
  };
  
  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // 실시간 유효성 검사
    if (name === 'newPassword') {
      if (value.length < 8) {
        setPasswordErrors({
          ...passwordErrors,
          newPassword: '비밀번호는 8자 이상이어야 합니다.'
        });
      } else if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value) || !/[^a-zA-Z0-9]/.test(value)) {
        setPasswordErrors({
          ...passwordErrors,
          newPassword: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.'
        });
      } else {
        setPasswordErrors({
          ...passwordErrors,
          newPassword: ''
        });
      }
    } else if (name === 'confirmPassword') {
      if (value !== passwordData.newPassword) {
        setPasswordErrors({
          ...passwordErrors,
          confirmPassword: '비밀번호가 일치하지 않습니다.'
        });
      } else {
        setPasswordErrors({
          ...passwordErrors,
          confirmPassword: ''
        });
      }
    }
  };
  
  // 비밀번호 변경 제출 핸들러
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    let isValid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      general: ''
    };
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = '현재 비밀번호를 입력해주세요.';
      isValid = false;
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = '새 비밀번호를 입력해주세요.';
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
      isValid = false;
    } else if (!/[a-zA-Z]/.test(passwordData.newPassword) || 
               !/[0-9]/.test(passwordData.newPassword) || 
               !/[^a-zA-Z0-9]/.test(passwordData.newPassword)) {
      newErrors.newPassword = '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.';
      isValid = false;
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
      isValid = false;
    } else if (passwordData.confirmPassword !== passwordData.newPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }
    
    setPasswordErrors(newErrors);
    
    if (isValid) {
      try {
        // authStore의 changePassword 함수 호출
        const result = await changePassword(
          passwordData.currentPassword,
          passwordData.newPassword
        );
        
        if (result.success) {
          setAlertMessage(result.message || '비밀번호가 성공적으로 변경되었습니다.');
          setShowAlert(true);
          closePasswordPopup();
        } else {
          setPasswordErrors({
            ...passwordErrors,
            general: result.message || '비밀번호 변경에 실패했습니다.'
          });
        }
      } catch (err) {
        console.error('비밀번호 변경 오류:', err);
        setPasswordErrors({
          ...passwordErrors,
          general: '비밀번호 변경 중 오류가 발생했습니다.'
        });
      }
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setConfirmMessage('회원정보를 수정하시겠습니까?');
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirm(false);
    
    // 폼 제출 전 최종 검증 및 데이터 가공
    const fullEmail = `${formData.EmailId}@${formData.EmailDomain}`;
    
    // API 전송용 데이터 준비
    const updateData = {
      tel_no: formData.MemberHp,
      mail_addr: fullEmail,
      sms_agree_flag: formData.IsSmsReceive === '1' ? 'Y' : 'N',
      email_agree_flag: formData.IsEmailReceive === '1' ? 'Y' : 'N',
      gender: formData.MemberSex,
      marriage_status: formData.IsMarried,
      child_status: formData.IsChild,
      zipCode: formData.Zip,
      address: formData.Address,
      addressJiBun: formData.AddressJiBun,
      addressDetail: formData.AddrDetail,
      birth_date: formData.BirthYear && formData.BirthMonth && formData.BirthDate 
        ? `${formData.BirthYear}-${formData.BirthMonth}-${formData.BirthDate}` 
        : null
    };

    // 전화번호가 모두 입력된 경우에만 포함
    if (formData.phone1 && formData.phone2 && formData.phone3) {
      updateData.phone = `${formData.phone1}-${formData.phone2}-${formData.phone3}`;
    }

    try {
      const result = await updateUserInfo(updateData);
      
      if (result.success) {
        setAlertMessage(result.message);
        setShowAlert(true);
      } else {
        setAlertMessage(result.message || '회원정보 수정 중 오류가 발생했습니다.');
        setShowAlert(true);
      }
    } catch (err) {
      console.error('회원정보 수정 오류:', err);
      setAlertMessage('회원정보 수정 중 오류가 발생했습니다.');
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
    <div className="contents_wrap" style={{ backgroundColor: '#fff', paddingTop: '0px', marginTop: '40px'}}>
      <div className="cont_wrap">

        <form name="regsiterFrm" id="regsiterFrm" onSubmit={handleSubmit}>
          <div className="form_wrap">
            <div className="form_tit">필수항목</div>
            <div className="form_bd">
              <ul>
                <li>아이디</li>
                <li>
                  {formData.MemberId}
                </li>
              </ul>
              <ul>
                <li>비밀번호 변경</li>
                <li>
                  <button type="button" className="hgbtn blue02" onClick={openPasswordPopup}>비밀번호 변경</button>
                </li>
              </ul>
              <ul>
                <li>이름</li>
                <li>
                  {formData.MemberName}
                </li>
              </ul>
              <ul>
                <li>휴대폰</li>
                <li>
                  <input name="MemberHp" type="text" style={{ width: '200px' }} value={formData.MemberHp} onChange={handleChange} />
                  <button type="button" style={{ marginLeft: '10px' }} className="hgbtn blue02" >인증하기</button>
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
              구매제품정보<br />
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
              추가항목<br />
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
            <div onClick={handleSubmit}>수정하기</div>
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
      
      {/* 비밀번호 변경 팝업 */}
      <Popup isOpen={isPasswordPopupOpen} onClose={closePasswordPopup}>
        <PasswordChangePopup>
          <div className="pop-title">비밀번호 변경</div>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.currentPassword && (
                <div className="error-message">{passwordErrors.currentPassword}</div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.newPassword && (
                <div className="error-message">{passwordErrors.newPassword}</div>
              )}
              <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                * 영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.
              </small>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
              {passwordErrors.confirmPassword && (
                <div className="error-message">{passwordErrors.confirmPassword}</div>
              )}
            </div>
            
            {passwordErrors.general && (
              <div className="error-message" style={{ marginBottom: '15px' }}>{passwordErrors.general}</div>
            )}
            
            <div className="btn-group">
              <button type="button" className="btn btn-cancel" onClick={closePasswordPopup}>취소</button>
              <button type="submit" className="btn btn-submit">변경하기</button>
            </div>
          </form>
        </PasswordChangePopup>
      </Popup>
    </div>
  );
};

export default UserInfo;
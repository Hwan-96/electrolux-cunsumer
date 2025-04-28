import PathNav from '@/components/common/PathNav';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DaumPost from '../../common/popup/DaumPost';
import { useState, useEffect } from 'react';
import useAuthStore from '@/stores/authStore';
import { DatePicker, ConfigProvider } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const AddInfoTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const SmsRadio = styled.div`
  height: 30px;
  line-height: 30px;
  margin-top: 7px;

  span{
    font-weight: bold;
    color: #000;
    letter-spacing: 0px;
  }
  input[type=radio] {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 3px;
    margin-left: 20px;
  }
`;

const SmsInfo = styled.div`
  border: solid 1px #e1e1e1;
  border-radius: 5px;
  background-color: #f9f9f9;
  padding: 10px 20px 20px 20px;
  margin-top: 10px;

  .bd{
    display: inline-table;
    width: 100%;
    padding: 10px 0 0 0;

    dt{
      display: table-cell;

      &:first-child{
        width: 140px;
      }

      &.t01{
        font-weight: bold;
      }
    }
  }

  .ip{
    padding-top: 10px;
    color: #1c3fb7;
  }
`;

// DatePicker에 커스텀 스타일 적용
const StyledDatePicker = styled(DatePicker)`
  &.ant-picker {
    width: 200px;
    height: 36px;
    border-radius: 5px;
    border: 1px solid #dcdcdc;
    
    .ant-picker-input > input {
      font-size: 14px;
    }
    
    &:hover, &:focus, &.ant-picker-focused {
      border-color: #1a2753;
    }
  }
`;

const UserInfo = () => {
  const { userInfo } = useAuthStore();
  const [address, setAddress] = useState({
    zipCode: '',
    address: '',
    addressDetail: ''
  });
  
  // 이메일 상태 관리
  const [email, setEmail] = useState({
    id: '',
    domain: ''
  });
  
  // 연락처 상태 관리
  const [phone, setPhone] = useState('');
  
  // SMS 수신동의 상태 관리
  const [smsAgree, setSmsAgree] = useState('1');
  
  // 이메일 수신동의 상태 관리
  const [emailAgree, setEmailAgree] = useState('1');
  
  // 생년월일 상태 관리
  const [birthDate, setBirthDate] = useState(null);
  
  // 성별 상태 관리
  const [gender, setGender] = useState('M');
  
  // 결혼유무 상태 관리
  const [marriageStatus, setMarriageStatus] = useState('0');
  
  // 자녀유무 상태 관리
  const [childStatus, setChildStatus] = useState('0');

  // 사용자 정보 초기화
  useEffect(() => {
    if (userInfo) {
      // 이메일 파싱
      if (userInfo.mail_addr) {
        const [emailId, emailDomain] = userInfo.mail_addr.split('@');
        setEmail({
          id: emailId || '',
          domain: emailDomain || ''
        });
      }
      
      // 전화번호 설정
      setPhone(userInfo.tel_no || '');
      
      // SMS 수신동의 설정
      setSmsAgree(userInfo.sms_agree_flag === 'Y' ? '1' : '0');
      
      // 이메일 수신동의 설정
      setEmailAgree(userInfo.email_agree_flag === 'Y' ? '1' : '0');
      
      // 생년월일 설정
      if (userInfo.birth_date) {
        setBirthDate(dayjs(userInfo.birth_date));
      }
      
      // 성별 설정
      if (userInfo.gender) {
        setGender(userInfo.gender);
      }
      
      // 결혼유무 설정
      if (userInfo.marriage_status) {
        setMarriageStatus(userInfo.marriage_status);
      }
      
      // 자녀유무 설정
      if (userInfo.child_status) {
        setChildStatus(userInfo.child_status);
      }
      
      // 주소 설정
      if (userInfo.address) {
        setAddress({
          zipCode: userInfo.zipCode || '',
          address: userInfo.address || '',
          addressDetail: userInfo.addressDetail || ''
        });
      }
    }
  }, [userInfo]);

  // 이메일 도메인 옵션
  const emailDomains = [
    { value: '', label: '직접입력' },
    { value: 'gmail.com', label: 'gmail.com' },
    { value: 'naver.com', label: 'naver.com' },
    { value: 'daum.net', label: 'daum.net' },
    { value: 'hanmail.net', label: 'hanmail.net' },
    { value: 'nate.com', label: 'nate.com' }
  ];
  
  // 이메일 도메인 변경 핸들러
  const handleEmailDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setEmail({...email, domain: selectedDomain});
  };
  
  // SMS 수신동의 변경 핸들러
  const handleSmsAgreeChange = (e) => {
    setSmsAgree(e.target.value);
  };
  
  // 이메일 수신동의 변경 핸들러
  const handleEmailAgreeChange = (e) => {
    setEmailAgree(e.target.value);
  };
  
  // 생년월일 변경 핸들러
  const handleBirthDateChange = (date) => {
    setBirthDate(date);
  };
  
  // 성별 변경 핸들러
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  
  // 결혼유무 변경 핸들러
  const handleMarriageStatusChange = (e) => {
    setMarriageStatus(e.target.value);
  };
  
  // 자녀유무 변경 핸들러
  const handleChildStatusChange = (e) => {
    setChildStatus(e.target.value);
  };

  return (
    <div id="sub-container">
      <PathNav prevPage="Home" currentPage="마이페이지" lastPage="회원정보수정" />
      <div id="contents">
        <article className="sub-article">
          <div className="link-tab mb0">
            <ul>
              <li className="on"><Link to="/mem/cs">회원정보수정</Link></li>
              <li><Link to="/mem/prd">구매제품정보</Link></li>
            </ul>
          </div>

          <form className="form">
            <table className="type1 write1 bdtn qna-write1">
              <tbody>
                <tr>
                  <th className="w1"><label htmlFor="uname" className="lb1">아이디</label></th>
                  <td className="w2">
                    {userInfo?.id || 'admin'}
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="uname" className="lb1">비밀번호</label></th>
                  <td className="w2">
                    <button type="button" className="hgbtn blue02">비밀번호 변경</button>
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="uname" className="lb1">이름</label></th>
                  <td className="w2">
                    {userInfo?.name || '김윤환'}
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="uname" className="lb1">휴대폰</label></th>
                  <td className="w2">
                    <input 
                      type="tel" 
                      name="uphone1" 
                      id="uphone1" 
                      className="ip01" 
                      style={{ width: '60%' }} 
                      title="휴대폰" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <button type="button" className="hgbtn blue02">인증번호 발송</button>

                    <SmsRadio>
                      <span>SMS 수신동의</span>
                      <label><input name="IsSmsReceive" type="radio" value="1" checked={smsAgree === '1'} onChange={handleSmsAgreeChange}/>동의함</label>
                      <label><input name="IsSmsReceive" type="radio" value="0" checked={smsAgree === '0'} onChange={handleSmsAgreeChange}/>동의안함</label>
                    </SmsRadio>

                    <SmsInfo>
                      <div className="bd">
                        <dt className="t01">수집 및 이용항목</dt>
                        <dt>휴대폰번호</dt>
                      </div>
                      <div className="bd">
                        <dt className="t01">이용목적</dt>
                        <dt>비밀번호 분실 시 임시비빌번호발송, 1:1상담답변, 기타문의사항답변, 이벤트알림, 마케팅활용</dt>
                      </div>
                      <div className="ip">※ 임시비밀번호 발송 등 서비스 이용과 관련된 중요한 사항은 동의 여부와 관계없이 발송됩니다.</div>
                    </SmsInfo>
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
                          value={email.id}
                          onChange={(e) => setEmail({...email, id: e.target.value})}
                        />
                      </li>
                      <li>@</li>
                      <li className="ip2">
                        <input 
                          type="text" 
                          name="uemail2" 
                          id="uemail2" 
                          className="ip01"
                          value={email.domain}
                          onChange={(e) => setEmail({...email, domain: e.target.value})}
                          readOnly={!!document.getElementById('uemail2_sel')?.value}
                        />
                      </li>
                      <li className="ip3">
                        <select 
                          name="uemail2_sel" 
                          id="uemail2_sel" 
                          className="sel01"
                          onChange={handleEmailDomainChange}
                          value={email.domain}
                        >
                          {emailDomains.map((domain, index) => (
                            <option key={index} value={domain.value}>{domain.label}</option>
                          ))}
                        </select>
                      </li>
                    </ul>

                    <SmsRadio>
                      <span>메일 수신동의</span>
                      <label><input name="IsEmailReceive" type="radio" value="1" checked={emailAgree === '1'} onChange={handleEmailAgreeChange}/>동의함</label>
                      <label><input name="IsEmailReceive" type="radio" value="0" checked={emailAgree === '0'} onChange={handleEmailAgreeChange}/>동의안함</label>
                    </SmsRadio>

                    <SmsInfo>
                      <div className="bd">
                        <dt className="t01">수집 및 이용항목</dt>
                        <dt>이메일주소</dt>
                      </div>
                      <div className="bd">
                        <dt className="t01">이용목적</dt>
                        <dt>신규/개편 서비스 안내, 이벤트알림, 마케팅활용</dt>
                      </div>
                      <div className="ip">※ 개인정보 이용 내역 및 서비스 이용과 관련된 중요한 사항은 동의 여부와 관계없이 발송됩니다.</div>
                    </SmsInfo>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <AddInfoTitle>추가정보</AddInfoTitle>

          <form className="form" style={{ borderTop: '1px solid #dcdcdc' }}>
            <table className="type1 write1 bdtn qna-write1">
              <tbody>
                <tr>
                  <th className="w1"><label htmlFor="birthDate" className="lb1">생년월일</label></th>
                  <td className="w2">
                    <ConfigProvider locale={ko_KR}>
                      <StyledDatePicker
                        id="birthDate"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                        placeholder="생년월일을 선택하세요"
                        format="YYYY-MM-DD"
                        disabledDate={(current) => {
                          return current && current > dayjs().subtract(0, 'year');
                        }}
                      />
                    </ConfigProvider>
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="gender" className="lb1">성별</label></th>
                  <td className="w2" style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <input 
                        type="radio" 
                        name="gender" 
                        id="gender-male" 
                        value="M"
                        checked={gender === 'M'} 
                        onChange={handleGenderChange}
                      />
                      남자
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="gender" 
                        id="gender-female" 
                        value="F"
                        checked={gender === 'F'}
                        onChange={handleGenderChange}
                      />
                      여자
                    </label>
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="address" className="lb1">주소</label></th>
                  <td className="w2">
                    <div style={{ marginBottom: '10px' }}>
                      <input 
                        type="text" 
                        name="zipCode" 
                        value={address.zipCode} 
                        readOnly 
                        style={{ width: '100px', marginRight: '5px' }}
                        className="ip01"
                      />
                      <DaumPost setAddress={setAddress} buttonText="주소 검색" buttonId="address-search-button"/>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <input 
                        type="text" 
                        name="address" 
                        value={address.address} 
                        readOnly 
                        style={{ width: '100%' }}
                        className="ip01"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        name="addressDetail" 
                        value={address.addressDetail}
                        onChange={(e) => setAddress({...address, addressDetail: e.target.value})}
                        placeholder="상세주소"
                        style={{ width: '100%' }}
                        className="ip01"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="w1"><label htmlFor="homePhone" className="lb1">주소지 전화번호</label></th>
                  <td className="w2">
                    <input 
                      type="tel" 
                      name="homePhone" 
                      id="homePhone" 
                      className="ip01" 
                      style={{ width: '60%' }} 
                      title="주소지 전화번호" 
                      value={userInfo?.phone || ''}
                    />
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="marriage" className="lb1">결혼유무</label></th>
                  <td className="w2" style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <input 
                        type="radio" 
                        name="marriage" 
                        id="marriage-yes" 
                        value="1"
                        checked={marriageStatus === '1'} 
                        onChange={handleMarriageStatusChange}
                      />
                      기혼
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="marriage" 
                        id="marriage-no" 
                        value="0"
                        checked={marriageStatus === '0'} 
                        onChange={handleMarriageStatusChange}
                      />
                      미혼
                    </label>
                  </td>
                </tr>
                <tr>
                  <th><label htmlFor="child" className="lb1">자녀유무</label></th>
                  <td className="w2" style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <input 
                        type="radio" 
                        name="child" 
                        id="child-yes" 
                        value="1"
                        checked={childStatus === '1'} 
                        onChange={handleChildStatusChange}
                      />
                      있음
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="child" 
                        id="child-no" 
                        value="0"
                        checked={childStatus === '0'} 
                        onChange={handleChildStatusChange}
                      />
                      없음
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div style={{ textAlign: 'center', margin: '30px 0' }}>
              <button type="submit" className="hgbtn blue02">정보 수정</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  );
};

export default UserInfo;

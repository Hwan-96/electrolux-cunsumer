import React, { useState } from 'react'
import SubTitleBox from '@/components/common/SubTitleBox'
import DaumPost from '@/components/common/popup/DaumPost'
import { DatePicker, Input, Select, Radio, Checkbox, Space } from 'antd'
import locale from 'antd/locale/ko_KR'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import styled from 'styled-components'
import QuillEditor from '@/components/admin/common/QuillEditor'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    width: 150px;
    padding: 12px;
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    text-align: left;
  }
  
  td {
    padding: 12px;
    border: 1px solid #d9d9d9;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 220px;
`;

const StyledNotice = styled.div`
  margin-top: 5px;
  color: #666;
  font-size: 12px;
`;

const Install = () => {
  // 구매자 정보 상태
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    tel1: '',
    tel2: '',
    tel3: ''
  });

  // 설치대상자 정보 상태
  const [installInfo, setInstallInfo] = useState({
    name: '',
    tel1: '',
    tel2: '',
    tel3: ''
  });

  // 주소 정보 상태
  const [addressInfo, setAddressInfo] = useState({
    zipCode: '',
    address: '',
    detailAddress: ''
  });

  // 구입일 상태
  const [purchaseDate, setPurchaseDate] = useState(null);
  // 설치희망일 상태
  const [installDate, setInstallDate] = useState(null);

  // 요청사항 상태
  const [requestContent, setRequestContent] = useState('');

  // 구매자 정보 변경 핸들러
  const handleBuyerChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 설치대상자 정보 변경 핸들러
  const handleInstallChange = (e) => {
    const { name, value } = e.target;
    setInstallInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 상세주소 변경 핸들러
  const handleDetailAddressChange = (e) => {
    setAddressInfo(prev => ({
      ...prev,
      detailAddress: e.target.value
    }));
  };

  // 주소 검색 완료 핸들러
  const handleAddressComplete = (data) => {
    setAddressInfo({
      zipCode: data.zipCode,
      address: data.address,
      detailAddress: addressInfo.detailAddress // 기존 상세주소 유지
    });
  };

  // 구입일 변경 핸들러
  const handlePurchaseDateChange = (date) => {
    setPurchaseDate(date);
  };

  // 설치희망일 변경 핸들러
  const handleInstallDateChange = (date) => {
    setInstallDate(date);
  };

  // 설치희망일 비활성화 함수 (접수일 기준 4일 이내 날짜 비활성화)
  const disabledInstallDate = (current) => {
    const today = dayjs();
    const fourDaysLater = today.add(4, 'day');
    return current && current < fourDaysLater;
  };

  // 구매자와 동일 체크박스 핸들러
  const handleSameAsBuyer = (field) => (e) => {
    if (e.target.checked) {
      if (field === 'name') {
        setInstallInfo(prev => ({
          ...prev,
          name: buyerInfo.name
        }));
      } else if (field === 'tel') {
        setInstallInfo(prev => ({
          ...prev,
          tel1: buyerInfo.tel1,
          tel2: buyerInfo.tel2,
          tel3: buyerInfo.tel3
        }));
      }
    } else {
      // 체크박스 해제 시 해당 필드 값 초기화
      if (field === 'name') {
        setInstallInfo(prev => ({
          ...prev,
          name: ''
        }));
      } else if (field === 'tel') {
        setInstallInfo(prev => ({
          ...prev,
          tel1: '',
          tel2: '',
          tel3: ''
        }));
      }
    }
  };

  // 구매처 옵션
  const storeOptions = [
    { value: '코스트코 김해점', label: '코스트코 김해점' },
    { value: '코스트코 고척점', label: '코스트코 고척점' },
    { value: '코스트코 공세점', label: '코스트코 공세점' },
    { value: '코스트코 광명점', label: '코스트코 광명점' },
    { value: '코스트코 대구점', label: '코스트코 대구점' },
    { value: '코스트코 대구혁신도시점', label: '코스트코 대구혁신도시점' },
    { value: '코스트코 대전점', label: '코스트코 대전점' },
    { value: '코스트코 부산점', label: '코스트코 부산점' },
    { value: '코스트코 상봉점', label: '코스트코 상봉점' },
    { value: '코스트코 세종점', label: '코스트코 세종점' },
    { value: '코스트코 송도점', label: '코스트코 송도점' },
    { value: '코스트코 양재점', label: '코스트코 양재점' },
    { value: '코스트코 양평점', label: '코스트코 양평점' },
    { value: '코스트코 울산점', label: '코스트코 울산점' },
    { value: '코스트코 의정부점', label: '코스트코 의정부점' },
    { value: '코스트코 일산점', label: '코스트코 일산점' },
    { value: '코스트코 천안점', label: '코스트코 천안점' },
    { value: '코스트코 하남점', label: '코스트코 하남점' },
    { value: '코스트코 청라점', label: '코스트코 청라점' },
    { value: '코스트코 온라인몰', label: '코스트코 온라인몰' }
  ];

  // 모델 옵션
  const modelOptions = [
    { value: 'CIV63344', label: 'CIV63344' },
    { value: 'EIF61343', label: 'EIF61343' },
    { value: 'LIV63334', label: 'LIV63334' }
  ];

  return (
    <div id="sub-container">
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="코스트코 구매 고객 설치 접수"
            description={["본 설치 접수페이지는 코스트코에서 제품을 구매하신 고객만 접수 가능합니다.",
            <br key="br" />,
            "코스트코 외 판매처에서 제품을 구매하신 고객은 고객센터(1566-1238) 또는 구매처로 문의해 주시기 바랍니다."
            ]}
          />

          <form method="post" name="form_install" id="form_install">
            <input type="hidden" name="mode" value="insert" />

            <StyledTable>
              <colgroup>
                <col style={{width: '150px'}} />
                <col style={{width: '80%'}} />
              </colgroup>

              <tbody>
                <tr>
                  <th><StyledLabel htmlFor="buy_name">구매자명</StyledLabel></th>
                  <td>
                    <Input
                      id="buy_name"
                      name="name"
                      value={buyerInfo.name}
                      onChange={handleBuyerChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="buy_tel1">구매자 연락처</StyledLabel></th>
                  <td>
                    <Space>
                      <Input
                        id="buy_tel1"
                        name="tel1"
                        value={buyerInfo.tel1}
                        onChange={handleBuyerChange}
                        maxLength={3}
                      />
                      -
                      <Input
                        id="buy_tel2"
                        name="tel2"
                        value={buyerInfo.tel2}
                        onChange={handleBuyerChange}
                        maxLength={4}
                      />
                      -
                      <Input
                        id="buy_tel3"
                        name="tel3"
                        value={buyerInfo.tel3}
                        onChange={handleBuyerChange}
                        maxLength={4}
                      />
                    </Space>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="ins_name">설치대상자명</StyledLabel></th>
                  <td>
                    <Space>
                      <Input
                        id="ins_name"
                        name="name"
                        value={installInfo.name}
                        onChange={handleInstallChange}
                      />
                      <Checkbox onChange={handleSameAsBuyer('name')}>구매자와 동일</Checkbox>
                    </Space>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="ins_tel1">설치대상자 연락처</StyledLabel></th>
                  <td>
                    <Space>
                      <Input
                        id="ins_tel1"
                        name="tel1"
                        value={installInfo.tel1}
                        onChange={handleInstallChange}
                        maxLength={3}
                      />
                      -
                      <Input
                        id="ins_tel2"
                        name="tel2"
                        value={installInfo.tel2}
                        onChange={handleInstallChange}
                        maxLength={4}
                      />
                      -
                      <Input
                        id="ins_tel3"
                        name="tel3"
                        value={installInfo.tel3}
                        onChange={handleInstallChange}
                        maxLength={4}
                      />
                      <Checkbox onChange={handleSameAsBuyer('tel')}>구매자와 동일</Checkbox>
                    </Space>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="ins_post">설치장소 주소</StyledLabel></th>
                  <td>
                    <Input
                      id="ins_post"
                      name="ins_post"
                      value={addressInfo.zipCode}
                      readOnly
                      onClick={() => document.getElementById('daumPostButton').click()}
                      style={{marginBottom: '10px'}}
                    />
                    <Input
                      id="ins_addr"
                      name="ins_addr"
                      value={addressInfo.address}
                      readOnly
                      onClick={() => document.getElementById('daumPostButton').click()}
                      style={{marginBottom: '10px'}}
                    />
                    <Input
                      id="ins_addr_detail"
                      name="ins_addr_detail"
                      value={addressInfo.detailAddress}
                      onChange={handleDetailAddressChange}
                      maxLength={100}
                    />
                    <div style={{display: 'none'}}>
                      <DaumPost setAddress={handleAddressComplete} buttonText="주소 검색" buttonId="daumPostButton" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="store">구매처</StyledLabel></th>
                  <td>
                    <Select
                      id="store"
                      name="store"
                      options={storeOptions}
                      placeholder="선택"
                      style={{width: '100%'}}
                    />
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="buydate">구입일</StyledLabel></th>
                  <td>
                    <DatePicker
                      id="buydate"
                      name="buydate"
                      value={purchaseDate}
                      onChange={handlePurchaseDateChange}
                      locale={locale}
                      placeholder="선택"
                      format="YYYY-MM-DD"
                    />
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="product_model">모델</StyledLabel></th>
                  <td>
                    <Select
                      id="product_model"
                      name="product_model"
                      options={modelOptions}
                      placeholder="선택"
                      defaultValue="CIV63344"
                      style={{width: '100%'}}
                    />
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="ins_date">설치희망일</StyledLabel></th>
                  <td>
                    <DatePicker
                      id="ins_date"
                      name="ins_date"
                      value={installDate}
                      onChange={handleInstallDateChange}
                      locale={locale}
                      placeholder="선택"
                      format="YYYY-MM-DD"
                      disabledDate={disabledInstallDate}
                    />
                    <StyledNotice>
                      ※ 접수일 기준 4일 이후부터 선택 가능 &gt;&gt; "(영업일 기준) 4일 이내 해피콜 진행 시 설치일 최종 확정하시면 됩니다"
                    </StyledNotice>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="ins_type">주방 형태</StyledLabel></th>
                  <td>
                    <Radio.Group name="ins_type" defaultValue="빌트인">
                      <Space direction="horizontal">
                        <Radio value="빌트인">
                          빌트인
                          <StyledImage src="/install/type_builtin.png" alt="빌트인" />
                        </Radio>
                        <Radio value="스탠드형">
                          스탠드형
                          <StyledImage src="/install/type_stand.png" alt="스탠드형" />
                        </Radio>
                        <Radio value="일체형 오븐">
                          일체형 오븐
                          <StyledImage src="/install/type_one.png" alt="일체형 오븐" />
                        </Radio>
                        <Radio value="하단 그릴">
                          하단 그릴
                          <StyledImage src="/install/type_grill.png" alt="하단 그릴" />
                        </Radio>
                      </Space>
                      <Radio value="사진 외 기타 형태">
                        사진 외 기타 형태
                        <span style={{color: '#FF0000'}}> ( 상기 형태에 해당되지 않는 경우 )</span>
                      </Radio>
                    </Radio.Group>
                  </td>
                </tr>
                <tr>
                  <th><StyledLabel htmlFor="contents">요청사항</StyledLabel></th>
                  <td>
                    <QuillEditor
                      id="contents"
                      name="contents"
                      value={requestContent}
                      onChange={(value) => setRequestContent(value)}
                      height="200px"
                      editorHeight="150px"
                    />
                  </td>
                </tr>
              </tbody>
            </StyledTable>
            <br />

            <div className="agrbox">
              <p className="tit1">개인정보의 수집 및 이용에 대한 안내</p>
              <div className="txt1">
                ■ 수집 항목 : 이름, 주소, 전화번호 (문의에 대한 답변 시 사용)<br />   
                ■ 수집 목적 : 설치 접수 및 결과 회신<br/>
                ■ 수집 기간 : 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에 해당 정보를 파기합니다.<br/>
                <br />
                ※ 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 동안 개인정보를 보관할 수 있습니다<br />
                <br />
                - 소비자의 불만 또는 분쟁처리에 관한 기록 : 5년 (전자상거래등에서의 소비자보호에 관한 법률)<br />
                - 위의 개인정보 수집 및 이용에 동의합니다.(동의 후 접수가 가능합니다)<br />
                - 또한, 수집된 개인정보는 설치를 위해 제3자(설치업체)에게 제공될 수 있으며, 이용목적이 달성된 이후 해당 정보는 파기됩니다.<br/>
                <br/><br/>
                <center>위의 개인정보 수집 및 이용에 동의합니다. (동의 후 접수가 가능합니다)</center>
              </div>

              <div className="agrcheck">
                <Radio.Group name="agree" defaultValue="Y">
                  <Radio value="Y">동의함</Radio>
                  <Radio value="N">동의안함</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="btn-area1 ta-btm">
              <button type="button" className="hgbtn blue02" onClick={() => {}}>등록</button>
              <button type="button" className="hgbtn grey01" onClick={() => window.location.reload()} style={{marginLeft: '5px'}}>취소</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  )
}

export default Install
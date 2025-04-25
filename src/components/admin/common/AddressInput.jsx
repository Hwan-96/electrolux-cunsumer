import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import DaumPost from '@/components/common/popup/DaumPost';

const AddressWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const AddressField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ZipCodeInput = styled(Input)`
  width: 100px;
`;

const AddressContainer = styled.div`
  width: 100%;
  position: relative;
`;

const AddressInputField = styled(Input)`
  cursor: pointer;
  background-color: #fafafa;
`;

const AddressInput = ({ 
  zipCode, 
  address, 
  addressDetail, 
  onAddressChange, 
  onAddressDetailChange,
  zipCodePlaceholder = "우편번호",
  addressPlaceholder = "주소",
  detailPlaceholder = "상세주소를 입력하세요"
}) => {

  const handleAddressSelect = (addressData) => {
    onAddressChange(addressData);
  };

  // 주소 인풋 클릭 이벤트 핸들러
  const handleAddressInputClick = () => {
    // 주소 검색 버튼 클릭 효과와 동일하게 작동
    document.querySelector('#daumPostButton').click();
  };

  return (
    <AddressWrapper>
      <AddressField>
        <ZipCodeInput 
          value={zipCode}
          disabled
          placeholder={zipCodePlaceholder}
        />
        <DaumPost 
          setAddress={handleAddressSelect} 
          buttonText="주소 검색"
          buttonId="daumPostButton"
        />
      </AddressField>
      
      <AddressContainer>
        <AddressInputField 
          value={address}
          placeholder={addressPlaceholder}
          readOnly
          onClick={handleAddressInputClick}
        />
      </AddressContainer>
      
      <Input 
        value={addressDetail}
        onChange={(e) => onAddressDetailChange(e.target.value)}
        placeholder={detailPlaceholder}
      />
    </AddressWrapper>
  );
};

export default AddressInput; 
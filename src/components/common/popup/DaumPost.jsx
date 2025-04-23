import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';

const Button = styled.button`
  display: inline-table;
  min-width: 100px;
  height: 36px;
  background-color: #1a2753;
  color: #fff;
  padding: 0 15px 0 15px;
  font-size: 14px;
  letter-spacing: 0px;
  border-radius: 3px;
  margin-left: 5px;
  cursor: pointer;
  border: none;
`;

const DaumPost = ({ setAddress, buttonText = "주소 검색" }) => {
  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress = fullAddress.replace(localAddress, '');
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setAddress({
      zipCode: data.zonecode,
      address: fullAddress,
      jibunAddress: data.jibunAddress
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return <Button type="button" onClick={handleClick}>{buttonText}</Button>;
};

export default DaumPost;
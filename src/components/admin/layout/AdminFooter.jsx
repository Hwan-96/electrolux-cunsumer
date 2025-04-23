import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding-left: 260px;
  padding-right: 40px;
  background-color: #5e5e5e;
  p{
    font-size: 16px;
    text-align: center;
    color: #fff;
  }
`;

const AdminFooter = () => {
  return (
    <FooterContainer>
      <p>Copyright ⓒ by Electrolux Korea. All Rights Reserved.</p>
    </FooterContainer>
  );
};

export default AdminFooter;

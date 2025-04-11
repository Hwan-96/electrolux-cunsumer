import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  background-color: #192452;
  color: #FFFFFF;
  font-size: 14px;
  padding: 15px;
`;

const PopupTitle = ({ children }) => {
  return (
    <TitleContainer>
      {children}
    </TitleContainer>
  );
};

export default PopupTitle;

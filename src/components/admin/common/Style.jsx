import styled from 'styled-components';

export const ColumnLink = styled.a`
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
  position: relative;
  &:before{
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    background-color: #1890ff;
    bottom: 0;
    left: 0;
    transition: width 0.3s;
  }

  &:hover {
    &:before{
      width: 100%;
    }
  }
`;
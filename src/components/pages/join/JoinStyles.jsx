import styled from 'styled-components';

export const Inbox = styled.div`
  width: 100%;
  height: 120px;
  background: url(../../../join/bg_join_top.jpg) no-repeat top center;
  text-align: center;
  font-size: 22px;
  color: #fff;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Top = styled.div`
  width: 1000px;
  margin: 0 auto;
  position: relative;
  margin-top: 20px;
  
  ul{
    &:first-child{
      font-size: 26px;
      letter-spacing: -2px;
      padding-bottom: 15px;
      color: #1a2753;
      text-indent: 10px;
    }
    &:last-child{
      position: absolute;
      bottom: 15px;
      right: 10px;
      opacity: 0.7;
      font-size: 12px;
    }
  }
`;

export const BotBtn = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 5px;

  > div {
    display: inline-table;
    width: 150px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #fff;
    background-color: #1a2753;
    border-radius: 3px;
    letter-spacing: 0px;
    font-size: 16px;
    cursor: pointer;
    &:first-child{
      background-color: #888888;
    }
  }
`;
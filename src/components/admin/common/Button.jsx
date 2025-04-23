import React from 'react';
import { Button, ConfigProvider } from 'antd';
import styled from 'styled-components';

// $btnPosition 형태로 transient prop을 사용하여 DOM 경고 방지
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  ${props => props.$btnPosition === 'top' && `margin-bottom: 10px;`}
`;

export const ButtonGroupLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ButtonGroupRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

// antd 버튼 컴포넌트
export const OrangeButton = ({ children, ...rest }) => (
  <Button
    type="default"
    style={{
      border: '1px solid orange',
      color: 'orange',
      backgroundColor: 'white',
    }}
    {...rest}
  >
    {children}
  </Button>
);

export const CommonButton = ({ children, ...rest }) => (
  <Button
    type="default"
    style={{
      backgroundColor: '#354255',
      color: 'white',
    }}
    {...rest}
  >
    {children}
  </Button>
);

// ConfigProvider를 활용한 초록색 Active 버튼
export const GreenButtonGroup = ({ children, activeKey, onChange }) => {
  const handleClick = (key) => {
    if (onChange) onChange(key);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            // 기본 버튼 스타일 (흰 바탕, 검은 글씨)
            colorBgContainer: '#ffffff', 
            colorText: '#333333',
            colorBorder: '#d9d9d9',
            
            // Active 상태 버튼 스타일 (초록색 바탕, 흰색 글씨)
            colorPrimary: '#1bb134',
            colorPrimaryHover: '#1bb134',
            colorPrimaryActive: '#1bb134',
            colorPrimaryText: '#ffffff',
            colorPrimaryTextHover: '#ffffff',
            colorPrimaryTextActive: '#ffffff',
          },
        },
      }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            type: child.props.value === activeKey ? 'primary' : 'default',
            onClick: () => handleClick(child.props.value),
          });
        })}
      </div>
    </ConfigProvider>
  );
};

// 버튼 개별 컴포넌트
export const GreenButton = ({ children, value, ...rest }) => (
  <Button value={value} {...rest}>
    {children}
  </Button>
);
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown, Modal, Form, Input, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import useAuthStore from '@/stores/authStore';
import useMenuStore from '@/components/admin/store/menuStore';
import { CommonButton } from '@/components/admin/common/Button';

const { Text } = Typography;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1180px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.27);
  z-index: 1000;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding-right: 40px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  min-width: 230px;
  height: inherit;
  overflow: hidden;
`;

const HeaderMiddle = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 230px;
  margin-left: auto;
`;

const HeaderLogo = styled.div`
  min-width: 230px;

  h1{
    text-align: center;

    a{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        max-height: 40px;
      }
    }
  }
`;

const HeaderNav = styled.nav`
  ul{
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 2px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #ebebeb;

    li{
      width: 14%;
      height: 100%;
      margin: 0 2px;
      &.on,
      &:hover{
        a{
          font-weight: bold;
          background-color: #fff;
          box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
        }
      }

      &:first-child,
      &:last-child{
        margin-left: 0;
      }
      
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        color: #464646;
      }
    }
  }
`

const HeaderUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  gap: 10px;

  button{
    width: 100%;
    max-width: 100px;
    height: 40px;
    line-height: 38px;
    text-align: center;
    font-size: 14px;
    padding: 0 5px;
    border-radius: 5px;
    color: #fff;
    border: 1px solid #354255;
    background-color: #354255;
    transition: 0.35s;
    transition-property: box-shadow;

    &:hover{
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

const UserIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StyledDropdown = styled(Dropdown)`
  .ant-dropdown {
    left: 50% !important;
    transform: translateX(-50%);
  }
`;

const AdminHeader = () => {
  const { logout } = useAuthStore();
  const { setSelectedMenu } = useMenuStore();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form] = Form.useForm();

  // 현재 경로에 따라 메뉴 선택
  React.useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/mng/svc')) setSelectedMenu('Service');
    else if (path.startsWith('/mng/stat')) setSelectedMenu('Statistic');
    else if (path.startsWith('/mng/dwn')) setSelectedMenu('Download');
    else if (path.startsWith('/mng/mem')) setSelectedMenu('Member');
    else if (path.startsWith('/mng/ctgr')) setSelectedMenu('Category');
    else if (path.startsWith('/mng/cstmz')) setSelectedMenu('Customize');
    else if (path.startsWith('/mng/evnt')) setSelectedMenu('Event');
  }, [location.pathname, setSelectedMenu]);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const showModal = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleChangePassword = async (values) => {
    try {
      // 여기에 비밀번호 변경 API 호출
      console.log('비밀번호 변경 요청:', values);
      
      if (values.newPassword !== values.confirmPassword) {
        message.error('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
      }
      
      // API 호출 성공 시
      message.success('비밀번호가 성공적으로 변경되었습니다.');
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      message.error('비밀번호 변경에 실패했습니다.');
    }
  };

  const validatePassword = (_, value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!value) {
      return Promise.reject('비밀번호를 입력해주세요.');
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject('비밀번호는 영문, 숫자, 특수기호를 포함하여 8자리 이상이어야 합니다.');
    }
    return Promise.resolve();
  };

  const items = [
    {
      key: '1',
      label: (
        <div onClick={showModal}>
          <LockOutlined /> 비밀번호 변경
        </div>
      ),
    },
  ];

  return (
    <HeaderContainer>
      <HeaderWrap>
        <HeaderLeft>
          <HeaderLogo>
            <h1>
              <Link to="/mng">
                <img src="/admin/header_logo.png" alt="Electrolux 고객센터 관리자센터" />
              </Link>
            </h1>
          </HeaderLogo>
        </HeaderLeft>
        <HeaderMiddle>
          <HeaderNav>
            <ul>
              <li className={location.pathname.startsWith('/mng/svc') ? 'on' : ''}>
                <Link to="/mng/svc/onCns" onClick={() => setSelectedMenu('Service')}>
                  Service
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/stt') ? 'on' : ''}>
                <Link to="/mng/stt/onCnsStt" onClick={() => setSelectedMenu('Statistic')}>
                  Statistic
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/dwn') ? 'on' : ''}>
                <Link to="/mng/dwn/manual" onClick={() => setSelectedMenu('Download')}>
                  Download
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/mem') ? 'on' : ''}>
                <Link to="/mng/mem/list" onClick={() => setSelectedMenu('Member')}>
                  Member
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/ctgr') ? 'on' : ''}>
                <Link to="/mng/ctgr/prd" onClick={() => setSelectedMenu('Category')}>
                  Category
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/cstmz') ? 'on' : ''}>
                <Link to="/mng/cstmz/bnr" onClick={() => setSelectedMenu('Customize')}>
                  Customize
                </Link>
              </li>
              <li className={location.pathname.startsWith('/mng/evnt') ? 'on' : ''}>
                <Link to="/mng/evnt/list" onClick={() => setSelectedMenu('Event')}>
                  Event
                </Link>
              </li>
            </ul>
          </HeaderNav>
        </HeaderMiddle>
        <HeaderRight>
          <HeaderUser>
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              open={dropdownOpen}
              onOpenChange={(flag) => setDropdownOpen(flag)}
              placement="bottom"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              overlayStyle={{ position: 'fixed' }}
            >
              <UserIcon>
                <UserOutlined style={{ fontSize: '20px', color: '#354255' }} />
              </UserIcon>
            </Dropdown>
            <button onClick={handleLogout}>로그아웃</button>
          </HeaderUser>
        </HeaderRight>
      </HeaderWrap>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <KeyOutlined style={{ marginRight: '8px' }} />
            비밀번호 변경
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          name="changePassword"
          onFinish={handleChangePassword}
          layout="vertical"
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="currentPassword"
            label="기존 비밀번호"
            rules={[{ required: true, message: '기존 비밀번호를 입력해주세요.' }]}
          >
            <Input.Password placeholder="기존 비밀번호 입력" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="신규 비밀번호"
            rules={[
              { validator: validatePassword }
            ]}
          >
            <Input.Password placeholder="신규 비밀번호 입력" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="비밀번호 확인"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '비밀번호 확인을 입력해주세요.' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('비밀번호가 일치하지 않습니다.');
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인 입력" />
          </Form.Item>
          
          <Text type="secondary" style={{ display: 'block', marginBottom: '20px' }}>
            비밀번호는 영문, 숫자, 특수기호를 포함하여 8자리 이상으로 구성해주세요.
          </Text>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={handleCancel}>취소</Button>
            <CommonButton type="primary" htmlType="submit">확인</CommonButton>
          </div>
        </Form>
      </Modal>
    </HeaderContainer>
  );
};

export default AdminHeader;

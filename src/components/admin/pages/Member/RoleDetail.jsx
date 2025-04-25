import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Form, Checkbox, Input, Row, Col, Space, message, Divider } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { getMockDataById, updateMockData, addMockData } from '@/components/admin/mock/MOCK_Role';
import useMenuStore from '@/components/admin/store/menuStore';
import styled from 'styled-components';

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const PermissionContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const PermissionCard = styled(Card)`
  margin-bottom: 20px;
`;

const PermissionSection = styled.div`
  margin-bottom: 20px;
  flex: 1;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
`;

const PermissionHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 16px;
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
`;

const PermissionContent = styled.div`
  padding: 16px;
`;

const RoleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const menuStore = useMenuStore();
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({});

  // 초기 데이터 로드
  useEffect(() => {
    if (isNew) {
      // 신규 등록 모드
      const initialPermissions = {};
      Object.keys(menuStore.subMenus).forEach((menuKey) => {
        initialPermissions[menuKey] = { all: false };
        menuStore.subMenus[menuKey].forEach((subMenu) => {
          initialPermissions[menuKey][subMenu.name] = false;
        });
      });
      setPermissions(initialPermissions);
      
      // 신규 등록 시 오늘 날짜를 기본값으로 설정
      const today = new Date().toISOString().split('T')[0];
      form.setFieldsValue({
        createdAt: today
      });
      
      setLoading(false);
    } else {
      // 기존 데이터 수정 모드
      const userData = getMockDataById(parseInt(id));
      if (userData) {
        form.setFieldsValue({
          userId: userData.userId,
          name: userData.name,
          department: userData.department,
          position: userData.position,
          phone: userData.phone,
          createdAt: userData.createdAt
        });
        setPermissions(userData.permissions);
      }
      setLoading(false);
    }
  }, [id, form, isNew, menuStore.subMenus]);

  // 권한 변경 처리
  const handlePermissionChange = (menuKey, subMenuName, checked) => {
    setPermissions(prev => {
      const newPermissions = { ...prev };
      
      if (subMenuName === 'all') {
        // 1depth 메뉴 전체 체크/해제
        newPermissions[menuKey] = { ...newPermissions[menuKey], all: checked };
        
        // 모든 하위 메뉴 체크/해제
        Object.keys(newPermissions[menuKey]).forEach(key => {
          if (key !== 'all') {
            newPermissions[menuKey][key] = checked;
          }
        });
      } else {
        // 개별 하위 메뉴 체크/해제
        newPermissions[menuKey] = { ...newPermissions[menuKey], [subMenuName]: checked };
        
        // 모든 하위 메뉴가 체크되었는지 확인
        const allChecked = Object.keys(newPermissions[menuKey]).every(key => {
          return key === 'all' || newPermissions[menuKey][key];
        });
        
        newPermissions[menuKey].all = allChecked;
      }
      
      return newPermissions;
    });
  };

  // 저장 처리
  const handleSave = () => {
    form.validateFields()
      .then(values => {
        const userData = {
          ...values,
          permissions,
          createdAt: values.createdAt || new Date().toISOString().split('T')[0]
        };

        if (isNew) {
          addMockData(userData);
          message.success('관리자가 등록되었습니다.');
        } else {
          updateMockData(parseInt(id), userData);
          message.success('관리자 정보가 수정되었습니다.');
        }
        
        navigate('/mng/mem/role');
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  // 취소 처리
  const handleCancel = () => {
    navigate('/mng/mem/role');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form form={form} layout="vertical">
        <Card style={{ marginBottom: '20px' }}>
          <CardTitle>기본정보</CardTitle>
          <Descriptions
            bordered column={2}
            labelStyle={{ width: '10%' }}
          >
            <Descriptions.Item label="아이디">
              <Form.Item
                name="userId"
                noStyle
                rules={[{ required: true, message: '아이디를 입력해주세요' }]}
              >
                <Input placeholder="아이디를 입력하세요" disabled={!isNew} />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="이름">
              <Form.Item
                name="name"
                noStyle
                rules={[{ required: true, message: '이름을 입력해주세요' }]}
              >
                <Input placeholder="이름을 입력하세요" />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="소속">
              <Form.Item
                name="department"
                noStyle
              >
                <Input placeholder="소속을 입력하세요" />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="직책">
              <Form.Item
                name="position"
                noStyle
              >
                <Input placeholder="직책을 입력하세요" />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="연락처">
              <Form.Item
                name="phone"
                noStyle
              >
                <Input placeholder="연락처를 입력하세요" />
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label="등록일">
              <Form.Item
                name="createdAt"
                noStyle
                initialValue={new Date().toISOString().split('T')[0]}
              >
                <Input disabled={true} />
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Form>

      <PermissionCard>
        <CardTitle>그룹 권한</CardTitle>
        
        <PermissionContainer>
          {Object.keys(menuStore.subMenus).map(menuKey => (
            <PermissionSection key={menuKey}>
              <PermissionHeader>
                <Checkbox 
                  checked={permissions[menuKey]?.all} 
                  onChange={(e) => handlePermissionChange(menuKey, 'all', e.target.checked)}
                />
                <div>{menuKey}</div>
              </PermissionHeader>
              
              <PermissionContent>
                <Row>
                  {menuStore.subMenus[menuKey].map(subMenu => (
                    <Col span={24} key={subMenu.name} style={{ marginBottom: '8px' }}>
                      <Checkbox 
                        checked={permissions[menuKey]?.[subMenu.name]} 
                        onChange={(e) => handlePermissionChange(menuKey, subMenu.name, e.target.checked)}
                      >
                        {subMenu.name}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </PermissionContent>
            </PermissionSection>
          ))}
        </PermissionContainer>
      </PermissionCard>

      <ButtonGroup>
        <ButtonGroupLeft></ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleSave}>확인</CommonButton>
        <Button onClick={handleCancel}>취소</Button>
        <ButtonGroupRight>
          <Button onClick={handleCancel}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </>
  );
};

export default RoleDetail; 
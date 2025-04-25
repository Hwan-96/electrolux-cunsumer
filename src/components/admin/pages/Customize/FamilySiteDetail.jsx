import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, Radio, Input, message, Modal } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight } from '@/components/admin/common/Button';
import { CommonButton } from '@/components/admin/common/Button';
import { getMockDataById, updateMockData, deleteFamilySite, addMockData } from '@/components/admin/mock/MOCK_FamilySite';

const FamilySiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewMode = id === 'new';
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  // 신규 아이템 초기 상태
  const initialNewState = {
    name: '',
    link: '',
    status: 'active',
    registDate: new Date().toISOString().split('T')[0]
  };

  // 상태 관리
  const [newItem, setNewItem] = useState(initialNewState);
  const [editItem, setEditItem] = useState(null);

  // 데이터 로드
  useEffect(() => {
    if (!isNewMode) {
      try {
        const fetchedDetail = getMockDataById(parseInt(id));
        setDetail(fetchedDetail);
        setEditItem({
          name: fetchedDetail.name,
          link: fetchedDetail.link,
          status: fetchedDetail.status
        });
      } catch (error) {
        console.error('Error fetching detail:', error);
        message.error('데이터를 불러오는 중 오류가 발생했습니다.');
      }
    }
    setLoading(false);
  }, [id, isNewMode]);

  // 신규 작성 모드 이벤트 핸들러
  const handleNewNameChange = (e) => {
    setNewItem({ ...newItem, name: e.target.value });
  };

  const handleNewLinkChange = (e) => {
    setNewItem({ ...newItem, link: e.target.value });
  };

  const handleNewStatusChange = (e) => {
    setNewItem({ ...newItem, status: e.target.value });
  };

  // 수정 모드 이벤트 핸들러
  const handleEditNameChange = (e) => {
    setEditItem({ ...editItem, name: e.target.value });
  };

  const handleEditLinkChange = (e) => {
    setEditItem({ ...editItem, link: e.target.value });
  };

  const handleEditStatusChange = (e) => {
    setEditItem({ ...editItem, status: e.target.value });
  };

  // 신규 항목 저장
  const handleNewItemSave = () => {
    if (!newItem.name) {
      message.error('이름을 입력하세요');
      return;
    }

    if (!newItem.link) {
      message.error('링크를 입력하세요');
      return;
    }

    try {
      addMockData(newItem);
      message.success('등록되었습니다');
      navigate('/mng/cstmz/family');
    } catch (error) {
      console.error('Error saving:', error);
      message.error('저장 실패');
    }
  };

  // 기존 항목 수정
  const handleEditSave = () => {
    if (!editItem.name) {
      message.error('이름을 입력하세요');
      return;
    }

    if (!editItem.link) {
      message.error('링크를 입력하세요');
      return;
    }

    try {
      updateMockData(parseInt(id), editItem);
      message.success('수정되었습니다');
      navigate('/mng/cstmz/family');
    } catch (error) {
      console.error('Error updating:', error);
      message.error('수정 실패');
    }
  };

  // 항목 삭제
  const handleDelete = () => {
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 항목을 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          deleteFamilySite(parseInt(id));
          message.success('삭제되었습니다.');
          navigate('/mng/cstmz/family');
        } catch (error) {
          console.error('Error deleting:', error);
          message.error('삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  // 취소 및 목록
  const handleCancel = () => {
    navigate('/mng/cstmz/family');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail && !isNewMode) {
    return <div>Not Found</div>;
  }

  // 신규 모드일 때 UI
  if (isNewMode) {
    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
            <Descriptions.Item label="상태">
              <Radio.Group value={newItem.status} onChange={handleNewStatusChange}>
                <Radio value="active">노출</Radio>
                <Radio value="inactive">미노출</Radio>
              </Radio.Group>
            </Descriptions.Item>
            <Descriptions.Item label="이름">
              <Input 
                value={newItem.name} 
                onChange={handleNewNameChange} 
                placeholder="이름을 입력하세요"
              />
            </Descriptions.Item>
            <Descriptions.Item label="링크">
              <Input 
                value={newItem.link} 
                onChange={handleNewLinkChange} 
                placeholder="https://example.com"
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <ButtonGroupLeft>
          </ButtonGroupLeft>
          <CommonButton type="primary" onClick={handleNewItemSave}>확인</CommonButton>
          <Button onClick={handleCancel}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={handleCancel}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>
      </>
    );
  }

  // 수정 모드일 때 UI
  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
          <Descriptions
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
          <Descriptions.Item label="상태">
            <Radio.Group value={editItem.status} onChange={handleEditStatusChange}>
              <Radio value="active">노출</Radio>
              <Radio value="inactive">미노출</Radio>
            </Radio.Group>
          </Descriptions.Item>
          <Descriptions.Item label="등록일">
            {detail.registDate}
          </Descriptions.Item>
          <Descriptions.Item label="이름">
            <Input 
              value={editItem.name} 
              onChange={handleEditNameChange} 
              placeholder="이름을 입력하세요"
            />
          </Descriptions.Item>
          <Descriptions.Item label="링크">
            <Input 
              value={editItem.link} 
              onChange={handleEditLinkChange} 
              placeholder="https://example.com"
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ButtonGroup>
        <ButtonGroupLeft>
          <Button danger onClick={handleDelete}>삭제</Button>
        </ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleEditSave}>확인</CommonButton>
        <Button onClick={handleCancel}>취소</Button>
        <ButtonGroupRight>
          <Button onClick={handleCancel}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </>
  );
};

export default FamilySiteDetail; 
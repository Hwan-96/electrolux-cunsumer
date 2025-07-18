import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateMockData, deleteMockData, addMockData, getMockDataById } from '@/components/admin/mock/MOCK_CenterList';
import { message, Modal } from 'antd';
import { Button, Card, Descriptions, Input, Select } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { useNavigate } from 'react-router-dom';
import useRegionStore from '@/components/admin/store/regionStore';
import AddressInput from '@/components/admin/common/AddressInput';

const CenterListDetail = () => {
  const { id } = useParams();
  const isNewMode = id === 'new';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  // regionStore에서 필요한 함수와 데이터 가져오기
  const { getRegionOptions, getCityOptions, isCitySelectDisabled } = useRegionStore();

  const initialNewState = {
    region: '',
    city: '',
    centerNm: '',
    centerAddr: '',
    centerAddrDetail: '',
    centerZipCode: '',
    centerTel: '',
    url: ''
  };

  const [newItem, setNewItem] = useState(initialNewState);
  const [editItem, setEditItem] = useState(null);
  
  useEffect(() => {
    if (!isNewMode) {
      const fetchedDetail = getMockDataById(parseInt(id));
      setDetail(fetchedDetail);

      // 주소 형식 파싱 (기존 "[우편번호] 주소" 형식에서 분리)
      let centerZipCode = '';
      let centerAddr = fetchedDetail.centerAddr;
      let centerAddrDetail = '';

      if (fetchedDetail.centerAddr) {
        const zipMatch = fetchedDetail.centerAddr.match(/\[\s*(\d+)\s*\]\s*(.*)/);
        if (zipMatch) {
          centerZipCode = zipMatch[1];
          centerAddr = zipMatch[2];
        }
      }

      setEditItem({
        region: fetchedDetail.region,
        city: fetchedDetail.city,
        centerNm: fetchedDetail.centerNm,
        centerAddr: centerAddr,
        centerAddrDetail: centerAddrDetail,
        centerZipCode: centerZipCode,
        centerTel: fetchedDetail.centerTel,
        url: fetchedDetail.url
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, isNewMode]);

  // 신규 작성 모드 이벤트 핸들러
  const handleNewRegionChange = (value) => {
    setNewItem({...newItem, region: value, city: ''}); // 지역 변경 시 시군구 초기화
  };

  const handleNewCityChange = (value) => {
    setNewItem({...newItem, city: value});
  };

  const handleNewCenterNameChange = (e) => {
    setNewItem({...newItem, centerNm: e.target.value});
  };
  
  const handleNewCenterTelChange = (e) => {
    setNewItem({...newItem, centerTel: e.target.value});
  };

  const handleNewUrlChange = (e) => {
    setNewItem({...newItem, url: e.target.value});
  };

  const handleNewAddressChange = (addressData) => {
    setNewItem({
      ...newItem, 
      centerAddr: addressData.address,
      centerZipCode: addressData.zipCode,
      centerAddrDetail: ''
    });
  };

  const handleNewAddrDetailChange = (value) => {
    setNewItem({...newItem, centerAddrDetail: value});
  };

  // 수정 모드 이벤트 핸들러
  const handleEditRegionChange = (value) => {
    setEditItem({...editItem, region: value, city: ''}); // 지역 변경 시 시군구 초기화
  };

  const handleEditCityChange = (value) => {
    setEditItem({...editItem, city: value});
  };

  const handleEditCenterNameChange = (e) => {
    setEditItem({...editItem, centerNm: e.target.value});
  };
  
  const handleEditCenterTelChange = (e) => {
    setEditItem({...editItem, centerTel: e.target.value});
  };

  const handleEditUrlChange = (e) => {
    setEditItem({...editItem, url: e.target.value});
  };

  const handleEditAddressChange = (addressData) => {
    setEditItem({
      ...editItem, 
      centerAddr: addressData.address,
      centerZipCode: addressData.zipCode,
      centerAddrDetail: ''
    });
  };

  const handleEditAddrDetailChange = (value) => {
    setEditItem({...editItem, centerAddrDetail: value});
  };

  const handleNewItemSave = () => {
    if (!newItem.region) {
      message.error('지역을 선택하세요');
      return;
    }

    if (!newItem.city) {
      message.error('시군구를 선택하세요');
      return;
    }

    if (!newItem.centerNm) {
      message.error('센터명을 입력하세요');
      return;
    }
    
    if (!newItem.centerAddr) {
      message.error('주소를 입력하세요');
      return;
    }

    if (!newItem.centerTel) {
      message.error('전화번호를 입력하세요');
      return;
    }

    if (!newItem.url) {
      message.error('약도 URL을 입력하세요');
      return;
    }

    try {
      // 주소 형식 변환
      const formattedData = {
        ...newItem,
        centerAddr: newItem.centerZipCode ? 
          `[ ${newItem.centerZipCode} ] ${newItem.centerAddr} ${newItem.centerAddrDetail || ''}` : 
          newItem.centerAddr
      };

      addMockData(formattedData);
      message.success('등록되었습니다');
      navigate('/mng/svc/cntLst');
    } catch (error) {
      console.error('Error saving:', error);
      message.error('저장 실패');
    }
  };

  const handleSave = () => {
    if (!editItem.region) {
      message.error('지역을 선택하세요');
      return;
    }

    if (!editItem.city) {
      message.error('시군구를 선택하세요');
      return;
    }

    if (!editItem.centerNm) {
      message.error('센터명을 입력하세요');
      return;
    }
    
    if (!editItem.centerAddr) {
      message.error('주소를 입력하세요');
      return;
    }

    if (!editItem.centerTel) {
      message.error('전화번호를 입력하세요');
      return;
    }

    if (!editItem.url) {
      message.error('약도 URL을 입력하세요');
      return;
    }

    try {
      // 주소 형식 변환
      const formattedData = {
        ...editItem,
        centerAddr: editItem.centerZipCode ? 
          `[ ${editItem.centerZipCode} ] ${editItem.centerAddr} ${editItem.centerAddrDetail || ''}` : 
          editItem.centerAddr
      };

      updateMockData(parseInt(id), formattedData);
      message.success('수정되었습니다');
      navigate('/mng/svc/cntLst');
    } catch (error) {
      console.error('Error updating:', error);
      message.error('수정 실패');
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 항목을 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          deleteMockData(parseInt(id));
          message.success('삭제되었습니다.');
          navigate('/mng/svc/cntLst');
        } catch (error) {
          console.error('Error deleting:', error);
          message.error('삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!detail && !isNewMode) {
    return <div>Not Found</div>;
  }
  
  if (isNewMode) {
    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
            <Descriptions.Item label="지역분류">
              광역시/도
              <Select 
                value={newItem.region} 
                onChange={handleNewRegionChange} 
                style={{ width: 120, marginLeft: 10, marginRight: 20 }}
                options={getRegionOptions()}
              />

              시군구
              <Select 
                value={newItem.city} 
                onChange={handleNewCityChange} 
                style={{ width: 120, marginLeft: 10 }}
                options={getCityOptions(newItem.region)}
                disabled={isCitySelectDisabled(newItem.region) || !newItem.region}
              />
            </Descriptions.Item>
            <Descriptions.Item label="센터명">
              <Input value={newItem.centerNm} onChange={handleNewCenterNameChange} placeholder="센터명을 입력하세요" />
            </Descriptions.Item>
            <Descriptions.Item label="주소">
              <AddressInput
                zipCode={newItem.centerZipCode}
                address={newItem.centerAddr}
                addressDetail={newItem.centerAddrDetail}
                onAddressChange={handleNewAddressChange}
                onAddressDetailChange={handleNewAddrDetailChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="전화번호">
              <Input value={newItem.centerTel} onChange={handleNewCenterTelChange} placeholder="전화번호를 입력하세요" />
            </Descriptions.Item>
            <Descriptions.Item label="약도 URL">
              <Input value={newItem.url} onChange={handleNewUrlChange} placeholder="약도 URL을 입력하세요" />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <ButtonGroupLeft>
          </ButtonGroupLeft>
          <CommonButton type="primary" onClick={handleNewItemSave}>확인</CommonButton>
          <Button onClick={() => navigate('/mng/svc/cntLst')}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={() => navigate('/mng/svc/cntLst')}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>
      </>
    );
  }

  return (
    <>
      <Card style={{ marginBottom: '20px' }}>
        <Descriptions
          bordered column={1}
          labelStyle={{ width: '10%' }}
          contentStyle={{ width: '90%' }}
        >
          <Descriptions.Item label="지역분류">
            광역시/도
            <Select 
              value={editItem.region} 
              onChange={handleEditRegionChange} 
              style={{ width: 120, marginLeft: 10, marginRight: 20 }}
              options={getRegionOptions()}
            />

            시군구
            <Select 
              value={editItem.city} 
              onChange={handleEditCityChange} 
              style={{ width: 120, marginLeft: 10 }}
              options={getCityOptions(editItem.region)}
              disabled={isCitySelectDisabled(editItem.region) || !editItem.region}
            />
          </Descriptions.Item>
          <Descriptions.Item label="센터명">
            <Input value={editItem.centerNm} onChange={handleEditCenterNameChange} placeholder="센터명을 입력하세요" />
          </Descriptions.Item>
          <Descriptions.Item label="주소">
            <AddressInput
              zipCode={editItem.centerZipCode}
              address={editItem.centerAddr}
              addressDetail={editItem.centerAddrDetail}
              onAddressChange={handleEditAddressChange}
              onAddressDetailChange={handleEditAddrDetailChange}
            />
          </Descriptions.Item>
          <Descriptions.Item label="전화번호">
            <Input value={editItem.centerTel} onChange={handleEditCenterTelChange} placeholder="전화번호를 입력하세요" />
          </Descriptions.Item>
          <Descriptions.Item label="약도 URL">
            <Input value={editItem.url} onChange={handleEditUrlChange} placeholder="약도 URL을 입력하세요" />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ButtonGroup>
        <ButtonGroupLeft>
          <Button danger onClick={handleDelete}>삭제</Button>
        </ButtonGroupLeft>
        <CommonButton type="primary" onClick={handleSave}>확인</CommonButton>
        <Button onClick={() => navigate('/mng/svc/cntLst')}>취소</Button>
        <ButtonGroupRight>
          <Button onClick={() => navigate('/mng/svc/cntLst')}>목록</Button>
        </ButtonGroupRight>
      </ButtonGroup>
    </>
  );
};

export default CenterListDetail;

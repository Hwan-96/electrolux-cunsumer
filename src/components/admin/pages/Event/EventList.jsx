import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/common/DataTable';
import { getMockData, deleteMockData } from '@/components/admin/mock/MOCK_Event';
import { CommonButton } from '@/components/admin/common/Button';
import { useNavigate } from 'react-router-dom';
import { ColumnLink } from '@/components/admin/common/Style';
import { message, Modal, Button } from 'antd';

const EventList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 데이터 로드
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    try {
      const eventData = getMockData();
      setData(eventData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 삭제 처리
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    Modal.confirm({
      title: '삭제 확인',
      content: `선택한 ${selectedRowKeys.length}개의 항목을 삭제하시겠습니까?`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: async () => {
        try {
          setLoading(true);
          selectedRowKeys.forEach(id => {
            deleteMockData(id);
          });
          
          const updatedData = getMockData();
          setData(updatedData);
          setSelectedRowKeys([]);
          message.success('선택된 항목이 삭제되었습니다.');
        } catch (error) {
          console.error('Error deleting data:', error);
          message.error('삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys);
    },
  };

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>이벤트명</div>,
      dataIndex: 'title',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/evnt/list/${record.id}`)}>
          {text}
        </ColumnLink>
      )
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      width: 150,
      align: 'center',
    },
    {
      title: '종료일',
      dataIndex: 'endDate',
      width: 150,
      align: 'center',
    },
    {
      title: '작성일',
      dataIndex: 'createdAt',
      width: 150,
      align: 'center',
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <DataTable 
        columns={columns} 
        dataSource={data}
        settings={{ 
          loading,
          rowSelection
        }}
        buttonPosition="mixed"
        leftButtons={
          <Button danger onClick={handleBatchDelete}>삭제</Button>
        }
        rightButtons={
          <CommonButton onClick={() => navigate('/mng/evnt/list/new')}>등록</CommonButton>
        }
      />
    </div>
  );
};

export default EventList;

import React, { useState, useEffect } from 'react';
import { Button, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import DataTable from '@/components/admin/common/DataTable';
import { getMockData, deleteFamilySite } from '@/components/admin/mock/MOCK_FamilySite';
import { CommonButton } from '@/components/admin/common/Button';
import { ColumnLink } from '@/components/admin/common/Style';

const FamilySite = () => {
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
    // 실제 API 호출 대신 Mock 데이터 사용
    const mockData = getMockData();
    setData(mockData);
    setLoading(false);
  };

  // 선택된 항목 삭제
  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    // 삭제 확인 로직
    if (window.confirm(`선택한 ${selectedRowKeys.length}개의 항목을 삭제하시겠습니까?`)) {
      setLoading(true);
      
      // 선택된 항목 삭제
      selectedRowKeys.forEach(id => {
        deleteFamilySite(id);
      });
      
      // 데이터 리로드 및 선택 초기화
      setSelectedRowKeys([]);
      loadData();
      message.success('선택된 항목이 삭제되었습니다.');
    }
  };

  // 사이트 등록 페이지로 이동
  const handleAddSite = () => {
    navigate('/mng/cstmz/family/new');
  };

  // row 선택 설정
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    }
  };

  const columns = [
    {
      title: '상태',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render: (status) => (
        <Tag color={status === 'active' ? 'blue' : 'red'}>
          {status === 'active' ? '노출' : '미노출'}
        </Tag>
      )
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <ColumnLink onClick={() => navigate(`/mng/cstmz/family/${record.id}`)}>
          {text}
        </ColumnLink>
      )
    },
    {
      title: '링크',
      dataIndex: 'link',
      key: 'link'
    },
    {
      title: '등록일',
      dataIndex: 'registDate',
      key: 'registDate',
      align: 'center'
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        dataSource={data}
        settings={{
          loading,
          rowSelection,
        }}
        buttonPosition="mixed"
        leftButtons={<Button danger onClick={handleDelete}>삭제</Button>}
        rightButtons={<CommonButton onClick={handleAddSite}>등록</CommonButton>}
      />
    </div>
  );
};

export default FamilySite;

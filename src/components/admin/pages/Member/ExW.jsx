import React, { useState } from 'react';
import { Button, Modal, Upload, Table, message, Space } from 'antd';
import { UploadOutlined, DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import Search from '@/components/admin/common/Search';
import DataTable from '@/components/admin/common/DataTable';
import useList from '@/hooks/useList';
import { getMockData, deleteMockData, updateMockData } from '@/components/admin/mock/MOCK_ExW';
import { exwSearch } from '@/components/admin/utils/search/exwSearch';
import styled from 'styled-components';

const { Dragger } = Upload;

const UploadButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const ExW = () => {
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

  // useList 훅 사용
  const {
    data,
    loading,
    searchType,
    searchValue,
    status,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleStatusChange,
    handleSearch
  } = useList({
    mockData: getMockData(),
    searchFunction: exwSearch,
    deleteMockData: deleteMockData,
    updateMockData: updateMockData,
    initialSearchType: 'all',
    initialSearchValue: '',
    initialStatus: 'all'
  });

  // 검색 설정
  const searchRows = [
    {
      title: '제품구분',
      type: 'radio',
      name: 'status',
      value: status,
      onChange: handleStatusChange,
      options: [
        { value: 'all', label: '전체' },
        { value: '청소기', label: '청소기' },
        { value: '냉장고', label: '냉장고' },
        { value: '세탁기', label: '세탁기' },
        { value: '에어컨', label: '에어컨' },
        { value: '인덕션', label: '인덕션' },
      ],
    },
    {
      title: '검색',
      type: 'mixed',
      selects: [
        {
          value: searchType,
          onChange: handleSearchTypeChange,
          options: [
            { value: 'all', label: '전체' },
            { value: 'name', label: '이름' },
            { value: 'model', label: '모델명' },
            { value: 'phone', label: '연락처' },
            { value: 'email', label: '이메일' },
          ]
        }
      ],
      text: {
        value: searchValue,
        onChange: handleSearchValueChange,
        placeholder: '검색어를 입력하세요'
      },
      showButton: true
    }
  ];

  // 테이블 컬럼 설정
  const columns = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '전화번호',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '주소',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '구입모델',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '제품구분',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '기본보증(개월)',
      dataIndex: 'baseWarranty',
      key: 'baseWarranty',
    },
    {
      title: '보증연장(개월)',
      dataIndex: 'extendedWarranty',
      key: 'extendedWarranty',
    },
    {
      title: '구매일',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
    {
      title: '배송(설치)완료일',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: '보증연장 발효일',
      dataIndex: 'effectiveDate',
      key: 'effectiveDate',
    },
    {
      title: 'EXW 종료일',
      dataIndex: 'exwEndDate',
      key: 'exwEndDate',
    },
  ];

  // 업로드 모달 관련 함수
  const showUploadModal = () => {
    setIsUploadModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsUploadModalVisible(false);
    setFileList([]);
  };

  const handleUpload = () => {
    if (fileList.length === 0) {
      message.error('업로드할 파일을 선택해주세요.');
      return;
    }

    // 여기에 실제 파일 업로드 로직을 구현할 수 있습니다.
    message.success(`${fileList[0].name} 파일이 성공적으로 업로드되었습니다.`);
    setIsUploadModalVisible(false);
    setFileList([]);
  };

  const handleDownloadTemplate = () => {
    // 실제로는 서버에서 템플릿 파일을 다운로드하는 로직이 필요합니다.
    message.success('업로드 양식 템플릿을 다운로드합니다.');
  };

  // 파일 업로드 속성
  const uploadProps = {
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      // 엑셀 파일만 허용
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                     file.type === 'application/vnd.ms-excel';
      if (!isExcel) {
        message.error('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.');
        return Upload.LIST_IGNORE;
      }
      
      setFileList([file]);
      return false; // 자동 업로드 방지
    },
    fileList,
  };

  return (
    <div>
      <Search
        rows={searchRows}
        onSearch={handleSearch}
        showButton={false}
      />
      
      <UploadButtonWrapper>
        <Button 
          type="primary" 
          icon={<UploadOutlined />} 
          onClick={showUploadModal}
        >
          데이터 업로드
        </Button>
      </UploadButtonWrapper>
      
      <DataTable 
        columns={columns} 
        dataSource={data}
        settings={{ 
          loading
        }}
      />

      <Modal
        title="ExW 데이터 업로드"
        open={isUploadModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={handleUpload}>
            업로드
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={handleDownloadTemplate}
            style={{ marginBottom: '16px' }}
          >
            업로드 양식 다운로드
          </Button>
          
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">클릭하거나 파일을 이 영역으로 드래그하세요</p>
            <p className="ant-upload-hint">
              엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.
            </p>
          </Dragger>
          
          {fileList.length > 0 && (
            <Table
              columns={[
                {
                  title: '파일명',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '크기',
                  dataIndex: 'size',
                  key: 'size',
                  render: (size) => `${(size / 1024).toFixed(2)} KB`,
                },
                {
                  title: '상태',
                  key: 'status',
                  render: () => '대기 중',
                },
              ]}
              dataSource={fileList.map((file, index) => ({
                key: index,
                name: file.name,
                size: file.size,
              }))}
              pagination={false}
              size="small"
              style={{ marginTop: '16px' }}
            />
          )}
        </Space>
      </Modal>
    </div>
  );
};

export default ExW;

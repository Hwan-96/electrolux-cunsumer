import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'antd'
// 테이블 기본 설정
const defaultTableSettings = {
  enableSelection: true,
  enableNumbering: true,
  pagination: { 
    pageSize: 10,
    position: ['bottomCenter']
  },
  bordered: true,
  loading: false,
};

/* // rowSelection 설정
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}; */

export const DataTable = ({ 
  columns, 
  dataSource, 
  settings = {},
  children,
  buttonPosition = 'left', // 'left' | 'right' | 'center' | 'mixed'
  leftButtons,
  rightButtons
}) => {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 테이블 설정 병합
  const tableSettings = {
    ...defaultTableSettings,
    ...settings
  };

  useEffect(() => {
    loadData();
  }, [dataSource]);

  const loadData = () => {
    setLoading(true);
    setGridData(dataSource);
    setLoading(false);
  }

  // 현재 페이지의 데이터 계산
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return gridData.slice(startIndex, endIndex);
  };

  // 번호 컬럼 설정
  const numberColumn = {
    title: '번호',
    width: 80,
    align: 'center',
    render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
  };

  // 컬럼 설정
  const tableColumns = tableSettings.enableNumbering 
    ? [numberColumn, ...columns] 
    : columns;

 

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // 버튼 컨테이너 스타일
  const buttonContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  // 버튼 렌더링
  const renderButtons = () => {
    if (buttonPosition === 'mixed') {
      return (
        <>
          <div style={{ ...buttonContainerStyle, position: 'absolute', left: 0 }}>
            {leftButtons}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              current={currentPage}
              total={gridData.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
            />
          </div>
          <div style={{ ...buttonContainerStyle, position: 'absolute', right: 0 }}>
            {rightButtons}
          </div>
        </>
      );
    }

    const buttons = leftButtons || rightButtons || children;
    const position = leftButtons ? 'left' : (rightButtons ? 'right' : buttonPosition);

    return (
      <>
        <div style={{
          ...buttonContainerStyle,
          position: 'absolute',
          ...(position === 'left' && { left: 0 }),
          ...(position === 'right' && { right: 0 }),
          ...(position === 'center' && { 
            left: '50%',
            transform: 'translateX(-50%)'
          })
        }}>
          {buttons}
        </div>
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Pagination
            current={currentPage}
            total={gridData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  return (
    <div>
      <Table
        rowSelection={tableSettings.rowSelection}
        columns={tableColumns}
        dataSource={getCurrentPageData()}
        bordered={tableSettings.bordered}
        loading={loading}
        pagination={false}
        rowKey="id"
      />
      <div style={{ 
        display: 'flex', 
        position: 'relative',
        alignItems: 'center',
        marginTop: '16px'
      }}>
        {renderButtons()}
      </div>
    </div>
  )
}

export default DataTable;
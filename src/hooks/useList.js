import { useState, useEffect } from 'react';
import { message, Modal } from 'antd';
import { sanitizeInput } from '@/utils/inputValidation';

const useList = ({ 
  mockData, 
  searchFunction, 
  deleteMockData, 
  updateMockData,
  initialSearchType = 'all',
  initialSearchValue = '',
  initialStatus = 'all',
  additionalParams = {}
}) => {
  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [status, setStatus] = useState(initialStatus);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleSearchTypeChange = (e) => {
    setSearchType(sanitizeInput(e.target.value));
  };

  const handleSearchValueChange = (e) => {
    setSearchValue((sanitizeInput(e.target.value)));
  };

  const handleStatusChange = (e) => {
    setStatus(sanitizeInput(e.target.value));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: 실제 API 호출로 변경
      // const response = await axios.get('/api/endpoint', {
      //   params: { 
      //     searchType, 
      //     searchValue, 
      //     status,
      //     ...additionalParams
      //   }
      // });
      // setData(response.data);
      
      // 임시로 Mock 데이터 사용
      const filteredData = searchFunction(mockData, {
        searchType,
        searchValue,
        status,
        ...additionalParams
      });
      setData(filteredData);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          // TODO: 실제 API 호출로 변경
          // await axios.post('/api/endpoint/batch-delete', { ids: selectedRowKeys });
          
          // 임시로 Mock 데이터 삭제
          let updatedData = [];
          selectedRowKeys.forEach(id => {
            updatedData = deleteMockData(id);
          });
          
          // 검색 조건 유지하면서 데이터 갱신
          const filteredData = searchFunction(updatedData, {
            searchType,
            searchValue,
            status,
            ...additionalParams
          });
          setData(filteredData);
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

  const handleBatchUpdate = async (updateData) => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    try {
      setLoading(true);
      // TODO: 실제 API 호출로 변경
      // await axios.post('/api/endpoint/batch-update', { 
      //   ids: selectedRowKeys,
      //   ...updateData
      // });
      
      // 임시로 Mock 데이터 업데이트
      selectedRowKeys.forEach(id => {
        updateMockData(id, updateData);
      });
      
      // 검색 조건 유지하면서 데이터 갱신
      const updatedData = mockData;
      const filteredData = searchFunction(updatedData, {
        searchType,
        searchValue,
        status,
        ...additionalParams
      });
      setData(filteredData);
      setSelectedRowKeys([]);
      message.success('선택된 항목이 업데이트되었습니다.');
    } catch (error) {
      console.error('Error updating data:', error);
      message.error('업데이트 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleBatchStatusUpdate = async (newStatus) => {
    if (selectedRowKeys.length === 0) {
      message.warning('선택된 항목이 없습니다.');
      return;
    }

    try {
      setLoading(true);
      // TODO: 실제 API 호출로 변경
      // await axios.post('/api/endpoint/batch-update', { 
      //   ids: selectedRowKeys,
      //   status: newStatus
      // });
      
      // 임시로 Mock 데이터 업데이트
      selectedRowKeys.forEach(id => {
        updateMockData(id, { status: newStatus });
      });
      
      // 검색 조건 유지하면서 데이터 갱신
      const updatedData = mockData;
      const filteredData = searchFunction(updatedData, {
        searchType,
        searchValue,
        status,
        ...additionalParams
      });
      setData(filteredData);
      setSelectedRowKeys([]);
      message.success(`선택된 항목이 ${newStatus === 'completed' ? '처리완료' : '처리대기'}로 변경되었습니다.`);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('상태 변경 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // 초기 데이터 로드
  useEffect(() => {
    handleSearch();
  }, []);

  return {
    searchType,
    searchValue,
    status,
    data,
    loading,
    selectedRowKeys,
    rowSelection,
    handleSearchTypeChange,
    handleSearchValueChange,
    handleStatusChange,
    handleSearch,
    handleBatchDelete,
    handleBatchUpdate,
    handleBatchStatusUpdate,
  };
};

export default useList; 
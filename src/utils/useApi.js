import { useState, useEffect, useCallback } from 'react';
import apiService from './api';

/**
 * API 요청을 처리하는 커스텀 훅
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} initialParams - 초기 파라미터
 * @param {boolean} fetchOnMount - 컴포넌트 마운트 시 자동 요청 여부
 * @returns {Object} - 데이터, 로딩 상태, 에러, 요청 함수
 */
const useApi = (endpoint, initialParams = {}, fetchOnMount = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  // 데이터 가져오기 함수
  const fetchData = useCallback(async (customParams = null) => {
    const queryParams = customParams || params;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getData(endpoint, queryParams);
      setData(response);
      return response;
    } catch (err) {
      setError(err.message || '데이터를 불러오는데 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  // 데이터 생성 함수
  const postData = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.postData(endpoint, payload);
      return response;
    } catch (err) {
      setError(err.message || '데이터 생성에 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // 데이터 수정 함수
  const updateData = useCallback(async (id, payload) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.updateData(`${endpoint}/${id}`, payload);
      return response;
    } catch (err) {
      setError(err.message || '데이터 수정에 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // 데이터 삭제 함수
  const deleteData = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.deleteData(`${endpoint}/${id}`);
      return response;
    } catch (err) {
      setError(err.message || '데이터 삭제에 실패했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // 파라미터 업데이트 함수
  const updateParams = useCallback((newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams
    }));
  }, []);

  // 마운트 시 자동 요청
  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, [fetchOnMount, fetchData]);

  // 파라미터 변경 시 자동 요청 (페이지네이션, 필터링 등)
  useEffect(() => {
    if (!fetchOnMount) return;
    
    fetchData();
  }, [params, fetchData, fetchOnMount]);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    updateData,
    deleteData,
    updateParams,
    params
  };
};

export default useApi; 
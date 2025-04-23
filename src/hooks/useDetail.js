import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';

const useDetail = ({ id, mockData, updateMockData, deleteMockData, listPath }) => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending');
  const [answer, setAnswer] = useState('');
  const [product, setProduct] = useState('all');
  const [question, setQuestion] = useState('');

  // 제품군 매핑 함수
  const mapProductCategory = (ctgr) => {
    const categoryMap = {
      '로봇청소기': 'robot',
      '유선청소기': 'wired',
      '무선청소기': 'wireless',
      '생활가전': 'household',
      '식기세척기': 'dishwasher',
      '인덕션': 'induction'
    };
    return categoryMap[ctgr] || 'all';
  };

  // 제품군 역매핑 함수
  const reverseMapProductCategory = (value) => {
    const reverseMap = {
      'robot': '로봇청소기',
      'wired': '유선청소기',
      'wireless': '무선청소기',
      'household': '생활가전',
      'dishwasher': '식기세척기',
      'induction': '인덕션',
      'all': '통합'
    };
    return reverseMap[value] || '통합';
  };

  useEffect(() => {
    // TODO: 실제 API 호출로 변경
    // const fetchDetail = async () => {
    //   try {
    //     const response = await axios.get(`/api/${endpoint}/${id}`);
    //     setDetail(response.data);
    //     setStatus(response.data.status);
    //     setAnswer(response.data.answer || '');
    //     setProduct(response.data.product || 'all');
    //     setQuestion(response.data.question || '');
    //   } catch (error) {
    //     console.error('Error fetching detail:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchDetail();

    // 임시로 Mock 데이터 사용
    const data = mockData.find(item => item.id === parseInt(id));
    if (data) {
      setDetail(data);
      setStatus(data.status);
      setAnswer(data.a || '');
      setProduct(mapProductCategory(data.ctgr));
      setQuestion(data.q || '');
    }
    setLoading(false);
  }, [id, mockData]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSave = async () => {
    try {
      // TODO: 실제 API 호출로 변경
      // await axios.put(`/api/${endpoint}/${id}`, {
      //   status,
      //   answer,
      //   product,
      //   question,
      //   counselor: '관리자', // 실제로는 로그인한 관리자 정보 사용
      //   answeredAt: new Date().toISOString(),
      // });

      // Mock 데이터 업데이트
      updateMockData(parseInt(id), {
        status,
        a: answer,
        ctgr: reverseMapProductCategory(product),
        q: question,
        counselor: '관리자',
        answeredAt: new Date().toISOString(),
      });

      message.success('저장되었습니다.');
      navigate(listPath);
    } catch (error) {
      console.error('Error saving changes:', error);
      message.error('저장 중 오류가 발생했습니다.');
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
          // TODO: 실제 API 호출로 변경
          // await axios.delete(`/api/${endpoint}/${id}`);

          // Mock 데이터 삭제
          deleteMockData(parseInt(id));

          message.success('삭제되었습니다.');
          navigate(listPath);
        } catch (error) {
          console.error('Error deleting:', error);
          message.error('삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  const handleCancel = () => {
    navigate(listPath);
  };

  return {
    detail,
    loading,
    status,
    answer,
    product,
    question,
    handleStatusChange,
    handleAnswerChange,
    handleProductChange,
    handleQuestionChange,
    handleSave,
    handleDelete,
    handleCancel,
  };
};

export default useDetail;

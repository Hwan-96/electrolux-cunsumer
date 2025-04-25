import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card, Descriptions, Input, Select, Radio, message, DatePicker, Table, Modal, Pagination, Upload, ConfigProvider, Space } from 'antd';
import { ButtonGroup, ButtonGroupLeft, ButtonGroupRight, CommonButton } from '@/components/admin/common/Button';
import { addMockData, Mock_Survey_Content } from '@/components/admin/mock/MOCK_Survey';
import { UploadOutlined, DownloadOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { GreenButton, GreenButtonGroup } from '@/components/admin/common/Button';
import ko_KR from 'antd/lib/locale/ko_KR';
import useModelStore from '@/components/admin/store/modelStore';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const SurveyDetail = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { searchModels, searchResults } = useModelStore();
  
  // 경로에 따라 모드 설정
  const isNew = pathname.includes('/new');
  const isBatch = pathname.includes('/batch');
  const isAdd = pathname.includes('/add');

  // 현재 날짜와 30일 후 날짜 계산
  const today = new Date();
  const thirtyDaysLater = new Date(today);
  thirtyDaysLater.setDate(today.getDate() + 30);

  // 신규 설문 상태
  const [newSurvey, setNewSurvey] = useState({
    state: 'pending',
    center: '',
    model: '',
    consumer: '',
    phone: '',
    surveyContent: '',
    startDate: null,
    endDate: null
  });

  // 배치 URL 발행을 위한 상태
  const [batchFile, setBatchFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  
  // 업로드된 배치 데이터를 저장할 상태
  const [batchUploadData, setBatchUploadData] = useState([]);

  // 설문 내용 등록을 위한 상태
  const [surveyContent, setSurveyContent] = useState({
    title: '',
    description: '',
    startScore: 1,
    maxScore: 5,
    questions: ''
  });

  // 설문 상세 카드를 관리하기 위한 배열 상태 추가
  const [surveyDetailCards, setSurveyDetailCards] = useState([{ 
    id: 1, 
    questions: '',
    startScore: 1,
    maxScore: 5
  }]);

  // 설문 내용 테이블 MOCK 데이터
  const [surveyList, setSurveyList] = useState(Mock_Survey_Content);

  // 테이블 페이지네이션
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 2
  });

  // 모달 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalSurvey, setModalSurvey] = useState({
    title: '',
    startScore: 1,
    maxScore: 5,
    questions: ''
  });

  // 선택된 설문 상태 추가
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  // 모델 검색 모달 상태
  const [isModelModalVisible, setIsModelModalVisible] = useState(false);
  const [modelSearchKeyword, setModelSearchKeyword] = useState('');

  // 폼 핸들러 - 일반 URL 발행
  const handleCenterChange = (value) => {
    setNewSurvey({...newSurvey, center: value});
  };

  const handleModelChange = (e) => {
    if (typeof e === 'object' && e !== null && 'target' in e) {
      // 입력 필드에서 호출된 경우
      setNewSurvey({...newSurvey, model: e.target.value});
    } else {
      // 버튼 클릭에서 호출된 경우
      showModelModal();
    }
  };

  const handleConsumerChange = (e) => {
    setNewSurvey({...newSurvey, consumer: e.target.value});
  };

  const handlePhoneChange = (e) => {
    setNewSurvey({...newSurvey, phone: e.target.value});
  };

  const handleRcpNumChange = (e) => {
    setNewSurvey({...newSurvey, rcpNum: e.target.value});
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setNewSurvey({
        ...newSurvey,
        startDate: dates[0],
        endDate: dates[1]
      });
    }
  };

  // 설문 내용 변경 핸들러 (셀렉트 박스용으로 수정)
  const handleSurveyContentChange = (value) => {
    setNewSurvey({...newSurvey, surveyContent: value});
  };

  // 파일 선택 핸들러
  const handleFileUpload = (info) => {
    if (info.file.status === 'done') {
      message.success('파일이 업로드되었습니다');
      setBatchFile(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error('파일 업로드 중 오류가 발생했습니다');
      setBatchFile(null);
    }
  };

  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    if (!batchFile) {
      message.error('업로드할 파일을 선택해주세요');
      return;
    }

    // 실제로는 파일을 서버에 업로드하고 데이터를 받아와야 하지만
    // 여기서는 데모 목적으로 가상 데이터를 생성합니다
    const mockUploadedData = [
      {
        key: '1',
        id: 1,
        center: '일렉트로룩스 북부산센터',
        model: '얼티밋홈 300 로봇청소기',
        startDate: '2023-06-01',
        endDate: '2023-07-01',
        consumer: '홍길동',
        phone: '010-1234-5678',
        rcpNum: 'SRVY-20230601-001',
        surveyContent: '서비스 만족도 조사'
      },
      {
        key: '2',
        id: 2,
        center: '위니아에이드 김포센터',
        model: '얼티밋홈 700 진공청소기',
        startDate: '2023-06-05',
        endDate: '2023-07-05',
        consumer: '김철수',
        phone: '010-9876-5432',
        rcpNum: 'SRVY-20230605-002',
        surveyContent: '제품 사용 만족도 조사'
      },
      {
        key: '3',
        id: 3,
        center: '일렉트로룩스 강남센터',
        model: '에어프라이어 모델 A',
        startDate: '2023-06-10',
        endDate: '2023-07-10',
        consumer: '박영희',
        phone: '010-5555-4444',
        rcpNum: 'SRVY-20230610-003',
        surveyContent: 'A/S 만족도 조사'
      }
    ];

    setBatchUploadData(mockUploadedData);
    setIsUploaded(true);
    message.success('파일이 성공적으로 처리되었습니다');
  };

  // 저장 처리 - 일반 URL 발행
  const handleNewSurveySave = () => {
    // 필수 필드 검증
    if (!newSurvey.center) {
      message.error('센터를 선택하세요');
      return;
    }

    if (!newSurvey.model) {
      message.error('모델을 선택하세요');
      return;
    }

    if (!newSurvey.consumer) {
      message.error('고객명을 입력하세요');
      return;
    }

    if (!newSurvey.phone) {
      message.error('연락처를 입력하세요');
      return;
    }

    if (!newSurvey.rcpNum) {
      message.error('접수번호를 입력하세요');
      return;
    }

    if (!newSurvey.startDate || !newSurvey.endDate) {
      message.error('활성기간을 선택하세요');
      return;
    }

    try {
      // 날짜 형식 지정 (활성기간 표시용)
      const formatDate = (date) => {
        // Moment 객체나 Date 객체 모두 처리 가능하도록 함
        if (!date) return '';
        
        let year, month, day;
        
        if (date instanceof Date) {
          year = date.getFullYear();
          month = String(date.getMonth() + 1).padStart(2, '0');
          day = String(date.getDate()).padStart(2, '0');
        } else if (date._isAMomentObject) {
          // Moment 객체인 경우
          year = date.year();
          month = String(date.month() + 1).padStart(2, '0');
          day = String(date.date()).padStart(2, '0');
        } else {
          // 문자열이나 다른 형식인 경우 기본값 사용
          const d = new Date(date);
          year = d.getFullYear();
          month = String(d.getMonth() + 1).padStart(2, '0');
          day = String(d.getDate()).padStart(2, '0');
        }
        
        return `${year}-${month}-${day}`;
      };
      
      // console.log 디버깅 추가
      console.log('newSurvey 데이터:', newSurvey);
      console.log('날짜 형식화:', formatDate(newSurvey.startDate), formatDate(newSurvey.endDate));
      
      // UUID를 사용하여 고유 URL 생성
      const urlId = uuidv4().replace(/-/g, '').substring(0, 13).toUpperCase();
      
      // URL 생성 (UUID 사용)
      const surveyUrl = `https://survey.example.com/${urlId}`;

      // 저장할 데이터 구성
      const surveyData = {
        ...newSurvey,
        // 접수번호는 사용자 입력값 사용
        state: newSurvey.state || 'pending', // 기본값 설정
        date: `${formatDate(newSurvey.startDate)} ~ ${formatDate(newSurvey.endDate)}`,
        url: surveyUrl // URL은 UUID로 생성
      };

      // Moment 객체가 있으면 문자열로 변환 (JSON 직렬화 문제 방지)
      if (surveyData.startDate && surveyData.startDate._isAMomentObject) {
        surveyData.startDate = formatDate(surveyData.startDate);
      }
      if (surveyData.endDate && surveyData.endDate._isAMomentObject) {
        surveyData.endDate = formatDate(surveyData.endDate);
      }
      
      console.log('저장할 데이터:', surveyData);

      // 데이터 저장
      addMockData(surveyData);
      message.success('설문 URL이 발행되었습니다.');
      navigate('/mng/svc/srvy');
    } catch (error) {
      console.error('Error saving new survey:', error);
      message.error(`저장 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
    }
  };

  // 배치 URL 발행 저장
  const handleBatchSave = () => {
    if (!isUploaded || batchUploadData.length === 0) {
      message.error('먼저 파일을 업로드하세요');
      return;
    }

    try {
      // 각 데이터에 대해 개별적으로 URL을 생성
      const processedData = batchUploadData.map(data => {
        // 업로드된 데이터에 접수번호가 없는 경우 에러 처리
        if (!data.rcpNum) {
          throw new Error('업로드된 데이터 중 접수번호가 없는 항목이 있습니다');
        }

        // UUID를 사용하여 고유 URL 생성
        const urlId = uuidv4().replace(/-/g, '').substring(0, 13).toUpperCase();
        
        // URL 생성 (UUID 사용)
        const surveyUrl = `https://survey.example.com/${urlId}`;
        
        return {
          ...data,
          // 접수번호는 업로드된 원본 데이터 사용
          url: surveyUrl // URL은 UUID로 생성
        };
      });
      
      // 여기에서 처리된 데이터를 저장하거나 Excel 파일로 다운로드하는 로직 추가
      console.log('Processed batch data:', processedData);
      
      message.success(`${processedData.length}개의 URL이 생성되었습니다. Excel 파일이 다운로드됩니다.`);
      navigate('/mng/svc/srvy');
    } catch (error) {
      console.error('Error processing batch URLs:', error);
      message.error(`URL 생성 중 오류가 발생했습니다: ${error.message || '알 수 없은 오류'}`);
    }
  };

  // 설문 내용 수정 취소
  const handleCancelEdit = () => {
    setSelectedSurvey(null);
  };

  // 모달 관련 핸들러
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalTitleChange = (e) => {
    setModalSurvey({...modalSurvey, title: e.target.value});
  };

  const handleModalStartScoreChange = (e) => {
    setModalSurvey({...modalSurvey, startScore: parseInt(e.target.value) || 0});
  };

  const handleModalMaxScoreChange = (e) => {
    setModalSurvey({...modalSurvey, maxScore: parseInt(e.target.value) || 0});
  };

  const handleModalQuestionsChange = (e) => {
    setModalSurvey({...modalSurvey, questions: e.target.value});
  };

  const handleModalSubmit = () => {
    if (!modalSurvey.title) {
      message.error('설문 제목을 입력하세요');
      return;
    }

    if (modalSurvey.startScore >= modalSurvey.maxScore) {
      message.error('최대점수는 시작점수보다 커야 합니다');
      return;
    }

    if (!modalSurvey.questions) {
      message.error('문항을 입력하세요');
      return;
    }

    // 새로운 설문 추가
    const newSurvey = {
      key: String(surveyList.length + 1),
      id: surveyList.length + 1,
      title: modalSurvey.title,
      startScore: modalSurvey.startScore,
      maxScore: modalSurvey.maxScore,
      questionCount: modalSurvey.questions.split('\n').filter(q => q.trim()).length
    };

    setSurveyList([...surveyList, newSurvey]);
    setPagination({...pagination, total: pagination.total + 1});
    setIsModalVisible(false);
    setModalSurvey({
      title: '',
      startScore: 1,
      maxScore: 5,
      questions: ''
    });
    
    message.success('설문이 추가되었습니다');
  };

  // 테이블 페이지 변경 핸들러
  const handleTableChange = (page) => {
    setPagination({...pagination, current: page});
  };

  // 테이블 행 삭제 핸들러
  const handleDeleteSurvey = (id) => {
    Modal.confirm({
      title: '삭제 확인',
      content: '정말로 이 설문을 삭제하시겠습니까?',
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        const newList = surveyList.filter(item => item.id !== id);
        setSurveyList(newList);
        setPagination({...pagination, total: newList.length});
        message.success('설문이 삭제되었습니다');
      }
    });
  };

  // 특정 카드의 시작 점수 변경 핸들러
  const handleCardStartScoreChange = (id, value) => {
    setSurveyDetailCards(surveyDetailCards.map(card => 
      card.id === id ? { ...card, startScore: parseInt(value) || 0 } : card
    ));
  };

  // 특정 카드의 최대 점수 변경 핸들러
  const handleCardMaxScoreChange = (id, value) => {
    setSurveyDetailCards(surveyDetailCards.map(card => 
      card.id === id ? { ...card, maxScore: parseInt(value) || 0 } : card
    ));
  };

  // 설문 내용 카드 추가 핸들러
  const handleAddSurveyCard = () => {
    const newCardId = Math.max(...surveyDetailCards.map(card => card.id), 0) + 1;
    setSurveyDetailCards([...surveyDetailCards, { 
      id: newCardId, 
      questions: '',
      startScore: 1,
      maxScore: 5
    }]);
    message.success('새 설문 카드가 추가되었습니다.');
  };

  // 설문 내용 카드 삭제 핸들러
  const handleDeleteSurveyCard = () => {
    if (surveyDetailCards.length <= 1) {
      message.warning('최소 1개의 설문 카드는 유지되어야 합니다.');
      return;
    }
    
    // 삭제할 카드는 마지막 카드
    const cardToDelete = surveyDetailCards.length;
    
    Modal.confirm({
      title: '문항 삭제 확인',
      content: `설문내용 상세 ${cardToDelete} 문항을 삭제하시겠습니까?`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        // 후순위(마지막에 추가된) 카드부터 삭제
        const updatedCards = [...surveyDetailCards];
        updatedCards.pop();
        setSurveyDetailCards(updatedCards);
        message.success(`설문내용 상세 ${cardToDelete} 문항이 삭제되었습니다.`);
      }
    });
  };

  // 특정 카드의 문항 내용 변경 핸들러
  const handleCardQuestionsChange = (id, value) => {
    setSurveyDetailCards(surveyDetailCards.map(card => 
      card.id === id ? { ...card, questions: value } : card
    ));
  };

  // 테이블 행 수정 핸들러
  const handleEditSurvey = (record) => {
    setSelectedSurvey(record);
    
    // 기존 카드를 새 형식으로 변환
    setSurveyDetailCards([{ 
      id: 1, 
      questions: '',
      startScore: record.startScore || 1,
      maxScore: record.maxScore || 5
    }]);
    
    setSurveyContent({
      ...surveyContent,
      title: record.title,
      startScore: record.startScore,
      maxScore: record.maxScore,
    });
  };

  // 설문 내용 저장 시 모든 카드의 내용을 합쳐서 저장
  const handleSurveyContentSave = () => {
    if (!selectedSurvey) {
      message.error('수정할 설문을 선택해주세요');
      return;
    }

    // 각 카드의 점수 설정 검증
    for (let i = 0; i < surveyDetailCards.length; i++) {
      const card = surveyDetailCards[i];
      if (card.startScore >= card.maxScore) {
        message.error(`설문 카드 ${i + 1}의 최대점수는 시작점수보다 커야 합니다`);
        return;
      }
    }

    // 모든 카드의 문항 수 계산
    const totalQuestions = surveyDetailCards.reduce((total, card) => {
      const cardQuestionCount = card.questions ? card.questions.split('\n').filter(q => q.trim()).length : 0;
      return total + cardQuestionCount;
    }, 0);

    if (totalQuestions === 0) {
      message.error('최소 1개 이상의 문항을 입력하세요');
      return;
    }

    // 설문 업데이트
    const updatedList = surveyList.map(item => {
      if (item.id === selectedSurvey.id) {
        return { 
          ...item, 
          startScore: surveyDetailCards[0].startScore, // 첫 번째 카드의 점수 설정을 대표값으로 사용
          maxScore: surveyDetailCards[0].maxScore,
          questionCount: totalQuestions
        };
      }
      return item;
    });

    setSurveyList(updatedList);
    message.success('설문 내용이 저장되었습니다.');
    setSelectedSurvey(null); // 상세 영역 닫기
  };

  // 모델찾기 모달 관련 핸들러
  const showModelModal = () => {
    setIsModelModalVisible(true);
    // 모달이 열릴 때 초기 검색 결과 표시 (전체 목록)
    searchModels('');
  };

  const handleModelModalCancel = () => {
    setIsModelModalVisible(false);
    setModelSearchKeyword('');
  };

  const handleModelSearch = () => {
    searchModels(modelSearchKeyword);
  };

  const handleModelKeywordChange = (e) => {
    setModelSearchKeyword(e.target.value);
  };

  const handleModelSelect = (modelName) => {
    setNewSurvey({...newSurvey, model: modelName});
    setIsModelModalVisible(false);
    setModelSearchKeyword('');
    message.success('모델이 선택되었습니다.');
  };

  // URL 발행 화면 렌더링
  if (isNew) {
    // 모델 검색 결과 테이블 컬럼 정의
    const modelColumns = [
      {
        title: '카테고리',
        dataIndex: 'category',
        key: 'category',
        width: '20%',
      },
      {
        title: '모델명',
        dataIndex: 'modelName',
        key: 'modelName',
        width: '60%',
      },
      {
        title: '선택',
        key: 'action',
        width: '20%',
        align: 'center',
        render: (_, record) => (
          <Button type="link" onClick={() => handleModelSelect(record.modelName)}>
            선택
          </Button>
        ),
      },
    ];

    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          <Descriptions
            bordered column={1}
            labelStyle={{ width: '10%' }}
            contentStyle={{ width: '90%' }}
          >
            <Descriptions.Item label="센터">
              <Select
                placeholder="센터를 선택하세요"
                style={{ width: 200 }}
                value={newSurvey.center}
                onChange={handleCenterChange}
              >
                <Select.Option value="대우전자서비스">대우전자서비스</Select.Option>
                <Select.Option value="PCS One Korea">PCS One Korea</Select.Option>
                <Select.Option value="지엘룩스">지엘룩스</Select.Option>
                <Select.Option value="롯데하이마트">롯데하이마트</Select.Option>
                <Select.Option value="일렉트로룩스">일렉트로룩스</Select.Option>
                <Select.Option value="위니아에이드">위니아에이드</Select.Option>
                <Select.Option value="플러스서비스">플러스서비스</Select.Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="모델">
              <div style={{ display: 'flex', gap: '10px' }}>
                <Input value={newSurvey.model} onChange={handleModelChange} readOnly />
                <CommonButton type="primary" onClick={showModelModal}>모델찾기</CommonButton>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="활성기간">
              <ConfigProvider locale={ko_KR}>
                <RangePicker
                  onChange={handleDateChange}
                />
              </ConfigProvider>
            </Descriptions.Item>
            <Descriptions.Item label="고객명">
              <Input
                placeholder="고객명을 입력하세요"
                value={newSurvey.consumer}
                onChange={handleConsumerChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="연락처">
              <Input
                placeholder="연락처를 입력하세요"
                value={newSurvey.phone}
                onChange={handlePhoneChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="접수번호">
              <Input
                placeholder="접수번호를 입력하세요"
                value={newSurvey.rcpNum}
                onChange={handleRcpNumChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="설문내용">
              <Select
                placeholder="설문 내용을 선택하세요"
                style={{ width: 200 }}
                value={newSurvey.surveyContent}
                onChange={handleSurveyContentChange}
              >
                <Select.Option value="NPS">NPS</Select.Option>
                <Select.Option value="CES">CES</Select.Option>
                <Select.Option value="NPS 02">NPS 02</Select.Option>
              </Select>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <ButtonGroup>
          <ButtonGroupLeft>
          </ButtonGroupLeft>
          <CommonButton type="primary" onClick={handleNewSurveySave}>URL 발행</CommonButton>
          <Button onClick={() => navigate('/mng/svc/srvy')}>취소</Button>
          <ButtonGroupRight>
            <Button onClick={() => navigate('/mng/svc/srvy')}>목록</Button>
          </ButtonGroupRight>
        </ButtonGroup>

        {/* 모델 검색 모달 */}
        <Modal
          title="모델 검색"
          open={isModelModalVisible}
          onCancel={handleModelModalCancel}
          footer={null}
          width={800}
        >
          <div style={{ display: 'flex', width: '100%', marginBottom: '20px', gap: '10px' }}>
            <Input
              placeholder="모델명 검색"
              value={modelSearchKeyword}
              onChange={handleModelKeywordChange}
              onPressEnter={handleModelSearch}
              style={{ flex: 1 }}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={handleModelSearch}>
              검색
            </Button>
          </div>
          
          <Table
            columns={modelColumns}
            dataSource={searchResults}
            rowKey="id"
            pagination={{ 
              pageSize: 5,
              position: ['bottomCenter']
            }}
            bordered
          />
        </Modal>
      </>
    );
  }

  // 배치 URL 발행 화면 렌더링
  if (isBatch) {
    // 테이블 컬럼 정의
    const columns = [
      {
        title: '번호',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        align: 'center'
      },
      {
        title: '센터',
        dataIndex: 'center',
        key: 'center',
        align: 'center'
      },
      {
        title: '모델',
        dataIndex: 'model',
        key: 'model',
        align: 'center'
      },
      {
        title: '설문시작일',
        dataIndex: 'startDate',
        key: 'startDate',
        align: 'center'
      },
      {
        title: '설문종료일',
        dataIndex: 'endDate',
        key: 'endDate',
        align: 'center'
      },
      {
        title: '고객명',
        dataIndex: 'consumer',
        key: 'consumer',
        align: 'center'
      },
      {
        title: '고객연락처',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center'
      },
      {
        title: '접수번호',
        dataIndex: 'rcpNum',
        key: 'rcpNum',
        align: 'center'
      },
      {
        title: '설문내용',
        dataIndex: 'surveyContent',
        key: 'surveyContent',
        align: 'center'
      }
    ];
    
    return (
      <>
        <Card style={{ marginBottom: '20px' }}>
          
          <Card style={{ marginBottom: '20px', backgroundColor: '#f0f0f0' }}>
            <GreenButtonGroup>
              <GreenButton type="primary" size="large" icon={<DownloadOutlined />}>엑셀 양식 다운로드</GreenButton>
            </GreenButtonGroup>
            <p style={{ marginTop: '20px'}}>엑셀 양식을 다운로드하여 고객에게 배포하세요.</p>
          </Card>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="파일 업로드">
              <Upload
                name="file"
                accept=".xlsx"
                maxCount={1}
                onChange={handleFileUpload}
              >
                <Button icon={<UploadOutlined />}>파일선택</Button>
              </Upload>
              <span style={{ marginLeft: '10px' }}>
                {batchFile ? `선택된 파일: ${batchFile.name}` : '파일을 선택해주세요'}
              </span>
            </Descriptions.Item>
          </Descriptions>
          <ButtonGroup style={{ marginTop: '20px' }}>
            <CommonButton type="primary" onClick={handleUploadClick}>업로드</CommonButton>
          </ButtonGroup>

          <Card 
            title="업로드 파일 목록" 
            style={{ marginTop: '20px' }}
          >
            {isUploaded ? (
              <Table 
                columns={columns} 
                dataSource={batchUploadData} 
                pagination={false}
                rowKey="key"
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                파일을 업로드하면 여기에 내용이 표시됩니다.
              </div>
            )}
          </Card>

        </Card>

        <ButtonGroup>
          <CommonButton 
            type="primary" 
            onClick={handleBatchSave}
            disabled={!isUploaded || batchUploadData.length === 0}
          >
            최종생성
          </CommonButton>
          <Button onClick={() => navigate('/mng/svc/srvy')}>취소</Button>
        </ButtonGroup>
      </>
    );
  }

  // 설문 내용 등록 화면 렌더링
  if (isAdd) {
    // 테이블 컬럼 정의
    const columns = [
      {
        title: '번호',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        align: 'center'
      },
      {
        title: '제목',
        dataIndex: 'title',
        key: 'title',
        align: 'center'
      },
      {
        title: '시작점수',
        dataIndex: 'startScore',
        key: 'startScore',
        align: 'center'
      },
      {
        title: '최대점수',
        dataIndex: 'maxScore',
        key: 'maxScore',
        align: 'center'
      },
      {
        title: '문항',
        dataIndex: 'questionCount',
        key: 'questionCount',
        align: 'center'
      },
      {
        title: '관리',
        key: 'action',
        width: 150,
        align: 'center',
        render: (_, record) => (
          <div>
            <Button type="link" size="small" onClick={() => handleEditSurvey(record)}>수정</Button>
            <Button type="link" danger size="small" onClick={() => handleDeleteSurvey(record.id)}>삭제</Button>
          </div>
        )
      }
    ];

    return (
      <>
        {/* 상단 버튼과 테이블 */}
        <Card style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
            <Button type="primary" onClick={showModal}>신규 작성</Button>
          </div>
          
          <Table 
            columns={columns} 
            dataSource={surveyList} 
            pagination={false}
            rowKey="key"
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <Pagination 
              current={pagination.current} 
              pageSize={pagination.pageSize} 
              total={pagination.total} 
              onChange={handleTableChange}
              showSizeChanger={false}
            />
          </div>
        </Card>
        
        {/* 설문내용 상세 - 선택된 설문이 있을 때만 표시 */}
        {selectedSurvey && (
          <>
            {surveyDetailCards.map((card, index) => (
              <Card 
                key={card.id}
                title={`설문내용 상세 ${index + 1}`} 
                style={{ marginBottom: '20px' }}
                extra={index === 0 ? <Button type="link" onClick={handleCancelEdit}>닫기</Button> : null}
              >
                <Descriptions bordered column={1}>
                  <Descriptions.Item label="점수설정">
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div>
                        <span>시작점수: </span>
                        <Input 
                          type="number" 
                          value={card.startScore} 
                          onChange={(e) => handleCardStartScoreChange(card.id, e.target.value)}
                          style={{ width: '80px' }} 
                        />
                      </div>
                      <div>
                        <span>최대점수: </span>
                        <Input 
                          type="number" 
                          value={card.maxScore} 
                          onChange={(e) => handleCardMaxScoreChange(card.id, e.target.value)}
                          style={{ width: '80px' }} 
                        />
                      </div>
                    </div>
                  </Descriptions.Item>
                  <Descriptions.Item label="문항설정">
                    <TextArea
                      rows={8}
                      placeholder="각 문항을 줄바꿈으로 구분하여 입력하세요"
                      value={card.questions}
                      onChange={(e) => handleCardQuestionsChange(card.id, e.target.value)}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            ))}
            
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Button 
                  icon={<PlusOutlined />} 
                  onClick={handleAddSurveyCard}
                  style={{ marginRight: '8px' }}
                >
                  문항 추가
                </Button>
                <Button 
                  danger 
                  onClick={handleDeleteSurveyCard}
                  disabled={surveyDetailCards.length <= 1}
                >
                  문항 삭제
                </Button>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <Space>
                  <Button type="primary" onClick={handleSurveyContentSave} style={{ marginRight: '8px' }}>
                    설문 내용 저장
                  </Button>
                  <Button onClick={handleCancelEdit}>취소</Button>
                </Space>
              </div>
              <div style={{ width: '180px' }}></div> {/* 오른쪽 여백 확보 */}
            </div>
          </>
        )}
        
        {/* 버튼 그룹은 선택된 설문이 없을 때만 표시 */}
        {!selectedSurvey && (
          <ButtonGroup>
            <ButtonGroupRight>
              <Button onClick={() => navigate('/mng/svc/srvy')}>목록</Button>
            </ButtonGroupRight>
          </ButtonGroup>
        )}
        
        {/* 신규 작성 모달 */}
        <Modal
          title="설문 신규 작성"
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={[
            <Button key="cancel" onClick={handleModalCancel}>
              취소
            </Button>,
            <Button key="submit" type="primary" onClick={handleModalSubmit}>
              저장
            </Button>
          ]}
          width={700}
        >
          <Descriptions bordered column={1}>
            <Descriptions.Item label="설문 제목">
              <Input
                placeholder="설문 제목을 입력하세요"
                value={modalSurvey.title}
                onChange={handleModalTitleChange}
              />
            </Descriptions.Item>
            <Descriptions.Item label="점수설정">
              <div style={{ display: 'flex', gap: '20px' }}>
                <div>
                  <span>시작점수: </span>
                  <Input 
                    type="number" 
                    value={modalSurvey.startScore} 
                    onChange={handleModalStartScoreChange}
                    style={{ width: '80px' }} 
                  />
                </div>
                <div>
                  <span>최대점수: </span>
                  <Input 
                    type="number" 
                    value={modalSurvey.maxScore} 
                    onChange={handleModalMaxScoreChange}
                    style={{ width: '80px' }} 
                  />
                </div>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="문항설정">
              <TextArea
                rows={8}
                placeholder="각 문항을 줄바꿈으로 구분하여 입력하세요"
                value={modalSurvey.questions}
                onChange={handleModalQuestionsChange}
              />
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
    );
  }

  // 기본적으로 URL 발행 화면 표시 (fallback)
  return (
    <div>
      <Card>
        <h2>잘못된 접근입니다.</h2>
        <p>올바른 경로로 접근해주세요.</p>
        <Button onClick={() => navigate('/mng/svc/srvy')}>목록으로 돌아가기</Button>
      </Card>
    </div>
  );
};

export default SurveyDetail;

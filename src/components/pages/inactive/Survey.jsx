import React, { useState } from 'react'
import SubTitleBox from '@/components/common/SubTitleBox'
import QuillEditor from '@/components/admin/common/QuillEditor'
import { Radio, Space, Button, Modal } from 'antd'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    width: 20%;
    padding: 12px;
    background-color: #f5f5f5;
    border: 1px solid #d9d9d9;
    text-align: left;
  }
  
  td {
    padding: 30px 12px;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
`;

const StyledEndedMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  font-size: 18px;
  color: #666;
`;

const QuestionContainer = styled.div`
  width: 100%;
`;

const QuestionHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const QuestionNumber = styled.div`
  width: 30px;
  font-weight: bold;
  vertical-align: top;
`;

const QuestionText = styled.div`
  flex: 1;
`;

const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  word-wrap: break-word;
`;

const AnswerItem = styled.div`
  margin: 5px 0;
  width: 9%;
  text-align: center;
`;

const Survey = () => {
  // 설문 기간 종료 여부 (실제로는 API나 상태 관리에서 가져와야 함)
  const [isSurveyEnded] = useState(false);
  
  // 설문 응답 상태
  const [surveyData, setSurveyData] = useState({
    rating: null,
    comments: ''
  });

  // 모달 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'success' or 'error'

  // 설문 제출 핸들러
  const handleSubmit = () => {
    if (!surveyData.rating) {
      setModalType('error');
      setIsModalVisible(true);
      return;
    }
    
    // TODO: API 호출하여 설문 데이터 제출
    console.log('설문 제출:', surveyData);
    setModalType('success');
    setIsModalVisible(true);
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalVisible(false);
    if (modalType === 'success') {
      // 성공 시 폼 초기화 또는 다른 작업 수행
      setSurveyData({
        rating: null,
        comments: ''
      });
    }
  };

  // 설문 기간이 종료된 경우
  if (isSurveyEnded) {
    return (
      <div id="sub-container">
        <div id="contents">
          <article className="sub-article">
            <SubTitleBox
              title="설문조사"
            />
            <StyledEndedMessage>
              설문 기간이 종료되었습니다.
            </StyledEndedMessage>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div id="sub-container">
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="설문조사"
            description={["고객님의 소중한 의견을 들려주세요."]}
          />

          <form method="post" name="form_survey" id="form_survey">
            <input type="hidden" name="mode" value="insert" />

            <StyledTable>
              <caption>설문조사</caption>
              <tbody>
                <tr>
                  <td>
                    <QuestionContainer>
                      <QuestionHeader>
                        <QuestionNumber>1.</QuestionNumber>
                        <QuestionText>
                          최근 경험하신 일렉트로룩스 설치 서비스에 대해 점수를 주신다면 10점 만점중 몇점을 주시겠습니까?
                        </QuestionText>
                      </QuestionHeader>
                      <AnswerContainer>
                        {[...Array(11)].map((_, index) => (
                          <AnswerItem key={index}>
                            <Radio 
                              id={`answer_1_${index}`}
                              name="answer[1]"
                              value={index}
                              checked={surveyData.rating === index}
                              onChange={(e) => setSurveyData(prev => ({ ...prev, rating: e.target.value }))}
                            >
                              {index} 점
                            </Radio>
                          </AnswerItem>
                        ))}
                      </AnswerContainer>
                    </QuestionContainer>
                  </td>
                </tr>

                <tr>
                  <td>
                    <QuestionContainer>
                      <QuestionHeader>
                        <QuestionNumber>2.</QuestionNumber>
                        <QuestionText>
                          기타의견
                        </QuestionText>
                      </QuestionHeader>
                      <QuillEditor
                        name="comments"
                        id="comments"
                        value={surveyData.comments}
                        onChange={(value) => setSurveyData(prev => ({ ...prev, comments: value }))}
                        height="200px"
                        editorHeight="150px"
                      />
                    </QuestionContainer>
                  </td>
                </tr>
              </tbody>
            </StyledTable>

            <div className="btn-area1 ta-btm">
              <Button type="primary" className="hgbtn blue02" onClick={handleSubmit}>등록</Button>
            </div>
          </form>
        </article>
      </div>

      {/* 성공 모달 */}
      <Modal
        title="설문조사 완료"
        open={isModalVisible && modalType === 'success'}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            확인
          </Button>
        ]}
      >
        <p>설문조사가 성공적으로 제출되었습니다.</p>
        <p>소중한 의견 감사합니다.</p>
      </Modal>

      {/* 오류 모달 */}
      <Modal
        title="입력 오류"
        open={isModalVisible && modalType === 'error'}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            확인
          </Button>
        ]}
      >
        <p>만족도 점수를 선택해주세요.</p>
      </Modal>
    </div>
  )
}

export default Survey

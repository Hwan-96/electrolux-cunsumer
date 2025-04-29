import React, { useState } from 'react'
import SubTitleBox from '@/components/common/SubTitleBox'
import QuillEditor from '@/components/admin/common/QuillEditor'
import { Input, Radio, Space, Upload, Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { axiosInstance, API_ENDPOINTS } from '@/utils/api'

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
    padding: 12px;
    border: 1px solid #d9d9d9;
  }
`;

const StyledLabel = styled.label`
  cursor: pointer;
`;

const StyledNotice = styled.p`
  margin-top: 5px;
  color: #666;
  font-size: 12px;
`;

const EvdCns = () => {
  const [formData, setFormData] = useState({
    cstm_nm: '',
    cstm_tel_no1: '',
    cstm_tel_no2: '',
    cstm_tel_no3: '',
    qstn_cntnt: '',
    agree: 'Y'
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 파일 업로드 핸들러
  const handleFileChange = (info) => {
    const fileList = info.fileList.slice(-3); // 최대 3개 파일만 유지
    setFiles(fileList);
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    try {
      if (!formData.cstm_nm || !formData.cstm_tel_no1 || !formData.cstm_tel_no2 || !formData.cstm_tel_no3) {
        message.error('작성자와 전화번호를 모두 입력해주세요.');
        return;
      }

      // HTML 태그를 제거하고 실제 텍스트 내용만 확인
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = formData.qstn_cntnt;
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      
      if (!textContent.trim()) {
        message.error('내용을 입력해주세요.');
        return;
      }

      if (formData.agree !== 'Y') {
        message.error('개인정보 수집 및 이용에 동의해주세요.');
        return;
      }

      setLoading(true);

      // FormData 생성
      const submitData = new FormData();
      
      // 기본 데이터 추가
      submitData.append('cstm_nm', formData.cstm_nm);
      submitData.append('qstn_cntnt', formData.qstn_cntnt);
      // 전화번호 통합
      const combinedPhoneNumber = `${formData.cstm_tel_no1}${formData.cstm_tel_no2}${formData.cstm_tel_no3}`;
      submitData.append('cstm_tel_no', combinedPhoneNumber);

      // 파일 추가
      files.forEach((file) => {
        if (file.originFileObj) {
          submitData.append('file', file.originFileObj);
        }
      });

      // API 호출
      const response = await axiosInstance.post(API_ENDPOINTS.INACTIVE.EVD_CNS, submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        message.success('상담증빙자료가 성공적으로 등록되었습니다.');
        // 폼 초기화
        setFormData({
          cstm_nm: '',
          cstm_tel_no1: '',
          cstm_tel_no2: '',
          cstm_tel_no3: '',
          qstn_cntnt: '',
          agree: 'Y'
        });
        setFiles([]);
      } else {
        throw new Error(response.data.message || '등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('등록 중 오류:', error);
      message.error(error.response?.data?.message || '등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 취소 핸들러
  const handleCancel = () => {
    if (window.confirm('작성 중인 내용이 모두 삭제됩니다. 취소하시겠습니까?')) {
      setFormData({
        cstm_nm: '',
        cstm_tel_no1: '',
        cstm_tel_no2: '',
        cstm_tel_no3: '',
        qstn_cntnt: '',
        agree: 'Y'
      });
      setFiles([]);
    }
  };

  return (
    <div id="sub-container">
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="상담증빙자료"
            description={["고객센터 (1566-1238) 전화상담후 사진을 등록하는 사이트입니다.", 
            <br key="br" />,
            "전화상담없이 등록된 건은 답변이 진행되지 않으니 고객센터 전화상담 또는 온라인 고객센터 1:1문의를 이용해 주시길 바랍니다."
            ]}
          />

          <form action="" method="post">
            <input type="hidden" name="mode" value="insert"/>
            <StyledTable>
              <caption>상담증빙자료</caption>
              <colgroup>
                <col style={{width: '20%'}}/>
                <col style={{width: '80%'}} />
              </colgroup>
              <tbody>
                <tr>
                  <th>
                    <StyledLabel htmlFor="cstm_nm">
                      작성자
                    </StyledLabel>
                  </th>
                  <td>
                    <Input
                      type="text"
                      name="cstm_nm"
                      id="cstm_nm"
                      value={formData.cstm_nm}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    <StyledLabel htmlFor="cstm_tel_no1">
                      전화번호
                    </StyledLabel>
                  </th>
                  <td>
                    <Space>
                      <Input
                        type="tel"
                        name="cstm_tel_no1"
                        id="cstm_tel_no1"
                        value={formData.cstm_tel_no1}
                        onChange={handleInputChange}
                        maxLength={3}
                      />
                      -
                      <Input
                        type="tel"
                        name="cstm_tel_no2"
                        id="cstm_tel_no2"
                        value={formData.cstm_tel_no2}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                      -
                      <Input
                        type="tel"
                        name="cstm_tel_no3"
                        id="cstm_tel_no3"
                        value={formData.cstm_tel_no3}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                    </Space>
                    <StyledNotice>
                      ※ 고객센터와 상담하셨던 전화번호를 입력해주셔야 확인이 가능합니다
                    </StyledNotice>
                  </td>
                </tr>

                <tr>
                  <th>
                    <StyledLabel htmlFor="qstn_cntnt">
                      내용
                    </StyledLabel>
                  </th>
                  <td>
                    <QuillEditor
                      name="qstn_cntnt"
                      value={formData.qstn_cntnt}
                      onChange={(value) => setFormData(prev => ({ ...prev, qstn_cntnt: value }))}
                    />
                  </td>
                </tr>
                
                <tr>
                  <th>
                    <StyledLabel htmlFor="upload_file">
                      첨부파일
                    </StyledLabel>
                  </th>
                  <td>
                    <Space>
                      <Upload
                        name="upload_file"
                        id="upload_file"
                        maxCount={3}
                        beforeUpload={() => false}
                        onChange={handleFileChange}
                        fileList={files}
                      >
                        <Button icon={<PlusOutlined />}>파일 선택</Button>
                      </Upload>
                    </Space>
                    <StyledNotice>
                      ※ 사진은 최대 3장까지 업로드 가능합니다
                    </StyledNotice>
                  </td>
                </tr>

              </tbody>
            </StyledTable>

            <br />

            <div className="agrbox">
              <p className="tit1">개인정보 수집 및 이용 동의</p>
              <div className="txt1">고객님의 문의사항에 대한 처리를 위해 개인정보 수집 및 이용동의를 받고 있습니다.</div>
              <div className="agrcheck">
                <Radio.Group 
                  name="agree" 
                  value={formData.agree}
                  onChange={(e) => setFormData(prev => ({ ...prev, agree: e.target.value }))}
                >
                  <Radio value="Y">동의함</Radio>
                  <Radio value="N">동의안함</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="btn-area1 ta-btm">
              <button 
                type="button" 
                className="hgbtn blue02" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? '등록 중...' : '등록'}
              </button>
              <button 
                type="button" 
                className="hgbtn grey01" 
                style={{marginLeft: '5px'}}
                onClick={handleCancel}
                disabled={loading}
              >
                취소
              </button>
            </div>
          </form>
        </article>
      </div>
    </div>
  )
}

export default EvdCns
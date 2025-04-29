import React, { useState } from 'react'
import SubTitleBox from '@/components/common/SubTitleBox'
import QuillEditor from '@/components/admin/common/QuillEditor'
import { Input, Radio, Space, Upload, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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
    acnt_name: '',
    acnt_phone1: '',
    acnt_phone2: '',
    acnt_phone3: '',
    contents: '',
    agree: 'Y'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
                    <StyledLabel htmlFor="acnt_name">
                      작성자
                    </StyledLabel>
                  </th>
                  <td>
                    <Input
                      type="text"
                      name="acnt_name"
                      id="acnt_name"
                      value={formData.acnt_name}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <th>
                    <StyledLabel htmlFor="acnt_phone1">
                      전화번호
                    </StyledLabel>
                  </th>
                  <td>
                    <Space>
                      <Input
                        type="tel"
                        name="acnt_phone1"
                        id="acnt_phone1"
                        value={formData.acnt_phone1}
                        onChange={handleInputChange}
                        maxLength={3}
                      />
                      -
                      <Input
                        type="tel"
                        name="acnt_phone2"
                        id="acnt_phone2"
                        value={formData.acnt_phone2}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                      -
                      <Input
                        type="tel"
                        name="acnt_phone3"
                        id="acnt_phone3"
                        value={formData.acnt_phone3}
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
                    <StyledLabel htmlFor="contents">
                      내용
                    </StyledLabel>
                  </th>
                  <td>
                    <QuillEditor
                      name="contents"
                      id="contents"
                      value={formData.contents}
                      onChange={(value) => setFormData(prev => ({ ...prev, contents: value }))}
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
              <button type="button" className="hgbtn blue02">등록</button>
              <button type="button" className="hgbtn grey01" style={{marginLeft: '5px'}}>취소</button>
            </div>
          </form>
        </article>
      </div>
    </div>
  )
}

export default EvdCns
import React, { useState } from 'react'
import SubTitleBox from '@/components/common/SubTitleBox'
import DataTable from '@/components/admin/common/DataTable'
import { Radio, Input, Button, Space, Form } from 'antd'
import styled from 'styled-components'

const StyledSearchForm = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const StyledRadioGroup = styled(Radio.Group)`
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const StyledSearchInput = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const UltraSrch = () => {
  const [searchType, setSearchType] = useState('productSn');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  // 테이블 컬럼 정의
  const columns = [
    {
      title: '고객명',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 120,
    },
    {
      title: '모델명',
      dataIndex: 'modelName',
      key: 'modelName',
      width: 150,
    },
    {
      title: '제품 SN',
      dataIndex: 'productSn',
      key: 'productSn',
      width: 150,
    },
    {
      title: 'KIT SN',
      dataIndex: 'kitSn',
      key: 'kitSn',
      width: 150,
    },
    {
      title: '구입시기',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      width: 120,
    },
    {
      title: '무상 AS시간',
      dataIndex: 'freeServicePeriod',
      key: 'freeServicePeriod',
      width: 120,
    },
  ];

  // 샘플 데이터 (실제로는 API에서 가져와야 함)
  const sampleData = [
    {
      id: 1,
      customerName: '홍길동',
      modelName: 'ABC-123',
      productSn: '12345678',
      kitSn: 'KIT12345',
      purchaseDate: '2023-01-15',
      freeServicePeriod: '2025-01-15',
    },
    {
      id: 2,
      customerName: '김철수',
      modelName: 'DEF-456',
      productSn: '87654321',
      kitSn: 'KIT54321',
      purchaseDate: '2023-03-20',
      freeServicePeriod: '2025-03-20',
    },
  ];

  // 검색 핸들러
  const handleSearch = () => {
    if (!searchValue) {
      return;
    }

    setLoading(true);
    
    // TODO: API 호출하여 데이터 검색
    console.log('검색 타입:', searchType);
    console.log('검색어:', searchValue);
    
    // API 호출 후 데이터 설정
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // 검색 타입 변경 핸들러
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchValue('');
  };

  return (
    <div id="sub-container">
      <div id="contents">
        <article className="sub-article">
          <SubTitleBox
            title="UltraClub 무상 서비스 기간 조회"
          />

          <div>
            <StyledSearchForm>
              <StyledRadioGroup 
                value={searchType} 
                onChange={handleSearchTypeChange}
              >
                <Radio value="productSn">제품 SN</Radio>
                <Radio value="kitSn">KIT SN</Radio>
                <Radio value="customerName">고객명</Radio>
                <Radio value="phoneNumber">전화번호(뒤 4자리)</Radio>
              </StyledRadioGroup>

              <StyledSearchInput>
                <Input
                  placeholder={
                    searchType === 'productSn' ? '제품 SN 8자리 입력' :
                    searchType === 'kitSn' ? 'KIT SN 입력' :
                    searchType === 'customerName' ? '고객명 입력' :
                    '전화번호 뒤 4자리 입력'
                  }
                  value={searchValue}
                  onChange={handleSearchChange}
                  maxLength={searchType === 'phoneNumber' ? 4 : 20}
                />
                <button type="button" className="hgbtn blue02" onClick={handleSearch}>
                  조회
                </button>
              </StyledSearchInput>
            </StyledSearchForm>

            <DataTable
              columns={columns}
              dataSource={sampleData}
              settings={{
                loading: loading,
                bordered: true,
                enableNumbering: true,
              }}
            />
          </div>
        </article>
      </div>
    </div>
  )
}

export default UltraSrch
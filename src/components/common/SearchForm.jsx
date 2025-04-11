import React from 'react';

/**
 * 재사용 가능한 검색 폼 컴포넌트
 * @param {Object} props
 * @param {Array} props.searchOptions - 검색 옵션 배열 (value와 label 속성을 가진 객체 배열)
 * @param {string} props.searchKey - 현재 선택된 검색 옵션
 * @param {string} props.searchValue - 현재 입력된 검색어
 * @param {Function} props.onSearchKeyChange - 검색 옵션 변경 시 호출될 함수
 * @param {Function} props.onSearchValueChange - 검색어 변경 시 호출될 함수
 * @param {Function} props.onSearch - 검색 버튼 클릭 시 호출될 함수
 * @param {Function} props.onReset - 초기화 버튼 클릭 시 호출될 함수
 * @param {string} [props.placeholder="검색어를 입력해 주세요."] - 검색 입력창의 placeholder
 * @param {string} [props.formId="form_search"] - 폼의 ID
 * @returns {JSX.Element}
 */
const SearchForm = ({
  searchOptions,
  searchKey,
  searchValue,
  onSearchKeyChange,
  onSearchValueChange,
  onSearch,
  onReset,
  placeholder = "검색어를 입력해 주세요.",
  formId = "form_search"
}) => {
  // 엔터 키 입력 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form id={formId} onSubmit={(e) => { e.preventDefault(); onSearch(); }}>
      <div className="bd-search">
        <ul className="ip-list1">
          <li className="type">
            <select 
              name="schKey" 
              id="schKey" 
              className="sel01"
              value={searchKey}
              onChange={(e) => onSearchKeyChange(e.target.value)}
            >
              {searchOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </li>
          <li className="txt">
            <label htmlFor="schVal" className="hid">검색어를 입력해 주세요.</label>
            <input 
              type="text" 
              name="schVal" 
              id="schVal" 
              title="검색어" 
              placeholder={placeholder} 
              className="ip01"
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </li>
          <li className="btn">
            <button 
              type="button" 
              className="hgbtn blue02"
              onClick={onSearch}
            >
              검색
            </button>
          </li>
          <li className="btn-reset">
            <button 
              type="button" 
              className="hgbtn grey01"
              onClick={onReset}
            >
              초기화
            </button>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default SearchForm; 
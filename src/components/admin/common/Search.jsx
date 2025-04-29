import React from 'react';
import styled from 'styled-components';
import { sanitizeInput } from '@/utils/security';

const SearchContainer = styled.div`
  width: 100%;
  padding: 15px 25px;
  border: 1px solid #e1e1e1;
  background-color: #fff;
  margin-bottom: 40px;
`;

const SearchBox = styled.div`
  width: 100%;
`;

const InputBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  &:empty {
    display: none;
  }
`;

const InputTitle = styled.p`
  min-width: 130px;
  color: #898989;
`;

const InputRadio = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

const InputText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  label{
    display: inline-block;
    width: 100%;
  }
  input[type="text"] {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: 0.3s;
    transition-property: border-color, box-shadow;

    &.with-button {
      margin-right: 5px;
    }

    &:focus {
      outline: none;
      border-color: #c4d1e3;
      box-shadow: 0 0 2px #c4d1e3, 0 0 5px #c4d1e3;
    }

    &.required-error {
      border-color: #ff0000;
      box-shadow: 0 0 2px #ff0000, 0 0 5px #ff0000;

      &::placeholder {
        color: #ff0000;
      }

      &:focus {
        border-color: #ff0000;
        box-shadow: 0 0 2px #ff0000, 0 0 5px #ff0000;
      }
    }

    &::placeholder {
      color: #cccccc;
    }

    &:read-only {
      color: #898989;
      background-color: #ebebeb;
    }
  }
`;

const InputDate = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;

  label {
    position: relative;
    cursor: pointer;
    width: 100%;
    max-width: 200px;
  }

  input[type="date"] {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-indent: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: 0.3s;
    transition-property: border-color, box-shadow;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 40px;
      margin: 0;
      padding: 0 10px;
      box-sizing: border-box;
      cursor: pointer;
      background-position: right;
      background-size: 20px;
      background-repeat: no-repeat;
    }

    &:focus {
      outline: none;
      border-color: #c4d1e3;
      box-shadow: 0 0 2px #c4d1e3, 0 0 5px #c4d1e3;
    }
  }

  span {
    font-size: 26px;
  }
`;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
`;

const SearchRadio = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #464646;
  cursor: pointer;

  input[type="radio"] {
    margin-right: 5px;
    position: relative;
    width: 18px;
    height: 18px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid #ccc;
    border-radius: 50%;
    background-color: #ebebeb;

    &:before {
      display: none;
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: #354255;
    }

    &:checked {
      &:before {
        display: block;
      }
    }
  }
`;

const SearchButton = styled.button`
  color: #fff;
  width: 100%;
  max-width: 70px;
  height: 40px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid #354255;
  background-color: #354255;
  transition: 0.35s;
  transition-property: box-shadow;

  &:hover {
    background-color: #354255;
  }
`;

const InputSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .select_box {
    max-width: 240px;
    display: flex;
    align-items: center;
    width: 100%;

    &:last-child {
      margin-right: 0;
    }

    label {
      display: block;
      width: 100%;
    }

    select {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url(/admin/icon/i_down_arrow.png);
      background-repeat: no-repeat;
      background-size: 18px;
      background-position: right 10px center;
      padding-right: 30px;

      &:focus {
        outline: none;
        border-color: #c4d1e3;
        box-shadow: 0 0 2px #c4d1e3, 0 0 5px #c4d1e3;
      }

      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
        opacity: 0.7;
      }

      option {
        padding: 5px;
      }

      option[hidden] {
        display: none;
      }
    }
  }
`;

const InputMixed = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;

  .select_box {
    max-width: 240px;
    display: flex;
    align-items: center;
    width: 100%;

    label {
      display: inline-block;
      width: 100%;
    }

    select {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      padding: 0 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url(/admin/icon/i_down_arrow.png);
      background-repeat: no-repeat;
      background-size: 18px;
      background-position: right 10px center;
      padding-right: 30px;

      &:focus {
        outline: none;
        border-color: #c4d1e3;
        box-shadow: 0 0 2px #c4d1e3, 0 0 5px #c4d1e3;
      }

      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
        opacity: 0.7;
      }

      option {
        padding: 5px;
      }

      option[hidden] {
        display: none;
      }
    }
  }

  input[type="text"] {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: 0.3s;
    transition-property: border-color, box-shadow;

    &:focus {
      outline: none;
      border-color: #c4d1e3;
      box-shadow: 0 0 2px #c4d1e3, 0 0 5px #c4d1e3;
    }

    &::placeholder {
      color: #cccccc;
    }
  }
`;

const Search = ({ 
  rows = [],
  onSearch,
  className,
  showButton = true
}) => {
  const hasRadioRows = rows.some(row => row.type === 'radio');
  const hasTextRows = rows.some(row => row.type === 'text');
  const hasDateRows = rows.some(row => row.type === 'date');
  const hasSelectRows = rows.some(row => row.type === 'select');
  const hasMixedRows = rows.some(row => row.type === 'mixed');

  const handleDateChange = (startDate, endDate, onStartDateChange, onEndDateChange, e) => {
    const isStartDate = e.target.name === 'startDate';
    const newDate = e.target.value;

    if (isStartDate) {
      if (endDate && new Date(newDate) > new Date(endDate)) {
        alert('시작일이 종료일보다 늦은 날짜입니다. 날짜를 다시 선택해주세요.');
        onStartDateChange({ target: { value: '' } });
        return;
      }
      onStartDateChange(e);
    } else {
      if (startDate && new Date(startDate) > new Date(newDate)) {
        alert('시작일이 종료일보다 늦은 날짜입니다. 날짜를 다시 선택해주세요.');
        onEndDateChange({ target: { value: '' } });
        return;
      }
      onEndDateChange(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const shouldShowButtonInRow = (row) => {
    if (row.showButton !== undefined) {
      return row.showButton;
    }
    return showButton;
  };

  return (
    <SearchContainer className={className}>
      <SearchBox>
        {hasRadioRows && (
          <InputBox>
            {rows.map((row, index) => {
              if (row.type === 'radio') {
                return (
                  <React.Fragment key={index}>
                    <InputTitle>{sanitizeInput(row.title)}</InputTitle>
                    <InputRadio>
                      {row.options.map((option) => (
                        <SearchRadio key={option.value}>
                          <input
                            type="radio"
                            name={row.name}
                            value={option.value}
                            checked={row.value === option.value}
                            onChange={row.onChange}
                          />
                          {sanitizeInput(option.label)}
                        </SearchRadio>
                      ))}
                    </InputRadio>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </InputBox>
        )}
        {hasSelectRows && (
          <InputBox>
            {rows.map((row, index) => {
              if (row.type === 'select' && row.selects) {
                return (
                  <React.Fragment key={index}>
                    <InputTitle>{sanitizeInput(row.title)}</InputTitle>
                    <InputSelect>
                      {row.selects.map((select, selectIndex) => (
                        <div key={selectIndex} className="select_box">
                          <label>
                            <select
                              value={select.value}
                              onChange={select.onChange}
                              disabled={select.disabled}
                            >
                              <option hidden>선택</option>
                              {select.options && select.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {sanitizeInput(option.label)}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      ))}
                    </InputSelect>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </InputBox>
        )}
        {hasDateRows && (
          <InputBox>
            {rows.map((row, index) => {
              if (row.type === 'date') {
                return (
                  <React.Fragment key={index}>
                    <InputTitle>{sanitizeInput(row.title)}</InputTitle>
                    <InputDate>
                      <label>
                        <input
                          type="date"
                          name="startDate"
                          value={row.startDate}
                          onChange={(e) => handleDateChange(
                            row.startDate,
                            row.endDate,
                            row.onStartDateChange,
                            row.onEndDateChange,
                            e
                          )}
                        />
                      </label>
                      <span>~</span>
                      <label>
                        <input
                          type="date"
                          name="endDate"
                          value={row.endDate}
                          onChange={(e) => handleDateChange(
                            row.startDate,
                            row.endDate,
                            row.onStartDateChange,
                            row.onEndDateChange,
                            e
                          )}
                        />
                      </label>
                      {onSearch && shouldShowButtonInRow(row) && (
                        <SearchButton onClick={onSearch}>검색</SearchButton>
                      )}
                    </InputDate>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </InputBox>
        )}
        {hasMixedRows && (
          <InputBox>
            {rows.map((row, index) => {
              if (row.type === 'mixed') {
                return (
                  <React.Fragment key={index}>
                    <InputTitle>{sanitizeInput(row.title)}</InputTitle>
                    <InputMixed>
                      {row.selects && row.selects.map((select, selectIndex) => (
                        <div key={selectIndex} className="select_box">
                          <label>
                            <select
                              value={select.value}
                              onChange={select.onChange}
                              disabled={select.disabled}
                            >
                              <option hidden>선택</option>
                              {select.options && select.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {sanitizeInput(option.label)}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>
                      ))}
                      {row.text && (
                        <input
                          type="text"
                          placeholder={sanitizeInput(row.text.placeholder)}
                          value={row.text.value}
                          onChange={row.text.onChange}
                          onKeyPress={handleKeyPress}
                        />
                      )}
                      {onSearch && shouldShowButtonInRow(row) && (
                        <SearchButton onClick={onSearch}>검색</SearchButton>
                      )}
                    </InputMixed>
                  </React.Fragment>
                );
              }
              return null;
            })}
          </InputBox>
        )}
        {hasTextRows && (
          <InputBox>
            <InputText>
              {rows.map((row, index) => {
                if (row.type === 'text') {
                  return (
                    <React.Fragment key={index}>
                      <InputTitle>{sanitizeInput(row.title)}</InputTitle>
                      <input
                        type="text"
                        placeholder={sanitizeInput(row.placeholder)}
                        value={row.value}
                        onChange={row.onChange}
                        onKeyPress={handleKeyPress}
                        className="with-button"
                      />
                      {onSearch && shouldShowButtonInRow(row) && (
                        <SearchButton onClick={onSearch}>검색</SearchButton>
                      )}
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </InputText>
          </InputBox>
        )}
      </SearchBox>
    </SearchContainer>
  );
};

export default Search;


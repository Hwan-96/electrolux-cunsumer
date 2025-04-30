import React from 'react'
import { Input } from 'antd'

const InputNum = ({ name, value, onChange, maxLength, ...props }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, '');
    onChange({
      target: {
        name,
        value: numericValue
      }
    });
  };

  return (
    <Input
      name={name}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      inputMode="numeric"
      {...props}
    />
  )
}

export default InputNum
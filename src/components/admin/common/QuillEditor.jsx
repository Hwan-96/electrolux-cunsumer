import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
// import PropTypes from 'prop-types';

const QuillEditor = ({ 
  value, 
  onChange, 
  placeholder = '내용을 입력하세요', 
  height = '200px', 
  editorHeight = '150px' 
}) => {
  // 에디터 툴바 설정
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div style={{ height }}>
      <ReactQuill 
        theme="snow"
        modules={modules}
        value={value || ''} 
        onChange={onChange}
        placeholder={placeholder}
        style={{ height: editorHeight }}
      />
    </div>
  );
};

// QuillEditor.propTypes = {
//   value: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   height: PropTypes.string,
//   editorHeight: PropTypes.string
// };

export default QuillEditor; 
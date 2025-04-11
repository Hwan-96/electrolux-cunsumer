import React from 'react';

/**
 * 재사용 가능한 페이지네이션 컴포넌트
 * @param {Object} props
 * @param {number} props.currentPage - 현재 페이지 번호
 * @param {number} props.totalPages - 전체 페이지 수
 * @param {Function} props.onPageChange - 페이지 변경 시 호출될 콜백 함수 (페이지 번호를 인자로 받음)
 * @param {number} [props.pageButtonCount=10] - 표시할 페이지 버튼 수 (기본값: 10)
 * @returns {JSX.Element|null}
 */
const Pagination = ({ currentPage, totalPages, onPageChange, pageButtonCount = 10 }) => {
  if (totalPages <= 0) return null;

  // 시작 페이지와 끝 페이지 계산
  let startPage = Math.max(1, Math.floor((currentPage - 1) / pageButtonCount) * pageButtonCount + 1);
  let endPage = Math.min(totalPages, startPage + pageButtonCount - 1);

  // pageButtonCount만큼 표시하도록 조정
  if (endPage - startPage + 1 < pageButtonCount && startPage > 1) {
    startPage = Math.max(1, endPage - pageButtonCount + 1);
  }

  // 페이지 버튼 생성
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <span key={i} className="page_num">
        <a 
          href="#" 
          className={i === currentPage ? 'on' : ''}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(i);
          }}
        >
          {i}
        </a>
      </span>
    );
  }

  return (
    <div className="pagenate">
      <div className="page">
        {pageButtons}
      </div>
    </div>
  );
};

export default Pagination; 
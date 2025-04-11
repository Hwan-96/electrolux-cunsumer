import React from 'react';

const SubTitleBox = ({ title, description }) => {
  return (
    <div className="sub-tit-box">
      <h2>{title}</h2>
      <p className="txt1">{description}</p>
    </div>
  );
};

export default SubTitleBox; 
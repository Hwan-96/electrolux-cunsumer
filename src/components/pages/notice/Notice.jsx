import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeList from './NoticeList';
import NoticeDetail from './NoticeDetail';

const Notice = () => {
  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      <Route path="/:id" element={<NoticeDetail />} />
    </Routes>
  );
};

export default Notice; 
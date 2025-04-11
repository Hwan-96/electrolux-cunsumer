import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EventList from './EventList';
import EventDetail from './EventDetail';

const Event = () => {
  return (
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/detail/:id" element={<EventDetail />} />
    </Routes>
  );
};

export default Event;
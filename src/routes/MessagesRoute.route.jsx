import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Messages from '../pages/Messages/Messages.page';

export default function MessagesRoute() {
  return (
    <Routes>
      <Route path='*' element={<Messages />} />
      <Route path=':roomId' element={<Messages />} />
    </Routes>
  );
}

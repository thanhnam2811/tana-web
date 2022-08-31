import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home.page';
import MessagesRoute from './MessagesRoute.route';

export default function MainRoute() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/home' />} />
      <Route path='home' element={<Home />} />
      <Route path='messages/*' element={<MessagesRoute />} />
    </Routes>
  );
}

import React from 'react';
import { useSelector } from 'react-redux';

import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../pages/Auth/Auth.page';
import Home from '../pages/Home/Home.page';
import MessagesRoute from './MessagesRoute.route';
import ProtectedElement from './ProtectedElement.route';

export default function MainRoute() {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path='auth'
        element={
          !user.isFetching && !user.data ? (
            <Auth />
          ) : (
            <Navigate replace to='/home' />
          )
        }
      />

      <Route
        path='home/*'
        element={
          <ProtectedElement>
            <Home />
          </ProtectedElement>
        }
      />
      <Route
        path='friends/*'
        element={
          <ProtectedElement>
            <div>Friend</div>
          </ProtectedElement>
        }
      />
      <Route
        path='messages/*'
        element={
          <ProtectedElement>
            <MessagesRoute />
          </ProtectedElement>
        }
      />
      <Route
        path='profile/*'
        element={
          <ProtectedElement>
            <div>Profile</div>
          </ProtectedElement>
        }
      />

      <Route path='/*' element={<Navigate replace to='/home' />} />
    </Routes>
  );
}

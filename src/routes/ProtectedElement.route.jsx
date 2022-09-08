import React from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedElement({ children }) {
  const user = useSelector((state) => state.user);
  const isNotAuth = !user.isFetching && !user.data;

  return isNotAuth ? <Navigate replace to='/auth' /> : children;
}

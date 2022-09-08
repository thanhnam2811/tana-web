import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    setToken(token);
  };

  return { token, setToken: saveToken };
}

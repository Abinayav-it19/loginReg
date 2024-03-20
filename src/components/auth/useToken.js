import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if(tokenString!=null)
    return tokenString
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', userToken);
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('firstTime', 1);
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  }
}
/* eslint-disable node/no-unpublished-import */
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { PingServer } from '../AuthApi';
import { useRefreshToken } from './useRefreshToken';


export const useToken = (): [string | null, (newToken: string) => void] => {
  // const nav = useNavigate()
  const [, setRefreshToken] = useRefreshToken();
  const [token, setInternalToken] = useState<string | null>(() => {
    const jwt = window.localStorage.getItem('JWTToken') as string;
    PingServer(jwt)
    .then((result) =>{
      setRefreshToken(result.refresh);
      setToken(result.access);
    })
    .catch(() => {
      window.localStorage.removeItem('JWTToken');
    })
    return jwt;
});


  const setToken = (newToken: string) =>{
    localStorage.setItem('JWTToken', newToken);
    setInternalToken(newToken);
  }

  return [token, setToken];

}

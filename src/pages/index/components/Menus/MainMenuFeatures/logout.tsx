/* eslint-disable node/no-unpublished-import */
import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useToken } from '../../../../../lib/hooks/useToken';
import { useRefreshToken } from '../../../../../lib/hooks/useRefreshToken';
import { logout } from '../../../../../lib/AuthApi';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../../../lib/confirmationModal';


const Button = styled.button`
  position: absolute;
  top: 45%;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 10px; 
  border: none;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: #222;
  }
`;

const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); /* Example animation */
  }
  position: absolute;
  top: 3%;
  right: 5%;
`;

const Logout: React.FC<{ setChild: Dispatch<boolean> }> = ({ setChild }) => {
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [refreshjwt,] = useRefreshToken();
  const [jwt,] = useToken();
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    window.localStorage.removeItem('JWTToken');
    window.localStorage.removeItem('JWTRefreshToken');
    logout(jwt as string, refreshjwt)
      .then(() => navigate('/login'));
  };

  return (
    <>
      <Button onClick={() => setConfirmState(!confirmState)}>Logout!</Button>
      <Close onClick={() => setChild(false)} />

      {confirmState && <ConfirmationModal func={handleClick} setState={setConfirmState} details='Log out?' />}
    </>
  );
};

export default Logout;

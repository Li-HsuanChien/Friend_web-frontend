import React, { useContext } from 'react';
import { AppContext } from '../../../../../AppContext';
import { closeMenu } from '../../../../../actions';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styled from 'styled-components';




const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); 
  }
  position: absolute;
  top: 3%;
  right: 3%;
`;

const DefaultConnectionMenu = () =>{

  const { clickedconnection, dispatch } = useContext(AppContext);

  return(
    <>
      <p>@{clickedconnection?.id}</p>
      <span>closeness:</span>
      <p>{clickedconnection?.closeness}</p>
      <span>nicknamechildtoparent: </span>
      <p>{clickedconnection?.nicknamechildtoparent}</p>
      <span>nicknameparenttochild: </span>
      <p>{clickedconnection?.nicknameparenttochild}</p>
      <Close onClick={()=>dispatch(closeMenu())} />
    </>
  )
}


export default DefaultConnectionMenu;

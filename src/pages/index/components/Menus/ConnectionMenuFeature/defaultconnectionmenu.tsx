import React, { useContext } from 'react';
import { AppContext } from '../../../../../AppContext';
import { closeMenu } from '../../../../../actions';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styled from 'styled-components';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  span{
    height: 20%;
    background-color: black;
    border-radius: 15px;
    padding: 5px;
    color: white;
    margin-top: 3%;
  }
  p{
    background-color: white;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    margin-top: 10px;
    text-align: right;
  }
  p:first-child{
    margin-top: 40px;
  }
`


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
      <MenuStyle>
          <p>@{clickedconnection?.id}</p>
          <span>closeness:</span>
          <p>{clickedconnection?.closeness}</p>
          <span>nicknamechildtoparent: </span>
          <p>{clickedconnection?.nicknamechildtoparent}</p>
          <span>nicknameparenttochild: </span>
          <p>{clickedconnection?.nicknameparenttochild}</p>
      </MenuStyle>
      <Close onClick={()=>dispatch(closeMenu())} />
    </>
  )
}


export default DefaultConnectionMenu;

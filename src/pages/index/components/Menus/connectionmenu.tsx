import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import { useUser } from '../../../../lib/hooks/useUser';
import MainConnectionMenu from './ConnectionMenuFeature/mainconnectionmenu';
import DefaultConnectionMenu from './ConnectionMenuFeature/defaultconnectionmenu';

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


const ConnectionMenu= () =>{
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const { clickedconnection } = useContext(AppContext);

  return(
    <>
        {clickedconnection?.inviter===current_user_id || clickedconnection?.invitee===current_user_id
          ? <MainConnectionMenu/>
          : <MenuStyle><DefaultConnectionMenu/></MenuStyle>}
    </>
  )
}
export default ConnectionMenu;

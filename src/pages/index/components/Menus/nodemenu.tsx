import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import DefaultNodeMenu from './NodeMenuComponents/defaultnodemenu';
import MainNodeMenu from './NodeMenuComponents/mainnodemenu';
import { useUser } from '../../../../lib/hooks/useUser';

  const MenuStyle = styled.div`
    background-color: grey;
    position: absolute;
    border-radius: 5%;
    width: 20vw;
    height: 95vh;
    right: 2vw;
    top: 2vh;
    padding: 0 2% 0;
    img{
      width: 50%;
      max-height: 20%;
      height: auto;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
    div{
      height: 15%;
      background-color: white;
      border: 2px solid black;
      border-radius: 15px;
      padding: 10px;
    }
    span{
      background-color: black;
      border-radius: 15px;
      padding: 5px;
      color: white;
      display:inline-block;
      margin-top: 2%;
    }
    p{
      background-color: white;
      border: 2px solid black;
      border-radius: 15px;
      padding: 5px;
      margin-bottom: 10px;
      text-align: right;
    }
    p:first-child{
      margin-top: 30px;
    }
    a{
      color: black;
    }

  `
const NodeMenu = () =>{
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const { clickeduser } = useContext(AppContext);

  return(
      <>
        {clickeduser?.username_id===current_user_id
            ? <MainNodeMenu/>
            : <MenuStyle><DefaultNodeMenu/></MenuStyle>}
      </>
  )
}


export default NodeMenu;

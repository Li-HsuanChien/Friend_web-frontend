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
    width: 100%;
    max-height: 30%;
    height: auto;
    object-fit: contain;
    }
  div{
    height: 20%;
    background-color: white;
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
    margin-top: 40px;
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
        {/* {clickeduser?.username_id===current_user_id
            ? <MainNodeMenu/>
            : <MenuStyle><DefaultNodeMenu/></MenuStyle>} */}
        {clickeduser?.username_id!==current_user_id
            ? <MainNodeMenu/>
            : <MenuStyle><DefaultNodeMenu/></MenuStyle>}
      </>
  )
}


export default NodeMenu;

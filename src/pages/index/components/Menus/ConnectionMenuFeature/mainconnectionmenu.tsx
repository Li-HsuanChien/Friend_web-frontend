import React, { useState } from 'react';
import DefaultConnectionMenu from './defaultconnectionmenu';
import EditConnectionMenu from './editconnectionmenu';
import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  top: 80%;
  right: 5%;
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

const MainConnectionMenu = () =>{

  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      {editState ? <EditConnectionMenu setEditState={setEditState} editState={editState}/>: <DefaultConnectionMenu/>}
      {editState ? '': <Button onClick={()=>{
        setEditState(!editState)}}>edit</Button> }
    </>
  )
}


export default MainConnectionMenu;

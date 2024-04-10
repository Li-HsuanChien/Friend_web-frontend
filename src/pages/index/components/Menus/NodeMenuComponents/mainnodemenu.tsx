import React, { useState } from 'react';
import DefaultNodeMenu from './defaultnodemenu';
import EditNodeMenu from './editnodemenu';
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
    margin-top: 3%;
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
const Button = styled.button`
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



const MainNodeMenu = () =>{
  const [editState, setEditState] = useState<boolean>(false);

  if(editState){
    return(<><EditNodeMenu setEditState={setEditState} editState={editState}/></>)
  } else {
    return(
      <MenuStyle>
        <DefaultNodeMenu/>
        <Button onClick={()=>{setEditState(!editState);}}>edit</Button>
      </MenuStyle>
    )
  }
}

export default MainNodeMenu;



import React, { useState, useContext } from 'react';
import DefaultConnectionMenu from './defaultconnectionmenu';
import EditConnectionMenu from './editconnectionmenu';
import styled from 'styled-components';
import ConfirmationModal from '../../../../../lib/confirmationModal';
import { ConnectionDelete } from '../../../../../lib/ConnectionFunctions';
import { useToken } from '../../../../../lib/hooks/useToken';
import { AppContext } from '../../../../../AppContext';

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

const ButtonGroup = styled.div`
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  button{
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
  }
  button:first-child{
    background-color: red;
  }
  button:first-child:hover{
    background-color: #f8baba;
  }
  button:hover{
    background-color: #222;
  }
`;

const MainConnectionMenu = () =>{
  const [jwt,] = useToken();
  const [editState, setEditState] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const { clickedconnection } = useContext(AppContext);

  const handleDelete = () =>{
    ConnectionDelete( clickedconnection?.id as string, jwt as string)
    .then((res) => alert('connection deleted!'))
    .catch((err) => console.log(err))
  }
  if(modalState) {
    return(<ConfirmationModal func={handleDelete} setState={setModalState} details='Are you sure you want to delete connection? '/>)
  } else if(editState){
    return(
      <>
        <EditConnectionMenu setEditState={setEditState} editState={editState}/>
      </>
    )
  } else {
    return(
      <MenuStyle>
        <DefaultConnectionMenu/>
        <ButtonGroup>
          <button onClick={()=> setModalState(!modalState)}>delete</button>
          <button onClick={() => setEditState(!editState)}>edit</button>
        </ButtonGroup>
      </MenuStyle>
    )
  }
}


export default MainConnectionMenu;

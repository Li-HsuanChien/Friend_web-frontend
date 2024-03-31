/* eslint-disable node/no-unpublished-import */
import React, { useContext } from 'react';
import WorkspaceComponent from './components/workspace';
import styled from 'styled-components';
import { AppContext } from '../../AppContext';
import MenuIcon from './components/Menus/menuIcon';
import MainMenu from './components/Menus/mainmenu';
import NodeMenu from './components/Menus/nodemenu';
import ConnectionMenu from './components/Menus/connectionmenu';


const Topright = styled.div`
  position: fixed;
  top: 2vh;  
  right: 3vw; 
`;
const StyleDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;
  margin: 0;
  display: flex;
  flex-flow: column nowrap;

  user-select: none;

  div {
    flex: 1;

    display: grid;
    grid-template: 1fr / 3em 9em 1fr;
  }
`

function Main() {
  const { menustate, clickedconnection, clickeduser } = useContext(AppContext);

  return (
    <>
      <StyleDiv>
        <WorkspaceComponent/>
      </StyleDiv>
      <Topright>
          <MenuIcon/>
      </Topright>
      {menustate && <MainMenu/>}
      {clickeduser && <NodeMenu/>}
      {clickedconnection && <ConnectionMenu/>}
    </>
  )
  ;
}

export default Main;

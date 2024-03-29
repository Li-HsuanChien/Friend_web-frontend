import React , { useState, useContext } from 'react';
import styled from 'styled-components';
import ConnectSearchFeature from './MainMenuFeatures/connectsearch';
import ConnectPendingFeature from './MainMenuFeatures/connectpending';
import Logout from './MainMenuFeatures/logout';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AppContext } from '../../../../AppContext';
import { closeMenu } from '../../../../actions';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  display: flex;
  gap: 1%;
  flex-direction: column;
  align-items: center;
`
const ItemStyle = styled.button`
  width: 96%;
  height: 5%;
  margin-top: 15%;
  align-items: center;
  text-align: center;
  display: grid;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border-radius: 30px; 
  border: none;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  line-height: 0;
  font-family: 'Times New Roman', Times, serif;

  &:hover {
    background-color: #222;
  }
`;

const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); 
  }
  position: absolute;
  top: 3%;
  right: 5%;
`;

const MainMenu = () => {
  const [connectSearchState, setConnectSearchState] = useState(false);
  const [connectionPendingState, setConnectionPendingState] = useState(false);
  const [logoutState, setLogoutState] = useState(false);
  const [feature2State, setFeature2State] = useState(false);
  const [feature3State, setFeature3State] = useState(false);
  const { dispatch } = useContext(AppContext);
  // Add more feature states as needed

  let componentToRender;

  switch (true) {
    case connectSearchState:
      componentToRender = <ConnectSearchFeature setChild={setConnectSearchState} />;
      break;
    case connectionPendingState:
      componentToRender = <ConnectPendingFeature setChild={setConnectionPendingState} />;
      break;
    case logoutState:
      componentToRender = <Logout setChild={setLogoutState}/>;
    break;
    // case feature2State:
    //   componentToRender = <Feature2 />;
    //   break;
    default:
      componentToRender = (
        <>
          <ItemStyle onClick={() => setConnectSearchState(!connectSearchState)}>
            Connect
          </ItemStyle>
          <ItemStyle onClick={() => setConnectionPendingState(!connectionPendingState)}>
            Pending Connection
          </ItemStyle>
          <ItemStyle onClick={() => setLogoutState(!logoutState)}>
            Logout
          </ItemStyle>
          <ItemStyle onClick={() => setFeature2State(!feature2State)}>
            Feature 2
          </ItemStyle>
          <ItemStyle onClick={() => setFeature3State(!feature3State)}>
            Feature 3
          </ItemStyle>
          <ItemStyle>
            Share Website!
            {/* copy clipboard url */}
          </ItemStyle>
          <Close onClick={()=>dispatch(closeMenu())} />
        </>
      );
  }

  return (
    <>
      <MenuStyle>
        {componentToRender}
      </MenuStyle>
    </>
  );
};

export default MainMenu;

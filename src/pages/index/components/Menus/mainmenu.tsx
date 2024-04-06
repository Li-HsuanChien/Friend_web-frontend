import React , { useState, useContext } from 'react';
import styled from 'styled-components';
import ConnectSearchFeature from './MainMenuFeatures/connectsearch';
import ConnectPendingFeature from './MainMenuFeatures/connectpending';
import Logout from './MainMenuFeatures/logout';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AppContext } from '../../../../AppContext';
import { closeMenu } from '../../../../actions';
import ClipBoardModal from '../../../../lib/clipboardModal';
import { CreateInviteToken } from '../../../../lib/inviteFunctions';
import { useToken } from '../../../../lib/hooks/useToken';
import { fronturl } from '../../../../lib/domainList';

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
  const [token, ] = useToken();
  const [connectSearchState, setConnectSearchState] = useState(false);
  const [connectionPendingState, setConnectionPendingState] = useState(false);
  const [logoutState, setLogoutState] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteLinkState, setInviteLinkState] = useState(false);
  const [shareLinkState, setShareLinkState] = useState(false);
  const { dispatch } = useContext(AppContext);

  const createInviteLink = () => {
    CreateInviteToken(token as string)
    .then((result) => {
      setInviteLink(`${fronturl}invite/${result.id}`);
      setInviteLinkState(!inviteLinkState);
    })
    .catch((err) =>{
      console.log(err);
    })
  };

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
    case inviteLinkState:
      componentToRender = <ClipBoardModal setState={setInviteLinkState} details={inviteLink}/>;
      break;
    case shareLinkState:
      componentToRender = <ClipBoardModal setState={setShareLinkState} details={fronturl}/>;
      break;
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
          <ItemStyle onClick={createInviteLink}>
            Invite friends!
          </ItemStyle>
          <ItemStyle onClick={() => setShareLinkState(!shareLinkState)}>
            Share Website!
          </ItemStyle>
          {/* <ItemStyle>
            Feature
          </ItemStyle> */}
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

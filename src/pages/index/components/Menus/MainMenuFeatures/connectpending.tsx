import React , { useState, Dispatch , useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getPendingConnection, ConnectionUpdate, ConnectionDelete } from '../../../../../lib/ConnectionFunctions';
import { getUserData } from '../../../../../lib/UserDataFunctions';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useUser } from '../../../../../lib/hooks/useUser';
import { useToken } from '../../../../../lib/hooks/useToken';
import { ConnectionData, SuccessUserData } from '../../../../../lib/Types';

interface ConnectionUserItem extends SuccessUserData{
  connection_id: string;
}

type Action = 'accept' | 'reject' | 'default'

const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); /* Example animation */
  }
  position: absolute;
  top: 3%;
  right: 5%;
`;
const Query = styled.div`
  position: absolute;
  top: 10%;
  height: 88%;
  width: 95%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px; 
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background: none; 
    border: 2px solid #fff; 
    border-radius: 10px; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background: none; 
  }
`
const fadeOutLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

// Fade out animation to the right
const fadeOutRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const fadeLeftAnimation = css`
  animation: ${fadeOutLeft} 1s ease forwards;
`;

const fadeRightAnimation = css`
  animation: ${fadeOutRight} 1s ease forwards;
`;

const QueryItems = styled.div<{ action: Action }>`
  width: 100%;
  height: 10%;
  background-color: white;
  border: 2px solid black;
  border-radius: 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  justify-content: space-between; 
  padding: 0 10px; 
  img {
    height: 100%;
  }

  div:last-child {
    display: flex;
    align-items: end;
    height: 100%;
  }

  ${({ action }) => {
    switch (action) {
      case 'accept':
        return fadeRightAnimation;
      case 'reject':
        return fadeLeftAnimation;
      default:
        return '';
    }
  }};
`;

const Button = styled.button`
  width: 50%;
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  border-radius: 10px; 
  border: none;
  height: 100%;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center;
  &:hover {
    transform: scale(1.1); 
  }
`;

const ConnectPendingFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [jwt] = useToken();
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const [userConnectionDatas, setUserConnectionDatas] = useState<ConnectionUserItem[]>([]);
  const [Connections, setConnections] = useState<ConnectionData[]>([]);
  const [clickedConnection, setClickedConnections] = useState<string>('');
  const [action, setAction] = useState<Action>('default');

  useEffect(() =>{
    getPendingConnection(current_user_id as string, jwt as string)
    .then((result) => setConnections(result))
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataPromises = Connections.map(async (instance) => {
        const notCurrentUser = instance.invitee === current_user_id ? instance.inviter : instance.invitee;
        const userData = await getUserData(notCurrentUser, jwt as string);
        const connectionUserData: ConnectionUserItem = {...userData, connection_id: instance.id}
        return connectionUserData;
      });
      const userDataArray = await Promise.all(userDataPromises);
      setUserConnectionDatas(userDataArray);
    };
    fetchUserData();
  }, [Connections]);

  useEffect(() =>{
    setUserConnectionDatas(Connections => Connections.filter(item => item.connection_id !== clickedConnection));
  }, [action])

  const  acceptConnectRequest = (connection_id: string)=>{
    setClickedConnections(connection_id)
    setAction('accept')
    ConnectionUpdate(connection_id, jwt as string)
    .then(()=> {
      alert('accepted!')
    })
    .catch((err) => console.error(err))
  }

  const  rejectConnectRequest = (connection_id: string)=>{
    setClickedConnections(connection_id)
    setAction('reject');
    ConnectionDelete(connection_id, jwt as string)
    .then(()=> {
      alert('rejected!')
    })
    .catch((err) => console.error(err))
  }

  return(
    <>
      <Close onClick={()=>setChild(false)} />
      <Query>
        {userConnectionDatas ? userConnectionDatas.map((item) => (
          <QueryItems key={item.connection_id} action={action}>
            <img
              src={`${item.headshot}`}
              alt={item.username}
            />
            <div>{item.username}</div>
            <div>
              <Button onClick={() => acceptConnectRequest(item.connection_id)}>accept</Button>
              <Button onClick={() => rejectConnectRequest(item.connection_id)}>reject</Button>
            </div>
          </QueryItems>
        )) : <p>No items</p>}
      </Query>
    </>
  )
}


export default ConnectPendingFeature;

import React , { useState, Dispatch, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { getPendingConnection, ConnectionUpdate, ConnectionDelete } from '../../../../../lib/ConnectionFunctions';
import { getUserData } from '../../../../../lib/UserDataFunctions';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useUser } from '../../../../../lib/hooks/useUser';
import { useToken } from '../../../../../lib/hooks/useToken';
import { ConnectionData, SuccessUserData } from '../../../../../lib/Types';

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
const QueryItems = styled.div`
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`

interface ConnectionUserItem extends SuccessUserData{
  connection_id: string;
}

const ConnectPendingFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [jwt] = useToken();
  const user = useUser();
  const current_user_id = user ? user.user_id: null;
  const [userConnectionDatas, setUserConnectionDatas] = useState<ConnectionUserItem[]>([]);
  const [Connections, setConnections] = useState<ConnectionData[]>([]);

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

  const  acceptConnectRequest = (connection_id: string)=>{
    ConnectionUpdate(connection_id, jwt as string)
    .then(result=> console.log(result));
  }

  const  rejectConnectRequest = (connection_id: string)=>{
    ConnectionDelete(connection_id, jwt as string)
    .then(result=> console.log(result));
  }

  return(
    <>
      <Close onClick={()=>setChild(false)} />
      <Query>
        {userConnectionDatas ? userConnectionDatas.map((item) => (
          <QueryItems key={item.connection_id}>
            <img
              src={`${item.headshot}`}
              alt={item.username}
              style={{ height: '100%' }}
            />
            <div>{item.username}</div>
            <div>
              <button onClick={() => acceptConnectRequest(item.connection_id)}>accept</button>
              <button onClick={() => rejectConnectRequest(item.connection_id)}>reject</button>
            </div>
          </QueryItems>
        )) : <p>No items</p>}
      </Query>
    </>
  )
}


export default ConnectPendingFeature;
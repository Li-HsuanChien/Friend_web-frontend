import React , { useState, Dispatch } from 'react';
import styled,  { keyframes, css } from 'styled-components';
import { searchUser } from '../../../../../lib/searchUser'
import { ConnectionCreate } from '../../../../../lib/ConnectionFunctions';
import { SearchedUser } from '../../../../../lib/Types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useToken } from '../../../../../lib/hooks/useToken';
import { ChangeEvent } from 'react';

const SearchBar = styled.div`
  position: absolute;
  top: 2%;
  display: flex;
  align-items: center;
  input{
    width: 70%; 
    padding: 8px; 
    border-radius: 5px; 
    border: 1px solid #ccc; 
  }
  button{
    margin-left: 10px;
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
  button:hover {
    background-color: #222;
  }
  
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
const fadeOutUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const fadeUpAnimation = css`
  animation: ${fadeOutUp} 1s ease forwards;
`;

type Action = 'connect' | 'default'

const QueryItems = styled.div<{action: Action}>`
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
  ${({ action }) => action === 'connect' ? fadeUpAnimation : ''}
`;

const Button = styled.button`
  width: 30%;
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

const QueryItem: React.FC<{
  userData: SearchedUser;
  ConnectRequest: (invitee_id: string) => void;
}> = ({ userData, ConnectRequest }) => {
  const [action, setAction] = useState<Action>('default');

  return (
    <QueryItems action={action}>
      <img
              src={`${userData.headshot}`}
              alt={userData.username}
              style={{ height: '100%' }}
            />
      <div>{userData.username}</div>
      <Button onClick={() => {
        setAction('connect');
        setTimeout(() => {
          ConnectRequest(userData.username_id);
        }, 1000);
      }}>connect</Button>
    </QueryItems>
  );
};



const ConnectSearchFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [jwt] = useToken();
  const [searchQuery, setSearchQuery] = useState<SearchedUser[]>([]);
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    searchUser(search, jwt as string)
    .then((result) => setSearchQuery(result));
  }

  const submitConnectRequest = (invitee_id: string)=>{
    setSearchQuery(searchQuery.filter(item => item.username_id !== invitee_id));
    ConnectionCreate(jwt as string, invitee_id)
    .then(result=> console.log(result));
  }

  return(
    <>
      <SearchBar>
        <form onSubmit={handleSubmit} role="search">
          <input
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
            autoFocus
            required />
          <button type="submit">Go</button>
        </form>
      </SearchBar>
      <Close onClick={()=>setChild(false)} />
      <Query>
        {searchQuery ? searchQuery.map((item) => (
          <QueryItem
          key={item.username_id}
          userData={item}
          ConnectRequest={submitConnectRequest}/>
        )) : <p>No items</p>}
      </Query>
    </>
  )
}


export default ConnectSearchFeature;

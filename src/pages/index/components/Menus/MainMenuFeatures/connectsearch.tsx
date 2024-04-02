import React , { useState, Dispatch } from 'react';
import styled from 'styled-components';
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
  button{
    width: 96%;
    height: 3%;
    margin-top: 5%;
    align-items: center;
    text-align: center;
    display: grid;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border-radius: 30px; 
    border: none;
    text-decoration: none;
    font-size: 10px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    line-height: 0;
    font-family: 'Times New Roman', Times, serif;

    :hover {
      background-color: #222;
    }
  }
`
const QueryItems = styled.div`
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  transition: opacity 0.5s ease;
`
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

const ConnectSearchFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [jwt] = useToken();
  const [searchQuery, setSearchQuery] = useState<SearchedUser[]>([]);
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    searchUser(search, jwt as string)
    .then((result) => setSearchQuery(result));
  }

  const  submitConnectRequest = (invitee_id: string)=>{
    ConnectionCreate(jwt as string, invitee_id)
    .then(result=> console.log(result));
    //User Visual
  }

  return(
    <>
      <SearchBar>
        <form onSubmit={handleSubmit} role="search">
          {/* <label htmlFor="search">Search for stuff</label> */}
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
          <QueryItems key={item.username_id}>
            <img
              src={`${item.headshot}`}
              alt={item.username}
              style={{ height: '100%' }}
            />
            <div>{item.username}</div>
            <button onClick={() => submitConnectRequest(item.username_id)}>connect</button>
          </QueryItems>
        )) : <p>No items</p>}
      </Query>
    </>
  )
}


export default ConnectSearchFeature;

import React, { useContext, useState, Dispatch } from 'react';
import { ConnectionUpdate } from '../../../../../lib/ConnectionFunctions';
import { useToken } from '../../../../../lib/hooks/useToken';
import { AppContext } from '../../../../../AppContext';
import { Closeness } from '../../../../../lib/Types';
import ConfirmationModal from '../../../../../lib/confirmationModal';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  img {
    width: 100%;
    max-height: 30%;
    height: auto;
    object-fit: contain;
  }
  div {
    height: 20%;
  }
  label {
    background-color: black;
    border-radius: 15px;
    padding: 5px;
    color: white;
    display: inline-block;
    margin-top: 2%;
    margin-bottom: 2%;
  }
  input[type='text'] {
    background-color: white;
    border: 2px solid black;
    border-radius: 15px;
    padding: 5px;
    margin-bottom: 10px;
    width: 90%;
    text-align: right;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background-color: transparent;
  justify-content: flex-end;
  
  input[type="radio"] {
    display: none;
  }

  label {
    cursor: pointer;
    margin-right: 10px;
    padding: 8px 15px;
    border-radius: 20px;
    border: 2px solid #ccc;
    color: #555;
    transition: all 0.3s ease;
  }

  input[type="radio"]:checked + label {
    background-color: black;
    color: white;
    border-color: white;
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
  right: 3%;
`;

const Button = styled.button`
  position: absolute;
  top: 80%;
  right: 13%;
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

const EditConnectionMenu: React.FC<{ setEditState: Dispatch<boolean>, editState: boolean }> = ({ setEditState, editState }) => {
  const { clickedconnection } = useContext(AppContext);
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [jwt] = useToken();
  const [closeness, setCloseness] = useState<Closeness>();
  const [nickname, setNickname] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditState(!editState);
    try {
      if (closeness || nickname) {
        ConnectionUpdate(clickedconnection?.id as string, jwt as string, closeness, nickname)
          .then((result) => console.log(result));
      }
      // TBD visuals
    } catch (error) {
      console.error(error)
      return;
    }
  }

  return (
    <>
      <MenuStyle>
        <Close onClick={() => setEditState(false)} />
        <form onSubmit={handleSubmit}>
          <h3>Edit</h3>

          <label htmlFor="nickname">Nick Name</label>
          <input
            type="text"
            placeholder="Pookie fear"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)} />

          <label>Closeness </label>
          <RadioGroup>
            <input type="radio" id="friend" name="closeness" value="friend" onClick={() => setCloseness('friend')} />
            <label htmlFor="friend">friend</label>
          </RadioGroup>

          <RadioGroup>
            <input type="radio" id="close_friend" name="closeness" value="closefriend" onClick={() => setCloseness('closefriend')} />
            <label htmlFor="close_friend">close friend</label>
          </RadioGroup>

          <RadioGroup>
            <input type="radio" id="best_friend" name="closeness" value="bestfriend" onClick={() => setCloseness('bestfriend')} />
            <label htmlFor="best_friend">Best Friend!</label>
          </RadioGroup>

          <Button type="button" onClick={() => setConfirmState(!confirmState)}>confirm</Button>
        </form>
      </MenuStyle>
      {confirmState && <ConfirmationModal func={handleSubmit} setState={setConfirmState} details='Are you sure?' />}
    </>
  )
}

export default EditConnectionMenu;

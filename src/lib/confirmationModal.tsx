import React, { Dispatch } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalStyle = styled.div`
  position: fixed; 
  z-index: 1; 
  left: 30vw; 
  top: 25vh; 
  width: 40vw; 
  height: 50vh; 
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    animation: ${fadeIn} 0.3s ease;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border: 4px solid #888;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
  max-width: 100px; /* Added max-width to limit button width */

  &:hover {
    background-color: #333;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around; /* Adjusted to space-around */
  width: 100%;
  margin-top: 20px;
`;

const ConfirmationModal: React.FC<{
  func: ((e: React.FormEvent<HTMLFormElement>) => Promise<void>) | ((e: any) => void),
  setState: Dispatch<boolean>,
  details?: string
}> = ({ func, setState, details }) => {
  return (
    <ModalStyle>
      <div>
        <Close onClick={()=>setState(false)} />
        <p style={{textAlign: 'center'}}>{details}</p>
        <ButtonGroup>
          <Button onClick={(e:any) => {
            func(e);
            setState(false);}}>Yes</Button>
          <Button onClick={() => setState(false)}>No</Button>
        </ButtonGroup>
      </div>
    </ModalStyle>
  );
}

export default ConfirmationModal;

import React, { Dispatch } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoIosCloseCircleOutline, IoMdClipboard } from 'react-icons/io'; // Added IoMdClipboard icon
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
    position: relative; 
  }
`;

const Close = styled(IoIosCloseCircleOutline)`
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); 
  }
  position: absolute;
  top: 3%;
  right: 5%;
`;

const ClipboardIcon = styled(IoMdClipboard)`
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2); 
  }
  position: absolute;
  bottom: 5%;
  right: 5%;
`;

const ClipBoardModal: React.FC<{
  setState: Dispatch<boolean>,
  details?: string
}> = ({ setState, details }) => {
  const copyToClipboard = () => {
    if (details) {
      navigator.clipboard.writeText(details);
      //new visual
      alert('Copied to clipboard!');
    }
  };

  return (
    <ModalStyle>
      <div>
        <Close onClick={()=>setState(false)} />
        <p style={{textAlign: 'center'}}>{details}</p>
        <ClipboardIcon  onClick={copyToClipboard}/>
      </div>
    </ModalStyle>
  );
}

export default ClipBoardModal;

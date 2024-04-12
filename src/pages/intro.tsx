import React from 'react';
import styled from 'styled-components';


const DummyRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;
  overflow: auto;

`
const TitleDiv = styled.div`
  text-align: center;
  padding: 20px;
  color: #ffffff;
  font-size: 36px; 
  font-weight: bold; 
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  position: sticky;
  top: 5%;
  background-color: black;
  height: 10%;
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-items: center;
  display: flex;
  justify-content: center;
`;

const OuterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80vw;
  flex-direction: column;
  overflow-y: auto; 
`;

const MidContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 200px;
  background-color: #080710;
  height: 600px;
  align-items: center;
  justify-content: space-between;
`;



const TextContainer = styled.div`
  width: 45%;
  background-color: rgba(255, 255, 255, 0.13);
  
  height: 80%;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  box-sizing: border-box;
  * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  p {
    text-align: center;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 13px;
  }

`;

const ImageContainer = styled.div`
  height: 100%;
  padding: 20px;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1{
    color: white;
    top: 0%;
  }
`;



const OddSection: React.FC<{text: string, images: string}> = ({ text, images }) => (

  <MidContainer>
      <TextContainer><p>{text}</p></TextContainer>
      <ImageContainer>
        <h1>Title</h1>
        <img src={images} alt={'no img'}></img>
      </ImageContainer>
  </MidContainer>

);

const EvenSection: React.FC<{text: string, images: string}> = ({ text, images }) => (
  <MidContainer>
    <ImageContainer>
      <h1>Title</h1>
      <img src={images} alt={images}></img>
      </ImageContainer>
    <TextContainer><p>{text}</p></TextContainer>
  </MidContainer>
);

const IntroductionPage = () => (
  <DummyRoot>
    <TitleDiv>Friend-web Introduction - Hang with your friends on the web</TitleDiv>
    <OuterContainer>
      <OddSection text="Sample text" images={process.env.PUBLIC_URL + '/friend-web-showcase/add.gif'} />
      <EvenSection text="Text for even section" images="%PUBLIC_URL%/friend-web-showcase/add.gif" />
      <OddSection text="Text for odd section" images="%PUBLIC_URL%/friend-web-showcase/add.gif" />
      <EvenSection text="Text for even section" images="%PUBLIC_URL%/friend-web-showcase/add.gif" />
      {/* Add more sections as needed */}
    </OuterContainer>
  </DummyRoot>
);

export default IntroductionPage;

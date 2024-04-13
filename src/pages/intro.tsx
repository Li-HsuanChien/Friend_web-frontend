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
  padding: 0 0 100px 0;

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
  top: 2%;
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
  position: relative;
  width: 40%;
  background-color: rgba(255, 255, 255, 0.13);
  top: 10%;
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
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1{
    text-align: center;
    color: white;
    top: 0%;
    font-size: 28px;
    font-family: Bodoni MT;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 20px;
`;

const GifItem = styled.img`
  width: 50%;
  height: auto;
  &:nth-child(2) {
    justify-self: end;
    max-width: 100%;
    max-height: 100%;
    width: 50%;
  }
`;

const EvenImage = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const GifGrid: React.FC<{ imgs: string[] }> = ({ imgs }) => (
  <GridContainer>
    {imgs.map((img, index) => (
      <GifItem key={index} src={img} alt={'gif'} />
    ))}
  </GridContainer>
);


const OddSection: React.FC<{text: string, images: string[], title: string}> = ({ text, images, title }) => (

  <MidContainer>
      <TextContainer><p>{text}</p></TextContainer>
      <ImageContainer>
        <h1>{title}</h1>
        <GifGrid imgs={images}/>
      </ImageContainer>
  </MidContainer>

);

const EvenSection: React.FC<{text: string, images: string[], title: string}> = ({ text, images, title }) => (
  <MidContainer>
    <ImageContainer>
      <h1>{title}</h1>
      {images.map((image, index) => (
        <EvenImage key={index} src={image} alt={'no img'} />
      ))}
      </ImageContainer>
    <TextContainer><p>{text}</p></TextContainer>
  </MidContainer>
);

const IntroductionPage = () => (
  <DummyRoot>
    <TitleDiv>Friend-web Introduction - Hang with your friends on the web</TitleDiv>
    <OuterContainer>
      <OddSection
        text="Sample text"
        images={[process.env.PUBLIC_URL + '/friend-web-showcase/add.gif',
                 process.env.PUBLIC_URL + '/friend-web-showcase/index.gif',
                 process.env.PUBLIC_URL + '/friend-web-showcase/index.gif']}
        title="Connect with your friends and theirs!" />
      <EvenSection
        text="Text for even section"
        images={[process.env.PUBLIC_URL + '/friend-web-showcase/add.gif', process.env.PUBLIC_URL + '/friend-web-showcase/add.gif']}
        title='Login and Verification securely!' />
      <OddSection
        text="Text for odd section"
        images={[process.env.PUBLIC_URL + '/friend-web-showcase/add.gif']}
        title="Invite your friends"/>
      <EvenSection
        text="Text for even section"
        images={[process.env.PUBLIC_URL + '/friend-web-showcase/add.gif']}
        title="Express yourself to possible new friends!"/>
      {/* Add more sections as needed */}
    </OuterContainer>
  </DummyRoot>
);

export default IntroductionPage;

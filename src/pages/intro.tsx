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
`;

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

const WarningBox = styled.div`
  background-color: #ff4444; /* Red background */
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border: 2px solid #cc0000; /* Darker red border */
  border-radius: 10px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    display: block;
    margin: 15px auto 0 auto; /* Center the image and add space above */
    max-width: 100px; /* Adjust the size of the image */
    height: auto;
  }
`;

const OuterContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80vw;
  flex-direction: column;
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
    text-align: left;
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  padding: 20px;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
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

const GifItem = styled.div`
  position: relative;
  width: 50%;
  height: auto;
  &:nth-child(2) {
    justify-self: end;
    max-width: 100%;
    max-height: 100%;
    width: 50%;
  }

  img {
    width: 100%;
    height: auto;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
  }
`;

interface ImgSet {
  url: string;
  description: string;
}

const GifGrid: React.FC<{ imgs: ImgSet[] }> = ({ imgs }) => (
  <GridContainer>
    {imgs.map((img, index) => (
      <GifItem key={index}>
        <img src={img.url} alt={'gif'} />
        <div className="caption">{img.description}</div>
      </GifItem>
    ))}
  </GridContainer>
);

const OddSection: React.FC<{ text: string; images: ImgSet[] }> = ({ text, images }) => (
  <MidContainer>
    <TextContainer>
      <p>{text}</p>
    </TextContainer>
    <ImageContainer>
      <GifGrid imgs={images} />
    </ImageContainer>
  </MidContainer>
);

const EvenSection: React.FC<{ text: string; images: ImgSet[] }> = ({ text, images }) => (
  <MidContainer>
    <ImageContainer>
      <GifGrid imgs={images} />
    </ImageContainer>
    <TextContainer>
      <p>{text}</p>
    </TextContainer>
  </MidContainer>
);

const IntroductionPage = () => (
  <DummyRoot>
    <TitleDiv>Friend-web Introduction - Hang with your friends on the web</TitleDiv>
    <WarningBox>
      ⚠️ The backend for Friend-web has been discontinued. We are working on updating and migrating the backend to a new infrastructure. Stay tuned for future updates!
      <img
        src={process.env.PUBLIC_URL + '/under-construction-pikachu.gif'}
        alt="Under Construction Pikachu"
      />
    </WarningBox>
    <OuterContainer>
      <OddSection
        text="Experience the joy of connecting with your friends and theirs! The main page allows you to see your friends' activities on the web. You can easily accept friend requests and explore their profiles to know them better."
        images={[
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/indexshowcase.gif', description: 'Main page: See your friends on the web!' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/acceptinvite.gif', description: 'Accept Invite: Respond to friend requests' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/showdetails.gif', description: 'Show Details: Explore friend profiles' }
        ]}
      />
      <EvenSection
        text="Securely login and verify your account to ensure the safety of your data. With our login and verification process, you can trust that your information is protected. Sign up, verify your email, and enjoy peace of mind with Friend-web."
        images={[
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/signup.gif', description: 'Sign Up: Create your account' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/loginverify.gif', description: 'Login Verification: Secure access to your account' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/emailverify.gif', description: 'Email Verification: Confirm your email address' }
        ]}
      />
      <OddSection
        text="Invite your friends to join you on Friend-web! Easily send invitations and connect with more people. Grow your network and enjoy having your friends with you on the web."
        images={[
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/signup.gif', description: 'Sign Up: Create your account' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/loginverify.gif', description: 'Login Verification: Secure access to your account' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/emailverify.gif', description: 'Email Verification: Confirm your email address' }
        ]}
      />
      <EvenSection
        text="Express yourself and make new friends with Friend-web's expressive features. Add connections, edit your profile, and manage your connections effortlessly!"
        images={[
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/add.gif', description: 'Add: Add connections or content' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/editconnections.gif', description: 'Edit Connections: Manage your connections' },
          { url: process.env.PUBLIC_URL + '/friend-web-showcase/editnode.gif', description: 'Edit Node: Modify your profile' }
        ]}
      />
    </OuterContainer>
  </DummyRoot>
);

export default IntroductionPage;

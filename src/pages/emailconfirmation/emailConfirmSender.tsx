/* eslint-disable node/no-unpublished-import */
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useToken } from '../../lib/hooks/useToken';
import { SendVerificationEmail } from '../../lib/EmailVeridicationApi';

const ReportStyle = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }

  .shape:first-child {
    background: linear-gradient(#dfe1e4, #b7b7b8);
    left: -100px;
    top: -80px;
  }

  .shape:last-child {
    background: linear-gradient(to right, #dfe1e4, #b7b7b8);
    right: -100px;
    bottom: -80px;
  }

  main {
    height: 400px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }

  main * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  main h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  main p {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 10px;
    font-size: 13px;
  }

  button {
    background-color: #000;
    color: #fff;
    border-radius: 10px; 
    border: none;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
      background-color: black;
      color:white;
    }
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 60px;
  }
`


const EmailConfirmSender = () => {
  const [token,] = useToken();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    let countdown = 3; // Adjust the countdown duration as needed
    const timer = setInterval(() => {
      if (countdown === 0) {
        clearInterval(timer);
        SendVerificationEmail(token as string)
          .then(result => setMessage(result['message']))
          .catch(err => setMessage(`Something went wrong! ${err}`));
      } else {
        setMessage(`Sending verification email in ${countdown} seconds...`);
        countdown--;
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [token]);

  const handleClick = (e: any) =>{
    let countdown = 3; // Adjust the countdown duration as needed
    const timer = setInterval(() => {
      if (countdown === 0) {
        clearInterval(timer);
        SendVerificationEmail(token as string)
          .then(result => setMessage(result['message']))
          .catch(err => setMessage(`Something went wrong! ${err}`));
      } else {
        setMessage(`Sending verification email in ${countdown} seconds...`);
        countdown--;
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }

  return (
    <>
      <ReportStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <main >
          <h3>Thanks for signing up!</h3>
          <p>A verification email has sent to your inbox!</p>
          <p>if you have email have not been recieved click button below to resend confirmation email</p>
          <button onClick={handleClick}>Send Link!</button>
          {message && <p>{message}</p>}
        </main>
      </ReportStyle>
    </>
  );
};

export default EmailConfirmSender;

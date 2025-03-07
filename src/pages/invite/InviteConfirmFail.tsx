/* eslint-disable node/no-unpublished-import */
import React from 'react';
import { styled } from 'styled-components';
import {useNavigate } from 'react-router-dom';

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
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  main p {
    text-align: center;
    margin-top: 15px;
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
  }
`


const InviteConfirmFail: React.FC<{message: string}> = ({message}) => {
  const nav = useNavigate();
  return (
    <>
      <ReportStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <main>
          <h3>Failed!</h3>
          <h3>{message}</h3>
          <h3>Click button to navigate to login</h3>
          <h3>{'You can still sign up but you will not be connected to your frien :('}</h3>
          <button onClick={() => nav('/login')}>Back to Login</button>
        </main>
      </ReportStyle>
    </>
  );
};

export default InviteConfirmFail;

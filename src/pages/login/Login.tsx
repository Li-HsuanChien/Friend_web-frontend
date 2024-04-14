/* eslint-disable node/no-unpublished-import */
import React, { useState } from 'react';
import { styled } from 'styled-components';
import {useNavigate, Link, } from 'react-router-dom';
import {ChangeEvent} from 'react';
import { useToken } from '../../lib/hooks/useToken';
import { useRefreshToken } from '../../lib/hooks/useRefreshToken';
import { LoginApi } from '../../lib/AuthApi';
const LoginStyle = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    height: 60vh;
    width: 28vw;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

  .background .shape {
    height: 25vmin;
    width: 25vmin;
    position: absolute;
    border-radius: 50%;
  }

  .shape:first-child {
    background: linear-gradient(#dfe1e4, #b7b7b8);
    left: -6vw;
    top: -12vh;
  }

  .shape:last-child {
    background: linear-gradient(to right, #dfe1e4, #b7b7b8);
    right: -6vw;
    bottom: -12vh;
  }

  form {
    height: 60vh;
    width: 28vw;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 4vh 2vw;
  }

  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  form h3 {
    font-size: 5vmin;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  form p {
    text-align: center;
    margin-top: 1vh;
    font-size: 2vmin;
  }

  label {
    display: block;
    margin-top: 2vh;
    font-size: 2vmin;
    font-weight: 500;
  }

  input {
    display: block;
    height: 7vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    margin-top: 0.5vh;
    font-size: 2vmin;
    font-weight: 300;
  }
  
  ::placeholder {
    color: #e5e5e5;
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
    padding: 2vh 0;
    font-size: 2.5vmin;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
`
const ForgotLink = styled(Link)`
  display: block;
  text-align: right;
  font-size: 2vmin;
`
const SignLink = styled(Link)`
  display: block;
  text-align: left;
  font-size: 2vmin;
`

interface successMessage {
  refresh: string,
  access: string
}
interface errorMessage {
  detail: string
}
type ReturnMessage = successMessage | errorMessage;

const Login = () => {
  const navigate = useNavigate();
  const [, setToken] = useToken();
  const [, setRefreshToken] = useRefreshToken();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginState, setLoginState] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: ReturnMessage = await LoginApi(
        username, password,
      );
      if ('refresh' in response) {
        const {refresh , access} = response;
        setToken(access as string);
        setRefreshToken(refresh)
        setLoginState('Welcome!');
        navigate('/');
      } else {
        setLoginState(response.detail);
      }
    } catch (error) {
      setLoginState('Something went Wrong!\n' + error);
      console.error(error)
      return;
    }
  };

  return (
    <>
      <LoginStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Login</h3>

          <label htmlFor="username">Username or Email</label>
          <input
            required
            type="text"
            placeholder="Username"
            id="username"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <ForgotLink to="/forgot-password">Forgot password</ForgotLink>
          {loginState && <p>{loginState}</p>}
          <button
            type="submit"
            style={{marginTop: loginState ? '1vh' : '3vh'}}
          >Log In</button>
          <SignLink to="/register">Sign up!</SignLink>
          <SignLink to="/introduction">What is this website?</SignLink>
        </form>
      </LoginStyle>
    </>
  );
};

export default Login;

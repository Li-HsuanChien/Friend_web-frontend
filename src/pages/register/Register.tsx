import React, {useEffect, useState} from 'react';
// eslint-disable-next-line node/no-unpublished-import
import {useNavigate, Link } from 'react-router-dom';
import {ChangeEvent} from 'react';
import {styled} from 'styled-components';
import { RegisterApi } from '../../lib/AuthApi';

const RegisterStyle = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    height: 70vh;
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
    height: 70vh;
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

  form pre {
    font-family: 'Poppins', sans-serif;
    color: red;
    text-align: center;
    margin-top: 15px;
  }

  form h3 {
    font-size: 4vmin;
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
    font-size: 1.5vmin;
    font-weight: 500;
  }

  input {
    display: block;
    height: 5vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    margin-top: 0.5vh;
    font-size: 1.5vmin;
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
`;


const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [registrationState, setRegistrationState] = useState<string | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(password !== password2){
        setRegistrationState('password does not match!')
      } else {
        const response = await RegisterApi(email as string,
                                           username as string,
                                           password as string,
                                           password2 as string);
        if (response.username) {
          setRegistrationState(`Welcome! ${response.username}, redirecting you to login page!`);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
          return;
        } else {
          setRegistrationState('Something went wrong!\n'+ response.message);
          return;
        }
    }} catch (error) {
      setRegistrationState(`Something went Wrong! Try again ${error}`);
      return;}
  };
  useEffect(() => {
    if(!email){
      setRegistrationState('Email is empty!');
    } else if(!username){
      setRegistrationState('Username is empty!');
    } else if (!password){
      setRegistrationState('Password is empty!');
    } else if (!password2){
      setRegistrationState('Comfirmation password is empty!');
    } else if (password !== password2){
      setRegistrationState('Passwords do not match!');
    } else {
      setRegistrationState('');
    }

  }, [password, password2, username])

  return (
    <>
      <RegisterStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Register</h3>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />

          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="password2"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword2(e.target.value)
            }
          />

          {registrationState && <pre>{registrationState}</pre>}

          <button
            style={{marginTop: registrationState ? '5px' : '55px'}}
            disabled={!password || !password2 || password !== password2}
            type="submit"
          >
            Register
          </button>

          <Link to="/login">Already an user?</Link>
        </form>
      </RegisterStyle>
    </>
  );
};

export default Register;

import React, { useState, useEffect } from 'react'
import './LoginSignup.css'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar'

const LoginSignup = (props) => {

  const navigate = useNavigate()
  const [action, setAction] = useState("Login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [alertError, setAlertError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [errorHeader, setErrorHeader] = useState("")

  const signUp = async () => {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({
        'email': signUpEmail,
        'firstName': signUpFirstName,
        'lastName': signUpLastName,
        'password': signUpPassword,
        'confirmPassword': signUpConfirmPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      setErrorMessage(data.Error)
      alertErrorFn()
    } else {
      props.setToken(data.token);
      props.setUserId(data.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      navigate("/");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }
    return true;
  }

  const alertErrorFn = () => {
    setAlertError(true)
    // setTimeout(() => {
    //   setAlertError(false)
    // }, 3000)
  }

  const logIn = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        'email': loginEmail,
        'password': loginPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    
    const data = await response.json()
    if (!response.ok) {
      setErrorMessage(data.Error)
      alertErrorFn()
      // alert(`Error: Account not found`);
    } else {
      props.setToken(data.token);
      props.setUserId(data.id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      navigate("/");
    }
  };



  const handleSubmit = () => {
    if (action == "Login") {
      logIn()
    } else if (action == "SignUp"){
      signUp()
    }
  }

  return (
    <div style={{display: "flex", width: '100%', flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        <NavigationBar homeButton={true}/>
      </div>
      <div className='container' stlye={{height:'80%'}}>
      {
        alertError && 
        action === "Login" &&
        <Alert severity="error">
        <AlertTitle><strong>Login Error</strong></AlertTitle>
        {errorMessage}
      </Alert>
      }
      {
        alertError && 
        action === "SignUp" &&
        <Alert severity="error">
        <AlertTitle><strong>Registration Error</strong></AlertTitle>
          {errorMessage}
      </Alert>
      }
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login"?
          <>
            <div className="input">
              <img src={email_icon} alt="" />   
              <input 
                type="email" 
                placeholder='Email' 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)}/>
            </div> 
            <div className="input">
              <img src={password_icon} alt="" />   
              <input 
                type="password"
                placeholder='Password'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
          </div>
          </>:
          <>
          <div className="input">
            <img src={email_icon} alt="" />   
            <input 
              type="email" 
              placeholder='Email'
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
            />
          </div> 
          <div className="input">
            <img src={user_icon} alt="" />   
            <input 
              type="text" 
              placeholder='First Name' 
              value={signUpFirstName}
              onChange={(e) => setSignUpFirstName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />   
            <input 
              type="text" 
              placeholder='Last Name' 
              value={signUpLastName}
              onChange={(e) => setSignUpLastName(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />   
            <input 
              type="password" 
              placeholder='Password'
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />   
            <input 
              type="password" 
              placeholder='Confirm Password'
              value={signUpConfirmPassword}
              onChange={(e) => setSignUpConfirmPassword(e.target.value)}
            />
          </div>
          </>}
      </div>
      {action === "SignUp" ? <div></div> : <div className="forgot-password">Lost Password? <span onClick={() => navigate('/verifyCode')}>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray scale":"submit"} onClick={() => {setAction("SignUp"); setAlertError(false)}}>Sign Up</div>
        <div className={action === "SignUp" ? "submit gray scale":"submit"} onClick={() => {setAction("Login"); setAlertError(false)}}>Login</div> 
      </div>
      <div className="scale" style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant='contained' onClick={handleSubmit} className="submit gray scale" style={{background: '#3c009d', width: '100%', padding: '10px', width: '50%', scale: '1.2', borderRadius: '70px'}}>
            Submit
          </Button>
      </div>
      </div>
    </div>
  );
};

export default LoginSignup;

import React, { useState } from 'react'
import './LoginSignup.css'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar'

const LoginSignup = () => {

  const navigate = useNavigate()
  const [action, setAction] = useState("Login");

  const handleSubmit = () => {
    if (action == "Login") {
      alert("Loggin in...")
    } else if (action == "SignUp"){
      alert("Signing up...")
    }
  }

  return (
    <div style={{display: "flex", width: '100%', flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        <NavigationBar homeButton={true}/>
      </div>
      <div className='container' stlye={{height:'80%'}}>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login"?
          <>
            <div className="input">
              <img src={email_icon} alt="" />   
              <input type="email" placeholder='Email'/>
            </div> 
            <div className="input">
              <img src={password_icon} alt="" />   
              <input type="password" placeholder='Password'/>
          </div>
          </>:
          <>
          <div className="input">
            <img src={email_icon} alt="" />   
            <input type="email" placeholder='Email'/>
          </div> 
          <div className="input">
            <img src={user_icon} alt="" />   
            <input type="text" placeholder='First Name' />
          </div>
          <div className="input">
            <img src={user_icon} alt="" />   
            <input type="text" placeholder='Last Name' />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />   
            <input type="password" placeholder='Password'/>
          </div>
          <div className="input">
            <img src={password_icon} alt="" />   
            <input type="password" placeholder='Confirm Password'/>
          </div>
          </>}
      </div>
      {action === "SignUp" ? <div></div> : <div className="forgot-password">Lost Password? <span onClick={() => navigate('/verifyCode')}>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray scale":"submit"} onClick={() => {setAction("SignUp")}}>Sign Up</div>
        <div className={action === "SignUp" ? "submit gray scale":"submit"} onClick={() => {setAction("Login")}}>Login</div> 
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

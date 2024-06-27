import React, { useState } from 'react'
import './LoginSignup.css'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {

  const navigate = useNavigate()
  const [action, setAction] = useState("Login");

  return (
    <div className='container'>
     <div className="header">
      <div className="text">{action}</div>
      <div className="underline"></div>
     </div>
     <div classNmae="inputs">
       {action === "Login"?<div></div>:<div className="input">
         <img src={user_icon} alt="" />   
         <input type="text" placeholder='Name' />
       </div>}
       <div className="input">
         <img src={email_icon} alt="" />   
         <input type="email" placeholder='Email Id'/>
       </div> 
       <div className="input">
         <img src={password_icon} alt="" />   
         <input type="password" placeholder='Password'/>
       </div>
     </div>
     {action === "Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
     <div className="submit-container">
       <div className={action === "Login" ? "submit gray":"submit"} onClick={() => {setAction("Sign Up")}}>Sign Up</div>
       <div className={action === "Sign Up" ? "submit gray":"submit"} onClick={() => {setAction("Login")}}>Login</div> 
     </div>
      <Button variant='contained' onClick={() => navigate('/')} style={{ background: '#3c009d', width: '100%', padding: '10px'}}>
        Go back to Dashboard
      </Button>
    </div>
  );
};

export default LoginSignup;

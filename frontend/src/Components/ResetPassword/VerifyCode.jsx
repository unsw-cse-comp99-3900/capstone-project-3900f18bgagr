import React, { useState } from 'react';
import '../LoginSignup/LoginSignup.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import email_icon from '../Assets/email.png';

const VerifyCode = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Verify Code</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input 
            type="email" 
            placeholder='Email Address' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input">
          <img src={email_icon} alt="" />
          <input 
            type="text" 
            placeholder='Verification Code' 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
          />
        </div>
      </div>
      <div className="submit-container">
        <Button 
          variant='contained' 
          className="submit gray scale" 
          onClick={() => navigate('/resetPassword')}
          style={{background: '#3c009d', width: '100%', padding: '10px', borderRadius: '70px'}}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default VerifyCode;

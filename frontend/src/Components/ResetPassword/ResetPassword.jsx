import React, { useState } from 'react';
import '../LoginSignup/LoginSignup.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import password_icon from '../Assets/password.png';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Reset Password</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            type="password" 
            placeholder='New Password' 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            type="password" 
            placeholder='Confirm Password' 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
      </div>
      <div className="submit-container">
        <Button 
          variant='contained' 
          className="submit gray scale" 
          onClick={() => navigate('/loginSignUp')}
          style={{background: '#3c009d', width: '100%', padding: '10px', borderRadius: '70px'}}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;

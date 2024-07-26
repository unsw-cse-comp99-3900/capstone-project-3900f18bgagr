import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

const MyPersonalizedCareerPlan = () => {
  const navigate = useNavigate(); // Correctly initialized useNavigate

  const handlePlanClick = () => {
    navigate('/CareerPlan'); // Use navigate() to change routes
  };

  return (
    <Button style={{backgroundColor: '#470da3', borderRadius: '15px', width: '100%', scale: '1.2', height: '50px'}} variant="contained" onClick={handlePlanClick}>
      Manage Plan
    </Button>
  );
};

export default MyPersonalizedCareerPlan;

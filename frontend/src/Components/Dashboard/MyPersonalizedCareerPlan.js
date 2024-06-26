import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate

const MyPersonalizedCareerPlan = () => {
  const navigate = useNavigate(); // Correctly initialized useNavigate

  const handlePlanClick = () => {
    navigate('/CareerPlan'); // Use navigate() to change routes
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        My Personalized Career Plan
      </Typography>
      <Button variant="contained" color="primary" onClick={handlePlanClick}>
        Manage Plan
      </Button>
      {/* Additional interactive elements as needed */}
    </Paper>
  );
};

export default MyPersonalizedCareerPlan;

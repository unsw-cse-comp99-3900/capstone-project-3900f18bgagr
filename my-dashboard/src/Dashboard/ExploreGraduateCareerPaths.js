import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExploreGraduateCareerPaths = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/CareerPaths');
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Explore Graduate Career Paths
      </Typography>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Find your paths
      </Button>
    </Paper>
  );
};

export default ExploreGraduateCareerPaths;

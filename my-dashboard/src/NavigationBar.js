import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; // Import Home icon for Material-UI
import { useNavigate } from 'react-router-dom';

const NavigationBar = ({ homeButton }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, textAlign: 'center' }}>
          Trajectory
        </Typography>
        {homeButton ? (
          <IconButton color="inherit" onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> // Update the navigation logic if needed
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;

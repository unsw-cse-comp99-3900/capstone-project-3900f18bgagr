import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // navigate('/CareerPaths');
    alert("Edit in progress")
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="h7" gutterBottom>
        Name: {props.firstName} {props.lastName} <br />
        Email: {props.email} <br />
        User ID: {props.userId} <br />
      </Typography>
      <br />
      <Button style={{backgroundColor: '#470da3'}} variant="contained" onClick={handleButtonClick}>
        Edit Profile
      </Button>
    </Paper>
  );
};

export default Profile;

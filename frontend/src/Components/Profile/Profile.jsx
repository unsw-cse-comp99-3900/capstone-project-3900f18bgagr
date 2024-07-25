import React, {useState} from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Profile = (props) => {
  const navigate = useNavigate();
  const [editSkillsInProgress, setEditSkillsInProgress] = useState(false)
  const [editDetailInProgress, setEditDetailInProgress] = useState(false)
  const [editPassWordInProgress, setEditPasswordInProgress] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [alertDetailsSuccess, setAlertDetailsSuccess] = useState(false)
  const [alertSkillsSuccess, setAlertSkillsSuccess] = useState(false)
  const [alertDetailsMessage, setAlertMessage] = useState("")
  const [alertSkillsMessage, setAlertSkillsMessage] = useState("")
  const skillsOptions = [
    { title: 'JavaScript' },
    { title: 'React' },
    { title: 'Node.js' },
    { title: 'Python' },
    { title: 'Django' },
    { title: 'Java' },
    { title: 'Spring Boot' },
    { title: 'C++' },
    { title: 'Ruby on Rails' },
    { title: 'MySQL' },
    { title: 'SQLite3' },
    { title: 'PostgreSQL' },
  ];

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
  
  const handleUpdate = async (component) => {
    try {
      const headers = {
        "Content-type": "application/json",
        Authorization: props.token,
        'id': props.userId,
        'password': props.password,
      }
      if (newPassword.length > 0 && validatePassword(newPassword) == true) {
        headers.password = newPassword;
      } else if (newPassword.length > 0 && validatePassword(newPassword) !== true) {
        alert('New password error. Make sure to create a secure one.')
        return
      } 

      const body = JSON.stringify({
        'firstName': props.firstName,
        'lastName': props.lastName,
        "skills": props.userSkills.map(skill => skill.title).join(',')
      })
      
      const response = await fetch("http://localhost:5000/Edit_detail", {
        method: "PATCH",
        body: body,
        headers: headers,
      });
      
      const data = await response.json()
      if (component === "Profile") {
        setAlertMessage(component + ' ' + data.message)
        setAlertDetailsSuccess(true)
      } else if (component === "Skills") {
        setAlertSkillsMessage(component + ' ' + data.message)
        setAlertSkillsSuccess(true)
      }
      if (!response.ok) {
        alert(data.response)
      } else {
        props.setUserPassword(newPassword)
        setNewPassword(() => "")
      }

    } catch (error) {
      console.error("Error fetching updating skills:", error);
    } 
  }

  return (
    <>
      {
        alertDetailsSuccess &&
        <Alert severity="success" onClose={() => setAlertDetailsSuccess(false)}>
          {alertDetailsMessage}
        </Alert>
      }
      {
        alertSkillsSuccess &&
        <Alert severity="success" onClose={() => setAlertSkillsSuccess(false)}>
          {alertSkillsMessage}
        </Alert>
      }
      <Paper style={{ padding: 16 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>
        <Typography variant="h7" gutterBottom>
          Name: {props.firstName} {props.lastName} <br />
          Email: {props.email} <br />
          User ID: {props.userId} <br /> < br/>
          <Button style={{backgroundColor: '#470da3'}} variant="contained" onClick={(e) => setEditDetailInProgress(() => !editDetailInProgress)}>
            {editDetailInProgress ? <div onClick={() => handleUpdate('Profile')}>Update Changes</div> : "Edit Details"}
          </Button>
          <br />
          <br />
          {editDetailInProgress && 
            <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-password-input"
                  label="First Name"
                  type="text"
                  autoComplete="current-password"
                  value={props.firstName}
                  onChange={(e) => props.setFirstName(e.target.value)}
                  />
                <TextField
                  id="outlined-password-input"
                  label="Last Name"
                  type="text"
                  autoComplete="current-password"
                  value={props.lastName}
                  onChange={(e) => props.setLastName(e.target.value)}
                  />
              </div>
              <div>
                <TextField
                  id="outlined-password-input"
                  label="Email"
                  type="text"
                  autoComplete="current-password"
                  value={props.email}
                  disabled
                />
                <TextField
                  id="outlined-password-input"
                  label="User ID"
                  type="text"
                  value={props.userId}
                  disabled
                />
              </div>
              <div>
              <Button variant="outlined" color='secondary' onClick={() => setEditPasswordInProgress(!editPassWordInProgress)}>Change Password?</Button>
              </div>
              {editPassWordInProgress && 
              <div>
                <TextField
                  id="outlined-password-input"
                  label="Current Password"
                  type="password"
                  autoComplete="current-password"
                  value={props.password}
                  disabled
                  />
                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
              }
            </Box>
          }
          <br>
          </br>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Skills: < br/>
        </Typography>
        <Typography variant="h7" gutterBottom>
          {props.userSkills.length > 0 ? props.userSkills.map(skill => skill.title).join(',  ') : "No skills. Edit profile to add skills."} <br />
        </Typography>
        <br />
        <Button style={{backgroundColor: '#470da3'}} variant="contained" onClick={(e) => setEditSkillsInProgress(() => !editSkillsInProgress)}>
          {editSkillsInProgress ? <div onClick={() => handleUpdate('Skills')}>Update Changes</div> : "Edit Skills"}
        </Button>
        <br/>
        <br/>
        {editSkillsInProgress && 
          <Autocomplete
          multiple
          options={skillsOptions}
          getOptionLabel={(option) => option.title}
          value={props.userSkills}
          onChange={(event, newValue) => {
              // props.setUserSkills(newValue); # this does not filter duplicates!
              const uniqueNewValue = newValue.filter((v, i, a) => a.findIndex(t => t.title === v.title) === i);
              props.setUserSkills(uniqueNewValue);
            }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Skills" placeholder="Select skills" />
            )}
            />
          }
      </Paper>
    </>
  );
};

export default Profile;

import React, {useState} from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const Profile = (props) => {
  const navigate = useNavigate();
  const [editInProgress, setEditInProgress] = useState(false)
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

  const handleUpdate = async () => {
    try {
      // const uniqueSkills = [...new Set(props.userSkills.map(skill => skill.title))];
      const response = await fetch("http://localhost:5000/Edit_detail", {
        method: "PATCH",
        body: JSON.stringify({
          "skills": props.userSkills.map(skill => skill.title).join(','),
        }),
        headers: {
          "Content-type": "application/json",
          Authorization: props.token,
          'id': props.userId
        },
      });

      if (!response.ok) {
        alert('Update failed')
      }

    } catch (error) {
      console.error("Error fetching updating skills:", error);
    }
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="h7" gutterBottom>
        Name: {props.firstName} {props.lastName} <br />
        Email: {props.email} <br />
        User ID: {props.userId} <br /> < br/>
      </Typography>
      <Typography variant="h6" gutterBottom>
        Skills: < br/>
      </Typography>
      <Typography variant="h7" gutterBottom>
        {props.userSkills ? props.userSkills.map(skill => skill.title).join(',  ') : "No skills. Edit profile to add skills."} <br />
      </Typography>
      <br />
      <Button style={{backgroundColor: '#470da3'}} variant="contained" onClick={(e) => setEditInProgress(() => !editInProgress)}>
        {editInProgress ? <div onClick={handleUpdate}>Update Skills</div> : "Edit Skills"}
      </Button>
      <br/>
      <br/>
      {editInProgress && 
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
  );
};

export default Profile;

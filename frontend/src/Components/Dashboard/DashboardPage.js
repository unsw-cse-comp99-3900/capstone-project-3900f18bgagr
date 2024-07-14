/*eslint no-warning-comments: "error"*/
import React, {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import NavigationBar from '../Navigation/NavigationBar';
import ExploreGraduateCareerPaths from './ExploreGraduateCareerPaths';
import MyPersonalizedCareerPlan from './MyPersonalizedCareerPlan';
import CareerAdviceLinks from './CareerAdviceLinks';
import Footer from '../Footer/Footer'

const DashboardPage = (props) => {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [skills, setSkills] = useState("")
  const [userId, setUserId] = useState("")
  const getUserDetails = async () => {
    // alert('here')
    try {
      const response = await fetch("http://localhost:5000/userDetails", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: props.token,
          'id': props.userId
        },
      });
      if (!response.ok) {
        console.log(`Error: Dashboard`);
      } else {
        const data = await response.json()
        if (data.firstName !== null) {
          setFirstName(data.firstName);
        }
        if (data.lastName !== null) {
          setLastName(data.lastName);
        }
        if (data.email !== null) {
          setEmail(data.email);
        }
        if (data.skills !== null) {
          setSkills(data.skills);
        }
        if (data.id !== null) {
          setUserId(data.id);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Handle error state or alert the user
    }
  };
  
  useEffect(() => {
    getUserDetails()
  }, [props.token, props.userId])

  useEffect(() => {
    console.log(firstName)
    console.log(lastName)
    console.log(email)
    console.log("skills:", skills)
  }, [firstName, lastName, email, userId])

  return (
    <div style={{display: "flex", width: '100%', flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        <NavigationBar homeButton={false}/>
      </div>
      <div style={{ padding: "20px", height: '80%'}}>
        <Grid container spacing={3} >
          {email && firstName && lastName ? 
            <Grid item xs={12} md={8}>
              Email: {email} <br />
              Name: {firstName} {lastName} <br />
              User Id: {userId} <br />
            </Grid>
          : <></>}
          <Grid item xs={12} md={4}>
            <CareerAdviceLinks />
          </Grid>
          <Grid item xs={12} md={12}>
            <ExploreGraduateCareerPaths />
          </Grid>
          <Grid item xs={12}>
            <MyPersonalizedCareerPlan />
          </Grid>
        </Grid>
      </div>
      <div style={{height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Footer />
      </div>
    </div>
  );
};




export default DashboardPage;

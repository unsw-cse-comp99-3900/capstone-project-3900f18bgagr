/*eslint no-warning-comments: "error"*/
import React, {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import NavigationBar from '../Navigation/NavigationBar';
import ExploreGraduateCareerPaths from './ExploreGraduateCareerPaths';
import MyPersonalizedCareerPlan from './MyPersonalizedCareerPlan';
import CareerAdviceLinks from './CareerAdviceLinks';
import Footer from '../Footer/Footer'
import Profile from '../Profile/Profile'
import { useNavigate } from 'react-router-dom';

const DashboardPage = (props) => {
  const navigate = useNavigate()
  // const [email, setEmail] = useState("")
  // const [firstName, setFirstName] = useState("")
  // const [lastName, setLastName] = useState("")
  // const [skills, setSkills] = useState("")
  // const [userId, setUserId] = useState("")
  

  // useEffect(() => {
  //   console.log(firstName)
  //   console.log(lastName)
  //   console.log(email)
  //   console.log("skills:", skills)
  // }, [props.firstName, props.lastName, props.email, props.userId])
  
  

  return (
    <div style={{display: "flex", width: '100%', flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        {props.userId ? <NavigationBar homeButton={'logout'} setEmail={props.setEmail} setToken={props.setToken} setUserId={props.setUserId}/> : <NavigationBar homeButton={false} />}
      </div>
      <div style={{ padding: "20px", height: '80%'}}>
        <Grid container spacing={3} >
          {props.email && props.firstName && props.lastName ? 
            <>
              <Grid item xs={12} md={8}>
                <Profile firstName={props.firstName} lastName={props.lastName} email={props.email} userId={props.userId}/>
              </Grid>
              <Grid item xs={12} md={4}>
                <CareerAdviceLinks />
              </Grid>
              <Grid item xs={12} md={12}>
                <ExploreGraduateCareerPaths />
              </Grid>
            </> :
            <>
              <Grid item xs={12} md={8}>
                <ExploreGraduateCareerPaths />
              </Grid>
              <Grid item xs={12} md={4}>
                <CareerAdviceLinks />
              </Grid>
            </>}
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

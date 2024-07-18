/*eslint no-warning-comments: "error"*/
import React, {useState, useEffect} from 'react';
import { Grid } from '@mui/material';
import NavigationBar from '../Navigation/NavigationBar';
import ExploreGraduateCareerPaths from './ExploreGraduateCareerPaths';
import MyPersonalizedCareerPlan from './MyPersonalizedCareerPlan';
import CareerAdviceLinks from './CareerAdviceLinks';
import Footer from '../Footer/Footer'
import Profile from '../Profile/Profile'
import Skills from '../Skills/Skills'
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';

const DashboardPage = (props) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userSkills, setUserSkills] = useState([])
  const [password, setUserPassword] = useState("")

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
        if (data.password !== null) {
          setUserPassword(data.password);
        }
        if (data.skills.trim().length > 0) {
          const parsedSkills = data.skills.split(',').map(skill => ({
            title: skill.trim()
          }));
          setUserSkills(() => parsedSkills);
          console.log('user skills:', userSkills)
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


  return (
    <div style={{display: "flex", width: '100%', flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        {props.userId ? <NavigationBar homeButton={'logout'} setEmail={setEmail} setToken={props.setToken} setUserId={props.setUserId}/> : <NavigationBar homeButton={false} />}
      </div>
      <div style={{ padding: "20px", height: '80%'}}>
        <Grid container spacing={3} >
          {email && firstName && lastName ? 
            <>
              <Grid item xs={12} md={8}>
                <Profile password={password} setUserPassword={setUserPassword} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} email={email} setEmail={setEmail} userSkills={userSkills} setUserSkills={setUserSkills} userId={props.userId}/>
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
      <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <ImageComponent endpoint="top_jobs_us" altText="Top 10 US Jobs" />
                <ImageComponent endpoint="top_jobs_uk" altText="Top 10 UK Jobs" />
                <ImageComponent endpoint="top_jobs_aus" altText="Top 10 AUS Jobs" />
                <ImageComponent endpoint="process_duration" altText="Process Duration" />
                <ImageComponent endpoint="job_types" altText="Job Types" />
            </div>
        </div>
      <div style={{height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Footer />
      </div>
    </div>
  );
};




export default DashboardPage;

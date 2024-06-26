import React from 'react';
import { Grid } from '@mui/material';
import NavigationBar from '../Navigation/NavigationBar';
import ExploreGraduateCareerPaths from './ExploreGraduateCareerPaths';
import MyPersonalizedCareerPlan from './MyPersonalizedCareerPlan';
import CareerAdviceLinks from './CareerAdviceLinks';
import Footer from '../Footer/Footer'

const DashboardPage = () => {
  return (
    <div style={{display: "flex", flexDirection: 'column', height: '98vh', margin: '-10px'}}>
      <div style={{margin: '0px', height: '10%', padding: '0px', boxSizing: 'border-box'}}>
        <NavigationBar homeButton={false}/>
      </div>
      <div style={{ padding: "20px", height: '80%'}}>
        <Grid container spacing={3} >
          <Grid item xs={12} md={8}>
            <ExploreGraduateCareerPaths />
          </Grid>
          <Grid item xs={12} md={4}>
            <CareerAdviceLinks />
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

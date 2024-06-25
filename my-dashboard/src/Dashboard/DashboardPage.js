import React from 'react';
import { Grid } from '@mui/material';
import NavigationBar from '../NavigationBar';
import ExploreGraduateCareerPaths from './ExploreGraduateCareerPaths';
import MyPersonalizedCareerPlan from './MyPersonalizedCareerPlan';
import CareerAdviceLinks from './CareerAdviceLinks';

const DashboardPage = () => {
  return (
    <>
      <NavigationBar homeButton={false} />
      <div style={{ padding: 20 }}>
        <Grid container spacing={3}>
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
    </>
  );
};

export default DashboardPage;

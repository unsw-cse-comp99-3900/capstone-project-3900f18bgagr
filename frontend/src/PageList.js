import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Components/Dashboard/DashboardPage';
import CareerPathsPage from './Components/CareerPath/CareerPaths';
import CareerPlanPage from './Components/CareerPlan/CareerPlan';
import LoginSignUp from './Components/LoginSignup/LoginSignup'

const PageList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/CareerPaths" element={<CareerPathsPage />} />
        <Route path="/CareerPlan" element={<CareerPlanPage />} />
        <Route path="/loginSignUp" element={<LoginSignUp />} />
      </Routes>
    </div>
  );
}

export default PageList;
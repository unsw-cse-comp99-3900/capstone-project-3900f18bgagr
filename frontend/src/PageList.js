import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Components/Dashboard/DashboardPage';
import CareerPathsPage from './Components/CareerPath/CareerPaths';
import CareerPlanPage from './Components/CareerPlan/CareerPlan';
import LoginSignUp from './Components/LoginSignup/LoginSignup';
import VerifyCode from './Components/ResetPassword/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';

const PageList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/CareerPaths" element={<CareerPathsPage />} />
        <Route path="/CareerPlan" element={<CareerPlanPage />} />
        <Route path="/loginSignUp" element={<LoginSignUp />} />
        <Route path="/verifyCode" element={<VerifyCode />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default PageList;
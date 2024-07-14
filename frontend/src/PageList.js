/*eslint no-warning-comments: "error"*/
import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Components/Dashboard/DashboardPage';
import CareerPathsPage from './Components/CareerPath/CareerPaths';
import CareerPlanPage from './Components/CareerPlan/CareerPlan';
import LoginSignUp from './Components/LoginSignup/LoginSignup';
import VerifyCode from './Components/ResetPassword/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';

const PageList = () => {
  const [token, setToken] = useState("")
  const [userId, setUserId] = useState("")

  React.useEffect(() => {
    const checktoken = localStorage.getItem("token");
    const checkId = localStorage.getItem("id");
    if (checktoken) {
      setToken(checktoken);
    }
    if (checkId) {
      setUserId(checkId)
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
        <Route path="/CareerPaths" element={<CareerPathsPage token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
        <Route path="/CareerPlan" element={<CareerPlanPage token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
        <Route path="/loginSignUp" element={<LoginSignUp token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
        <Route path="/verifyCode" element={<VerifyCode token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
        <Route path="/resetPassword" element={<ResetPassword token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
      </Routes>
    </div>
  );
}

export default PageList;
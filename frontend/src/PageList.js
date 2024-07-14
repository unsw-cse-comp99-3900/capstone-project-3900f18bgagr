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
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [skills, setSkills] = useState("")
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

  const getUserDetails = async () => {
    // alert('here')
    try {
      const response = await fetch("http://localhost:5000/userDetails", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
          'id': userId
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
  }, [token, userId])

  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage email={email} setEmail={setEmail} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} skills={skills} setSkills={setSkills} token={token} setToken={setToken} userId={userId} setUserId={setUserId} />} />
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
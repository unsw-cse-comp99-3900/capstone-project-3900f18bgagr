import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Components/Dashboard/DashboardPage';
import CareerPathsPage from './Components/CareerPath/CareerPaths';

const PageList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/CareerPaths" element={<CareerPathsPage />} />
      </Routes>
    </div>
  );
}

export default PageList;
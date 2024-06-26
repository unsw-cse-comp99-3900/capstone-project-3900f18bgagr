import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Dashboard/DashboardPage';
import CareerPathsPage from './CareerPath/CareerPaths';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/CareerPaths" element={<CareerPathsPage />} />
      </Routes>
    </div>
  );
}

export default App;

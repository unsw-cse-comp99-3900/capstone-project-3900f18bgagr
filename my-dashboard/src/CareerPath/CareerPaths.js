import React from 'react';
import { Box, Typography } from '@mui/material';
import NavigationBar from '../NavigationBar';
import CareerChart from './CareerChart'; // Assume this is your chart component
import JobDetails from './JobDetails'; // Assume this handles job details pop-ups
import SearchSection from './SearchSection';

const CareerPaths = () => {
  const data = {
    nodes: [
        { name: "Total Graduates" },           // Node 0
        { name: "Junior Developer" },          // Node 1
        { name: "Junior Data Engineer" },      // Node 2
        { name: "Junior AI Specialist" },      // Node 3
        { name: "Junior Network Engineer" },   // Node 4
        // 细分职业
        { name: "Software Engineer" },         // Node 5
        { name: "Data Scientist" },            // Node 6
        { name: "AI Research Scientist" },     // Node 7
        { name: "System Administrator" },      // Node 8
        { name: "Network Architect" },         // Node 9
        { name: "Machine Learning Engineer" }, // Node 10
        { name: "Computer Vision Engineer" },  // Node 11
        { name: "Natural Language Processing Engineer" }, // Node 12
        { name: "Robotics Engineer" },         // Node 13
        { name: "Data Analyst" },              // Node 14
        { name: "IT Support Specialist" },     // Node 15
        { name: "Cybersecurity Analyst" },     // Node 16
        { name: "Cloud Solutions Architect" }  // Node 17
    ],
    links: [
        { source: 0, target: 1, value: 20000 },
        { source: 0, target: 2, value: 15000 },
        { source: 0, target: 3, value: 25000 },
        { source: 0, target: 4, value: 25000 },
        // 从大类到具体职业的流动
        { source: 1, target: 5, value: 8000 },
        { source: 2, target: 6, value: 7000 },
        { source: 3, target: 7, value: 5000 },
        { source: 3, target: 10, value: 6000 },
        { source: 3, target: 11, value: 4000 },
        { source: 3, target: 12, value: 3000 },
        { source: 3, target: 13, value: 2000 },
        { source: 4, target: 8, value: 5000 },
        { source: 4, target: 9, value: 4000 },
        { source: 4, target: 15, value: 5000 },
        { source: 4, target: 16, value: 3000 },
        { source: 4, target: 17, value: 3000 },
        // 职业交叉流动
        { source: 1, target: 14, value: 4000 },
        { source: 2, target: 14, value: 3000 },
        { source: 3, target: 14, value: 2000 }
    ]
  };



  return (
    <Box sx={{ p: 2 }}>
      <NavigationBar homeButton={true} />
      <Typography variant="h4" sx={{ mb: 2 }}>
        Explore Graduate Career Paths
      </Typography>
      <SearchSection />
      <CareerChart data={data} />
      <JobDetails />
    </Box>
  );
};

export default CareerPaths;

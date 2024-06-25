import React from 'react';
import { Paper, Typography, Link } from '@mui/material';

const CareerAdviceLinks = () => (
  <Paper style={{ padding: 16 }}>
    <Typography variant="h6" gutterBottom>
      Career Trends & Advice
    </Typography>
    <Link href="https://www.forbes.com/sites/bernardmarr/2024/03/12/worried-an-ai-is-going-to-take-your-job-heres-how-to-stay-relevant-in-the-generative-ai-era/" target="_blank" style={{ display: 'block', marginBottom: '8px' }}>
      How To Stay Relevant In The GenAI Era
    </Link>
    <Link href="https://www.comptia.org/blog/top-it-skills-in-demand" target="_blank" style={{ display: 'block', marginBottom: '8px' }}>
      Top IT Skills in Demand in 2024
    </Link>
    <Link href="https://www.bloomberg.com/technology" target="_blank" style={{ display: 'block', marginBottom: '8px' }}>
      Other News Article/Blog Post
    </Link>
  </Paper>
);

export default CareerAdviceLinks;

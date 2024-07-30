import React, {useEffect} from "react";
import {Box, Typography, Button, Grid} from "@mui/material";
import CareerChart from "../CareerPath/CareerChart";
import axios from 'axios';
import {HelpOutline} from "@mui/icons-material";

const CareerPlanSankey = ({sankey, setSankey, props}) => {
    console.log("进入sankey - ");
    console.log(props);
    /*const data = {
      nodes: [
        { name: "Total Graduates1111" }, // Node 0
        { name: "Junior Developer" }, // Node 1
        { name: "Junior Data Engineer" }, // Node 2
        { name: "Junior AI Specialist" }, // Node 3
        { name: "Junior Network Engineer" }, // Node 4
        { name: "Software Engineer" }, // Node 5
        { name: "Data Scientist" }, // Node 6
        { name: "AI Research Scientist" }, // Node 7
        { name: "System Administrator" }, // Node 8
        { name: "Network Architect" }, // Node 9
        { name: "Machine Learning Engineer" }, // Node 10
        { name: "Computer Vision Engineer" }, // Node 11
        { name: "Natural Language Processing Engineer" }, // Node 12
        { name: "Robotics Engineer" }, // Node 13
        { name: "Data Analyst" }, // Node 14
        { name: "IT Support Specialist" }, // Node 15
        { name: "Cybersecurity Analyst" }, // Node 16
        { name: "Cloud Solutions Architect" }, // Node 17
      ],
      links: [
        { source: 0, target: 1, value: 20000 },
        { source: 0, target: 2, value: 15000 },
        { source: 0, target: 3, value: 25000 },
        { source: 0, target: 4, value: 25000 },
        { source: 1, target: 5, value: 8000 },
        { source: 1, target: 6, value: 7000 },
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
        { source: 1, target: 14, value: 4000 },
      ],
    };*/

    const data = {
        nodes: [
            {name: "Junior Developer"}, // Node 0
            {name: "Mid Developer"}, // Node 1
            {name: "Senior Developer"}, // Node 2
            {name: "Mid Software Engineer"}, // Node 3
            {name: "Senior Software Engineer"}, // Node 4

        ],
        links: [
            {source: 0, target: 1, value: 20000},
            {source: 0, target: 2, value: 15000},
            {source: 0, target: 3, value: 25000},
            {source: 0, target: 4, value: 25000},

        ],
    };
    console.log(data);

    const d1 = {
        nodes: [
            {name: "Junior Developer", node: 0}, // Node 0
            {name: "Mid Developer", node: 1}, // Node 1
            {name: "Senior Developer", node: 2}, // Node 2
            {name: "Mid Software Engineer", node: 3}, // Node 3
            {name: "Senior Software Engineer", node: 4}, // Node 4

        ],
        links: [
            {source: 0, target: 1, value: 20000},
            {source: 0, target: 2, value: 15000},
            {source: 0, target: 3, value: 25000},
            {source: 0, target: 4, value: 25000},

        ],
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{p: 5}} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {/*<Grid container spacing={1}*/}
                {/*      stlye={{display: 'flex', justifyContent: 'center', border: '2px solid green'}}>*/}
                {/*    <Grid item xs={2}>*/}
                {/*        <Button*/}
                {/*            style={{backgroundColor: '#3c009d'}}*/}
                {/*            variant="contained"*/}
                {/*            color="primary"*/}
                {/*            onClick={() => {*/}
                {/*                setSankey(false);*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Typography variant="button">Update Skills</Typography>*/}
                {/*        </Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={2}>*/}
                {/*        <Button variant="contained" color="primary" style={{backgroundColor: '#3c009d'}}>*/}
                {/*            <Typography variant="button">Role Dictionary</Typography>*/}
                {/*        </Button>*/}
                {/*    </Grid>*/}

                {/*</Grid>*/}
                <CareerChart data={props}/>
            </Box>
        </div>
    );
};

export default CareerPlanSankey;

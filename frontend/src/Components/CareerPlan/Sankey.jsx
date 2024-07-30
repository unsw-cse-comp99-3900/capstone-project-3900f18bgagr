import React, {useEffect} from "react";
import {Box, Typography, Button, Grid} from "@mui/material";
import CareerChart from "../CareerPath/CareerChart";
import axios from 'axios';
import {HelpOutline} from "@mui/icons-material";

const CareerPlanSankey = ({sankey, setSankey, props}) => {
    // console.log("进入sankey - ");
    // console.log(props);
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

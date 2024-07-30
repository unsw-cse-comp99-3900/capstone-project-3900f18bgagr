import React from "react";
import {Grid, Box, Typography, Button} from "@mui/material";
import NavigationBar from '../Navigation/NavigationBar';
import {List, Autocomplete, TextField} from "@mui/material";

import {InputListItem} from "./InputListItem";
import {SquareList} from "./SquareList";
import {PopupDialog} from "./PopupDialog";
import {ContinuePanel} from "./ContinuePanel";
import CareerPlanSankey from "./Sankey";
import Footer from '../Footer/Footer'

const CareerPlan = (props) => {
    // const roles = [
    //   "Software Engineer",
    //   "Data Scientist",
    //   "Product Manager",
    //   "UX Designer",
    //   "Cybersecurity Analyst",
    // ];
    const roles = [
        "Developer",
        "Data Engineer",
        "AI Specialist",
        "Network Engineer",
        "Software Engineer",
        "Data Analyst",
        "Data Scientist",
        "AI Research Scientist",
        "System Administrator",
        "Network Architect",
        "AI Specialist, Data Engineer",
        "Machine Learning Engineer",
        "Computer Vision Engineer",
        "Natural Language Processing Engineer",
        "Robotics Engineer",
        "Network Engineer, Developer",
        "IT Support Specialist",
        "Cybersecurity Analyst",
        "Cloud Solutions Architect",

    ];

    const [cachedRole, setCachedRole] = React.useState("");
    const [cachedYears, setCachedYears] = React.useState("");

    const [continued, setContinued] = React.useState(false);
    const [sankey, setSankey] = React.useState(false);
    const [experiences, setExperience] = React.useState([]);
    const [jsonData, setJsonData] = React.useState([]);

    const [languageDialogOpen, setLanguageDialogOpen] = React.useState(false);
    const [skillDialogOpen, setSkillDialogOpen] = React.useState(false);

    const [selectedLanguages, setSelectedLanguages] = React.useState([]);
    const [allLanguages] = React.useState([
        "Python",
        "Java",
        "C++",
        "C#",
        "JavaScript",
        "Bash",
        "OpenCV",
        "R",
        "AWS",
        "SQL",
        "TensorFlow",
        "Bash",
        "PowerShell",
    ]);
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const [allSkills] = React.useState([
        "Problem Solving",
        "Communication",
        "Teamwork",
        "Adaptability",
        "Creativity",
        "Work Ethic",
        "Efficiency",
    ]);

    return (
        <div style={{height: '98vh', boxSizing: 'border-box'}}>
            <div style={{height: '10%', margin: '-8px'}}>
                <NavigationBar homeButton={true}/>
            </div>
            <div style={{height: '80%'}}>
                <Box sx={{p: 2}}>
                    <PopupDialog
                        open={languageDialogOpen}
                        setOpen={setLanguageDialogOpen}
                        selected={selectedLanguages}
                        all={allLanguages}
                        title={"Select Programming Languages"}
                        setSelected={setSelectedLanguages}
                    />
                    <PopupDialog
                        open={skillDialogOpen}
                        setOpen={setSkillDialogOpen}
                        selected={selectedSkills}
                        all={allSkills}
                        title={"Select Skills"}
                        setSelected={setSelectedSkills}
                    />

                    <Box sx={{mb: 2}}/>
                    {continued && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Typography variant="h5" sx={{mx: 3}}>
                                                You've got the following skills:
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{bgcolor: "grey.100", p: 1}}>
                                            <List>
                                                {selectedSkills.map((value, index) => (
                                                    <TextField
                                                        key={value + index.toString()}
                                                        value={value}
                                                        disabled
                                                        fullWidth
                                                        sx={{my: 1}}
                                                    />
                                                ))}
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <ContinuePanel
                                    selected={selectedSkills}
                                    all={allSkills}
                                    setSelected={setSelectedSkills}
                                    title={"Anything we missed?"}
                                />
                            </Grid>

                            <Grid item xs={8}/>
                            <Grid item xs={4}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    style={{backgroundColor: '#3c009d'}}
                                    sx={{
                                        height: "100%",
                                    }}
                                    onClick={async () => {

                                        console.log("click");
                                        // console.log(cachedRole);
                                        // console.log(cachedYears);
                                        // console.log(selectedLanguages);
                                        // console.log(selectedSkills);
                                        const mergedArray = selectedLanguages.concat(selectedSkills);
                                        // console.log("mergedArray = ")
                                        console.log(mergedArray)
                                        try {
                                            const response = await fetch('http://localhost:5000/get_path_data', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    user_skills: mergedArray,
                                                    experience_role: cachedRole,
                                                    experience_years: cachedYears
                                                }),
                                            });
                                            console.log("===================")
                                            // console.log(JSON.stringify(request_data))
                                            console.log(response.status)
                                            if (response.ok) {
                                                const jsonResponse = await response.json();
                                                setJsonData(jsonResponse);
                                            } else {
                                                console.error('Failed to post data');
                                            }
                                        } catch (error) {
                                            console.error('Error:', error);
                                        }
                                        setContinued(false);
                                        setSankey(true);

                                    }}
                                >
                                    <Typography variant="button">Continue</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {sankey && <CareerPlanSankey sankey={sankey} setSankey={setSankey} props={jsonData}/>}

                    {!continued && !sankey && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Typography variant="h5" sx={{mx: 3}}>
                                                My Experience
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{bgcolor: "grey.100", p: 1}}>
                                            <List>
                                                {experiences.map((value, index) => (
                                                    <InputListItem
                                                        options={experiences}
                                                        value={value}
                                                        key={value.as + value.for + index.toString()}
                                                        index={index}
                                                        removeValue={(index) => {
                                                            setExperience(
                                                                experiences.filter((v, i) => i !== parseInt(index))
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </List>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            freeSolo
                                            fullWidth
                                            disableClearable
                                            options={roles}
                                            defaultValue=""
                                            onInputChange={(event, newInputValue) => {
                                                setCachedRole(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Role"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "search",
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Autocomplete
                                            freeSolo
                                            fullWidth
                                            disableClearable
                                            options={["1", "2", "3", "4", "5"]}
                                            defaultValue=""
                                            onInputChange={(event, newInputValue) => {
                                                setCachedYears(newInputValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Years"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: "search",
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            style={{backgroundColor: '#3c009d'}}
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                height: "100%",
                                            }}
                                            onClick={() => {
                                                setExperience(
                                                    experiences.concat([{as: cachedRole, for: cachedYears}])
                                                );
                                            }}
                                        >
                                            <Typography variant="button">Add</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                my: 1,
                                                height: "0.5px",
                                                width: "100%",
                                                bgcolor: "grey.500",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{}}>
                                            Programming Languages
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SquareList
                                            values={selectedLanguages}
                                            setOpen={setLanguageDialogOpen}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                my: 1,
                                                height: "0.5px",
                                                width: "100%",
                                                bgcolor: "grey.500",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" sx={{}}>
                                            Skills
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SquareList
                                            values={selectedSkills}
                                            setOpen={setSkillDialogOpen}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8}/>
                            <Grid item xs={4}>
                                <Button
                                    style={{backgroundColor: '#3c009d'}}
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        height: "100%",
                                    }}
                                    onClick={() => {
                                        setContinued(true);
                                    }}
                                >
                                    <Typography variant="button">Continue</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </div>
            {/*<div style={{height: '10%', display: 'flex'}}>*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </div>

    );
};

export default CareerPlan;

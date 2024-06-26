import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Typography style={{margin: 0, padding: '0px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      variant="caption"
      display="block"
      gutterBottom
      sx={{
        textAlign: "center",
      }}
    >
      ©F18BGAGR
    </Typography>
  );
};

export default Footer
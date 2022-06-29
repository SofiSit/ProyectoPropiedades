import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

function Copyright() {
  return (
    <Typography fontSize={25} variant="body2" color="white">
      <Link color="inherit" href="/">
        <FacebookIcon />
      </Link>
      <Link decora color="inherit" href="/">
        <InstagramIcon />
      </Link>
      <br /> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",

        color: "black",
      }}
    >
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 5,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[900]
              : theme.palette.grey[700],
        }}
      >
        <Container maxWidth="sm">
          <Typography color="white" variant="body1">
            Encontra tu Hogar
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

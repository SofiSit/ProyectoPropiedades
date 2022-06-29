import * as React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "../config/Axios"

const theme = createTheme();

const Register = () => {
  const navigate= useNavigate();
  const formik = useFormik({
    initialValues: {
      //valores iniciales que va  atener cada campo
      name: "",
      lastName: "",
      userName: "",
      password: "",
    },

    validationSchema: Yup.object({
      // pongo el dato que uqiero validar, si no pasa cae en el error
      name: Yup.string()
        .required("Campo Requerido")
        .max(15, "15 caracteres máximo"),
      lastName: Yup.string()
        .required("Campo Requerido")
        .max(15, "15 caracteres máximo"),
      userName: Yup.string()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
      password: Yup.string()
        .required("Campo Requerido")
        .max(30, "30 caracteres máximo"),
    }),

    onSubmit: async (data) => {
      // caemos en el onsubmit una vez que se validan toda la info anterior
      try {
        const user = await Axios.post(`/register`, data); // ante era `${url}/login`, pero como creamos la baseUrl en Axos y se lo metemos aca, no hace falta el ${url}
        if (user.data?.id) {
          console.log(`bienvenido`, user.data);
           navigate(`/login`); //  esto no agrega a un array, esto t elleva a una ruta que elija.
            
              } else {
         console.log(" No se pudo crear el usuario, vuelva  a intentarlo")
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, color: "grey" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  onChange={formik.handleChange}
                />
                {formik.touched.name && <p>{formik.errors.name}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                />
                {formik.touched.lastName && <p>{formik.errors.lastName}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Nombre de Usuario"
                  name="userName"
                  autoComplete="userName"
                  onChange={formik.handleChange}
                />
                {formik.touched.userName && <p>{formik.errors.userName}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                />
                {formik.touched.password && <p>{formik.errors.password}</p>}
              </Grid>
            </Grid>
            <Button
            color= 'inherit'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrate
            </Button>
            <Grid container justifyContent="center" >
              <Grid item>
                <Link to='/login'  color={'inherit'}>
                  Ya tienes una cuenta? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

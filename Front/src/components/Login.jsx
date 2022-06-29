import * as React from "react";
import Axios from "../config/Axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogged } from "../store/userSlice";

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      //valores iniciales que va  atener cada campo
      userName: "",
      password: "",
    },

    validationSchema: Yup.object({
      // pongo el dato que uqiero validar, si no pasa cae en el error
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
        const logged = await Axios.post(`/login`, data); // ante era `${url}/login`, pero como creamos la baseUrl en Axos y se lo metemos aca, no hace falta el ${url}
        if (logged.data?.token) {
          console.log(`bienvenido`, logged);
          localStorage.setItem("token", logged.data.token); // para guardar en el localStorahe, lo tengo que hacer ocmo string, no ocmo objeto. el logged.data me va a dar el token que necesito.
          navigate(`/`); //  esto no agrega a un array, esto t elleva a una ruta que elija.
          dispatch(setUserLogged());
        } else {
          console.log(" Usuario o contraseña incorrecta");
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
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "grey" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nombre de usuario"
              name="userName"
              autoComplete="userName"
              autoFocus
              onChange={formik.handleChange}
            />
            {formik.touched.userName && <p>{formik.errors.userName}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
            />
            {formik.touched.password && <p>{formik.errors.password}</p>}
            <Button
              color="inherit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" color="secondary">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">{"No estas registrado? Registrate"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

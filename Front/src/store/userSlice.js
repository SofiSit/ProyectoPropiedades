import { createSlice } from "@reduxjs/toolkit";
import Axios from "../config/Axios";

//aca vamos a buscar la informacion de cada usuario, con un componente global.

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}, // deberia de ir null, pero aca le decimos que va a ser un objeto.
  },
  reducers: {
    // aca estan las acciones que van a ser despachadas `redux`
    setUser: (state, action) => {
      state.user = action.payload; // las action es lo que modifica los estados globales.
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const setUserLogged = () => (dispatch) => {
  Axios.get("/auth")
    .then((response) => {
      dispatch(setUser(response.data.user));
    })
    .catch((error) => console.log(error));
};

//sseteamos el estado global con el usuario loggeado

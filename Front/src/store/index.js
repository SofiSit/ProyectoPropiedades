// este va a ser el principal done van a venir los slices.

import { configureStore } from "@reduxjs/toolkit";
// reducer
import user from "./userSlice";

export default configureStore({
  reducer: {
    user,
  },
});

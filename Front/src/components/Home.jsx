import React from "react";
import Botones from "../commons/Botones";
//import Carrousel1 from "../commons/Carrousel1"
import Form from "./Form";
//import { Container, Typography, Button } from "@mui/material";
import Cards from "../commons/Cards";
import { useDispatch } from "react-redux";
import { setUserLogged } from "../store/userSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserLogged());
  }, []);

  return (
    <>
      <div className="slide">
        <Botones />
        <Form />
      </div>
    </>
  );
};

export default Home;

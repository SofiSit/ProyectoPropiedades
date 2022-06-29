import React, { useEffect, useState } from "react";
import Cards from "../commons/Cards";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Axios from "../config/Axios";
import { useParams } from "react-router-dom";
import { ViewAgendaTwoTone } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogged } from "../store/userSlice";

const Listado = ({ alquiler, venta, categorias, favoritos, filterList }) => {
  console.log("alquiler", alquiler);
  console.log("venta", venta);
  console.log("categorias", alquiler);
  console.log("filterList", filterList);
  console.log("favoritos", favoritos);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [properties, setProperties] = useState([]);

  let query = "";
  const { id } = useParams();
  if (alquiler) {
    query = "toRent=true";
  }
  if (venta) {
    query = "onSale=true";
  }
  if (categorias) {
    query = `categoryId=${id}`;
  }
  /* if (filterList) {
    setProperties(filterList);
  } */

  const getProperties = async () => {
    try {
      let propList = [];
      if (favoritos) {
        propList = await Axios.get(`/favorites/${user.id}`);
      } else {
        propList = await Axios.get(`/properties?${query}`); // query es alq o venta
      }
      setProperties(propList.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    //se ejecuta cuando se carga el componente y cuando cambia el estado(useState)
    dispatch(setUserLogged());
    if (filterList === undefined) getProperties();
  }, [alquiler, venta, filterList]); // lo que pongo en el array de dependencias, es para que me detecte los cambios en dichas variables y se vuelva a ejecutar el useEfect

  return (
    <div>
      <Grid
        container
        spacing={10}
        wrap="wrap"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        {filterList === undefined
          ? properties.map((property, i) => (
              <Grid item key={i}>
                <Cards data={property} favoritos={favoritos} />
              </Grid>
            ))
          : filterList.map((property, i) => (
              <Grid item key={i}>
                <Cards data={property} favoritos={favoritos} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Listado;

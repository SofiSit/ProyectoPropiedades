import {
  Button,
  Dialog,
  Grid,
  ImageListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Alert, AlertTitle } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
//import { addFavorite, getFavorite, removeFavorite } from "../state/favourites";
import ShowerIcon from "@mui/icons-material/Shower";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { setUserLogged } from "../store/userSlice";
import CottageIcon from "@mui/icons-material/Cottage";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import Axios from "../config/Axios";

const SingleV = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log("Stado", state);
  const { user } = useSelector((state) => state.user);

  const [favs, setFavs] = useState([]);
  const [fav, setFav] = useState({ checked: false, id: "" });

  const handleFavorite = async () => {
    //seteo un fav
    try {
      const body = {
        name: state.name,
        url_image: state.image || state.url_image,
        propId: state.id,
      };
      const favorite = await Axios.post(`/favorites`, body);
      if (favorite.data?.id)
        setFav({
          checked: true,
          id: favorite.data.id,
        }); //lo que tenioa fav lo cambio por
      checkFav();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const favDeleted = await Axios.delete(`/favorites/${fav.id}`);
      setFav({ checked: false, id: "" }); //traigo lo que tenia fav y lo camvbio
      checkFav();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const checkFav = async () => {
    // buscame en el array una conincidencia , propId que sea igual al id del stado
    try {
      const favList = await Axios.get(`/favorites/${user.id}`);
      setFavs(favList.data);
      const favMatch = favList.data.find(
        (fav) =>
          state.id === (state.favorites !== undefined ? fav.id : fav.propId)
      );
      console.log("favList", favList);
      console.log("favmacht", favMatch);
      if (favMatch?.id) setFav({ checked: true, id: favMatch.id });
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    dispatch(setUserLogged());
    checkFav();
  }, []);

  return (
    <Grid
      container
      spacing={4}
      paddingX={6}
      paddingTop={6}
      sx={{ height: "77vh" }}
    >
      {console.log("fav", fav)}
      <Grid item xs={6}>
        <Grid item xs={12} className="imageContainer-singleView">
          <ImageListItem className="imagelistitem">
            <img src={state.image || state.url_image} />
          </ImageListItem>
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid content>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Typography fontSize={2} variant="h4">
                <h1>
                  {" "}
                  <CottageIcon fontSize="large" /> {state.name}{" "}
                </h1>
              </Typography>
            </Box>
            <hr color="black" />
          </Grid>
          <Grid
            item
            xs={12}
            paddingBottom={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {" "}
            <Typography
              sx={{ flexGrow: 1 }}
              gutterBottom
              variant="h5"
              component="div"
              color="black"
            >
              <AddLocationAltIcon fontsize="large" /> Locación: {state.location}
            </Typography>
          </Grid>
          <Typography
            sx={{ flexGrow: 1 }}
            gutterBottom
            variant="h6"
            component="div"
            color="black"
            fontSize={25}
          >
            <AttachMoneyOutlinedIcon fontSize="large" /> {state.price}
          </Typography>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <p> {state.description}</p>
            </Box>
          </Grid>

          <Grid item xs={12} paddingTop={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                width: 350,
              }}
            >
              <div class="faclities-block" size="50px">
                <ul>
                  <li>
                    {" "}
                    <ShowerIcon fontSize="large" />
                  </li>
                  <li>
                    <BedOutlinedIcon fontSize="large" />
                  </li>
                  <li>
                    {" "}
                    <DirectionsCarIcon fontSize="large" />
                  </li>
                </ul>
              </div>
            </Box>
            {user?.id && (
              <Box>
                {fav.checked ? (
                  <Button
                    onClick={handleRemoveFavorite}
                    sx={{
                      bgcolor: "gray",
                      color: "black",
                      borderRadius: "8px",
                    }}
                    endIcon={<FavoriteIcon sx={{ color: "red" }} />}
                    variant="contained"
                    size="large"
                  >
                    quitar
                  </Button>
                ) : (
                  <Button
                    onClick={handleFavorite}
                    sx={{
                      bgcolor: "gray",
                      color: "black",
                      borderRadius: "8px",
                    }}
                    endIcon={<FavoriteBorderIcon sx={{ color: "darkgray" }} />}
                    variant="contained"
                  >
                    favoritos
                  </Button>
                )}
              </Box>
            )}
          </Grid>
          <br></br>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleV;

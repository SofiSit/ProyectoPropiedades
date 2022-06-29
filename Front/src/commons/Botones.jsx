import * as React from "react";
import { useState, useEffect} from "react"
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Axios from "../config/Axios";

  /* const categorias = [
  {
    image: "https://www.deltalight.com/frontend/files/projects/images/source/002898_REA02.jpg",
    name: "Casas de Playa",
   
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0566/6396/5893/files/1_7e85c3de-32ab-4d0f-a574-0ea7d5715b65.png?v=1633775087",
    name: "Casas Ecologicas",
    
  },
  {
    image: "https://www.arquitecturaydiseno.es/medio/2021/09/15/casa-moderna-en-los-bosques-de-canada-fachada-iluminada-8053e009-1500x1080_23e82903_1200x630.jpeg",
    name: "Casas en el Bosque",
 
  },
];  */
 
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 400,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.1,
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
}));

const Botones = () => {
   const [categories, setCategories] = useState([]);

  const getAllCat = async () => {
    try {
      const catList = await Axios.get("/categories");
      console.log("lista", catList.data)
      setCategories(catList.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getAllCat();
  }, []);  

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      {categories.map((cat) => (
        <ImageButton
            focusRipple
            key={cat.name}
            style={{
              width: "33.33%",
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${cat.image})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Link to={`/categorias/${cat.id}`}>
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {cat.name}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
        </Link>
          </ImageButton>
      ))}
    </Box>
  );
};

export default Botones; 




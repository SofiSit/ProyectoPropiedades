import * as React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

const Cards = (props) => {
  const { favoritos } = props;
  const { name, description, image, price, url_image } = props.data;
  props.data.favorites = favoritos;
  console.log("propsdata", props.data);
  return (
    <Card
      sx={{
        backgroundColor: "lightgray",
        display: "flex",
        justifyContent: "center",
        height: "28rem",
        width: "22rem",
        boxShadow: "0.1em 0.1em 0.8em grey",
        borderRadius: "10px",
        color: "black",
      }}
    >
      <Link
        to="/single"
        state={props.data}
        style={{ color: "black", textDecoration: "none" }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={image || url_image}
            alt="casa"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <br />
            {price && (
              <Typography
                //onClick={handleClick}
                sx={{ flexGrow: 1, alignItems: "end" }}
                gutterBottom
                variant="h6"
                component="div"
              >
                ${price}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default Cards;

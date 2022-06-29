const express = require("express");
const router = express.Router();
const {favoritesControllers}= require("../controllers");
const verifyToken = require("../middlewares/jwt.middleware");


router.post('/', verifyToken, favoritesControllers.createFavorite);
router.get('/:userId', verifyToken, favoritesControllers.findFavorites);
router.delete('/:id', verifyToken, favoritesControllers.destroyFavorite);



module.exports= router;
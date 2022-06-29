const express = require("express")
const router = express.Router()
const properties = require ("./properties.routes")
const categories = require ("./categories.routes")
const favorites = require ("./favorites.routes")
const register = require ("./register.routes")
const login = require ("./login.routes")
const logout = require ("./logout.routes")
const auth = require ("./auth.routes")


router.use("/properties", properties);
router.use("/categories", categories);
router.use("/favorites", favorites);
router.use("/register", register);
router.use("/login", login);
router.use("/auth", auth);
router.use("/logout", logout);

 


module.exports = router;
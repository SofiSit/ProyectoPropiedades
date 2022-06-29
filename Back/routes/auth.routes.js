const express=require("express")
const router = express.Router()
const {authControllers}=require('../controllers')
const verifyToken = require("../middlewares/jwt.middleware")

router.get('/', verifyToken, authControllers.userVerification)

module.exports=router
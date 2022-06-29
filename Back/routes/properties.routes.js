const express = require("express");
const router = express.Router();
const { propertiesControllers }= require("../controllers");
const verifyToken = require("../middlewares/jwt.middleware");


router.post("/", verifyToken, propertiesControllers.createProperty )
router.get("/", propertiesControllers.listProperties )
router.put("/:id", verifyToken, propertiesControllers.updateProperty )
router.delete("/:id", verifyToken, propertiesControllers.destroyProperty)


module.exports= router;
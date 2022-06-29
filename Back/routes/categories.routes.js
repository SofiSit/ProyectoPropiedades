const express = require("express");
const router = express.Router();
const {categoriesControllers}= require("../controllers");
const verifyToken = require("../middlewares/jwt.middleware");


router.post("/", verifyToken, categoriesControllers.createCategory)
router.get("/", categoriesControllers.listCategories)
router.put("/:id", verifyToken, categoriesControllers.updateCategory)
router.delete("/:id", verifyToken, categoriesControllers.deleteCategory)


module.exports= router;
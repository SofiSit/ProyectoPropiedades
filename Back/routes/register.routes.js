const express = require("express");
const router = express.Router();
const { registerControllers } = require("../controllers");

router.post("/", registerControllers.createUser);

module.exports = router;

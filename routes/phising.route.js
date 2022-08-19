var express = require("express");
var router = express.Router();
var controller = require("../controllers/phising.controller");

// Get All User Face
router.get("/", controller.getAllPhising);
router.post("/", controller.savePhising);

module.exports = router;

var express = require("express");
var router = express.Router();
var { uploadBukti } = require("../middleware/form.validation");
var controller = require("../controllers/bukti.controller");

router.post("/", uploadBukti, controller.createBukti);

module.exports = router;

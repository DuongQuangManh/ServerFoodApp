var express = require("express");
var router = express.Router();
var indexCtrl = require("../controllers/index.controller");
/* GET home page. */
router.get("/", indexCtrl.login);

module.exports = router;

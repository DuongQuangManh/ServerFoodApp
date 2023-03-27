var express = require("express");
var router = express.Router();
var loginCtrl = require("../controllers/index.controller");
/* GET users listing. */
router.get("/", loginCtrl.formlogin);

module.exports = router;

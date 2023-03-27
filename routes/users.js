var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users.controller");
/* GET users listing. */
router.get("/", usersController.getList);

module.exports = router;

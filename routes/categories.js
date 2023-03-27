var express = require("express");
var router = express.Router();
var categoriesController = require("../controllers/category.controller");
/* GET users listing. */
router.get("/", categoriesController.getList);

module.exports = router;

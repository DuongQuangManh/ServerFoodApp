var express = require("express");
var router = express.Router();
var productsController = require("../controllers/products.controller");
/* GET users listing. */
router.get("/", productsController.getList);

module.exports = router;

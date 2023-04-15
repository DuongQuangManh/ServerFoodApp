var express = require("express");
var router = express.Router();
var productsController = require("../controllers/products.controller");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });
/* GET users listing.
 */

router.use((req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
});

router.get("/", productsController.getList);

router.post("/", uploader.single("fileimg"), productsController.addProduct);

module.exports = router;

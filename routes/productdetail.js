var express = require("express");
var router = express.Router();
var Detail = require("../controllers/productdetail.controller");
router.use((req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
});
router.get("/:idproduct", Detail.get);
// router.get("/", Detail.show);
module.exports = router;

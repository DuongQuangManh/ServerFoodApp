var express = require("express");
var router = express.Router();
var homeCtrl = require("../controllers/home.controller");
/* GET users listing. */
router.use((req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
});
router.get("/", homeCtrl.home);

module.exports = router;

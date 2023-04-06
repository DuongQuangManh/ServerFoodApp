var express = require("express");
var router = express.Router();
var Detail = require("../controllers/userdetails.controller");
router.use((req, res, next) => {
    if (req.session.userLogin) {
      next();
    } else {
      res.redirect("/formlogin");
    }
  });

router.get("/:iduser", Detail.get);
// router.get("/", Detail.show);
module.exports = router;

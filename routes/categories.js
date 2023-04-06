var express = require("express");
var router = express.Router();
var categoriesController = require("../controllers/category.controller");
/* GET users listing. */
router.use((req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
});
router.get("/", categoriesController.getList);
// router.get("/test", categoriesController.test);
router.post("/", categoriesController.add);
module.exports = router;

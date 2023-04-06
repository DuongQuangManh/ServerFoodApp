var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users.controller");
/* GET users listing. */
router.use((req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/formlogin");
  }
});
router.get("/", usersController.getList);
router.post("/", usersController.addUser);

module.exports = router;

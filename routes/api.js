var express = require("express");
var router = express.Router();
var apiUserCtrl = require("../controllers/api/user.api");
var mdw = require("../middlewares/api");
var apiProCtrl = require("../controllers/api/product.api");
var apiCateCtrl = require("../controllers/api/category.api");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });
// users
router.get("/users", mdw.api_auth, apiUserCtrl.listUser);
router.post("/users", apiUserCtrl.reg);
router.post("/users/login", apiUserCtrl.login);
router.get("/users/logout", mdw.api_auth, apiUserCtrl.logout);
router.post("/users/:iduser", uploader.single("image"), apiUserCtrl.update);
router.post("/users/changepass/:iduser", apiUserCtrl.changepass);
router.get("/users/profile", mdw.api_auth, apiUserCtrl.profile);

//products
router.get("/products", apiProCtrl.products);

router.post("/products/search", apiProCtrl.searchProduct);
router.get("/products/:id", apiProCtrl.detailProduct);

router.get("/categorys", apiCateCtrl.getList);

module.exports = router;

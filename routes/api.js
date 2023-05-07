var express = require("express");
var router = express.Router();
var mdw = require("../middlewares/api");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

var apiUserCtrl = require("../controllers/api/user.api");
var apiProCtrl = require("../controllers/api/product.api");
var apiCateCtrl = require("../controllers/api/category.api");
var apiFavoCtrl = require("../controllers/api/favorite.api");
var apiCartCtrl = require("../controllers/api/cart.api");
var apiStoreCtrl = require("../controllers/api/store.api");
var apiAddressCtrl = require("../controllers/api/address.api");
var apiOrderDetailCtrl = require("../controllers/api/orderdetail.api");

// users
router.get("/users", mdw.api_auth, apiUserCtrl.listUser);
router.post("/users/reg", apiUserCtrl.reg);
router.post("/users/login", apiUserCtrl.login);
router.get("/users/logout", mdw.api_auth, apiUserCtrl.logout);
router.post("/users/changepass/:iduser", apiUserCtrl.changepass);
router.get("/users/profile", mdw.api_auth, apiUserCtrl.profile);

router.post("/users/update/:id", uploader.single("image"), apiUserCtrl.update);
//products
router.get("/products", apiProCtrl.products);

router.post("/products/search", apiProCtrl.searchProduct);
router.get("/products/:id", apiProCtrl.detailProduct);

router.get("/categorys", apiCateCtrl.getList);

router.get("/favorites/:id", apiFavoCtrl.favorite);
router.post("/favorites/add", mdw.api_auth, apiFavoCtrl.addFavorite);
router.post("/favorites/delete", mdw.api_auth, apiFavoCtrl.deleteFavorite);

//cart
router.get("/carts/:id", apiCartCtrl.getList);
router.post("/carts/add", mdw.api_auth, apiCartCtrl.add);
router.post("/carts/clear", mdw.api_auth, apiCartCtrl.clear);
router.post("/carts/delete", mdw.api_auth, apiCartCtrl.delete);

//stores
router.get("/stores", apiStoreCtrl.stores);

//address
router.get("/address/:id", apiAddressCtrl.address);
router.post("/address/add", mdw.api_auth, apiAddressCtrl.add);

// orderdetails
router.get("/orderdetails/:id", apiOrderDetailCtrl.getList);
router.post("/orderdetails/add", apiOrderDetailCtrl.add);
module.exports = router;

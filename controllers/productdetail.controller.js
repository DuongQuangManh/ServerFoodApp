var model = require("../models/product.model");

exports.get = async (req, res) => {
  let idproduct = req.params.idproduct;

  const obj = await model.pro
    .findOne({ _id: idproduct })
    .populate(["id_theloai", "id_cuahang"]);
  res.render("./productdetail", {
    layout: "../views/layouts/layout",
    title: "Details",
    obj: obj,
  });
};

var model = require("../models/product.model");

exports.get = async (req, res) => {
  let idproduct = req.params.idproduct;

  const obj = await model.pro.find({ _id: idproduct }).populate("id_theloai");
  console.log(typeof obj);
  res.render("./productdetail", {
    layout: "../views/layouts/layout",
    title: "Details",
    obj: obj[0],
  });
};

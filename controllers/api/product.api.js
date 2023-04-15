var model = require("../../models/product.model");

// food  litmit 5
exports.products = async (req, res, next) => {
  try {
    let data = await model.pro.find().populate("id_theloai").sort({ price: 1 });
    res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
    return;
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

exports.searchProduct = async (req, res, next) => {
  let query = {};
  if (req.body.name) {
    query.name = { $regex: req.body.name, $options: "i" };
  }
  try {
    let data = await model.pro.find(query).populate("id_theloai");
    console.log("---------day la data--------");
    console.log(data);
    console.log("----------het---------");
    return res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};
exports.detailProduct = async (req, res, next) => {
  let id = req.params.id;
  try {
    let data = await model.pro.findOne({ _id: id }).populate("id_theloai");
    return res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

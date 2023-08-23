var model = require("../../models/product.model");

// food  litmit 5
exports.products = async (req, res, next) => {
  const limit = parseInt(req.query.limit)||5;
  const theloai = req.params.idtheloai;
  try {
    const count = await model.pro.countDocuments({id_theloai:theloai});
    let data = await model.pro
      .find({id_theloai:theloai})
      .populate(["id_theloai", "id_cuahang"])
      .limit(limit);
    return res.status(200).json({ data: data,count:count, msg: "Lấy dữ liệu thành công" });
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

exports.searchProduct = async (req, res, next) => {
  console.log("đây là query search")
  console.log(req.query.name);
  const limit = parseInt(req.query.limit) || 5;
  try {
    const count = await model.pro.countDocuments({name: { $regex: req.query.name, $options: "i" }});
    let data = await model.pro
      .find({name: { $regex: req.query.name, $options: "i" }})
      .populate(["id_theloai", "id_cuahang"]).limit(limit);
    return res.status(200).json({ data: data,count:count, msg: "Lấy dữ liệu thành công" });
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
    let data = await model.pro
      .findOne({ _id: id })
      .populate(["id_theloai", "id_cuahang"]);
    return res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

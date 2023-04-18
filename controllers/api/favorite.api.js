var model = require("../../models/favorite.model");

// food  litmit 5
exports.favorite = async (req, res, next) => {
  let query = {};
  if (req.query.id) {
    query.id_user = req.query.id;
  }
  console.log(query);

  try {
    let data = await model.favorite
      .find(query)
      .populate("id_user")
      .populate("id_product");
    console.log(data);
    res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
    return;
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

exports.addFavorite = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    let obj = new model.favorite();
    obj.id_user = req.body.id_user;
    obj.id_product = req.body.id_product;

    try {
      await obj.save();
      let data = await model.favorite
        .find({ id_user: req.body.id_user })
        .populate("id_user")
        .populate("id_product");
      return res
        .status(201)
        .json({ data: data, msg: "Đã thêm vào yêu thích " });
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: err.error });
      }
    }
  }
};

exports.deleteFavorite = async (req, res, next) => {
  if (req.method == "POST") {
    try {
      const a = await model.favorite.deleteOne({
        id_product: req.body.id_product,
      });
      let data = await model.favorite
        .find({ id_user: req.body.id_user })
        .populate("id_user")
        .populate("id_product");
      return res.status(201).json({ data: data, msg: "Xóa thành công" });
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    }
  }
};

var model = require("../../models/cart.model");
exports.getList = async (req, res, next) => {
  let query = {};
  if (req.params.id) {
    query.id_user = req.params.id;
  }
  try {
    let data = await model.cart
      .find(query)
      .populate(["id_user", "id_product"])
      .populate({
        path: "id_product",
        populate: {
          path: "id_cuahang",
          model: "store",
        },
      });
    if (data) {
      return res.status(200).json({ data: data, msg: "Get data success" });
    }
  } catch (err) {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ msg: "Vui lòng kiểm tra lại" });
    }
  }
};

exports.add = async (req, res, next) => {
  console.log("đẫ vào add");
  if (req.method == "POST") {
    let obj = new model.cart();
    obj.id_user = req.body.id_user;
    obj.id_product = req.body.id_product;
    obj.quantity = req.body.quantity;
    console.log(obj)
    try {
      const st = await obj.save();
      console.log(st);
      if (st) {
        let data = await model.cart
          .find({ id_user: req.body.id_user })
          .populate(["id_user", "id_product"])
          .populate({
            path: "id_product",
            populate: {
              path: "id_cuahang",
              model: "store",
            },
          });
        return res.status(201).json({ data: data, msg: "Thêm thành công" });
      } else {
        return res.status(404).json({ msg: "Phiên hết hạn" });
      }
    } catch (err) {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
    }
  }
};

exports.clear = async (req, res, next) => {
  console.log(req.body.id_user);
  try {
    if (req.method == "POST") {
      const a = await model.cart.deleteMany({
        id_user: req.body.id_user,
      });
      return res.status(200).json({ data: [], msg: "Thành công" });
    }
  } catch (err) {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ msg: "Lỗi" });
    }
  }
};

exports.delete = async (req, res, next) => {
  const query = {
    _id: req.body.id,
    id_user: req.body.id_user,
  };
  console.log(query);
  if (req.method == "POST") {
    try {
      const a = await model.cart.deleteOne(query);
      if (a) {
        let data = await model.cart
          .find({ id_user: req.body.id_user })
          .populate(["id_user", "id_product"])
          .populate({
            path: "id_product",
            populate: {
              path: "id_cuahang",
              model: "store",
            },
          });
        return res.status(200).json({ data: data, msg: "Xóa thành công" });
      } else {
        console.log("abc");
        return res.status(404).json({ msg: "Phiên hết hạn" });
      }
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      }
    }
  }
};

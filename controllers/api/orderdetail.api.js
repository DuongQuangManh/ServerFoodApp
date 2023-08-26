var model = require("../../models/orderdetail.model");

exports.getList = async (req, res, next) => {
  let id = req.params.id;
  const statusselect = parseInt(req.query.status);
  const start = parseInt(req.query.start)||0;
  const limit = parseInt(req.query.limit)||5;
  try {
    const count = await model.ord.countDocuments({ id_user: id });
    let data = await model.ord
      .find({ id_user: id,status:statusselect }).skip(start)
      .populate(["listitem.id_product", "id_user"])
      .populate({
        path: "listitem.id_product",
        populate: {
          path: "id_cuahang",
          model: "store",
        },
      }).limit(limit);
    return res.status(200).json({ data: data,count:count, msg: "Lấy thành công" });
  } catch (err) {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ msg: "Lỗi" });
    }
  }
};

exports.add = async (req, res, next) => {
  if (req.method == "POST") {
    try {
      let obj = new model.ord();
      obj.id_user = req.body.id_user;
      obj.listitem = req.body.listitem;
      obj.sumpay = req.body.sumpay;
      obj.status = req.body.status;
      obj.paymentstatus = req.body.paymentstatus;
      obj.methodpay = req.body.methodpay;
      obj.location = req.body.location;

      const newObj = await obj.save();
      let data = await model.ord
        .find({ id_user: req.body.id_user })
        .populate(["listitem.id_product", "id_user"])
        .populate({
          path: "listitem.id_product",
          populate: {
            path: "id_cuahang",
            model: "store",
          },
        });
      if (newObj) {
        return res.status(201).json({ data: data, msg: "Thành công " });
      } else {
        return res.status(400).json({ msg: "Thất bại " });
      }
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Error" });
      }
    }
  }
};

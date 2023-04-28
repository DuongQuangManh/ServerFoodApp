var model = require("../../models/address.model");

exports.address = async (req, res, next) => {
  let id = req.params.id;
  let query = {};
  if (req.params.id) {
    query.id_user = id;
  }
  let data = await model.address.find(query).populate("id_user");
  return res.status(200).json({ data: data, msg: "lây thành công" });
};

exports.add = async (req, res, next) => {
  if ((req.method = "POST")) {
    let obj = new model.address();
    obj.longitude = req.body.longitude;
    obj.latitude = req.body.latitude;
    obj.details = req.body.details;
    obj.id_user = req.body.id_user;
    try {
      const a = await obj.save();

      if (a) {
        let data = await model.address.find({ id_user: req.body.id_user });
        res.status(201).json({ data: data, msg: "Thêm địa chỉ thành công" });
      } else {
        res.status(400).json({ msg: "Thêm địa chỉ thất bại" });
      }
    } catch (err) {
      if (err) {
        console.log(err.message);
        res.status(404).json({ msg: err.message });
      }
    }
  }
};

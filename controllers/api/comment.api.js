var model = require("../../models/comment.model");
exports.get = async (req, res, next) => {
  try {
    const data = await model.cmt.find().populate(["id_user", "id_product"]);
    return res.status(200).json({ data: data, msg: "thành cống" });
  } catch (err) {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ msg: "Lỗi" });
    }
  }
};

exports.add = async (req, res) => {
  if (req.method == "POST") {
    try {
      const obj = new model.cmt();
      obj.id_user = req.body.id_user;
      obj.id_product = req.body.id_product;
      obj.content = req.body.content;

      const newcmt = await obj.save();
      if (newcmt) {
        const data = await model.cmt.find().populate(["id_user", "id_product"]);
        return res.status(201).json({ data: data, msg: "thêm thành công" });
      } else {
        return res.status(400).json({ msg: "Thất bại" });
      }
    } catch (err) {
      if (err) {
        console.log(err);
        return res.status(401).json({ msg: "lỗi server" });
      }
    }
  }
};

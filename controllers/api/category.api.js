var model = require("../../models/category.model");
exports.getList = async (req, res, next) => {
  try {
    let data = await model.cate.find();
    res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
    return;
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

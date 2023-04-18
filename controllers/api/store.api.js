var model = require("../../models/store.model");

// food  litmit 5
exports.stores = async (req, res, next) => {
  try {
    let data = await model.store.find().populate("id_user");
    console.log("------------------2:00----------");
    console.log(data);
    console.log("------------------2:00----------");

    res.status(200).json({ data: data, msg: "Lấy dữ liệu thành công" });
    return;
  } catch (error) {
    if (error) {
      console.log(error.message);
      return res.status(400).json({ msg: error.message });
    }
  }
};

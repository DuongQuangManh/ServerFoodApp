var db = require("../config/db");

var Category = new db.mongoose.Schema(
  {
    name: { type: String, default: "Không có tên" },
    id_sanpham: { type: db.mongoose.Schema.Types.ObjectId, ref: "pro" },
  },
  {
    collection: "categories",
  }
);
let cate = db.mongoose.model("cate", Category);
module.exports = { cate };

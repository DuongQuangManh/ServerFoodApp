var db = require("../config/db");

var Category = new db.mongoose.Schema(
  {
    name: { type: String, default: "Không có tên" },
  },
  {
    collection: "categories",
  }
);
let cate = db.mongoose.model("cate", Category);
module.exports = { cate };

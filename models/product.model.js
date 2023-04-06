var db = require("../config/db");

var Product = new db.mongoose.Schema(
  {
    name: { type: String, default: "Không có tên" },
    price: { type: Number, default: "không có giá" },
    description: { type: String, default: "không có miêu tả" },
    img: {
      type: String,
      default:
        "https://developer.android.com/static/codelabs/basic-android-kotlin-training-internet-images/img/467c213c859e1904.png?hl=vi",
    },
    id_theloai: { type: db.mongoose.Schema.Types.ObjectId, ref: "cate" },
  },
  {
    collection: "foods",
  }
);

let pro = db.mongoose.model("pro", Product);
module.exports = { pro };

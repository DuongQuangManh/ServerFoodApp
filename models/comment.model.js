var db = require("../config/db");

const Comment = new db.mongoose.Schema(
  {
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
    id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: "pro" },
    content: { type: String, required: true },
  },
  {
    collection: "comments",
    timestamps: true,
  }
);

let cmt = db.mongoose.model("cmt", Comment);

module.exports = { cmt };

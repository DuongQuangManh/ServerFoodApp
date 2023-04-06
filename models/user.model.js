var db = require("../config/db");
var User = new db.mongoose.Schema(
  {
    firstname: { type: String, default: "Không có tên" },
    lastname: { type: String, default: "Không có tên" },
    email: { type: String, default: "Không có email" },
    passwd: { type: String, required: true },
    status: { type: Boolean, default: true },
    position: { type: Boolean, default: false },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

let user = db.mongoose.model("user", User);

module.exports = { user };

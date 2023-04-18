var db = require("../config/db");

var Store = new db.mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    collection: "stores",
    timestamps: true,
  }
);

let store = db.mongoose.model("store", Store);
module.exports = { store };

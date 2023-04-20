var db = require("../config/db");

const Address = db.mongoose.Schema(
  {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    details: { type: String, required: true },
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    collection: "address",
  }
);

let address = db.mongoose.model("address", Address);
module.exports = { address };

var db = require("../config/db");

var Favorite = db.mongoose.Schema(
  {
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
    id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: "pro" },
  },
  {
    collection: "favorites",
    timestamps: true,
  }
);

let favorite = db.mongoose.model("favorite", Favorite);
module.exports = { favorite };

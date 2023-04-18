var db = require("../config/db");

const Cart = db.mongoose.Schema(
  {
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
    id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: "pro" },
    quantity: { type: Number, required: true },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

let cart = db.mongoose.model("cart", Cart);
module.exports = { cart };

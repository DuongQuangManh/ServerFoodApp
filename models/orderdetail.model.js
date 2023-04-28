var db = require("../config/db");

const OrderDetail = db.mongoose.Schema(
  {
    id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: "user" },
    listitem: [
      {
        id_product: { type: db.mongoose.Schema.Types.ObjectId, ref: "pro" },
        quantity: Number,
        price: Number,
      },
    ],
    sumpay: { type: Number, required: true },
    status: { type: Number, required: true },
    paymentstatus: { type: Number, required: true },
    methodpay: { type: Number, required: true },
    location: { type: String, required: true },
  },
  {
    collection: "orderitems",
    timestamps: true,
  }
);

let ord = db.mongoose.model("ord", OrderDetail);
module.exports = { ord };

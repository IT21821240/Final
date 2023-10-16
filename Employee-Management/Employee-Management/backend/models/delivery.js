const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  orderId: {
    type: String,
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Order",
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  // amount: {
  //   type: String,
  //   required: true,
  // },
  deliveryDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "inProgress", "completed"],
    required: true,
    default: "Pending",
  },
  isShippingAddress: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Delivery", deliverySchema);
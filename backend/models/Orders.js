const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  // // _id: Object,
  // _id: mongoose.Schema.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
});
const OrdersModel = mongoose.model("order", OrderSchema);
module.exports = OrdersModel;

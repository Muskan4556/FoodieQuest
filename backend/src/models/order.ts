import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    menuItems: [
      {
        menuItemId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "placed",
        "failed",
        "paid",
        "inProgress",
        "outForDelivery",
        "delieved",
      ],
      default: "placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

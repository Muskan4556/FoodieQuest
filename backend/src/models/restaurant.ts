import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const RestaurantSchema = new mongoose.Schema(
  {
    // reference to the user document
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    locality: { type: String, required: true },
    areaName: { type: String, required: true },
    costForTwo: { type: String, required: true },
    avgRating: { type: String },
    deliveryPrice: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;

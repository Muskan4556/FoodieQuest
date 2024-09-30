import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: {type:String,trim:true},
  imageUrl: { type: String },
});

const RestaurantSchema = new mongoose.Schema(
  {
    // reference to the user document
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    locality: { type: String, required: true, trim: true },
    areaName: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    costForTwo: { type: String, required: true, trim: true },
    avgRating: { type: Number, min: 0, max: 5 },
    deliveryPrice: { type: Number, required: true, min: 0, max: 2000 },
    deliveryTime: { type: Number, required: true, min: 0, max: 120 },
    cuisines: [{ type: String, required: true }],
    menuItems: [menuItemSchema],
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;

import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  // convert binary data into base64 string
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({
        message: "You've already created a restaurant.",
      });
    }

    // const image = req.file as Express.Multer.File;
    // // convert binary data into base64 string
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant)
      return res.status(404).json({
        message: "You don't have a restaurant",
      });
    return res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  const {
    name,
    locality,
    areaName,
    city,
    costForTwo,
    deliveryPrice,
    deliveryTime,
    avgRating,
    cuisines,
    menuItems,
    imageUrl,
  } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    restaurant.name = name;
    restaurant.locality = locality;
    restaurant.areaName = areaName;
    restaurant.city = city;
    restaurant.costForTwo = costForTwo;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.deliveryTime = deliveryTime;
    restaurant.avgRating = avgRating;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

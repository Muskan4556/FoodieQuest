import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose, { Document } from "mongoose";

interface MenuItem extends Document {
  name: string;
  price: number;
  description?: string ;
  imageUrl: string;
}

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
    console.log('Files:', req.files);  // Log uploaded files
    console.log('Body:', req.body);    // Log form data
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({
        message: "You've already created a restaurant.",
      });
    }

    // Extract the uploaded files
    const files = req.files as {
      imageFile: Express.Multer.File[];
      menuFiles?: Express.Multer.File[];
    };

    const imageUrl = files?.imageFile
      ? await uploadImage(files.imageFile[0])
      : null;

    const restaurant = new Restaurant(req.body);
    if (typeof imageUrl === "string") restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    const menuItems = req.body.menuItems;
    const menuFiles = files?.menuFiles || [];

    const menuItemsWithImages: MenuItem[] = await Promise.all(
      menuItems.map(async (item: any, index: number) => {
        const menuFile = menuFiles[index];

        return {
          name: item.name,
          price: item.price,
          description: item.description,
          imageUrl: menuFile ? await uploadImage(menuFile) : null,
        } as MenuItem;
      })
    );

    restaurant.menuItems =
      menuItemsWithImages as mongoose.Types.DocumentArray<MenuItem>;

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
  } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    restaurant.name = name || restaurant.name;
    restaurant.locality = locality || restaurant.locality;
    restaurant.areaName = areaName || restaurant.areaName;
    restaurant.city = city || restaurant.city;
    restaurant.costForTwo = costForTwo || restaurant.costForTwo;
    restaurant.deliveryPrice = deliveryPrice || restaurant.deliveryPrice;
    restaurant.deliveryTime = deliveryTime || restaurant.deliveryTime;
    restaurant.avgRating = avgRating || restaurant.avgRating;
    restaurant.cuisines = cuisines || restaurant.cuisines;

    // Extract the uploaded files
    const files = req.files as {
      imageFile?: Express.Multer.File[];
      menuFiles?: Express.Multer.File[];
    };

    const imageUrl = files?.imageFile
      ? await uploadImage(files.imageFile[0])
      : restaurant.imageUrl;
    restaurant.imageUrl = imageUrl;

    const menuItems = req.body.menuItems;
    const menuFiles = files?.menuFiles || [];

    const menuItemsWithImages: MenuItem[] = await Promise.all(
      menuItems.map(async (item: any, index: number) => {
        const menuFile = menuFiles[index];

        return {
          name: item.name || restaurant.menuItems[index]?.name,
          price: item.price || restaurant.menuItems[index]?.price,
          description: item.description || restaurant.menuItems[index]?.description,
          imageUrl: menuFile ? await uploadImage(menuFile) : restaurant.menuItems[index]?.imageUrl,
        } as MenuItem;
      })
    );

    restaurant.menuItems =
      menuItemsWithImages as mongoose.Types.DocumentArray<MenuItem>;

    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose, { Document } from "mongoose";

interface MenuItem extends Document {
  name: string;
  price: number;
  description?: string;
  imageUrl: string;
}

interface MulterFiles {
  [key: string]: Express.Multer.File[]; // Allows for dynamic keys
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
    console.log("Files:", req.files); // Log uploaded files
    console.log("Body:", req.body); // Log form data

    const existingRestaurant = await Restaurant.findOne({ user: req.userId });
    if (existingRestaurant) {
      return res.status(409).json({
        message: "You've already created a restaurant.",
      });
    }

    const files = req.files as MulterFiles;

    const imageUrl = files?.imageFile
      ? await uploadImage(files.imageFile[0])
      : null;

    const restaurant = new Restaurant(req.body);
    if (typeof imageUrl === "string") restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    const menuItems: MenuItem[] = await Promise.all(
      req.body.menuItems.map(async (item: any, index: number) => {
        // Use the defined interface to access menu item images
        const menuImage = files[`menuItems[${index}][image]`]?.[0]; // Access the menu image if it exists

        let menuImageUrl: string | null = null; // Initialize as null

        if (menuImage) {
          // Only upload if an image is present
          menuImageUrl = await uploadImage(menuImage);
        }

        return {
          name: item.name,
          price: item.price,
          description: item.description,
          imageUrl: menuImageUrl, // Store the URL of the uploaded image, or null if not uploaded
        } as MenuItem;
      })
    );

    restaurant.menuItems = menuItems as mongoose.Types.DocumentArray<MenuItem>;
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
  try {
    console.log("Files:", req.files); // Log uploaded files
    console.log("Body:", req.body); // Log form data

    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    // Update restaurant fields
    Object.assign(restaurant, req.body);

    // Extract the uploaded files
    const files = req.files as MulterFiles;

    const imageUrl = files?.imageFile
      ? await uploadImage(files.imageFile[0])
      : restaurant.imageUrl; // Retain the existing image URL if no new image is uploaded
    restaurant.imageUrl = imageUrl;

    const menuItems: MenuItem[] = await Promise.all(
      req.body.menuItems.map(async (item: any, index: number) => {
        // Access the menu image if it exists
        const menuImage = files[`menuItems[${index}][image]`]?.[0];

        let menuImageUrl: string | null = null; // Initialize as null

        if (menuImage) {
          // Only upload if an image is present
          menuImageUrl = await uploadImage(menuImage);
        }

        return {
          name: item.name || restaurant.menuItems[index]?.name,
          price: item.price || restaurant.menuItems[index]?.price,
          description:
            item.description || restaurant.menuItems[index]?.description,
          imageUrl: menuImageUrl || restaurant.menuItems[index]?.imageUrl, // Use the newly uploaded or retained image URL
        } as MenuItem;
      })
    );

    restaurant.menuItems = menuItems as mongoose.Types.DocumentArray<MenuItem>;
    await restaurant.save();

    res.status(200).send(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

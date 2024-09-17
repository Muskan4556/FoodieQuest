import { Request, Response } from "express";
import User from "../models/user";

export const createCurrentUser = async (req: Request, res: Response) => {
  // 1. check if user exists
  // 2. create user if does not exits
  // 3. return user object to the calling client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) return res.status(200).send();

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject()); // toObject - Converts this document into a plain-old JavaScript object (POJO).
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating current user",
    });
  }

  const user = User.find();
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. check user exist in database if not 404
    // 2. update and return
    const { name, city, address, country } = req.body;

    const user = await User.findById(req.userId);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    await User.findByIdAndUpdate(
      req.userId,
      { name, city, address, country },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error updating user",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. check user exits in db by using req.userId(db _id)
    // 2. If yes return user

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

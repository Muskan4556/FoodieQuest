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

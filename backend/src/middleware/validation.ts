import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Error handler middleware
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules
export const validateMyUserRequest = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("address").optional().isString().withMessage("Address must be a string"),
  body("city").optional().isString().withMessage("City must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("name").notEmpty().withMessage("Restaurant name is required"),
  body("locality").notEmpty().withMessage("Locality is required"),
  body("areaName").notEmpty().withMessage("Area name is required"),
  body("city").notEmpty().withMessage("City name is required"),
  body("costForTwo").notEmpty().withMessage("CostForTwo is required"),
  body("avgRating").optional(),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("deliveryTime")
    .isInt({ min: 0 })
    .withMessage("Delivery time must be a positive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array is not empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0.0 })
    .withMessage("Menu item price is required and must be a positive number"),
    body("menuItems.*.description").optional(),
  handleValidationErrors,
];

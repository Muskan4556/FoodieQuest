import express from "express";
import { param } from "express-validator";
import {
  getRestaurantInfo,
  searchRestaurant,
} from "../controllers/RestaurantController";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City must be a valid string"),
  searchRestaurant
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id must be a valid string"),
  getRestaurantInfo
);

export default router;

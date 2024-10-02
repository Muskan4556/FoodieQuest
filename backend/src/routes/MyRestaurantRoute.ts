import express from "express";

import { jwtCheck, jwtParse } from "../middleware/auth";
import multer from "multer";
import { validateMyRestaurantRequest } from "../middleware/validation";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "../controllers/MyRestaurantController";

const router = express.Router();

// multer is a middleware library for handling file uploads in Node.js
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/", jwtCheck, jwtParse, getMyRestaurant);

router.post(
  "/",
  upload.fields([
    { name: "imageFile" },
    { name: "menuItems[0][image]", maxCount: 1 },
    { name: "menuItems[1][image]", maxCount: 1 },
    { name: "menuItems[2][image]", maxCount: 1 },
    { name: "menuItems[3][image]", maxCount: 1 },
    { name: "menuItems[4][image]", maxCount: 1 },
    { name: "menuItems[5][image]", maxCount: 1 },
    { name: "menuItems[6][image]", maxCount: 1 },
    { name: "menuItems[7][image]", maxCount: 1 },
    { name: "menuItems[8][image]", maxCount: 1 },
    { name: "menuItems[9][image]", maxCount: 1 },
    { name: "menuItems[10][image]", maxCount: 1 },
    { name: "menuItems[11][image]", maxCount: 1 },
    { name: "menuItems[12][image]", maxCount: 1 },
    { name: "menuItems[13][image]", maxCount: 1 },
    { name: "menuItems[14][image]", maxCount: 1 },
  ]),

  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

router.put(
  "/",
  upload.fields([
    { name: "imageFile" },
    { name: "menuItems[0][image]", maxCount: 1 },
    { name: "menuItems[1][image]", maxCount: 1 },
    { name: "menuItems[2][image]", maxCount: 1 },
    { name: "menuItems[3][image]", maxCount: 1 },
    { name: "menuItems[4][image]", maxCount: 1 },
    { name: "menuItems[5][image]", maxCount: 1 },
    { name: "menuItems[6][image]", maxCount: 1 },
    { name: "menuItems[7][image]", maxCount: 1 },
    { name: "menuItems[8][image]", maxCount: 1 },
    { name: "menuItems[9][image]", maxCount: 1 },
    { name: "menuItems[10][image]", maxCount: 1 },
    { name: "menuItems[11][image]", maxCount: 1 },
    { name: "menuItems[12][image]", maxCount: 1 },
    { name: "menuItems[13][image]", maxCount: 1 },
    { name: "menuItems[14][image]", maxCount: 1 },
  ]),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  updateMyRestaurant
);

export default router;

/**
 * upload.single("imageFile"): This middleware parses the request and looks for a file in req.body under the field name imageFile. It also enforces the file size limit defined earlier
 */

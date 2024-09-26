import express from "express";
import {
  createMyRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
} from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import multer from "multer";
import { validateMyRestaurantRequest } from "../middleware/validation";

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
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  createMyRestaurant
);

router.put("/",upload.single("imageFile"),
validateMyRestaurantRequest,
jwtCheck,
jwtParse,updateMyRestaurant )

export default router;

/**
 * upload.single("imageFile"): This middleware parses the request and looks for a file in req.body under the field name imageFile. It also enforces the file size limit defined earlier
 */

import express from "express";
import {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser
} from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, getCurrentUser)
router.post("/", jwtCheck, createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);

export default router;

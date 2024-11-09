import express, { Request, Response } from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {
  createCheckoutSession,
  getMyOrder,
  validateSignature,
} from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

router.post("/checkout-order/validate", jwtCheck, jwtParse, validateSignature);

router.get("/", jwtCheck, jwtParse, getMyOrder)

export default router;

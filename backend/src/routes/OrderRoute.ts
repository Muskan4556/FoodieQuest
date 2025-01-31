import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import {
  createCheckoutSession,
  getMyOrder,
  validatePayment,
  validateWebhook,
} from "../controllers/OrderController";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
);

router.post("/checkout-order/validate", jwtCheck, jwtParse, validatePayment);

// razorpay will make a call to this endpoint
router.post("/payment/webhook", validateWebhook);

router.get("/", jwtCheck, jwtParse, getMyOrder);

export default router;

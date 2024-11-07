import { Request, Response } from "express";
import Razorpay from "razorpay";
import Restaurant, { MenuItemType } from "../models/restaurant";
import crypto from "node:crypto";

if (!process.env.RAZORPAY_API_KEY || !process.env.RAZORPAY_API_SECRET) {
  throw new Error(
    "Razorpay API Key and Secret must be defined in environment variables."
  );
}

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

type CartItem = {
  menuItemId: string;
  name: string;
  quantity: number;
};

// Frontend will send data of type CheckoutSessionRequest
type CheckoutSessionRequest = {
  cartItems: Array<CartItem>;
  deliveryDetail: {
    email: string;
    name: string;
    address: string;
    city: string;
  }; // UserProfileFormData
  restaurantId: string;
};

type OnSuccessRequest = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems // why = missing price attribute in checkoutSessionRequest and why price missing in req body because any can make request using postman and create an order and pass their own prices.
    );

    const totalAmount =
      lineItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0) + restaurant.deliveryPrice;

    // Razorpay order creation options
    const options = {
      amount: totalAmount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `order_rcptid_${new Date().getTime()}`, // Unique receipt id
      // payment_capture: 1, // Auto-capture payment after successful payment
      // line_items: lineItems, // Razorpay line items
      notes: {
        cartDetails: JSON.stringify(lineItems), // Optional metadata
        deliveryPrice: restaurant.deliveryPrice,
      },
    };

    // Create the order with Razorpay
    const order = await instance.orders.create(options);

    res.status(200).json({
      order,
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      message: err.raw.message,
    });
  }
};

const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: Array<MenuItemType>
) => {
  return checkoutSessionRequest.cartItems.map((cartItem) => {
    // Find the corresponding menu item using the menuItemId
    const menuItem = menuItems.find(
      (menu) => menu._id.toString() === cartItem.menuItemId
    );

    if (!menuItem) {
      throw new Error(`Menu Item does not exist: ${cartItem.menuItemId}`);
    }

    return {
      name: menuItem.name,
      quantity: cartItem.quantity,
      price: menuItem.price,
    };
  });
};

export const validateSignature = async (req: Request, res: Response) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return res.status(400).json({
      message: "Missing required parameters.",
    });
  }

  try {
    // Create the HMAC with SHA-256 and Razorpay secret
    const sha = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_API_SECRET as string
    );
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    // Validate the signature
    if (digest !== razorpay_signature) {
      return res.status(403).json({
        message: "Transaction is not valid.",
      });
    }
    res.status(200).json({
      message: "Success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

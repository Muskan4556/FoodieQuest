import { Request, Response } from "express";
import Razorpay from "razorpay";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

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
      receipt: `order_rcptid_${new Date().getTime()}`,
      // payment_capture: 1, // Auto-capture payment after successful payment
      // line_items: lineItems, // Razorpay line  items
      // notes: {
      //   // lineItem: JSON.stringify(lineItems), // Optional metadata
      //   restaurantInfo: JSON.stringify(restaurant._id),
      //   menuItemDetail: JSON.stringify(checkoutSessionRequest.cartItems),
      //   deliveryDetails: JSON.stringify(checkoutSessionRequest.deliveryDetail),
      //   totalAmount: totalAmount * 100,
      // },
    };

    // Create the order with Razorpay
    const order = await instance.orders.create(options);

    const newOrder = new Order({
      paymentId: order.id,
      paymentStatus: order.status,
      restaurant: restaurant._id,
      user: req.userId,
      totalAmount: totalAmount * 100,
      deliveryDetails: checkoutSessionRequest.deliveryDetail,
      menuItems: checkoutSessionRequest.cartItems,
    });

    await newOrder.save();

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

export const validatePayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id } = req.body;

    const order = await Order.findOne({ paymentId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const validateWebhook = async (req: Request, res: Response) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature") as string;

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET as string
    );

    if (!isWebhookValid) {
      return res.status(401).json({ message: "Invalid webhook signature." });
    }

    // Update order - paymentStatus, status

    const paymentDetails = req.body.payload.payment.entity;

    const order = await Order.findOne({ paymentId: paymentDetails.order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.paymentStatus = paymentDetails.status;
    order.status = "paid";

    await order.save();

    // if (req.body.event === "payment.captured") {
    // }
    if (req.body.event === "payment.failed") {
      order.status = "failed";
      order.paymentStatus = paymentDetails.status;
      await order.save();
    }

    // return success response to razorpay
    return res.status(200).json({
      message: "Webhook signature is valid.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user")
      .sort({
        createdAt: -1,
      });
    if (!order) {
      return res.status(404).json({
        message: "No order found.",
      });
    }
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

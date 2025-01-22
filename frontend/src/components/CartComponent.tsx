import { Cart } from "@/context-api/CartContext";
import { useCart } from "@/context-api/useCart";
import { Restaurant } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

const CartComponent = () => {
  const { state, dispatch } = useCart();
  const { cartItems, restaurant } = state;
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const RAZORPAY_API_KEY = import.meta.env.VITE_RAZORPAY_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { getAccessTokenSilently } = useAuth0();
  const addToCart = (item: Cart, restaurant: Restaurant) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        restaurant: restaurant,
        cartItem: item,
      },
    });
  };

  const removeToCart = (item: Cart) => {
    // check if item exist in cartItems(context api)
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingCartItem) {
      const cartItem: Cart = {
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: existingCartItem.quantity,
      };
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: {
          cartItem: cartItem,
        },
      });
    }
  };

  const calculateTotal = () => {
    const itemTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (restaurant) return itemTotal + restaurant?.deliveryPrice;
  };

  const handleCheckOut = async (userFormData: UserFormData) => {
    if (!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity,
      })),
      deliveryDetail: {
        email: userFormData.email as string,
        name: userFormData.name,
        address: userFormData.address,
        city: userFormData.city,
      },
      restaurantId: restaurant?._id,
    };
    const data = await createCheckoutSession(checkoutData);

    // Initiate Razorpay checkout here
    const options = {
      key: RAZORPAY_API_KEY,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,
      name: "Foodie Quest",
      description: "Payment for your order",
      handler: async function (response: Razorpay.PaymentResponse) {
        const accessToken = await getAccessTokenSilently();
        const body = {
          ...response,
        };
        const validateRes = await fetch(
          `${API_BASE_URL}/api/order/checkout-order/validate`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const orderInfo = await validateRes.json();

        if (orderInfo.paymentStatus === "Captured") {
          toast.success("Payment successful");
          dispatch({
            type: "RESET_CART",
          });
          window.location.href = "/order";
        } else {
          toast.error("Payment failed");
          window.location.href = `/details/${restaurant._id}`;
        }
      },
      prefill: {
        name: "Muskan",
        email: "muskan8752@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },

      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (!restaurant || cartItems.length === 0) {
    return (
      <div>
        Your cart is empty.{" "}
        <Link
          to={`/search/patna`}
          className="text-blue-700 underline font-semibold"
        >
          Explore more restaurants
        </Link>{" "}
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cart-container"
        className="container mx-auto md:p-10 p-4 md:w-1/2 lg:w-3/5 bg-white shadow-xl border rounded-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{
          opacity: { duration: 0.6 },
          y: { type: "spring", stiffness: 80, damping: 20 },
        }}
      >
        <div className="flex flex-col md:flex-row items-center pb-4 mb-4">
          <LazyLoadImage
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="w-24 h-24 rounded-lg mr-4 object-cover shadow-md hidden md:block"
          />
          <div>
            <Link to={`/details/${restaurant._id}`}>
              <motion.h2
                className="md:text-3xl text-xl font-bold text-gray-800 tracking-tight hover:underline whitespace-nowrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {restaurant.name}
              </motion.h2>
            </Link>
            <motion.p
              className="text-gray-600 md:text-base text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {restaurant.areaName}
            </motion.p>
          </div>
        </div>
        <Separator />

        <motion.div
          className="my-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1, // Delay for staggered animation
              },
            },
          }}
        >
          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              className="flex justify-between items-center py-2 mb-2 text-sm md:text-base tracking-tight md:whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              <div className="flex items-center">
                <span className="md:ml-4 font-medium text-gray-700 tracking-tight">
                  {item.name}
                </span>
                <Button
                  variant="default"
                  className="flex items-center text-[#1ba672] font-bold bg-white md:text-lg text-sm md:mx-4 mx-2 rounded-md hover:bg-transparent hover:text-none transition-colors duration-200 cursor-default p-0"
                >
                  <Minus
                    onClick={() => removeToCart(item)}
                    className="mx-2 cursor-pointer h-4 w-4"
                  />
                  <div className="md:text-base">{item.quantity}</div>
                  <Plus
                    onClick={() => addToCart(item, restaurant)}
                    className="mx-2 cursor-pointer h-4 w-4"
                  />
                </Button>
              </div>
              <span className="font-bold text-gray-800 text-sm md:text-base">
                ₹{item.price * item.quantity}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <Separator />
        <motion.div
          className="flex flex-col pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="md:text-lg text-sm font-bold mb-2 text-gray-800">
            Bill Details
          </h3>
          <div className="flex justify-between py-1 md:text-base text-sm">
            <span className="text-gray-600">Item Total</span>
            <span className="text-gray-800">
              ₹
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="flex justify-between py-1 ">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="text-gray-800">₹{restaurant?.deliveryPrice}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold py-1">
            <span className="text-gray-800 md:text-base text-sm">To Pay</span>
            <span className="md:text-lg text-[#1ba672] text-sm">
              ₹{calculateTotal()}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckoutButton
            disabled={cartItems.length === 0}
            onCheckOut={handleCheckOut}
            isLoading={isCheckoutLoading}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartComponent;

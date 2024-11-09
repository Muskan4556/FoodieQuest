import { MenuItem, Restaurant } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button } from "./ui/button";
import { useCart } from "@/context-api/useCart";
import { Cart } from "@/context-api/CartContext";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  item: MenuItem;
  index: number;
  restaurant: Restaurant;
};

const MenuItem1 = ({ item, restaurant, index }: Props) => {
  const { state, dispatch } = useCart();
  const { cartItems, restaurant: restaurantContext } = state;
  const [isRestaurantSwitching, setIsRestaurantSwitching] = useState(false);

  const existingRestaurant = restaurantContext?._id === restaurant?._id;
  let switchRestaurant = !existingRestaurant && cartItems.length > 0;

  const addToCart = (item: MenuItem, restaurant: Restaurant) => {
    if (switchRestaurant) {
      // first case false & true => false
      setIsRestaurantSwitching(true);
      return;
    }

    const cartItem: Cart = {
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        restaurant: restaurant,
        cartItem: cartItem,
      },
    });
  };

  const removeToCart = (item: MenuItem) => {
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

  const handleConfirmAddToCart = () => {
    setIsRestaurantSwitching(false); // Close the dialog
    switchRestaurant = false;
    addToCart(item, restaurant);
  };

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === item._id
  );
  const cartItemSelected = !!existingCartItem;

  return (
    <Card className="relative border-none shadow-none md:-mx-0 -mx-4">
      <div className="flex justify-between ">
        <div>
          <CardHeader>
            <CardTitle className="text-base md:text-xl">
              {capitalizeFirstLetter(item.name)}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-black/80 text-base font-medium md:-mt-4 -mt-5 tracking-tight ">
            ₹{item.price}
          </CardContent>
          <CardContent className="flex items-center text-black/80 text-base font-medium md:-mt-4 -mt-5 -ml-1 tracking-tight ">
            <LazyLoadImage
              src="https://img.icons8.com/?size=100&id=63454&format=png&color=166534"
              className="ml-1 md:w-4 md:h-4 h-4 object-cover"
              alt="Rating Icon info"
            />
            <CardTitle className="ml-1 text-sm  md:text-base text-[#166534]">
              4.2
            </CardTitle>
          </CardContent>
          <CardContent className="text-black/60 font-medium -mt-4 text-xs md:text-base">
            {item.description}
          </CardContent>
        </div>

        <div className="relative md:w-60 md:h-36 h-28 mx-4 w-[30%]">
          {item.imageUrl && (
            <LazyLoadImage
              src={item.imageUrl}
              className="w-full h-full object-cover rounded-lg"
            />
          )}

          {!cartItemSelected ? (
            <>
              <Button
                variant="outline"
                onClick={() => addToCart(item, restaurant)}
                className="absolute -bottom-4 flex left-1/2 transform -translate-x-1/2 text-[#1ba672] font-bold bg-white md:text-lg text-sm md:py-6 md:w-[50%] hover:bg-[#d9dadb] rounded-lg hover:text-[#1ba672]"
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  ADD
                </motion.div>
              </Button>
              <AlertDialog
                open={isRestaurantSwitching}
                onOpenChange={setIsRestaurantSwitching}
              >
                <AlertDialogContent className=" w-[60%] md:w-[100%] rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="tracking-tighter md:tracking-tight ">
                      Items already in cart
                    </AlertDialogTitle>
                    <AlertDialogDescription className="tracking-tighter md:tracking-tight md:text-base">
                      Your cart contains items from other restaurant. Would you
                      like to reset your cart for adding items from this
                      restaurant?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setIsRestaurantSwitching(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-orange-600 hover:bg-orange-500"
                      onClick={handleConfirmAddToCart}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <Button
              variant="outline"
              className="absolute -bottom-4 flex left-1/2 transform -translate-x-1/2 text-[#1ba672] font-bold bg-white md:text-lg text-sm  md:py-6 md:w-[50%] w-[100%]  rounded-lg hover:text-none hover:bg-none cursor-default"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Plus
                  onClick={() => addToCart(item, restaurant)}
                  className="mx-2 cursor-pointer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                {existingCartItem ? existingCartItem.quantity : 0}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Minus
                  onClick={() => removeToCart(item)}
                  className="mx-2 cursor-pointer"
                />
              </motion.div>
            </Button>
          )}
        </div>
      </div>

      {restaurant.menuItems.length - 1 !== index && (
        <div className="flex justify-center">
          <Separator className=" md:mt-4 md:w-full w-[94%]" />
        </div>
      )}
    </Card>
  );
};

export default MenuItem1;

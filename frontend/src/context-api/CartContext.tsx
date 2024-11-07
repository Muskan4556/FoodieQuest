import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Restaurant } from "@/types"; 

export type Cart = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type InitialState = {
  restaurant: Restaurant | null;
  cartItems: Array<Cart>;
};

type Action =
  | { type: "ADD_TO_CART"; payload: { restaurant: Restaurant; cartItem: Cart } }
  | { type: "REMOVE_FROM_CART"; payload: { cartItem: Cart } }
  | { type: "INIT_CART"; payload: InitialState };

export type CartContextType = {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
};

// Create a context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: InitialState = {
  restaurant: null,
  cartItems: [],
};

// Reducer function
const cartReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // check if different restaurant, then reset cart
      if (
        state.restaurant &&
        state.restaurant._id !== action.payload.restaurant._id
      ) {
        return {
          restaurant: action.payload.restaurant,
          cartItems: [action.payload.cartItem],
        };
      }

      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload.cartItem._id
      );

      // cart item exist
      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingCartItemIndex] = {
          ...updatedCartItems[existingCartItemIndex],
          quantity: updatedCartItems[existingCartItemIndex].quantity + 1,
        };
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }

      // cart item doesn't exist
      return {
        ...state,
        restaurant: action.payload.restaurant,
        cartItems: [...state.cartItems, action.payload.cartItem],
      };
    }
    case "REMOVE_FROM_CART": {
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload.cartItem._id
      );
      if (existingCartItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        const existingCartItem = updatedCartItems[existingCartItemIndex];
        // If quantity is 1, remove item completely
        if (existingCartItem.quantity === 1) {
          updatedCartItems.splice(existingCartItemIndex, 1);
        } else {
          updatedCartItems[existingCartItemIndex] = {
            ...existingCartItem,
            quantity: existingCartItem.quantity - 1,
          };
        }
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
      return state;
    }

    case "INIT_CART": {
      return action.payload; // Rehydrate cart from sessionStorage
    }
    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      dispatch({
        type: "INIT_CART",
        payload: JSON.parse(savedCart),
      });
    }
  }, []);

  // Initialize cart from sessionStorage if it exists
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart && parsedCart.restaurant && parsedCart.cartItems) {
          dispatch({
            type: "INIT_CART",
            payload: parsedCart,
          });
        }
      } catch (error) {
        console.error("Failed to parse cart from sessionStorage", error);
      }
    }
  }, []);

  // Update sessionStorage whenever the state changes
  useEffect(() => {
    if (state.cartItems.length > 0 || state.restaurant !== null) {
      sessionStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Export the CartContext to be used in other files
export { CartContext };

export type User = {
  _id: string;
  auth0Id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

export type Restaurant = {
  _id: string;
  name: string;
  user: string; // ref
  locality: string;
  areaName: string;
  city: string;
  costForTwo: string;
  deliveryPrice: number;
  deliveryTime: number;
  avgRating?: number;
  cuisines: Array<string>;
  menuItems: Array<MenuItem>;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delieved";

export type Order = {
  _id: string;
  paymentStatus: string;
  user: User;
  restaurant: Restaurant;
  deliveryDetails: {
    email: string;
    name: string;
    address: string;
    city: string;
  };
  menuItems: [
    {
      menuItemId: string;
      name: string;
      quantity: number;
    }
  ];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

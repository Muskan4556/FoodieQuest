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

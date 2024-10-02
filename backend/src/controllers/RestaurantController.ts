import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

export const searchRestaurant = async (req: Request, res: Response) => {
//   try {
//     // http://localhost:3000/api/restaurant/search/Patna?searchQuery=veg+noddles&sortOptions=deliveryTime&selectedCuisines=chinese&page=1
//     const city = req.params.city;
//     const searchQuery = (req.query.searchQuery as string) || ""; // for restaurant name or cuisines
//     const selectedCuisines = (req.query.selectedCuisines as string) || ""; // comma separated string
//     const sortOptions = (req.query.sortOptions as string) || "lastUpdated";
//     const page = parseInt(req.query.page as string) || 1;

//     let query: any = {};

//     query["city"] = new RegExp(city, "i");
//     const cityCheck = await Restaurant.countDocuments(query); // return number
//     if (cityCheck === 0) return res.status(404).json([]);

//     if (selectedCuisines) {
//       // The split() method splits a string into an array of substrings, returns the new array, method does not change the original string
//       const cuisinesArray = selectedCuisines
//         .split(",")
//         .map((cuisine) => new RegExp(cuisine, "i"));

//       query["cuisines"] = { $all: cuisinesArray };
//     }

//     if (searchQuery) {
//       const searchRegex = new RegExp(searchQuery, "i");
//       query["$or"] = [{ name: searchRegex }, { cuisines: searchRegex }];
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
};

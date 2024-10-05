import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    // /search/:city
    // http://localhost:3000/api/restaurant/search/Patna?searchQuery=veg+noddles&sortOptions=deliveryTime&selectedCuisines=chinese&page=1
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery as string) || ""; // for restaurant name or cuisines
    const selectedCuisines = (req.query.selectedCuisines as string) || ""; // comma separated string
    const sortOption = (req.query.sortOption as string) || "updatedAt";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};
    // query["city"] dynamically assigns the key "city" to the query object.
    query["city"] = new RegExp(`^${city.trim()}$`, "i");
    const cityCheck = await Restaurant.countDocuments(query); // return number
    if (cityCheck === 0)
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });

    if (selectedCuisines) {
      // comma separated string
      // The split() method splits a string into an array of substrings, returns the new array, method does not change the original string
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      query["$or"] = [
        { name: searchRegex }, // name - restaurantName
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10; // number of restaurant will be displayed
    const skip = (page - 1) * pageSize; // skip number of restaurant eg. page=2 skip=10 then - the first 10 records will be skipped
    // sortOption = "updatedAt"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 }) // -1 indicates descending order.
      .skip(skip)
      .limit(pageSize)
      .lean(); //  convert the resulting documents into plain JavaScript objects instead of Mongoose documents.

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        totalRestaurant: total,
        page,
        pages: Math.ceil(total / pageSize), // 30/10 = 3 pages to display all 30 restaurants
      },
    };
    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/**
 * new RegExp - creates a regular expression (RegExp) object, The "i" flag stands for case-insensitive.
 *  comma separated string (whenever we send an array from the frontend(request URL) it appears in the backend as comma separated string).
 * e.g., "Italian,Chinese,Indian" becomes ["Italian", "Chinese", "Indian"]).
 * after new Regex - [ /Italian/i, /Chinese/i, /Indian/i ]
 * query["cuisines"] = { $all: [/Italian/i, /Chinese/i] }; - This query will return only restaurants that have both "Italian" and "Chinese" in their cuisines array.
 *
 * $or - { $or: [ { condition1 }, { condition2 }, ... ] }
 */

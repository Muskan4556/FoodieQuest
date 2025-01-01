import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import { SortOrder } from "mongoose";

export const getRestaurantInfo = async (req: Request, res: Response) => {
  try {
    const resId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(resId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

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

    const sortingOptions: { [key: string]: SortOrder } = {
      deliveryTime: 1,
      updatedAt: -1,
      avgRating: -1,
      costForTwo: 1,
    };

    const sortValue =
      sortingOptions[sortOption] !== undefined ? sortingOptions[sortOption] : 1;

    const pageSize = 10; // number of restaurant will be displayed
    const skip = (page - 1) * pageSize; // skip number of restaurant eg. page=2 skip=10 then - the first 10 records will be skipped
    // sortOption = "updatedAt"
    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: sortValue as SortOrder }) // -1 indicates descending order.
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

/*
Let’s break down how the `sortingOptions` object and the `sortValue` calculation work in relation to `.sort({ [sortOption]: sortValue as SortOrder })`.

### 1. **`sortingOptions` Object**:
The `sortingOptions` object defines how to sort the restaurants based on different fields (like `deliveryTime`, `updatedAt`, etc.). Each field is mapped to a numeric value representing the sorting direction:

```typescript
const sortingOptions: { [key: string]: SortOrder } = {
  deliveryTime: 1,    // Ascending order (smallest to largest)
  updatedAt: -1,      // Descending order (most recent first)
  avgRating: -1,      // Descending order (highest rating first)
  costForTwo: 1,      // Ascending order (cheapest to most expensive)
};
```

- **`deliveryTime: 1`** means sort by `deliveryTime` in ascending order (smallest to largest).
- **`updatedAt: -1`** means sort by `updatedAt` in descending order (most recent first).
- **`avgRating: -1`** means sort by `avgRating` in descending order (highest rating first).
- **`costForTwo: 1`** means sort by `costForTwo` in ascending order (cheapest to most expensive).

This object is essentially a dictionary that tells the system how to sort based on different fields.

### 2. **Determining the `sortValue`**:
Next, the value for `sortValue` is determined dynamically based on the selected `sortOption`.

```typescript
const sortValue =
  sortingOptions[sortOption] !== undefined ? sortingOptions[sortOption] : 1;
```

- **`sortOption`** is a string that represents the field you want to sort by, such as `"deliveryTime"`, `"updatedAt"`, `"avgRating"`, or `"costForTwo"`.
  
- **`sortingOptions[sortOption]`** looks up the sorting direction (either `1` or `-1`) for that field. If `sortOption` is a valid key in the `sortingOptions` object, it returns the corresponding value (`1` or `-1`).
  
- **`!== undefined`** checks if the `sortOption` exists in `sortingOptions`. If it exists, it uses the corresponding value for sorting direction.
  
- If `sortOption` is not found in `sortingOptions` (i.e., it's an invalid or undefined value), the fallback value is `1`, meaning the default sorting direction will be ascending.

For example:
- If `sortOption = "avgRating"`, then `sortValue = sortingOptions["avgRating"]` will be `-1` (because `avgRating` maps to `-1` in `sortingOptions`).
- If `sortOption = "costForTwo"`, then `sortValue = sortingOptions["costForTwo"]` will be `1` (because `costForTwo` maps to `1` in `sortingOptions`).

### 3. **Using `sortValue` in the `.sort()` Method**:
Now, that you have the correct `sortValue` based on the `sortOption`, you use it in the `.sort()` method like this:

```typescript
.sort({ [sortOption]: sortValue as SortOrder })
```

This line dynamically constructs the sorting object. Here's how:

- **`[sortOption]`** is a computed property name, meaning the key for sorting is the value of the `sortOption` variable (e.g., `"deliveryTime"`, `"updatedAt"`, etc.).
  
- **`sortValue`** is the sorting direction (`1` for ascending, `-1` for descending).

So, if `sortOption = "avgRating"` and `sortValue = -1`, the code will generate:
```javascript
.sort({ avgRating: -1 }) // Sort by "avgRating" in descending order
```

### Full Example:

1. If the request has `sortOption = "deliveryTime"`, the `sortValue` will be `1` (ascending order).
   - The `.sort()` will become `.sort({ deliveryTime: 1 })`, which sorts restaurants by delivery time in ascending order.

2. If the request has `sortOption = "updatedAt"`, the `sortValue` will be `-1` (descending order).
   - The `.sort()` will become `.sort({ updatedAt: -1 })`, which sorts restaurants by the most recent update first.

### Summary:
- The `sortingOptions` object maps each field to a sorting direction.
- The `sortValue` is dynamically set based on the `sortOption` provided in the request. If the `sortOption` is not found, the default sorting direction is ascending (`1`).
- The `sortValue` is then used to construct a dynamic `.sort()` query to order the results based on the specified field and direction.
*/
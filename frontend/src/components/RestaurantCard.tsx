import { Restaurant } from "@/types";
import { Dot } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

type Props = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/details/${restaurant._id}`}
      className="w-[100%] md:w-[20rem] lg:w-[22rem]"
    >
      <div
        key={restaurant._id}
        className="border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
      >
        <div className="h-56 w-[100%] md:w-[20rem] lg:w-[22rem] ">
          <LazyLoadImage
            src={restaurant.imageUrl}
            alt={`restaurantImg - ${restaurant.name}`}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="px-4 pt-3 -mt-3 pb-4">
          <div className="mt-2 font-semibold text-lg text-gray-900 tracking-tight">
            {restaurant.name}
          </div>
          <div className="flex items-center mt-1">
            <LazyLoadImage
              src="https://img.icons8.com/?size=100&id=63454&format=png&color=20953c"
              className="w-4 h-4 object-cover"
              alt="Rating Icon"
            />
            <div className="ml-1 font-medium flex">
              <div>{restaurant?.avgRating ? restaurant.avgRating : "--"}</div>
              {/* {" ."} */}
              <span>
                <Dot />
              </span>
            </div>
            <div className=" font-medium ">{restaurant.deliveryTime} mins</div>
          </div>
          <div className=" text-black/60 font-medium ">
            <div className="tracking-tight">
              ₹{restaurant.costForTwo} for two{" "}
            </div>
          </div>
          <div className=" text-black/60 font-medium  -mt- ">
            <div className="tracking-tight">{restaurant.areaName}</div>
          </div>
          <div className="mt-2">
            {restaurant.cuisines.length > 4 ? (
              <>
                {restaurant.cuisines.slice(0, 4).map((cuisine, index) => (
                  <span
                    key={index}
                    className="inline-block bg-orange-600 text-white rounded-full px-2 py-1 text-xs mr-1 mb-1"
                  >
                    {cuisine}
                  </span>
                ))}
                <span className="inline-block text-gray-600 text-xs">
                  +{restaurant.cuisines.length - 4} more
                </span>
              </>
            ) : (
              restaurant.cuisines.map((cuisine, index) => (
                <span
                  key={index}
                  className="inline-block bg-orange-600 text-white rounded-full px-2 py-1 text-xs mr-1 mb-1"
                >
                  {cuisine}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

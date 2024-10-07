import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Restaurant } from "@/types";
import { Dot } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({restaurant}: Props) => {
  return (
    <Card className="mt-4 mb-8 md:my-0 border-sla ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
            {restaurant.name}
          </CardTitle>
          <div className="flex items-center bg-green-800 px-2 py-1 md:p-2 rounded-lg">
            <CardTitle className="text-white text-xs md:text-sm md:text-normal">
              {restaurant.avgRating}
            </CardTitle>
            <LazyLoadImage
              src="https://img.icons8.com/?size=100&id=63454&format=png&color=ffffff"
              className="ml-1 md:w-4 md:h-4 h-3 object-cover"
              alt="Rating Icon info"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className=" flex font-semibold text-black/80 md:-mt-5 -mt-6 tracking-tight text-sm md:text-base">
        <span>{restaurant.deliveryPrice} mins</span>
        <Dot />

        <p>{restaurant.areaName}</p>
      </CardContent>
      <CardContent className="flex font-semibold text-black/60 md:text-base overflow-x-auto scrollbar-hide md:-mt-5 -mt-7  ">
        {restaurant.cuisines.map((cuisine, index) => (
          <span key={`info_${cuisine}`} className="flex md:mt-0 mt-1">
            <span className="whitespace-nowrap text-sm md:text-base tracking-tighter">
              {capitalizeFirstLetter(cuisine)}
            </span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;

import { useRestaurantInfo } from "@/api/RestaurantApi";
import BreadCrumb from "@/components/Bread";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItem1 from "@/components/MenuItem1";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const { restaurantInfo, isLoading } = useRestaurantInfo(restaurantId);

  if (isLoading || !restaurantInfo) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="">
      <div className=" mx-1 -mt-4 md:mt-0">
        <BreadCrumb
          city={restaurantInfo?.city}
          restaurantName={restaurantInfo?.name}
        />
      </div>
      <div className="my-8 md:flex flex-col hidden">
        <AspectRatio ratio={16 / 5}>
          <LazyLoadImage
            src={restaurantInfo.imageUrl}
            alt={`${restaurantInfo.name}_image`}
            className="w-full h-full object-cover rounded-md  "
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col  gap-4">
        <RestaurantInfo restaurant={restaurantInfo} />
        <div className="text-2xl font-bold tracking-tight ">Menu</div>
        {restaurantInfo.menuItems.map((menuItem, index) => (
          <MenuItem1
            item={menuItem}
            index={index}
            arraylength={restaurantInfo.menuItems.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;

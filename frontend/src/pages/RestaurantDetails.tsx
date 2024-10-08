import { useRestaurantInfo } from "@/api/RestaurantApi";
import BreadCrumb from "@/components/Bread";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItem1 from "@/components/MenuItem1";
import { useCart } from "@/context-api/useCart";
import { ChevronRight } from "lucide-react";

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const { restaurantInfo, isLoading } = useRestaurantInfo(restaurantId);
  const { state } = useCart();
  const { cartItems } = state;
  const navigate = useNavigate();

  if (isLoading || !restaurantInfo) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="">
      <div className=" mx-1 -mt-4 mb-4 md:mb-0 md:mt-0">
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
            key={`${menuItem}_${index}`}
            item={menuItem}
            index={index}
            restaurant={restaurantInfo}
          />
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className="sticky bottom-4 bg-green-700 flex justify-between items-center p-4 rounded-lg ">
          <div className="text-white font-bold">
            {cartItems.length} item added{" "}
          </div>
          <div
            onClick={() => navigate("/cart")}
            className="flex cursor-pointer"
          >
            <div className="text-white font-bold hover:underline">
              View Cart
            </div>
            <ChevronRight strokeWidth={2.5} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;

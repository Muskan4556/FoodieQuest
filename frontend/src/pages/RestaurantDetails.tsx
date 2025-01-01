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
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="mx-1 -mt-4 mb-4 md:mb-0 md:mt-0">
        <BreadCrumb
          city={restaurantInfo?.city}
          restaurantName={restaurantInfo?.name}
        />
      </div>

      <motion.div
        className="my-8 md:flex flex-col hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 0.6 },
          y: { type: "spring", stiffness: 50, damping: 20 },
        }}
      >
        <AspectRatio ratio={16 / 5}>
          <LazyLoadImage
            src={restaurantInfo.imageUrl}
            alt={`${restaurantInfo.name}_image`}
            className="w-full h-full object-cover rounded-md"
          />
        </AspectRatio>
      </motion.div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 0.6 },
          y: { type: "spring", stiffness: 50, damping: 20 },
        }}
      >
        <RestaurantInfo restaurant={restaurantInfo} />

        <motion.div
          className="text-2xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            opacity: { duration: 0.6 },
            y: { type: "spring", stiffness: 50, damping: 20 },
          }}
        >
          Menu
        </motion.div>

        {restaurantInfo.menuItems.map((menuItem, index) => (
          <motion.div
            key={`${menuItem}_${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              opacity: { duration: 0.6 },
              y: { type: "spring", stiffness: 50, damping: 20 },
            }}
          >
            <MenuItem1
              item={menuItem}
              index={index}
              restaurant={restaurantInfo}
            />
          </motion.div>
        ))}
      </motion.div>
      <AnimatePresence>
        {cartItems.length > 0 && (
          <motion.div
            className="sticky bottom-4 bg-green-700 flex justify-between items-center p-4 rounded-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{
              opacity: { duration: 0.3 },
              y: { type: "spring", stiffness: 80, damping: 10 },
            }}
          >
            <div className="text-white font-bold">
              {cartItems.length} item added
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantDetails;

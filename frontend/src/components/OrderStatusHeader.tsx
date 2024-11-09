import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";
import { Link } from "react-router-dom";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getDeliveryTime = () => {
    const created = new Date(order.createdAt);

    // Add delivery time to the created timestamp
    created.setMinutes(created.getMinutes() + order.restaurant.deliveryTime);

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const convertTo12HourFormat = (hours: number, minutes: number): string => {
      const period = hours >= 12 ? "PM" : "AM";
      const adjustedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${adjustedHours}:${paddedMinutes} ${period}`;
    };

    return convertTo12HourFormat(hours, minutes);
  };

  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-5 text-xl md:text-xl lg:text-4xl font-bold tracking-tighter">
        <div className="flex flex-col gap-2">
          <Link
            to={`/details/${order.restaurant._id}`}
            className="hover:underline"
          >
            <span className="text-xl md:text-2xl lg:text-4xl">
              {getOrderStatusInfo().value === "delieved" ? (
                <span className="font-bold">
                  {order.restaurant.name} has delivered your order.
                </span>
              ) : getOrderStatusInfo().value === "outForDelivery" ? (
                <span className="font-bold">
                  {order.restaurant.name} is on its way with your order.
                </span>
              ) : (
                <span className="font-bold">
                  {order.restaurant.name} is preparing your order.
                </span>
              )}
            </span>
          </Link>
          <span className="text-base md:text-xl lg:text-2xl tracking-tight">
            Order Status :{" "}
            <span className="text-green-500 tracking-normal">
              {getOrderStatusInfo()?.label}
            </span>
          </span>
        </div>
        <span className="text-base md:text-2xl  lg:text-4xl">
          Estimated Time:{" "}
          <span className="text-green-500">{getDeliveryTime()}</span>
        </span>
      </h1>
      <Progress
        value={getOrderStatusInfo()?.progressValue}
        className="animate-pulse"
      />
    </>
  );
};

export default OrderStatusHeader;

import { Order, OrderStatus } from "@/types";
import { Separator } from "./ui/separator";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateOrderStatus } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateOrderStatus, isLoading } = useUpdateOrderStatus();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateOrderStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  useEffect(() => setStatus(order.status), [order.status]);

  const getCurrentTime = () => {
    const created = new Date(order.createdAt);
    const hours = created.getHours();
    const minutes = created.getMinutes();

    const convertTo12HourFormat = (hours: number, minutes: number): string => {
      const adjustedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${adjustedHours}:${paddedMinutes} ${period}`;
    };

    return convertTo12HourFormat(hours, minutes);
  };

  return (
    <div
      className={`${
        order.status !== "delieved" && "border-red-500"
      } space-y-4 border-2 md:p-10 p-4 shadow-sm rounded-lg bg-white `}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 tracking-tight">
        <div>
          <span className="font-bold ">Customer Name: </span>
          <span>{order.deliveryDetails.name} </span>
        </div>
        <div>
          <span className="font-bold ">Delivery Address: </span>
          <span>{order.deliveryDetails.address}, </span>
          <span>{order.deliveryDetails.city} </span>
        </div>
        <div>
          <span className="font-bold ">Total Cost: </span>
          <span>₹{order.totalAmount / 100} </span>
        </div>
        <div>
          <span className="font-bold ">Time: </span>
          <span>{getCurrentTime()}</span>
        </div>
      </div>
      <Separator />
      <div>
        <div className="font-bold mb-1">Order Details:</div>
        {order.menuItems.map((cartItem) => (
          <div className="flex ">
            {cartItem.name} <X className="h-4 mt-1" /> {cartItem.quantity}{" "}
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <Label htmlFor="status" className="font-bold ">
          What is the status for this order?
        </Label>
        <Select
          value={status}
          disabled={isLoading}
          onValueChange={(value) => handleStatusChange(value as OrderStatus)}
        >
          <SelectTrigger id="status" className="mt-4 w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent position="popper">
            {ORDER_STATUS.map((status) => (
              <SelectItem value={status.value}>{status.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrderItemCard;

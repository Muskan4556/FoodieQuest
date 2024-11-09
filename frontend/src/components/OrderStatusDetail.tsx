import { Order } from "@/types";
import { Separator } from "./ui/separator";
import { X } from "lucide-react";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-4 tracking-tight">
      <div>
        <div className="font-bold text-lg md:text-xl">Delivering To:</div>
        <div>{order.deliveryDetails.address},</div>
        <div>{order.deliveryDetails.city}</div>
      </div>
      <Separator />
      <div>
        <div className="font-bold text-lg md:text-xl">Your Order:</div>
        {order.menuItems.map((cartItem) => (
          <div className="flex">
            {cartItem.name} <X className="h-4 mt-1" /> {cartItem.quantity}{" "}
          </div>
        ))}
      </div>
      <Separator />
      <div>
        <div className="font-bold text-lg md:text-xl">Total:</div>
        <div>₹{order.totalAmount / 100}</div>
      </div>
    </div>
  );
};

export default OrderStatusDetail;

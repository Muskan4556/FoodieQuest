import { OrderStatus } from "@/types";

type ORDER_STATUS_TYPE = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: ORDER_STATUS_TYPE[] = [
  {
    label: "Placed",
    value: "paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "inProgress", progressValue: 50 },
  { label: "Out for delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delieved", value: "delieved", progressValue: 100 },
];

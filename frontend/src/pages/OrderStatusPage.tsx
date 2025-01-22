import { useGetOrder } from "@/api/OrderApi";
import Loader from "@/components/Loader";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";

const OrderStatusPage = () => {
  const { orderInfo, isLoading } = useGetOrder();

  if (isLoading) {
    return <Loader />;
  }

  if (!orderInfo || orderInfo.length === 0) {
    return <div> No orders found ☹️</div>;
  }

  return (
    <div className="space-y-10">
      {orderInfo.map((order) => {
        if (order.status !== "placed") {
          return (
            <div className="space-y-10 bg-gray-50  p-4 md:p-10 rounded-lg">
              <OrderStatusHeader order={order} />
              <OrderStatusDetail order={order} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default OrderStatusPage;

import {
  useCreateMyRestaurant,
  useGetMyOrder,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import Loader from "@/components/Loader";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { restaurant, isLoading: IsGetLoading } = useGetMyRestaurant();

  const { orders, isLoading: isGetOrderLoading } = useGetMyOrder();

  const isEditing = !!restaurant; // if restaurant exist  true

  if (!restaurant) {
    <div>Unable to load restaurant details</div>;
  }

  if (IsGetLoading) {
    <Loader />;
  }

  if (!orders) {
    <div>Unable to load order details</div>;
  }

  if (isGetOrderLoading) {
    <Loader />;
  }

  const currentOrders = orders?.filter((order) => order.status !== "delieved");
  console.log(currentOrders?.length);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      {orders ? (
        <TabsContent
          value="orders"
          className="space-y-6 bg-gray-100 md:p-10 px-4 pt-4 pb-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold">
            {currentOrders?.length} active orders
          </h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
      ) : (
        <TabsContent value="orders" className="space-y-6 p-4">
          No order found ☹️
        </TabsContent>
      )}
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;

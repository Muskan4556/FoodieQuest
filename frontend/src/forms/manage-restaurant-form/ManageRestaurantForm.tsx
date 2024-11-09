import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

// Validation Schemas
const nameSchema = z
  .string({
    required_error: "This field is required",
  })
  .min(5, { message: "Must be 5 or more characters long" })
  .max(50, { message: "Must be 50 or fewer characters long" });

const priceValidation = z.coerce
  .number({
    required_error: "Price is required",
    invalid_type_error: "Must be a valid number",
  })
  .gt(0, { message: "Price must be greater than zero" });

const formSchema = z
  .object({
    name: nameSchema.refine((val) => val.length > 0, {
      message: "Restaurant name cannot be empty",
    }),
    locality: nameSchema,
    areaName: nameSchema,
    city: nameSchema,
    costForTwo: nameSchema,
    avgRating: z.coerce
      .number()
      .min(0, { message: "Rating must be a positive number" })
      .max(5, { message: "Rating should be less than or equal to 5" })
      .optional(),
    deliveryPrice: priceValidation.lt(2000, {
      message: "Delivery price must be less than Rs.2000",
    }),
    deliveryTime: z.coerce
      .number({
        required_error: "Delivery time is required",
        invalid_type_error: "Must be a valid number",
      })
      .gt(0, { message: "Delivery time must be greater than zero" })
      .lt(120, { message: "Delivery time should be less than 120 minutes" }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "Please select at least one cuisine" }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, { message: "Item name is required" }),
        price: priceValidation,
        description: z.string().optional(),
        imageFile: z
          .instanceof(File, { message: "Image file is required" })
          .optional(), // Changed to optional
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .instanceof(File, { message: "Image file is required" })
      .optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [
        { name: "", price: 0, description: "", imageFile: undefined },
      ], // Updated default
    },
  });

  useEffect(() => {
    if (!restaurant) return;

    const deliveryPriceFormatted = parseInt(
      restaurant.deliveryPrice.toFixed(2)
    );

    const menuItemFormatted = restaurant.menuItems.map((menuItem) => ({
      ...menuItem,
      price: parseInt(menuItem.price.toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    // Convert formDataJson to a new FormData object
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("locality", formDataJson.locality);
    formData.append("areaName", formDataJson.areaName);
    formData.append("city", formDataJson.city);
    formData.append("costForTwo", formDataJson.costForTwo);
    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append("deliveryTime", formDataJson.deliveryTime.toString());

    // Append cuisines
    formDataJson.cuisines.forEach((cuisine, i) => {
      formData.append(`cuisines[${i}]`, cuisine);
    });

    // Handle menu items
    formDataJson.menuItems.forEach((menu, i) => {
      formData.append(`menuItems[${i}][name]`, menu.name);
      formData.append(`menuItems[${i}][price]`, menu.price.toString());
      formData.append(`menuItems[${i}][description]`, menu.description || " ");

      // Append the single image file for the menu item
      if (menu.imageFile) {
        formData.append(`menuItems[${i}][image]`, menu.imageFile);
      }
    });

    // Append the restaurant image file if it exists
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    // Append the average rating if it exists
    if (formDataJson?.avgRating) {
      formData.append("avgRating", formDataJson.avgRating.toString());
    }

    // Call the onSave function with the FormData object
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-100 md:p-10 px-4 pt-4 pb-8 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton value="Submit" />
        ) : (
          <Button
            type="submit"
            className="bg-orange-600 w-full md:w-auto hover:bg-orange-500"
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;

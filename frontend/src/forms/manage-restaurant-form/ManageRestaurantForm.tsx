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

const formSchema = z.object({
  name: nameSchema.refine((val) => val.length > 0, {
    message: "Restaurant name cannot be empty",
  }),

  locality: nameSchema,
  areaName: nameSchema,
  city: nameSchema,
  costForTwo: nameSchema,

  avgRating: z
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
    })
  ),

  imageFile: z.instanceof(File, { message: "Image file is required" }),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: restaurantFormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onsubmit = (formDataJson: restaurantFormData) => {
    // convert formDataJson to a new FormData object
  };
  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-8 bg-gray-100 md:p-10 p-4 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton value="Submit"/>
        ) : (
          <Button type="submit" className="bg-orange-500 hover:bg-orange-400">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;

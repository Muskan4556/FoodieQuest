import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const DetailsSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl">Details</h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={control}
          name="areaName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Area Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="locality"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Locality</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={control}
          name="costForTwo"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="whitespace-nowrap">
                Cost for two (in Rs)
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="200-400" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="avgRating"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="whitespace-nowrap">
                Average Rating (optional)
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <FormField
          control={control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem className="md:max-w-[25%]">
              <FormLabel className="whitespace-nowrap">
                Delivery Time (in minutes)
              </FormLabel>

              <FormControl>
                <Input {...field} className="bg-white" placeholder="55" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="md:max-w-[25%]">
              <FormLabel>Delivery Price (in Rs.)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="118" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DetailsSection;

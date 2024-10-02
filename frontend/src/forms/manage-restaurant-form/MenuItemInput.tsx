import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control, watch } = useFormContext();

  // Watch the imageFile and imageUrl fields
  const existingImageFile = watch(`menuItems.${index}.imageFile`);
  const existingImageUrl = watch(`menuItems.${index}.imageUrl`);

  // Determine the source for the image preview
  const imagePreviewUrl = existingImageFile
    ? URL.createObjectURL(existingImageFile) // Object URL for file input
    : existingImageUrl; // Use backend image URL if available

  return (
    <div className="flex flex-col md:flex-row justify-start items-start md:items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="md:w-[20%] w-[100%]">
            <FormLabel className="flex items-center gap-1 whitespace-nowrap">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="Noodles" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="md:w-[15%] w-[100%]">
            <FormLabel className="flex items-center gap-1 whitespace-nowrap">
              Price (Rs.) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="299" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.description`}
        render={({ field }) => (
          <FormItem className="md:w-[40%] w-[100%]">
            <FormLabel className="flex items-center gap-1 whitespace-nowrap">
              Description <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                className="bg-white"
                placeholder="Describe the ingredients"
              />
            </FormControl>
          </FormItem>
        )}
      />
      {imagePreviewUrl && (
        <div className="h-12 w-12">
          <LazyLoadImage
            src={imagePreviewUrl} // Use the determined preview URL
            className="rounded-md object-cover h-full w-full"
          />
        </div>
      )}
      <FormField
        control={control}
        name={`menuItems.${index}.imageFile`} // Match schema
        render={({ field }) => (
          <FormItem className="w-[100%] md:w-[20%]">
            <FormControl>
              <Input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : undefined)
                }
                className="bg-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div
        onClick={removeMenuItem}
        className="cursor-pointer text-red-600 hover:text-red-500"
      >
        <Trash2 className="md:-mt-8" />
      </div>
    </div>
  );
};

export default MenuItemInput;

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFormContext } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageSection = () => {
  const { control, watch } = useFormContext();

  const existingImageUrl = watch("imageUrl");
  const existingImageFile = watch("imageFile");
  const imagePreviewUrl = existingImageFile
  ? URL.createObjectURL(existingImageFile) // Object URL for file input
  : existingImageUrl; // Use backend image URL if available

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl">Images</h2>
        <FormDescription className=" tracking-tight">
          Add a image that will be displayed on your restaurant listing in the
          search results. Adding a new image will override the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {imagePreviewUrl && (
          <AspectRatio ratio={16 / 9}>
            <LazyLoadImage
              src={imagePreviewUrl}
              className="rounded-md object-cover h-full w-full "
            ></LazyLoadImage>
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="bg-white "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;

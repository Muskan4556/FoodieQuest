import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1 whitespace-nowrap">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="Noddles" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1 whitespace-nowrap">
              Price (Rs.) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" placeholder="299" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        variant="outline"
        type="button"
        onClick={removeMenuItem}
        className="text-white bg-red-600 hover:bg-red-500 hover:text-white max-h-fit"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;

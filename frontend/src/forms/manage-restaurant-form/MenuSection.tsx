import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const { control } = useFormContext();
  // fields - array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl">Menu</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2">
            {fields.map((_, index) => (
              <MenuItemInput
              key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        className=" bg-orange-500 hover:bg-orange-400"
        type="button"
        onClick={() => append({ name: "", price: "", description: "", image: null })}
      >
        {" "}
        Add Menu Item{" "}
      </Button>
    </div>
  );
};

export default MenuSection;

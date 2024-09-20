import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} //controls the checkbox's appearance.
          onCheckedChange={(checked) => {
            // When the user clicks the checkbox, onCheckedChange is triggered. This handler is executed with the new checked value (either true or false), and based on this, it updates the form's state using field.onChange(). // After the state is updated, the "component re-renders". Re-render: Now checked={field.value.includes("Italian")} evaluates to true, so the checkbox is visually checked.
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((eachField: string) => {
                  return eachField !== cuisine;
                })
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;

// field.name === 'cuisine'
// field.value = ["pizza , "burger"] // Here field.value is an array
// cuisine = "burger"

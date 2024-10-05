import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { cuisinesList } from "@/config/restaurant-option-config";
import { Check, ChevronDown } from "lucide-react";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";

type Props = {
  onChange: (cuisines: Array<string>) => void;
  selectedCuisines: Array<string>;
};

const Cuisines = ({ onChange, selectedCuisines }: Props) => {
  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => {
          return cuisine !== clickedCuisine;
        });
    onChange(newCuisineList);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <Button
              variant="outline"
              className={`${
                selectedCuisines.length > 0 ? "border-2 border-orange-500" : ""
              }`}
            >
              <div className="flex gap-1 items-center justify-center">
                {selectedCuisines.length > 0 && (
                  <span className="w-5 h-5 bg-orange-500 mr-1 text-white rounded-full flex items-center justify-center text-xs">
                    {selectedCuisines.length}
                  </span>
                )}
                <span>Cuisine</span>
                <ChevronDown strokeWidth={2} size={15} />
              </div>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" h-40 w-40 ml-14 overflow-y-auto">
          {cuisinesList.map((cuisine) => {
            const isSelected = selectedCuisines?.includes(cuisine);
            return (
              <div
                key={cuisine}
                className={`flex gap-1 items-center hover:bg-gray-100
              ${isSelected && "border border-green-500 rounded-md"}
              `}
              >
                {isSelected && (
                  <span className="ml-2">
                    {" "}
                    <Check
                      className="text-green-500 hover:bg-none "
                      size={15}
                      strokeWidth={3}
                    />{" "}
                  </span>
                )}

                <DropdownMenuItem className=" w-full ">
                  <input
                    id={`cuisine_${cuisine}`}
                    type="checkbox"
                    className="cursor-pointer hidden"
                    value={cuisine}
                    checked={isSelected}
                    onChange={handleCuisineChange}
                  />
                  <Label
                    className="cursor-pointer font-normal"
                    htmlFor={`cuisine_${cuisine}`}
                  >
                    {cuisine}{" "}
                  </Label>
                </DropdownMenuItem>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Cuisines;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowUpDown, ChevronDown } from "lucide-react";

type Props = {
  onChange: (sortOption: string) => void;
  selectedSortOption: string;
};

const SORT_OPTIONS = [
  { label: "Best match", value: "bestMatch" },
  { label: "Delivery time", value: "deliveryTime" },
  { label: "Rating", value: "avgRating" },
  { label: "Cost for Two", value: "costForTwo" },
];

const SortOption = ({ selectedSortOption, onChange }: Props) => {
  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === selectedSortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            className={`flex gap-1  ${
              selectedSortOption && selectedSortOption !== "bestMatch"
                ? "border-2 border-orange-500"
                : ""
            }`}
          >
            <ArrowUpDown strokeWidth={2} size={15} />
            <span>{`Sort by: ${selectedOption}`}</span>
            <ChevronDown strokeWidth={2} size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" md:w-52 w-48 cursor-pointer md:ml-2 overflow-y-auto font-medium">
          {SORT_OPTIONS.map((option) => {
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`flex gap-1 cursor-pointer items-center hover:bg-gray-100 text-base`}
              >
                {option.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortOption;

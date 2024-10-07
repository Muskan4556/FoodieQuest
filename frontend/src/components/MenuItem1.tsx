import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { capitalizeFirstLetter, getRandomNumber } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  item: MenuItem;
  index: number;
  arraylength: number;
};

const MenuItem1 = ({ item, arraylength, index }: Props) => {
  return (
    <Card className="border-none shadow-none md:-mx-0 -mx-4">
      <div className="flex justify-between ">
        <div>
          <CardHeader>
            <CardTitle className="text-base md:text-xl">
              {capitalizeFirstLetter(item.name)}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-black/80 text-base font-medium md:-mt-4 -mt-5 tracking-tight ">
            ₹{item.price}
          </CardContent>
          <CardContent className="flex items-center text-black/80 text-base font-medium md:-mt-4 -mt-5 -ml-1 tracking-tight ">
            <LazyLoadImage
              src="https://img.icons8.com/?size=100&id=63454&format=png&color=166534"
              className="ml-1 md:w-4 md:h-4 h-4 object-cover"
              alt="Rating Icon info"
            />
            <CardTitle className="ml-1 text-sm  md:text-base text-[#166534]">
              {getRandomNumber()}
            </CardTitle>
          </CardContent>
          <CardContent className="text-black/60 font-medium -mt-4 text-xs md:text-base">
            {item.description}
          </CardContent>
        </div>

        <div className="md:w-60 md:h-36 h-28  mx-4 w-[30%] ">
          <LazyLoadImage
            src={item.imageUrl}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {arraylength !== index && (
        <div className="flex justify-center">
          <Separator className=" md:mt-4 md:w-full w-[94%]" />
        </div>
      )}
    </Card>
  );
};

export default MenuItem1;

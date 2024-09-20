import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  value: string;
};

const LoadingButton = ({ value }: Props) => {
  return (
    <Button disabled className="bg-orange-600  flex">
      <div>{value} </div>
      <Loader2 className="ml-2 h-4 w-4 animate-spin " />
    </Button>
  );
};

export default LoadingButton;

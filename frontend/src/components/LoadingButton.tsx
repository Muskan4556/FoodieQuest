import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return (
    <Button disabled className="bg-orange-600 w-[4.9rem]">
      <Loader2 className="mr-2 h-4 w-4 animate-spin " />
    </Button>
  );
};

export default LoadingButton;

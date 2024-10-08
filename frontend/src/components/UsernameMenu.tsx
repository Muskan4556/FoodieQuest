import { ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { toast } from "sonner";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu
      onOpenChange={() => {
        setIsOpen(!isOpen);
      }}
    >
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user?.nickname && capitalizeFirstLetter(user?.nickname).split(/\d/)[0]}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className=" font-medium tracking-tight text-base text-black/70 hover:text-orange-500"
          >
            User Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/manage-restaurant"
            className=" font-medium tracking-tight text-base text-black/70 hover:text-orange-500"
          >
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <span
            onClick={() => {
              logout({
                logoutParams: {
                  returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL,
                },
              });
              toast.success("Logged out successfully!");
            }}
            className="font-medium tracking-tight text-base text-black/70 hover:text-orange-500 cursor-pointer"
          >
            Log Out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;

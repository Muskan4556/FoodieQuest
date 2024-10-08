import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeFirstLetter } from "@/lib/utils";

const MobileNav = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        {!isAuthenticated ? (
          <Menu className="text-orange-500" />
        ) : (
          <CircleUserRound className="text-orange-500 w-7 h-7 " />
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <span className="font-bold tracking-tight">
              Welcome to Foodie Quest
            </span>
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex">
            {isAuthenticated ? (
              <div className="flex flex-col items-start mt-4 w-full">
                <Link to="/user-profile">
                  <div className="flex">
                    <Avatar>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start ml-4">
                      <div className="text-black font-bold text-lg tracking-tight">
                      {user?.nickname && capitalizeFirstLetter(user?.nickname).split(/\d/)[0]}
                      </div>
                      <div className="text-black font-medium tracking-tighter">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to="manage-restaurant"
                  className=" flex justify-start mt-6 w-full"
                >
                  <Button
                    variant="outline"
                    className="flex-1 font-bold hover:text-orange-500 "
                  >
                    Manage Restaurant
                  </Button>
                </Link>
                <div className="flex justify-center  mt-6 w-full">
                  <Button
                    onClick={() => {
                      logout({
                        logoutParams: {
                          returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL,
                        },
                      });
                      toast.success("Logged out successfully!");
                    }}
                    className="flex-1 font-bold bg-orange-500 hover:bg-orange-600"
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={async () => await loginWithRedirect()}
                className="flex-1 font-bold bg-orange-500 hover:bg-orange-600"
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

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
            <span className="font-bold tracking-tight">Welcome to Foodie Quest</span>
          </SheetTitle>
          <Separator />
          <SheetDescription className="flex">
            {isAuthenticated ? (
              <div className="flex flex-col items-start mt-4 gap-">
                <Link to="/user-profile">
                  <div className="flex">
                    <img
                      src={user?.picture}
                      alt="user image"
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="flex flex-col items-start ml-4">
                      <div className="text-black font-bold text-lg tracking-tight">
                        {user?.nickname?.toUpperCase()}
                      </div>
                      <div className="text-black font-medium tracking-tighter">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="flex justify-center mx-2 mt-4 w-full">
                  <Button
                    onClick={() => logout({
                      logoutParams: {
                        returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL,
                      },
                    })}
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

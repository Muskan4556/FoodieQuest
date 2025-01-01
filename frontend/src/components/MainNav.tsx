import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useCart } from "@/context-api/useCart";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const { state } = useCart();
  const { cartItems } = state;
  const { user, logout } = useAuth0();

  return (
    <div>
      <span className="flex space-x-2 items-center">
        <div className="flex ">
          <Link to="/cart">
            <ShoppingCart
              // strokeWidth={2.5}
              className="hover:text-orange-500 mr-2"
            />
          </Link>
          {cartItems.length > 0 && (
            <div className="-mt-4 w-6 h-6 rounded-full p-1 font-semibold bg-orange-600 text-white text-sm flex justify-center items-center">
              {cartItems.length}
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <div className=" flex items-center gap-4 font-semibold text-lg">
            <Link to="/order" className="hover:text-orange-500">
              Order Status
            </Link>
            <div className="lg:flex items-center gap-4 hidden">
              <Link to="/manage-restaurant" className="  hover:text-orange-500">
                Manage Restaurant
              </Link>

              <div
                onClick={() => {
                  logout({
                    logoutParams: {
                      returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL,
                    },
                  });
                  toast.success("Logged out successfully!");
                }}
                className="hover:text-orange-500 cursor-pointer flex items-center"
              >
                Log Out
              </div>

              <Link to={`/user-profile`}>
                <Avatar>
                  <AvatarImage src={user?.picture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            </div>

            <UsernameMenu />
          </div>
        ) : (
          <Button
            variant="ghost"
            className="font-bold hover:text-orange-500 hover:bg-white text-black/60 text-md"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
        )}
      </span>
    </div>
  );
};

export default MainNav;

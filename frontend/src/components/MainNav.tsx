import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { useCart } from "@/context-api/useCart";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const { state } = useCart();
  const { cartItems } = state;

  return (
    <div>
      <span className="flex space-x-2 items-center">
        <div className="flex ">
          <Link to="/cart">
            <ShoppingCart strokeWidth={2.5} className="text-orange-500" />
          </Link>
          {cartItems.length > 0 && (
            <div className="-mt-4 w-6 h-6 rounded-full p-1 font-semibold bg-orange-500 text-white text-sm flex justify-center items-center">
              {cartItems.length}
            </div>
          )}
        </div>
        {isAuthenticated ? (
          <UsernameMenu />
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

/**
 * loginWithRedirect - Type: () => Promise<void>
 * `logout - Type: `({ returnTo?: string }) => void`
 */

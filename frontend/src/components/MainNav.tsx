import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const MainNav = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Button
        variant="ghost"
        className="font-bold hover:text-orange-500 hover:bg-white text-black/60 text-md"
        onClick={async () => await loginWithRedirect()}
      >
        Log In
      </Button>
    </div>
  );
};

export default MainNav;

/**
 * loginWithRedirect - Type: () => Promise<void>
 */

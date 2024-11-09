import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckOut, disabled, isLoading }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={onLogin}
        className="bg-orange-600 hover:bg-orange-500 flex-1 w-[100%]"
      >
        Log in to checkout
      </Button>
    );
  }
  if (isAuthLoading || !currentUser || isLoading) {
    return (
      <>
        {
          isAuthLoading && <LoadingButton value="Log in" />
          // : (
          //   <LoadingButton value="Submit" />
          // )
        }
      </>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="bg-orange-600 hover:bg-orange-500 flex-1 w-[100%]"
        >
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#f3f4f6] md:w-full w-[90%] rounded-lg">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckOut}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;

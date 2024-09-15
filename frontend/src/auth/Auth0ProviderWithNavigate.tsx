import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientID || !redirectUri) {
    throw new Error("Unable to initialize Auth");
  }

  // This function is called after the user successfully authenticates and is redirected back to the application.
  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;

/**
 * user?.sub - Represents the unique identifier for the user provided by Auth0.
 * Trigger the Mutation:
  - When you call createUser, you pass the necessary parameters (user in this case) to the CreateMyUserRequest function.
  createUser then calls CreateMyUserRequest with the provided parameters and returns a promise that resolves when the mutation operation completes successfully.

 * authorizationParams.redirect_uri: The URL to where you'd like to redirect your users after they authenticate with Auth0.
 * import.meta.env: This is used to access environment variables in Vite projects.
 *  VITE_AUTH0_DOMAIN, CLIENT, VITE_AUTH0_CALLBACK_URL: These are environment variables that store your Auth0 domain, client ID, and redirect URL respectively.
 */

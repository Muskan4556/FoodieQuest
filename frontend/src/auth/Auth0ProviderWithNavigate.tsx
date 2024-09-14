import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientID || !redirectUri) {
    throw new Error("Unable to initialize Auth");
  }

  // This function is called after the user successfully authenticates and is redirected back to the application.
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("User: ", user);
    console.log(appState);
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
 * authorizationParams.redirect_uri: The URL to where you'd like to redirect your users after they authenticate with Auth0.
 * import.meta.env: This is used to access environment variables in Vite projects.
 *  VITE_AUTH0_DOMAIN, CLIENT, VITE_AUTH0_CALLBACK_URL: These are environment variables that store your Auth0 domain, client ID, and redirect URL respectively.
 */

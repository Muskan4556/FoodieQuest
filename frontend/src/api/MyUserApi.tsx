import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

// Custom hook
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const CreateMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create User");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(CreateMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

/*
useQuery, which is used for fetching data, useMutation is used for creating, updating, or deleting data.

useMutation: Initializes the react-query mutation hook with the CreateMyUserRequest function.

mutateAsync: This is the function provided by useMutation to trigger the mutation.
- It accepts the parameters required by the mutation function (CreateMyUserRequest in this case) and returns a promise.
- In this case, it's renamed to createUser for clarity. It will call CreateMyUserRequest and return a promise.

isLoading: A boolean indicating if the mutation is currently in progress.
isError: A boolean indicating if the mutation resulted in an error.
isSuccess: A boolean indicating if the mutation was successful.
*/

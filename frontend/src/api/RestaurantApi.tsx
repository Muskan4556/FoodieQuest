import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurant = (searchState: SearchState, city: string) => {
  const getMyRestaurantRequest =
    async (): Promise<RestaurantSearchResponse> => {
      const params = new URLSearchParams();
      params.set("searchQuery", searchState.searchQuery);
      params.set("page", searchState.page.toString());
      params.set("selectedCuisines", searchState.selectedCuisines.toString());
      params.set("sortOption", searchState.sortOption)

      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to get restaurant");
      }
      return response.json();
    };

  const { data: searchRestaurant, isLoading } = useQuery(
    ["searchRestaurant", city, searchState],
    getMyRestaurantRequest,
    { enabled: !!city }
  );
  return {
    searchRestaurant,
    isLoading,
  };
};

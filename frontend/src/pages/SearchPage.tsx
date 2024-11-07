import { useSearchRestaurant } from "@/api/RestaurantApi";
import Loader from "@/components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";

import RestaurantCard from "@/components/RestaurantCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import Cuisines from "@/components/Cuisines";
import SortOption from "@/components/SortOption";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/Bread";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useCart } from "@/context-api/useCart";
import { ChevronRight } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: Array<string>;
  sortOption: string;
};

const SearchPage = () => {
  const { state } = useCart();
  const { restaurant, cartItems } = state;
  const navigate = useNavigate();
  const calculateTotal = () => {
    const itemTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return itemTotal;
  };
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { city } = useParams();
  const { searchRestaurant, isLoading } = useSearchRestaurant(
    searchState,
    city || ""
  );

  const handleSearchQuery = (searchFormValues: SearchForm) => {
    setSearchState((prev) => {
      return {
        ...prev,
        searchQuery: searchFormValues.searchQuery,
        page: 1,
      };
    });
  };

  const handlePagination = (page: number) => {
    //(page: number) - passed by Pagination component
    setSearchState((prev) => ({ ...prev, page: page }));
  };

  const handleSearchReset = () => {
    setSearchState((prev) => {
      return {
        ...prev,
        searchQuery: "",
        page: 1,
      };
    });
  };

  const handleCuisine = (selectedCuisines: Array<string>) => {
    setSearchState((prev) => {
      return {
        ...prev,
        selectedCuisines: selectedCuisines,
        page: 1,
      };
    });
  };

  const handleSortOption = (sortOption: string) => {
    setSearchState((prev) => {
      return {
        ...prev,
        sortOption: sortOption,
        page: 1,
      };
    });
  };

  const handleFilterReset = () => {
    setSearchState((prev) => {
      return {
        ...prev,
        selectedCuisines: [],
        sortOption: "bestMatch",
        page: 1,
      };
    });
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!searchRestaurant?.data || !city) {
    return <span>No result found ☹️</span>;
  }

  return (
    <div className="container mx-auto">
      <div className="-mt-4 mx-1">
        <BreadCrumb city={city} />
      </div>
      <div className="mb-8 mt-4 flex items-center justify-center">
        <div className="md:w-[80%] w-[100%] mx-1 md:mx-0">
          <SearchBar
            searchQuery={searchState.searchQuery}
            onSubmit={handleSearchQuery}
            onReset={handleSearchReset}
            placeholder="Search by restaurant or cuisine"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-baseline  ml-2 md:ml-0 font-semibold text-gray-800 tracking-tight">
        <h2 className="md:text-2xl text-xl">
          Top restaurants in {capitalizeFirstLetter(city)}
        </h2>
        <div className="font-semibold text-sm underline cursor-pointer text-blue-700 -mt-1 md:mt-0">
          <Link to={`/`}>Change Location</Link>{" "}
        </div>
      </div>
      <div className="flex md:gap-4 gap-2 ml-1 mt-8 overflow-x-auto scrollbar-hide">
        <Cuisines
          onChange={handleCuisine}
          selectedCuisines={searchState.selectedCuisines}
        />
        <SortOption
          onChange={(sortOption) => handleSortOption(sortOption)}
          selectedSortOption={searchState.sortOption}
        />
        <Button variant="outline" onClick={handleFilterReset}>
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap justify-center md:justify-normal gap-8 mt-8 ">
        {searchRestaurant.data.length > 0 ? (
          searchRestaurant.data.map((restaurant) => (
            <RestaurantCard key={restaurant._id} restaurant={restaurant} />
          ))
        ) : (
          <div>No result found ☹️</div>
        )}
      </div>
      <div className="mt-8 cursor-pointer">
        <PaginationSelector
          page={searchRestaurant?.pagination?.page}
          pages={searchRestaurant?.pagination?.pages}
          onPageChange={handlePagination}
          restaurantCount={searchRestaurant.data.length}
        />
      </div>
      {cartItems.length > 0 && restaurant && (
        <div className="sticky bottom-4 bg-gray-200 border-2 border-gray-300 shadow-lg flex justify-between items-center md:p-4 p-2 rounded-lg">
          <div className="flex gap-4">
            <LazyLoadImage
              src={restaurant.imageUrl}
              className="w-8 h-8 rounded-full object-cover"
            />
            <Link
              to={`/details/${restaurant._id}`}
              className="text-black font-semibold text-normal md:text-lg underline decoration-gray-500 md:no-underline  hover:underline"
            >
              {restaurant.name}
            </Link>
          </div>

          <div
            onClick={() => navigate("/cart")}
            className="flex cursor-pointer gap-2"
          >
            <div className="bg-green-600 md:px-4 md:py-3 p-2 border-none shadow-md rounded-md text-white">
              <div className="flex flex-col md:flex-row gap-2 text-xs md:text-base">
                <div className="flex justify-center">
                  <span className="font-medium mr-1">
                    {cartItems.length} item |
                  </span>
                  <span className="font-medium"> ₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-center">
                  <span className="text-white font-semibold hover:underline ml-4 whitespace-nowrap">
                    View Cart
                  </span>
                  <ChevronRight
                    strokeWidth={2.5}
                    className="text-white md:h-auto h-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

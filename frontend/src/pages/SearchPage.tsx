import { useSearchRestaurant } from "@/api/RestaurantApi";
import Loader from "@/components/Loader";
import { Link, useParams } from "react-router-dom";

import RestaurantCard from "@/components/RestaurantCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import PaginationSelector from "@/components/PaginationSelector";
import Cuisines from "@/components/Cuisines";
import SortOption from "@/components/SortOption";
import { Button } from "@/components/ui/button";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: Array<string>;
  sortOption: string;
};

const SearchPage = () => {
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
        sortOption: "",
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
    <div className="container mx-auto  ">
      <div className="mb-8 flex items-center justify-center">
        <div className="md:w-[80%]">
          <SearchBar
            searchQuery={searchState.searchQuery}
            onSubmit={handleSearchQuery}
            onReset={handleSearchReset}
            placeholder="Search by restaurant or cuisine"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2 items-baseline  ml-2 md:ml-0 font-semibold text-gray-800">
        <h2 className="md:text-2xl text-xl">
          Top restaurants in {city.charAt(0).toUpperCase() + city.slice(1)}
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
    </div>
  );
};

export default SearchPage;

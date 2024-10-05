import appDownload from "@/assets/appDownload.png";
import landing from "@/assets/landing.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    // navigate to /restaurant/search, add city to req.params
    navigate(`/search/${searchFormValues.searchQuery}`);
  };

  return (
    <div className="flex flex-col gap-12 md:px-6">
      <div className="md:px-8 lg:px-16 xl:px-32 px-0 bg-white rounded-lg py-8 shadow-lg gap-5 text-center -mt-16 flex flex-col">
        <h1 className="font-bold md:text-5xl text-3xl px-3 md:px-0 tracking-tight text-orange-600">
          Discover the best food & drinks
        </h1>
        <div className="md:text-xl text-xl">Food is one click away!</div>

        <SearchBar searchQuery="" placeholder="Search by city" onSubmit={handleSearchSubmit} />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <LazyLoadImage effect="blur" src={landing} alt="landing image" />
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order Takeway even faster
          </span>
          <span className="text-black/70 ">
            Download Foodie Quest App for faster ordering and personalized
            recommendations
          </span>
          <span>
            <LazyLoadImage effect="blur" src={appDownload} alt="app Image" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

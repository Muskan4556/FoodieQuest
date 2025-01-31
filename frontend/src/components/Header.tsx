import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  const {pathname} = useLocation();
  console.log(location);
  
  return (
    <div className={`${pathname !== "/" && "border-b-2 border-orange-500"} py-6`}>
      <div className="container mx-auto md:px-10 px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-600"
        >
          Foodie Quest
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;

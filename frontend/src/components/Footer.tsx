import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-orange-600 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:px-10 px-6">
        <Link to="/">
          <span className="text-3xl text-white font-bold tracking-tight">
            Foodie Quest
          </span>
        </Link>
        <span className="text-white font-bold tracking-tight flex md:mt-0 my-2 gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;

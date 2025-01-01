import { motion } from "framer-motion";
import appDownload from "@/assets/appDownload.png";
import landing from "@/assets/landing.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate(`/search/${searchFormValues.searchQuery}`);
  };

  return (
    <div className="flex flex-col gap-12 md:px-6">
      {/* Hero Section with Animation */}
      <motion.div
        className="md:px-8 lg:px-16 xl:px-32 px-0 bg-white rounded-lg py-8 shadow-lg gap-5 text-center -mt-16 flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Ensures it only animates once
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3, duration: 0.8 } },
          }}
          viewport={{ once: true }} // Ensures the animation happens only once
        >
          <motion.h1
            className="font-bold md:text-5xl text-3xl px-3 md:px-0 tracking-tight text-orange-600"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the best food & drinks
          </motion.h1>
          <motion.div
            className="md:text-xl text-xl tracking-tight text-black/70 font-medium"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Food is one click away!
          </motion.div>
        </motion.div>

        <div className="md:mx-12 mx-6">
          <SearchBar
            searchQuery=""
            placeholder="Search by city (e.g., Patna)"
            onSubmit={handleSearchSubmit}
          />
        </div>
      </motion.div>

      {/* Image and App Download Section */}
      <div className="grid md:grid-cols-2 gap-5">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} 
        >
          <LazyLoadImage effect="blur" src={landing} alt="landing image" />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }} // Ensures the animation happens only once
        >
          <motion.span
            className="font-bold text-3xl tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Order Takeaway even faster
          </motion.span>
          <motion.span
            className="text-black/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Download Foodie Quest App for faster ordering and personalized recommendations
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <LazyLoadImage effect="blur" src={appDownload} alt="app Image" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Homepage;

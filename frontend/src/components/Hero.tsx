import hero1 from "@/assets/hero1.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative">
       <motion.div
        initial={{ opacity: 0, scale: 1.05 }} // Slightly zoomed in at the start
        animate={{ opacity: 1, scale: 1 }} // Fade to full opacity and normal size
        transition={{ duration: 1, ease: "easeInOut" }} // Smooth, medium-paced transition
        className="w-screen max-h-[500px] object-cover relative"
        style={{ zIndex: -1 }}
      >
        <LazyLoadImage
          src={hero1}
          effect="opacity"
          className="w-screen max-h-[500px] object-cover relative"
          alt="Hero Image"
        />
      </motion.div>
    </div>
  );
};

export default Hero;

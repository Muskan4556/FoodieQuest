import hero from "@/assets/hero.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Hero = () => {
  return (
    <div className="relative">
      <LazyLoadImage
        src={hero}
        effect="opacity"
        className="w-screen max-h-[500px]  object-cover relative "
        style={{ zIndex: -1 }}
        alt="Hero Image"
      />
    </div>
  );
};

export default Hero;

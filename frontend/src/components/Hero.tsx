import hero from "@/assets/hero.png";

const Hero = () => {
  return (
    <div>
      <img src={hero} className="w-full max-h-[500px] object-cover" alt="hero image" loading="lazy"/>
    </div>
  );
};

export default Hero;

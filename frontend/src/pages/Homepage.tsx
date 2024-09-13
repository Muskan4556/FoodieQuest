import appDownload from "@/assets/appDownload.png";
import landing from "@/assets/landing.png";

const Homepage = () => {
  return (
    <div className="flex flex-col gap-12 md:px-6">
      <div className="bg-white rounded-lg py-8 shadow-lg gap-5 text-center -mt-16 flex flex-col">
        <h1 className="font-bold md:text-5xl text-3xl tracking-tight text-orange-600">
          Discover the best food & drinks
        </h1>
        <div className="text-xl">Food is one click away!</div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} alt="landing image" />
        <div className="flex flex-col justify-center items-center gap-4 text-center">
            <span className="font-bold text-3xl tracking-tighter">
                Order Takeway even faster
            </span>
            <span className="text-black/70 ">
                Download Foodie Quest App for faster ordering and personalized recommendations
            </span>
            <span>
                <img src={appDownload} alt="app Image" />
            </span>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

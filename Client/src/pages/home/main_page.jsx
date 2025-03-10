import Logo2 from "../../assets/video/sky.mp4";
import SearchBar from "../../components/home/search_bar";
import Categories from "../../components/home/popular_categories";
import Location from "../../components/home/popular_location";
import AutoSlideImage from "../../components/home/image_slide";

const Home = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <video
        src={Logo2}
        className="w-full h-auto"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Overlay Container */}
      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl flex flex-col items-center space-y-6">
        {/* Search Bar */}
        <SearchBar />
      </div>

      <div className="mt-20">
        <Categories />
      </div>

      {/* Corrected Image Tag */}
      <div className="flex justify-center">
        <AutoSlideImage/>
      </div>

      <div className="mt-20">
        <Location />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import Navbar from "./nav_bar"; // Adjust path if needed
import Logo2 from "../../assets/video/ocen.mp4";
import SearchBar from "./search_bar";
import Categories from "./popular_categories";
import Location from "./popular_location";
import BottomBar from "./bottom_bar";
import AutoSlideImage from "./image_slide";

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
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

      <BottomBar />
    </div>
  );
};

export default Home;

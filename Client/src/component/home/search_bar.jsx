import React from "react";

const SearchBar = () => {
  return (
    <div className="relative w- flex flex-col items-center">
      {/* Overlay Text */}
      <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-6 py-3 rounded-lg z-10 mb-10">
        Let’s Book Your Own Trip
      </h1>
      
      {/* Search Bar Container */}
      <div className="w-full max-w-4xl">
        <div className="flex items-center bg-white rounded-2xl p-4 shadow-lg">
          {/* Location */}
          <div className="flex flex-col items-start flex-1 px-4 border-r">
            <span className="font-semibold flex items-center gap-2">📍 Location</span>
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="bg-transparent focus:outline-none text-gray-600"
            />
          </div>
  
          {/* Date */}
          <div className="flex flex-col items-start flex-1 px-4 border-r">
            <span className="font-semibold flex items-center gap-2">📅 Date</span>
            <input
              type="date"
              className="bg-transparent focus:outline-none text-gray-600"
            />
          </div>
  
          {/* Pricing */}
          <div className="flex flex-col items-start flex-1 px-4">
            <span className="font-semibold flex items-center gap-2">💰 Pricing</span>
            <select className="bg-transparent focus:outline-none text-gray-600">
              <option>Choose your budget</option>
              <option>$ - Budget</option>
              <option>$$ - Mid-range</option>
              <option>$$$ - Luxury</option>
            </select>
          </div>
  
          {/* Button */}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl ml-4 flex items-center">
            🔎 Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import React from "react";
import image2 from "../../assets/image/maldives.jpg";
import image1 from "../../assets/image/Switerland.jpg";
import image3 from "../../assets/image/Greece.jpg";
import image4 from "../../assets/image/Spain.jpg";
import image5 from "../../assets/image/london.jpg";
import image6 from "../../assets/image/bali.jpg";

const Location = () => {
  return (
    <div>
      <h1 className="text-black text-3xl font-bold text-center mb-6">
        Our Popular Locations
      </h1>
      <div className="flex-1 max-w-6xl mx-auto p-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer md:col-span-2 lg:col-span-2 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image1}
              alt="Switzerland"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Switzerland</p>
          </li>
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl hover:shadow-2xl p-4 flex flex-col items-center border border-gray-300 hover:border-blue-400 cursor-pointer md:col-span-2 lg:col-span-1 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image2}
              alt="Maldives"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Maldives</p>
          </li>
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl hover:shadow-2xl p-4 flex flex-col items-center border border-gray-300 hover:border-blue-400 cursor-pointer md:col-span-2 lg:col-span-1 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image3}
              alt="Greece"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Greece</p>
          </li>
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl hover:shadow-2xl p-4 flex flex-col items-center border border-gray-300 hover:border-blue-400 cursor-pointer md:col-span-2 lg:col-span-1 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image4}
              alt="Spain"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Spain</p>
          </li>
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl hover:shadow-2xl p-4 flex flex-col items-center border border-gray-300 hover:border-blue-400 cursor-pointer md:col-span-2 lg:col-span-1 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image5}
              alt="London"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">London</p>
          </li>
          <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer md:col-span-2 lg:col-span-2 transition-all duration-300 transform hover:scale-105 hover:rotate-1">
            <img
              src={image6}
              alt="Bali"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">Bali</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Location;

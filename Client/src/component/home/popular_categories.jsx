import React from "react";
import { FaMountain, FaUmbrellaBeach, FaCity, FaTree } from "react-icons/fa"; // Import FontAwesome icons

const Categories = () => {
    return (
        <div>
            <h1 className="text-black text-3xl font-bold text-center mb-6">Our Popular Categories</h1>
            <div className="flex-1 max-w-4xl mx-auto p-10">
                <ul className="grid md:grid-cols-4 gap-8">
                    <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer">
                        <FaMountain className="text-4xl text-blue-500 mb-2" />
                        <p className="text-center font-semibold">Relaxation Tour</p>
                    </li>
                    <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer">
                        <FaUmbrellaBeach className="text-4xl text-yellow-500 mb-2" />
                        <p className="text-center font-semibold">Eco Tourism Tour</p>
                    </li>
                    <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer">
                        <FaCity className="text-4xl text-gray-500 mb-2" />
                        <p className="text-center font-semibold">Adventure Tour</p>
                    </li>
                    <li className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer">
                        <FaTree className="text-4xl text-green-500 mb-2" />
                        <p className="text-center font-semibold">Cultural & Historical Tour</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Categories;

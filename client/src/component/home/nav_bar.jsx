import {React, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.log("Lỗi hiện thông tin người dùng");
    }
    setUser(storedUser);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-400 p-4">
      <div className="container mx-auto flex justify-between  items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold ">
          <a href="/" className="hover:text-gray-300">
            MyApp
          </a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-4 justify-center w-full">
          <li>
            <a
              href="/"
              className="relative text-white hover:text-gray-300 cursor-pointer after:content-[''] after:absolute after:left-0 after:top-6 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="relative text-white hover:text-gray-300 cursor-pointer after:content-[''] after:absolute after:left-0 after:top-6 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="relative text-white hover:text-gray-300 cursor-pointer after:content-[''] after:absolute after:left-0 after:top-6 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="relative text-white hover:text-gray-300 cursor-pointer after:content-[''] after:absolute after:left-0 after:top-6 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </li>
        </ul>
        {/*Button link*/}
        <div className="flex space-x-4">
          <button className="text-white px-4 py-2 rounded-lg hover:bg-blue-500"
          onClick={() => navigate("/signin")}>
            Login
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-300"
          onClick={() => navigate("/signup")}>
            Register
          </button>          
        </div>        
        <div className="flex space-x-4">
        <a href="/profile" className="relative text-white hover:text-gray-300 text-2xl ml-4">
          <FontAwesomeIcon icon={faUser} className="relative p-2 bg-gray-700 rounded-full border-2 border-gray-500" />
          </a>
        </div>
        {user ? (
          <div className="relative text-white px-4">
            <h1 className="inline-block">{user.email}</h1>
          </div>
        ) : (
          <p>No user logged in</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

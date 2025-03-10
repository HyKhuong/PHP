import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const BottomBar = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold">Your Company</h2>
          <p className="text-sm text-gray-400 mt-2">
            We provide the best travel experiences with premium services and affordable prices.
          </p>
          <p className="text-sm text-gray-500 mt-1">Serving travelers since 2025.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-sm text-gray-400">
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/services" className="hover:text-gray-300">Services</a></li>
            <li><a href="/destinations" className="hover:text-gray-300">Destinations</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="text-sm text-gray-400 mt-2">📍 123 Travel St, City, Country</p>
          <p className="text-sm text-gray-400">✉️ <a href="mailto:contact@yourcompany.com" className="hover:text-gray-300">contact@yourcompany.com</a></p>
          <p className="text-sm text-gray-400">📞 <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a></p>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default BottomBar;

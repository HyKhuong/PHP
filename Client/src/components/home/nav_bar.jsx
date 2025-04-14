import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/logo.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log('Error parsing user data:', error);
            }
        } else {
            setUser(null);
        }
    }, []);

    // Logout function
    const logout = () => {
        localStorage.removeItem('token'); // Remove JWT token
        localStorage.removeItem('user');  // Remove user data
        setUser(null); // Update state to reflect logout
        navigate('/'); // Redirect to home page
    };

    return (
        <nav
            style={{ background: 'linear-gradient(to right,rgb(137, 165, 199), #AFD7E6)' }}
            className="p-4 shadow-md"
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center text-xl font-bold text-white">
                    <img src={Logo} alt="Logo" className="mr-2 h-8 w-8" />
                    <a href="/" className="hover:text-gray-300">AirGlobe</a>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
                    <li><a href="/about" className="text-white hover:text-gray-300">About</a></li>
                    <li><a href="/services" className="text-white hover:text-gray-300">Services</a></li>
                    <li><a href="/contact" className="text-white hover:text-gray-300">Contact</a></li>
                </ul>

                {/* Authentication Section */}
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <button className="rounded-lg px-4 py-2 text-white hover:bg-gray-700" onClick={() => navigate('/signin')}>Login</button>
                            <button className="rounded-lg bg-white px-4 py-2 text-black hover:bg-gray-300" onClick={() => navigate('/signup')}>Register</button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <span className="text-white">Xin chào, {user?.email}</span>
                            <button onClick={logout} className="rounded bg-red-500 px-4 py-2 text-white">Logout</button>
                            <a href="/profile" className="text-white hover:text-gray-300">
                                <FontAwesomeIcon icon={faUser} className="rounded-full border-2 border-gray-500 bg-gray-700 p-2" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

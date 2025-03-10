import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/logo.jpg';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    // eslint-disable-next-line no-unused-vars
                } catch (e) {
                    setUser(storedUser);
                }
            } else {
                console.log('No user found in localStorage');
                setUser(null);
            }
        } catch (error) {
            console.log('Error loading user information:', error);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user'); // Remove user data
        console.log('User logged out'); // Debugging
        window.location.reload(); // Refresh the page or navigate
    };

    return (
        <nav
            style={{ background: 'linear-gradient(to right,rgb(137, 165, 199), #AFD7E6)' }}
            className="p-4 shadow-md"
        >
            {' '}
            {/* Gradient xanh nhạt giống hình */}
            <div className="container mx-auto flex items-center">
                {/* Logo */}
                <div className="mr-8 flex items-center text-xl font-bold text-white">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="mr-2 h-8 w-8"
                    />
                    <a
                        href="/"
                        className="hover:text-gray-300"
                    >
                        AirGlobe
                    </a>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-1 space-x-6">
                    <li>
                        <a
                            href="/"
                            className="relative cursor-pointer text-white after:absolute after:left-0 after:top-6 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-gray-300 hover:after:w-full"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="/about"
                            className="relative cursor-pointer text-white after:absolute after:left-0 after:top-6 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-gray-300 hover:after:w-full"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="/services"
                            className="relative cursor-pointer text-white after:absolute after:left-0 after:top-6 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-gray-300 hover:after:w-full"
                        >
                            Services
                        </a>
                    </li>
                    <li>
                        <a
                            href="/contact"
                            className="relative cursor-pointer text-white after:absolute after:left-0 after:top-6 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 after:content-[''] hover:text-gray-300 hover:after:w-full"
                        >
                            Contact
                        </a>
                    </li>
                </ul>

                {/* User section with auth buttons or user info all in line */}
                <div className="flex items-center space-x-4">
                    {!user ? (
                        <>
                            <button
                                className="rounded-lg px-4 py-2 text-white hover:bg-gray-700"
                                onClick={() => navigate('/signin')}
                            >
                                Login
                            </button>
                            <button
                                className="rounded-lg bg-white px-4 py-2 text-black hover:bg-gray-300"
                                onClick={() => navigate('/signup')}
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <div className="whitespace-nowrap text-white">
                                <span>Xin chào, {typeof user === 'string' ? user : user.user_name}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Logout
                            </button>
                            <a
                                href="/profile"
                                className="text-white hover:text-gray-300"
                            >
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="rounded-full border-2 border-gray-500 bg-gray-700 p-2"
                                />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

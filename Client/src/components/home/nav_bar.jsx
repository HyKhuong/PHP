
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/image/logo.jpg';
import { useUser } from '../../contexts/UserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout: userLogout } = useUser();

    const handleLogout = () => {
        userLogout();
        navigate('/');
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
                                <span>Xin chào, {user.user_name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
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

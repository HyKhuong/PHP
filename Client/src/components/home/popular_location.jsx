import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = () => {
    const [locations, setLocations] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered item
    const [currentPage, setCurrentPage] = useState(1);
    const locationsPerPage = 8;

    useEffect(() => {
        axios
            .get('http://localhost/server/public/locations')
            .then((response) => {
                console.log('API Response:', response.data); // Debugging
                if (Array.isArray(response.data.data)) {
                    setLocations(response.data.data);
                } else {
                    console.error('Invalid API response format');
                }
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
            });
    }, []);

    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

    const totalPages = Math.ceil(locations.length / locationsPerPage);

    return (
        <div>
            <h1 className="mb-6 text-center text-3xl font-bold text-black">Our Popular Locations</h1>
            <div className="container relative overflow-visible mx-auto p-4">
                <ul className="relative overflow-visible grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {currentLocations.length > 0 ? (
                        currentLocations.map((location, index) => (
                            <li
                                key={location.location_id}
                                className="relative transform transition-all duration-300 hover:scale-105"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <Link
                                    to={`/location_details/${location.location_id}`}
                                    className="block cursor-pointer rounded-lg border border-gray-200 bg-white shadow-lg"
                                >
                                    <img
                                        src={location.image_1 || '/default.jpg'}
                                        alt={location.location || 'Tour Location'}
                                        className="h-60 w-full rounded-lg object-cover"
                                    />
                                    <p className="m-4 text-lg font-bold text-gray-800">{location.title}</p>
                                </Link>

                                {/* Hover Popup */}
                                {hoveredIndex === index && (
                                    <div className="absolute left-2/4 top-4 z-50 ml-3 w-64 -translate-y-full rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
                                        <h3 className="text-md font-bold text-gray-900">{location.title}</h3>
                                        <p className="text-sm text-gray-600">{location.description || 'No description available'}</p>
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No tours available</p>
                    )}
                </ul>
            </div>

            {/* Pagination Controls */}
            <div className="m-6 flex justify-center space-x-2">
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-lg font-bold">Page {currentPage} of {totalPages}</span>
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Location;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:3000/api/tours/getTours')
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

    const handleClick = (tourId) => {
        console.log("tour id:", tourId);
    }

    return (
        <div>
            <h1 className="mb-6 text-center text-3xl font-bold text-black">Our Popular Locations</h1>
            <div className="container mx-auto p-4">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {locations.length > 0 ? (
                        locations.map((location) => (
                            <li
                                key={location.tour_id}
                                className="transform transition-all duration-300 hover:scale-105"
                                onClick={() => handleClick(location.tour_id)}
                            >
                                <Link
                                    to={`/tour_details/${location.tour_id}`}
                                    className="block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                                >
                                    <img
                                        src={location.image_url || '/default.jpg'}
                                        alt={location.location || 'Tour Location'}
                                        className="h-48 w-full rounded-lg object-cover"
                                    />
                                    <p className="mt-3 text-lg font-semibold text-gray-800">{location.title}</p>
                                    <p className="text-sm text-gray-600">{location.location}</p>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">No tours available</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Location;

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Location = () => {
    const [locations, setLocations] = useState([]);
    const [displayLimit, setDisplayLimit] = useState(8);

    useEffect(() => {
        axios
            .get('http://localhost/PHP/server/public/api/tours')
            .then((response) => {
                const data = response.data;
                console.log('Raw API Response:', data); // Log dữ liệu trả về
                if (data && Array.isArray(data.tours)) { // Lấy mảng tours từ thuộc tính "tours"
                    setLocations(data.tours); // Cập nhật state với danh sách tours
                    console.log('Updated locations state:', data.tours); // Log state sau khi cập nhật
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch((error) => {
                console.error('Error details:', error.response || error);
            });
    }, []);

    const handleClick = (tourId) => {
        console.log("tour id:", tourId);
    }

    const handleViewMore = () => {
        setDisplayLimit(prevLimit => prevLimit + 8);
    };

    return (
        <div>
            <h1 className="mb-6 text-center text-3xl font-bold text-black">Our Popular Locations</h1>
            <div className="container mx-auto p-4">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {locations.slice(0, displayLimit).map((location) => (
                        <li
                            key={location.tour_id} // Đảm bảo key này tồn tại trong dữ liệu API
                            className="transform transition-all duration-300 hover:scale-105"
                            onClick={() => handleClick(location.tour_id)} // Đảm bảo tour_id tồn tại
                        >
                            <Link
                                to={`/tour_details/${location.tour_id}`}
                                className="block cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                            >
                                <img
                                    src={location.image_url || '/default.jpg'} // Đảm bảo image_url tồn tại
                                    alt={location.location || 'Tour Location'} // Đảm bảo location tồn tại
                                    className="h-48 w-full rounded-lg object-cover"
                                />
                                <p className="mt-3 text-lg font-semibold text-gray-800">{location.title}</p> {/* Đảm bảo title tồn tại */}
                                <p className="text-sm text-gray-600">{location.location}</p>
                            </Link>
                        </li>
                    ))}
                </ul>

                {locations.length > displayLimit && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleViewMore}
                            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                        >
                            View More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Location;

// Removed unused React import
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TourList = ({ tours }) => {
    return (
        <div className=" bg-white p-6 rounded-xl shadow-lg">

            {/* Tour list container */}
            <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                    <Link
                        key={tour.tour_id}
                        to={`/tour_details/${tour.tour_id}`}
                        className="flex flex-col h-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                    >
                        <img
                            className="h-40 w-full object-cover rounded-lg"
                            src={tour.image_url}
                            alt={tour.title}
                        />
                        <div className="flex flex-col flex-grow mt-2">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {tour.title}
                            </h2>
                            <p className="text-gray-600">Location: {tour.location_title}</p>
                            <p className="text-gray-600">
                                Price: {tour.price?.toLocaleString()} VND
                            </p>
                            <p className="text-gray-600">
                                Start: {new Date(tour.start_date).toLocaleDateString('vi-VN')}
                            </p>
                            <p className="text-gray-600">
                                End: {new Date(tour.end_date).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
TourList.propTypes = {
    tours: PropTypes.array.isRequired,
};

export default TourList;

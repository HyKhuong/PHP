import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
    return (
        <div className="w-full max-w-sm rounded-xl border bg-white p-5 shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={tour.image_url} alt={tour.title} className="h-48 w-full rounded-lg object-cover" />
            <h3 className="mt-3 text-lg font-bold">{tour.title}</h3>
            <p className="text-sm text-gray-500">Mã tour: <span className="font-medium">NDSGN{tour.tour_id}</span></p>
            <p className="text-sm text-gray-500">Thời gian: {tour.duration}</p>
            <p className="text-sm text-gray-500">Phương tiện: <span className="font-medium">Máy bay</span></p>
            <p className="mt-2 text-lg font-bold text-red-600">{tour.price.toLocaleString()} đ</p>
            <Link to={`/tour_details/${tour.tour_id}`}
                className="block w-full rounded bg-gradient-to-r from-[#89A5C7] to-[#AFD7E6] py-2 text-center font-semibold text-white shadow-md">
                Xem chi tiết
            </Link>
        </div>
    );
};

TourCard.propTypes = {
    tour: PropTypes.shape({
        tour_id: PropTypes.number.isRequired,
        image_url: PropTypes.string,
        title: PropTypes.string.isRequired,
        duration: PropTypes.string,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default TourCard;

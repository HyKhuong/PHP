import { useEffect, useState } from 'react';
import Sidebar from '../../components/location_detail/side_bar';
import TourCard from '../../components/location_detail/tour_box';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TourList = () => {
    const [locations, setLocation] = useState({});
    const [tours, setTours] = useState([]);
    const [sortTour, setSortedTours] = useState([]);
    const { location_id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost/server/public/locations/${location_id}`)
            .then((response) => {
                console.log('Locations Response:', response.data);
                setLocation(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
            });
        axios
            .get(`http://localhost/server/public/tours/location/${location_id}`)
            .then((response) => {
                console.log('Tours Response:', response.data);
                if (Array.isArray(response.data.data)) {
                    setTours(response.data.data);
                } else {
                    console.error('Invalid API response format');
                }
            })
            .catch((error) => {
                console.error('Error fetching locations:', error);
            });
    }, [location_id]);

    const sortTours = (option) => {
        let sorted = [...tours];
    
        if (option === "title") {
          sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === "price") {
          sorted.sort((a, b) => a.price - b.price);
        } else if (option === "duration") {
          sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        }
    
        setSortedTours(sorted);
      };

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6 p-6">
            <Sidebar onSortChange={sortTours}/>
            <div className="col-span-3">
                <h1 className="mb-4 text-2xl font-bold">{locations.title}</h1>
                <p className="text-gray-600">
                    Chúng tôi tìm thấy <strong>{tours.length}</strong> chương trình tour cho quý khách
                </p>
                <div className="mt-4 grid grid-cols-3 gap-6">
                    {(sortTour.length > 0 ? sortTour : tours).map((tour) => (
                        <TourCard
                            key={tour.tour_id}
                            tour={tour}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourList;

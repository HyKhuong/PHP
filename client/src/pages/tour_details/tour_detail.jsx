import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, Tag } from 'lucide-react';
import axios from 'axios';

const TourDetail = () => {
    const [tour, setTour] = useState(null);
    const [relatedTours, setRelatedTours] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        const fecthTourDetail = async () => {
            try {
                const response = await axios.get(`http://localhost/server/public/tours/${id}`);
                console.log('API Response:', response.data);
                setTour(response.data.data);
            } catch (error) {
                console.error('Error fetching tour details:', error);
            }
        };

        fecthTourDetail();
    }, [id]);

    useEffect(() => {
        if (tour?.location_id) {
            const fetchTourLocation = async () => {
                try {
                    const response = await axios.get(`http://localhost/server/public/tours/location/${tour.location_id}/${id}`);
                    console.log('Location API Response:', response.data);
                    setRelatedTours(response.data.data);
                } catch (error) {
                    console.error('Error fetching tour location:', error);
                }
            };

            fetchTourLocation();
        }
    }, [tour?.location_id, id]);

    useEffect(() => {
        if (relatedTours.length < 3) return; // Prevents issues when there are fewer than 3 tours

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(relatedTours.length / 3));
        }, 3000);

        return () => clearInterval(interval);
    }, [relatedTours]);

    if (!tour) return <p>Tour not found</p>;

    return (
        <div>
            <div className="mx-auto max-w-6xl p-4">
                {/* Header Image Grid */}
                <img
                    src={tour.image_url}
                    alt="Tour Image"
                    className="h-auto max-h-[500px] w-full rounded-lg object-cover"
                />

                {/* Tour Info Section */}
                <div className="mt-6">
                    <h1 className="text-3xl font-bold">{tour.title}</h1>
                    <p className="mt-2 text-gray-500">Trải nghiệm du lịch Nhật Bản cổ điển</p>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Clock size={24} />
                            <p className="font-semibold">Thời gian</p>
                            <p className="text-gray-500">{tour.duration} ngày</p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Tag size={24} />
                            <p className="font-semibold">Loại tour</p>
                            <p className="text-gray-500">{tour.category}</p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Users size={24} />
                            <p className="font-semibold">Số lượng khách</p>
                            <p className="text-gray-500">{tour.available !== undefined ? tour.available : 'Không có sẵn'}</p>
                        </div>
                    </div>
                </div>
                {/* Tour Information Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Thông Tin Tour</h2>
                    <div className="mt-4 grid grid-cols-2 gap-6">
                        {/* Bao gồm */}
                        <div className="rounded-lg border bg-green-50 p-4 shadow-md">
                            <h3 className="font-semibold text-green-700">✅ Bao gồm</h3>
                            <p>{tour.description}</p>
                        </div>

                        {/* Chưa bao gồm */}
                        <div className="rounded-lg border bg-red-50 p-4 shadow-md">
                            <h3 className="font-semibold text-red-700">❌ Chưa bao gồm</h3>
                            <ul className="mt-2 list-inside list-disc text-gray-700">
                                <li>Tiền bồi dưỡng hướng dẫn viên & tài xế địa phương: 150.000 VNĐ/khách/ngày</li>
                                <li>Phụ thu phòng đơn: 1.500.000 VNĐ/khách/đêm</li>
                                <li>Các chi phí cá nhân & ăn uống ngoài chương trình</li>
                                <li>Các chi phí không nằm trong danh mục đã “bao gồm” trên</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Booking Section */}
                <div className="mt-6 rounded-lg border bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-semibold">Đặt Tour Ngay</h2>

                    {/* Departure Date */}
                    <div className="mb-4 flex gap-20 font-medium text-gray-700">
                        <p>Ngày khởi hành: {new Date(tour.start_date).toLocaleDateString('vi-VN')}</p>
                        <p>Ngày kết thúc: {new Date(tour.end_date).toLocaleDateString('vi-VN')}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-start font-medium text-gray-700">Chỗ cần còn trống: {tour.available}</p>
                    </div>

                    <p className="mb-4 text-start text-2xl font-bold text-green-600">Giá vé: {Number(tour.price).toLocaleString('vi-VN')}VNĐ</p>

                    <Link
                        to={`/payment/${tour.tour_id}`}
                        className="block w-full rounded-md py-3 text-center font-semibold text-white shadow-md transition hover:opacity-90"
                        style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                    >
                        Đặt Ngay
                    </Link>
                </div>

                {/* Related Tours */}
                <div className="mx-auto max-w-6xl p-4">
                    <h2 className="text-2xl font-semibold">Các Tour Liên Quan</h2>
                    <div className="relative mt-4 w-full overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                        >
                            {relatedTours.map((relatedTour) => (
                                <div
                                    key={relatedTour.tour_id}
                                    className="w-1/3 flex-shrink-0 p-2"
                                >
                                    <div className="rounded-lg border p-4 shadow-md">
                                        <img
                                            src={relatedTour.image_url}
                                            alt={relatedTour.title}
                                            className="h-40 w-full rounded-lg object-cover"
                                        />
                                        <h3 className="mt-2 font-semibold">{relatedTour.title}</h3>
                                        <p className="text-sm text-gray-500">{Number(relatedTour.price).toLocaleString('vi-VN')} VNĐ</p>
                                        <Link
                                            to={`/tour_details/${relatedTour.tour_id}`}
                                            onClick={() => (window.location.href = `/tour_details/${relatedTour.tour_id}`)}
                                            className="block w-full rounded-md py-3 text-center font-semibold text-white shadow-md transition hover:opacity-90"
                                            style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                                        >
                                            Xem Chi Tiết
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Customer Reviews Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold">Đánh Giá Của Khách Hàng</h2>
                    <div className="mt-4 space-y-4">
                        {[
                            {
                                name: 'Nguyễn Văn A',
                                rating: 5,
                                comment: 'Chuyến đi tuyệt vời! Mọi thứ đều rất suôn sẻ và cảnh đẹp không thể tin được.',
                                avatar: 'https://i.pravatar.cc/50?img=1',
                            },
                            {
                                name: 'Trần Thị B',
                                rating: 4,
                                comment: 'Hướng dẫn viên nhiệt tình, đồ ăn ngon, nhưng lịch trình hơi dày.',
                                avatar: 'https://i.pravatar.cc/50?img=2',
                            },
                            {
                                name: 'Lê Hoàng C',
                                rating: 5,
                                comment: 'Nhật Bản thật sự là một đất nước đáng để đi du lịch. Mình rất hài lòng!',
                                avatar: 'https://i.pravatar.cc/50?img=3',
                            },
                        ].map((review, index) => (
                            <div
                                key={index}
                                className="flex gap-4 rounded-lg border p-4 shadow-md"
                            >
                                {/* Avatar */}
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                {/* Nội dung review */}
                                <div>
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <div className="flex items-center text-yellow-500">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i}>{i < review.rating ? '⭐' : '☆'}</span>
                                        ))}
                                    </div>
                                    <p className="mt-2 text-gray-600">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetail;

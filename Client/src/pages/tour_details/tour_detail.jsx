import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spain from '../../assets/image/Spain.jpg';
import London from '../../assets/image/London.jpg';
import Greece from '../../assets/image/Greece.jpg';
import { Clock, Users, Plane, Tag } from 'lucide-react';
import axios from 'axios';

const TourDetail = () => {
    const [expandedDay, setExpandedDay] = useState(null);
    const [departureDate, setDepartureDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [tour, setTour] = useState(null);

    const toggleDay = (day) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    const { id } = useParams();

    useEffect(() => {
        const fecthTourDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/tours/${id}`);
                console.log('API Response:', response.data);
                setTour(response.data.data);
            } catch (error) {
                console.error('Error fetching tour details:', error);
            }
        };

        fecthTourDetail();
    }, [id]);

    const itinerary = [
        {
            day: '1-2',
            title: 'Tokyo – Thành phố không ngủ',
            details: [
                'Tháp Tokyo & Shibuya: Ngắm nhìn toàn cảnh thành phố từ tháp Tokyo và check-in tại ngã tư Shibuya sầm uất.',
                'Akihabara & Harajuku: Khám phá thiên đường công nghệ, anime và thời trang độc đáo.',
                'Chợ cá Tsukiji: Thưởng thức sushi tươi ngon bậc nhất thế giới.',
            ],
        },
        {
            day: '3-4',
            title: 'Kyoto – Hành trình về cố đô',
            details: [
                'Chùa Kinkaku-ji (Kim Các Tự): Ngôi chùa dát vàng nổi tiếng giữa thiên nhiên thơ mộng.',
                'Rừng trúc Arashiyama: Đi dạo giữa rừng trúc xanh mướt, tận hưởng không khí yên bình.',
                'Gion – Khu phố Geisha: Chiêm ngưỡng nét đẹp cổ kính và văn hóa trà đạo.',
            ],
        },
        {
            day: '5-6',
            title: 'Osaka – Thành phố ẩm thực',
            details: [
                'Lâu đài Osaka: Một trong những biểu tượng lịch sử quan trọng của Nhật Bản.',
                'Khu Dotonbori: Thiên đường ẩm thực với takoyaki, okonomiyaki và ramen.',
                'Universal Studios Japan: Công viên giải trí hàng đầu dành cho tín đồ Harry Potter và các bộ phim Hollywood.',
            ],
        },
        {
            day: '7',
            title: 'Núi Phú Sĩ & Làng cổ Hakone',
            details: [
                'Ngắm núi Phú Sĩ: Tận hưởng vẻ đẹp hùng vĩ của biểu tượng Nhật Bản.',
                'Onsen truyền thống: Thư giãn trong suối nước nóng tự nhiên giữa cảnh quan thơ mộng.',
            ],
        },
    ];

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
                    <div className="mt-4 grid grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Clock size={24} />
                            <p className="font-semibold">Thời gian</p>
                            <p className="text-gray-500">{tour.duration} ngay</p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Tag size={24} />
                            <p className="font-semibold">Loại tour</p>
                            <p className="text-gray-500">{tour.category}</p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Users size={24} />
                            <p className="font-semibold">Số lượng khách</p>
                            <p className="text-gray-500">{tour.available !== undefined ? tour.available : 'Not available'}</p>
                        </div>
                        <div className="flex flex-col items-center rounded-lg border p-3">
                            <Plane size={24} />
                            <p className="font-semibold">Hãng hàng không</p>
                            <p className="text-gray-500">Vietnam Airlines</p>
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

                {/* Itinerary Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold">Lịch trình</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4">
                        {itinerary.map((item, index) => (
                            <div
                                key={index}
                                className="cursor-pointer rounded-lg border bg-gray-100 p-4 shadow-md"
                                onClick={() => toggleDay(index)}
                            >
                                <h3 className="font-semibold">
                                    Ngày {item.day}: {item.title}
                                </h3>
                                {expandedDay === index && (
                                    <ul className="mt-2 list-disc pl-4 text-sm text-gray-600">
                                        {item.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booking Section */}
                <div className="mt-6 rounded-lg border p-4 shadow-md">
                    <h2 className="text-xl font-semibold">Đặt Tour Ngay</h2>
                    <label className="mt-2 block">Ngày khởi hành:</label>
                    <input
                        type="date"
                        className="w-full rounded border p-2"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    <label className="mt-2 block">Số lượng khách:</label>
                    <input
                        type="number"
                        className="w-full rounded border p-2"
                        value={guests}
                        min="1"
                        onChange={(e) => setGuests(e.target.value)}
                    />
                    <p className="mt-2 text-2xl font-bold text-green-600">$1,200.00</p>
                    <button
                        className="w-full rounded px-4 py-2 font-semibold text-white shadow-md"
                        style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                    >
                        Đặt Ngay
                    </button>
                </div>

                {/* Related Tours */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold">Các Tour Liên Quan</h2>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4 shadow-md">
                            <img
                                src={Spain}
                                alt="Spain"
                                className="h-40 w-full rounded-lg object-cover"
                            />
                            <h3 className="mt-2 font-semibold">Tour Tây Ban Nha</h3>
                            <p className="text-sm text-gray-500">$900.00</p>
                            <button
                                className="w-full rounded px-4 py-2 font-semibold text-white shadow-md"
                                style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                            >
                                Xem Chi Tiết
                            </button>
                        </div>
                        <div className="rounded-lg border p-4 shadow-md">
                            <img
                                src={London}
                                alt="London"
                                className="h-40 w-full rounded-lg object-cover"
                            />
                            <h3 className="mt-2 font-semibold">Tour London</h3>
                            <p className="text-sm text-gray-500">$850.00</p>
                            <button
                                className="w-full rounded px-4 py-2 font-semibold text-white shadow-md"
                                style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                            >
                                Xem Chi Tiết
                            </button>
                        </div>
                        <div className="rounded-lg border p-4 shadow-md">
                            <img
                                src={Greece}
                                alt="Greece"
                                className="h-40 w-full rounded-lg object-cover"
                            />
                            <h3 className="mt-2 font-semibold">Tour Hy Lạp</h3>
                            <p className="text-sm text-gray-500">$1,000.00</p>
                            <button
                                className="w-full rounded px-4 py-2 font-semibold text-white shadow-md"
                                style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                            >
                                Xem Chi Tiết
                            </button>
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

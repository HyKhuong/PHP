import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const TourCategoryDetail = () => {
    const { category_id } = useParams();
    const [category, setCategory] = useState(null);
    const [tours, setTours] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category_id) {
            console.warn("CategoryId không hợp lệ:", category_id);
            setError("ID danh mục không hợp lệ.");
            return;
        }

        const fetchCategoryDetail = async () => {
            try {
                const response = await axios.get(`http://localhost/server/public/categories/${category_id}`);
                if (response.data.data) {
                    setCategory(response.data.data);
                } else {
                    setError("Không tìm thấy danh mục tour.");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu danh mục:", error);
                setError("Lỗi khi tải dữ liệu, vui lòng thử lại.");
            }
        };

        const fetchTours = async () => {
            try {
                const response = await axios.get(`http://localhost/server/public/tours/category/${category_id}`);
                console.log("categories:", response.data);
                if (Array.isArray(response.data.data)) {
                    setTours(response.data.data);
                } else {
                    console.log("lỗi lấy tour");
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tour:", error);
                setError("Không thể tải danh sách tour, vui lòng thử lại.");
            }
        };

        fetchCategoryDetail();
        fetchTours();
    }, [category_id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white">
                <div className="text-center p-8 rounded-lg bg-black bg-opacity-50">
                    <h2 className="text-4xl font-extrabold animate-pulse">{error}</h2>
                    <Link to="/" className="mt-6 inline-block bg-yellow-400 text-black py-3 px-6 rounded-full font-bold hover:bg-yellow-500 transition-all transform hover:scale-105">
                        Quay về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500">
                <div className="text-white text-3xl font-bold animate-bounce">Đang tải dữ liệu...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-gray-100 py-10">
            {/* Tiêu đề danh mục */}
            <div className="relative max-w-5xl mx-auto mb-12">
                <h3 className="text-5xl font-semibold text-center text-indigo-800">
                    {category.title}
                </h3>
                <p className="mt-4 text-lg text-gray-700 text-center italic max-w-2xl mx-auto">
                    {category.description}
                </p>
            </div>

            {/* Danh sách Tour */}
            <div className="max-w-5xl mx-auto px-4">
                <h3 className="text-4xl font-semibold   mb-8">
                    Danh sách Tour
                </h3>
                {tours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tours.map((tour, index) => (
                            <Link
                                key={tour.tour_id}
                                to={`/tour_details/${tour.tour_id}`}
                                className="group relative block bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Hình ảnh tour */}
                                {tour.image_url && (
                                    <div className="relative">
                                        <img
                                            src={tour.image_url}
                                            alt={tour.title}
                                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => (e.target.src = "đường_dẫn_hình_mặc_định.jpg")}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                    </div>
                                )}
                                {/* Nội dung tour */}
                                <div className="p-5">
                                    <h4 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                        {tour.title}
                                    </h4>
                                    <p className="text-gray-600 mt-2 line-clamp-2">
                                        {tour.description}
                                    </p>
                                    <p className="text-yellow-500 font-semibold mt-3 text-lg">
                                        Giá: {Number(tour.price).toLocaleString('en-US')} VND
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 text-xl mt-8 animate-pulse bg-gray-200 inline-block px-6 py-2 rounded-full">
                        Không có tour nào trong danh mục này.
                    </p>
                )}
            </div>
        </div>
    );
};

export default TourCategoryDetail;
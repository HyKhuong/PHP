import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaClock, FaCrown, FaHiking } from "react-icons/fa";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost/server/public/categories"); 
                console.log("api:", response.data.data);
                setCategories(response.data.data);
            } catch (err) {
                setError("Không thể tải danh sách danh mục.");
                console.error("Error fetching categories:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // Hàm chọn icon và màu sắc dựa trên title của category
    const getCategoryIcon = (title) => {
        const lowerTitle = title.toLowerCase(); // Chuyển thành chữ thường để so sánh
        if (lowerTitle.includes("tour trọn gói")) {
            return <FaBoxOpen className="text-4xl text-yellow-700 mb-2" />; // Màu vàng đen (dùng vàng làm chủ đạo)
        } else if (lowerTitle.includes("tour linh động")) {
            return <FaClock className="text-4xl text-green-500 mb-2" />; // Màu xanh
        } else if (lowerTitle.includes("tour cao cấp")) {
            return <FaCrown className="text-4xl text-yellow-400 mb-2" />; // Màu vàng
        } else if (lowerTitle.includes("tour trải nghiệm") || lowerTitle.includes("tour phiêu lưu")) {
            return <FaHiking className="text-4xl text-brown-500 mb-2" />; // Màu nâu (phiêu lưu = trải nghiệm)
        } else {
            return <FaHiking className="text-4xl text-gray-500 mb-2" />; // Mặc định màu xám
        }
    };

    if (isLoading) {
        return <div className="text-center mt-10">Đang tải...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500 mt-10">
                {error}
                <Link to="/" className="ml-2 text-blue-500 underline">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-black text-3xl font-bold text-center mb-6">Our Popular Categories</h1>
        <div className="flex-1 max-w-4xl mx-auto p-10">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((category) => (
                    <li
                        key={category.category_id || category.title}
                        className="bg-white rounded-lg hover:bg-gray-200 shadow-xl p-4 flex flex-col items-center border border-gray-300 cursor-pointer transition duration-300"
                    >
                        <Link
                            to={`/category_details/${category.category_id}`}
                            className="flex flex-col items-center w-full h-full justify-center"
                            aria-label={`Xem chi tiết ${category.title}`}
                        >
                            {/* Sử dụng hàm getCategoryIcon để chọn icon và màu */}
                            {category.icon || getCategoryIcon(category.title)}
                            <p className="text-center font-semibold text-gray-800 hover:text-blue-600">
                                {category.title}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default Categories;
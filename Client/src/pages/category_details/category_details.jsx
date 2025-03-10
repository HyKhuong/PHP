import { useParams, Link } from "react-router-dom";

const categories = {
    package: {
        name: "Tour Trọn Gói",
        description: "Dành cho những ai muốn có kế hoạch du lịch trọn vẹn, không cần lo lắng về lịch trình.",
        features: ["Bao gồm ăn uống", "Hướng dẫn viên", "Di chuyển thuận tiện"],
        included: [
            "Phương tiện vận chuyển, xe đưa đón tham quan",
            "Vé máy bay khứ hồi theo Japan Airlines",
            "Hành lý ký gửi 46kg, xách tay 12kg",
            "Khách sạn tiêu chuẩn 4 sao",
            "Ăn uống theo chương trình",
            "Vé tham quan có trong chương trình",
            "Bảo hiểm du lịch, mức bồi hoàn tối đa 1.200.000.000 vnđ/trường hợp",
            "Thuế VAT (0%) & phí phục vụ",
            "Hướng dẫn viên du lịch suốt tuyến",
            "Visa nhập cảnh Nhật Bản",
            "Tiền bồi dưỡng hướng dẫn viên & tài xế: 150.000 vnđ/khách/ngày",
        ],
        notIncluded: [
            "Phụ thu phòng đơn: 1.500.000 vnđ/khách/đêm",
            "Các chi phí cá nhân & ăn uống ngoài chương trình",
            "Các chi phí không nằm trong danh mục đã “bao gồm” trên",
        ],
        tours: [
            { id: 1, name: "Tour Đà Nẵng", image: "https://via.placeholder.com/300", price: "$500" },
            { id: 2, name: "Tour Hà Nội", image: "https://via.placeholder.com/300", price: "$400" },
        ],
    },
    flexible: {
        name: "Tour Linh Động",
        description: "Dành cho những ai muốn có kế hoạch du lịch tự do, sắp xếp lịch trình theo ý muốn.",
        features: ["Di chuyển tự do"],
        included: [
            "Hành lý ký gửi 46kg, xách tay 12kg",
            "Khách sạn tiêu chuẩn 4 sao",
            "Bảo hiểm du lịch, mức bồi hoàn tối đa 1.200.000.000 vnđ/trường hợp",
            "Thuế VAT (0%) & phí phục vụ",
            "Hướng dẫn viên du lịch suốt tuyến",
            "Visa nhập cảnh Nhật Bản",
        ],
        notIncluded: [
            "Phương tiện vận chuyển, xe đưa đón tham quan",
            "Vé máy bay khứ hồi theo Japan Airlines",
            "Phụ thu phòng đơn: 1.500.000 vnđ/khách/đêm",
            "Các chi phí cá nhân & ăn uống ngoài chương trình",
            "Các chi phí không nằm trong danh mục đã “bao gồm” trên",
            "Tiền bồi dưỡng hướng dẫn viên & tài xế: 150.000 vnđ/khách/ngày",
            "Vé tham quan có trong chương trình",
        ],
        tours: [
            { id: 3, name: "Tour Sài Gòn", image: "https://via.placeholder.com/300", price: "$300" },
            { id: 4, name: "Tour Nha Trang", image: "https://via.placeholder.com/300", price: "$350" },
        ],
    },
    luxury: {
        name: "Tour Cao Cấp",
        description: "Dành cho những ai muốn có kế hoạch du lịch trọn vẹn với trải nghiệm cao cấp, không cần lo lắng về lịch trình.",
        features: ["Bao gồm ăn uống", "Hướng dẫn viên", "Di chuyển thuận tiện"],
        included: [
            "Phương tiện vận chuyển, xe đưa đón tham quan",
            "Vé máy bay khứ hồi theo Japan Airlines",
            "Hành lý ký gửi 46kg, xách tay 12kg",
            "Khách sạn tiêu chuẩn 5 sao",
            "Ăn uống theo chương trình",
            "Vé tham quan có trong chương trình",
            "Bảo hiểm du lịch, mức bồi hoàn tối đa 2.00.000.000 vnđ/trường hợp",
            "Thuế VAT (0%) & phí phục vụ",
            "Hướng dẫn viên du lịch suốt tuyến",
            "Visa nhập cảnh Nhật Bản",
            "Tiền bồi dưỡng hướng dẫn viên & tài xế: 300.000 vnđ/khách/ngày",
        ],
        notIncluded: [
            "Phụ thu phòng đơn: 1.500.000 vnđ/khách/đêm",
            "Các chi phí cá nhân & ăn uống ngoài chương trình",
            "Các chi phí không nằm trong danh mục đã “bao gồm” trên",
        ],
        tours: [
            { id: 5, name: "Tour Phú Quốc", image: "https://via.placeholder.com/300", price: "$1000" },
            { id: 6, name: "Tour Maldives", image: "https://via.placeholder.com/300", price: "$2500" },
        ],
    },
    experience: {
        name: "Tour Trải Nghiệm",
        description: "Dành cho những ai muốn có kế hoạch du lịch mạo hiểm và nhiều trải nghiệm, không cần lo lắng về lịch trình.",
        features: ["Bao gồm ăn uống", "Hướng dẫn viên", "Di chuyển thuận tiện"],
        included: [
            "Phương tiện vận chuyển, xe đưa đón tham quan",
            "Vé máy bay khứ hồi theo Japan Airlines",
            "Hành lý ký gửi 46kg, xách tay 12kg",
            "Khách sạn tiêu chuẩn 4 sao",
            "Ăn uống theo chương trình",
            "Vé tham quan có trong chương trình",
            "Bảo hiểm du lịch, mức bồi hoàn tối đa 1.200.000.000 vnđ/trường hợp",
            "Thuế VAT (0%) & phí phục vụ",
            "Hướng dẫn viên du lịch suốt tuyến",
            "Visa nhập cảnh Nhật Bản",
            "Tiền bồi dưỡng hướng dẫn viên & tài xế: 150.000 vnđ/khách/ngày",
        ],
        notIncluded: [
            "Phụ thu phòng đơn: 1.500.000 vnđ/khách/đêm",
            "Các chi phí cá nhân & ăn uống ngoài chương trình",
            "Các chi phí không nằm trong danh mục đã “bao gồm” trên",
        ],
        tours: [
            { id: 7, name: "Tour Sapa", image: "https://via.placeholder.com/300", price: "$600" },
            { id: 8, name: "Tour Tây Bắc", image: "https://via.placeholder.com/300", price: "$700" },
        ],
    },
};

const TourCategoryDetail = () => {
    const { categoryId } = useParams();
    const category = categories[categoryId];

    if (!category) {
        return (
            <div className="text-center text-red-500 text-xl mt-10">
                <h2>Không tìm thấy danh mục tour!</h2>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold">{category.name}</h2>
            <p className="text-gray-600 mt-2">{category.description}</p>

            {/* Đặc điểm */}
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Đặc điểm</h3>
                <ul className="list-disc ml-6 mt-2">
                    {category.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            {/* Bao gồm / Chưa bao gồm */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Bao gồm</h3>
                <ul className="list-disc ml-6 mt-2 text-green-600">
                    {category.included.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold">Chưa bao gồm</h3>
                <ul className="list-disc ml-6 mt-2 text-red-600">
                    {category.notIncluded.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Danh sách Tour */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold">Các Tour</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {category.tours.map((tour) => (
                        <div key={tour.id} className="border rounded-lg p-4 shadow-md">
                            <img src={tour.image} alt={tour.name} className="w-full h-40 object-cover rounded-lg" />
                            <h4 className="mt-2 font-semibold">{tour.name}</h4>
                            <p className="text-gray-500">{tour.price}</p>
                            <button  className="w-full text-white px-4 py-2 rounded font-semibold shadow-md"
        style={{ background: "linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)" }}>
                                Xem Chi Tiết
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourCategoryDetail;


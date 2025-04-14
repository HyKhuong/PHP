import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TourSearch = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { search } = useLocation();
    const query = new URLSearchParams(search).get("q");

    useEffect(() => {
        const fetchTours = async () => {
            try {
                // Sửa URL để chuyển query thành query string, không dùng query làm phần của path
                const response = await fetch(`http://localhost:3000/api/tours/tours?search=${encodeURIComponent(query)}`);
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setTours(data.tours || []);
                    console.log("Tours data:", data.tours);
                } else {
                    const text = await response.text();
                    console.error("Non-JSON response:", text);
                    throw new Error("Đã nhận được phản hồi không phải JSON");
                }
            } catch (err) {
                console.error("Lỗi tải dữ liệu tour:", err);
                setError("Lỗi tải dữ liệu tour: " + err.message);
            } finally {
                setLoading(false);
            }
        };
        if (query) fetchTours();
    }, [query]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Kết quả tìm kiếm: {query}</h1>
            {tours.length === 0 ? (
                <p>Không có tour nào phù hợp.</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <div key={tour.tour_id} className="border p-4 rounded shadow">
                            <img src={tour.image_url} alt={tour.title} className="w-full h-40 object-cover rounded" />
                            <h3 className="mt-2 font-bold">{tour.title}</h3>
                            <p className="text-sm text-gray-600">{tour.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TourSearch;

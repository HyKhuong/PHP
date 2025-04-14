import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tours, setTours] = useState(null);
    const [users, setUsers] = useState(null);
    const [adultCount, setAdultCount] = useState(1);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn phải đăng nhập trước khi đặt chuyến đi");
            navigate("/signin");
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    useEffect(() => {
        if (isLoggedIn) {
            axios
                .get(`http://localhost/server/public/tours/${id}`)
                .then((response) => {
                    console.log("API Response:", response.data);
                    setTours(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching tour:", error);
                });
        }
    },[id, isLoggedIn]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
    
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser); 
                const storedEmail = parsedUser.email; 
    
                axios
                    .get("http://localhost/server/public/auth/current-user")
                    .then((response) => {
                        console.log("User response:", response.data);
    
                        if (Array.isArray(response.data.data)) {
                            const foundUser = response.data.data.find((u) => u.email === storedEmail);
    
                            if (foundUser) {
                                setUsers(foundUser.user_id || "");
                                setCustomerName(foundUser.user_name || "");
                                setCustomerPhone(foundUser.phone_number || "");
                                setCustomerEmail(foundUser.email || "");
                            } else {
                                console.log("User not found");
                            }
                        } else {
                            console.error("Expected an array but got:", response.data);
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching users:", error);
                    });
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }
    }, []);
    

    if (!tours) return <p>Loading...</p>;

    const tourPrice = tours?.price || 0;
    const maxPeople = tours?.available || 0;
    const totalPeople = adultCount;
    const totalPrice = totalPeople * tourPrice;

    const formatDateForMySQL = (date) => {
        return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const handleSubmit = async () => {
    
        const bookingData = {
            tour_id: tours.tour_id, 
            user_id: users,
            booking_id: uuidv4().slice(0,8),
            booking_date: formatDateForMySQL(new Date()),
            number_of_people: totalPeople,
            total_price: totalPrice, 
        };
    
        try {
            const response = await axios.post("http://localhost/server/public/booking", bookingData);
            console.log("Booking response:", response.data);
    
            if (response.data.status) {
                alert("Đặt chỗ thành công!");
                navigate(`/payment_confirmation`, { state:  bookingData  });
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error creating booking:", error);
        }
    };

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div className="mb-8 flex items-center justify-between">
                <div className="font-semibold text-blue-600">NHẬP THÔNG TIN</div>
                <div className="text-gray-400">➝</div>
                <div className="text-gray-400">THANH TOÁN</div>
                <div className="text-gray-400">➝</div>
                <div className="text-gray-400">HOÀN TẤT</div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="rounded-lg border p-4 shadow-md">
                        <h2 className="mb-2 text-xl font-semibold">THÔNG TIN LIÊN LẠC</h2>
                        <input
                            type="text"
                            placeholder="Họ tên *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="mb-2 w-full rounded border p-2"
                        />
                        <input
                            type="text"
                            placeholder="Điện thoại *"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="mb-2 w-full rounded border p-2"
                        />
                        <input
                            type="email"
                            placeholder="Email *"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div className="rounded-lg border p-4 shadow-md">
                        <h2 className="mb-2 text-xl font-semibold">HÀNH KHÁCH</h2>
                        <div className="mb-4 flex justify-between rounded border p-2">
                            <span>Số người</span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => adultCount > 1 && setAdultCount(adultCount - 1)}
                                    className="rounded bg-gray-300 px-2"
                                >
                                    -
                                </button>
                                <span>{adultCount}</span>
                                <button
                                    onClick={() => totalPeople < maxPeople && setAdultCount(adultCount + 1)}
                                    className={`rounded px-2 ${
                                        totalPeople >= maxPeople ? "cursor-not-allowed bg-gray-400" : "bg-gray-300"
                                    }`}
                                    disabled={totalPeople >= maxPeople}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border p-4 shadow-md">
                    <h2 className="mb-2 text-xl font-semibold">TÓM TẮT CHUYẾN ĐI</h2>
                    <p className="font-semibold">
                        👥 Tổng số khách: {totalPeople} / {maxPeople}
                    </p>
                    <div className="mt-4 border-t pt-4 text-xl font-bold">
                        Tổng tiền: {totalPrice.toLocaleString()}VNĐ
                    </div>

                    <Link
                        onClick={handleSubmit}
                        className="block w-full rounded px-4 py-2 text-center font-semibold text-white shadow-md"
                        style={{ background: "linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)" }}
                    >
                        Thanh toán ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [babyCount, setBabyCount] = useState(0);
    const [singleRoom] = useState(false);

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");


    const tourPrice = 14990000;
    const singleRoomFee = 2000000;
    const lastMinuteDiscount = 500000;
    const maxPeople = 10;

    const totalPeople = adultCount + childCount + babyCount;
    const totalPrice =
        totalPeople * tourPrice +
        (singleRoom ? singleRoomFee : 0) -
        (adultCount * lastMinuteDiscount);

    const handleIncrease = (setCount, count) => {
        if (totalPeople < maxPeople) {
            setCount(count + 1);
        }
    };

    const handleDecrease = (setCount, count) => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    const navigate = useNavigate();

    // const handlePayment = () => {
    //     if (!paymentMethod) {
    //         alert("Vui lòng chọn phương thức thanh toán!");
    //         return;
    //     }

    //     navigate("/xac-nhan-thanh-toan", {
    //         state: {
    //             adultCount,
    //             childCount,
    //             babyCount,
    //             singleRoom,
    //             totalPrice,
    //             paymentMethod
    //         }
    //     });
    // };
    const descriptions = {
        momo: "Thanh toán qua MoMo bằng cách quét mã QR hoặc nhập số điện thoại liên kết.",
        bank: "Chuyển khoản trực tiếp đến tài khoản ngân hàng theo thông tin được cung cấp.",
        cash: "Thanh toán bằng tiền mặt khi nhận dịch vụ hoặc tại văn phòng.",
        vnpay: "Sử dụng VNPay để thanh toán qua ứng dụng ngân hàng hoặc mã QR.",
        zalopay: "Thanh toán nhanh chóng qua ZaloPay bằng cách quét mã QR.",
        credit: "Thanh toán bằng thẻ tín dụng Visa/Mastercard/AMEX với bảo mật cao.",
    };

    const paymentOptions = [
        { value: "momo", label: "💜 MoMo" },
        { value: "bank", label: "🏦 Chuyển khoản ngân hàng" },
        { value: "cash", label: "💵 Tiền mặt" },
        { value: "vnpay", label: "🔵 VNPay" },
        { value: "zalopay", label: "💙 ZaloPay" },
        { value: "credit", label: "💳 Thẻ tín dụng" },
    ];

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div className="text-blue-600 font-semibold">NHẬP THÔNG TIN</div>
                <div className="text-gray-400">➝</div>
                <div className="text-gray-400">THANH TOÁN</div>
                <div className="text-gray-400">➝</div>
                <div className="text-gray-400">HOÀN TẤT</div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <div className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">THÔNG TIN LIÊN LẠC</h2>
                        <input
                            type="text"
                            placeholder="Họ tên *"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Điện thoại *"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="email"
                            placeholder="Email *"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="border p-2 rounded w-full"
                        />

                    </div>

                    <div className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">HÀNH KHÁCH</h2>
                        {[
                            { label: "Người lớn (≥12 tuổi)", count: adultCount, setCount: setAdultCount },
                            { label: "Trẻ em (≥6 tuổi)", count: childCount, setCount: setChildCount },
                            { label: "Em bé", count: babyCount, setCount: setBabyCount }
                        ].map(({ label, count, setCount }, index) => (
                            <div key={index} className="flex justify-between border p-2 rounded mb-4">
                                <span>{label}</span>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleDecrease(setCount, count)} className="px-2 bg-gray-300 rounded">-</button>
                                    <span>{count}</span>
                                    <button onClick={() => handleIncrease(setCount, count)} className={`px-2 rounded ${totalPeople >= maxPeople ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300"}`} disabled={totalPeople >= maxPeople}>+</button>
                                </div>
                            </div>
                        ))}
                        {totalPeople >= maxPeople && <p className="text-red-500 text-sm mt-2">⚠️ Tổng số hành khách không được vượt quá {maxPeople} người.</p>}
                    </div>

                    <div className="border p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">PHƯƠNG THỨC THANH TOÁN</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {paymentOptions.map((option) => (
                                <div key={option.value} className={`border p-3 rounded-lg cursor-pointer transition duration-200 ${paymentMethod === option.value ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"}`} onClick={() => setPaymentMethod(option.value)}>
                                    <span className="text-lg">{option.label}</span>
                                </div>
                            ))}
                        </div>
                        {paymentMethod && <div className="mt-4 p-3 border border-blue-300 rounded-lg bg-blue-50"><h3 className="font-semibold">📌 Hướng dẫn thanh toán:</h3><p className="text-gray-700">{descriptions[paymentMethod]}</p></div>}
                    </div>
                </div>

                <div className="border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">TÓM TẮT CHUYẾN ĐI</h2>
                    <p className="font-semibold">👥 Tổng số khách: {totalPeople} / {maxPeople}</p>
                    <div className="mt-4 border-t pt-4 text-xl font-bold">Tổng tiền: {totalPrice.toLocaleString()} đ</div>
                    <button
                        onClick={() =>
                            navigate("/xac-nhan-thanh-toan", {
                                state: {
                                    customerName,
                                    customerPhone,
                                    customerEmail,
                                    adultCount,
                                    childCount,
                                    babyCount,
                                    singleRoom,
                                    totalPrice,
                                    paymentMethod,
                                },
                            })
                        }
                        className="w-full text-white px-4 py-2 rounded font-semibold shadow-md"
                        style={{ background: "linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)" }}
                    >
                        Thanh toán ngay
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4">Thanh toán thành công!</h1>
        <p className="text-gray-600 mt-2">Cảm ơn bạn đã mua hàng. Giao dịch của bạn đã được xử lý thành công.</p>
        <button 
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
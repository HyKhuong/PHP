import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import hình ảnh từ thư mục assets
import logo from '../../assets/image/dream-plane-logo-60a581b7-d1d5-4b64-97a8-6af52b192b1c.jpg';
import facebookLogo from '../../assets/image/facebook.png';
import googleLogo from '../../assets/image/gg.png';
import backgroundImage from '../../assets/image/bg1.jpg';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Xử lý nhập liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Kiểm tra dữ liệu
  const validate = () => {
    let newErrors = {};
    if (!formData.email.includes("@gmail.com")) newErrors.email = "Email không hợp lệ!";
    if (formData.password.length < 6) newErrors.password = "Mật khẩu ít nhất 6 ký tự!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý khi submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { data } = await axios.post("http://localhost:3000/api/users/signin", formData);

        if (!data.user) {
          //localStorage.setItem("user", JSON.stringify(data.user));

          setSuccess("Đăng nhập thành công!");
          console.log("Dữ liệu nhận được:", data.user);

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setErrors({ general: "Sai thông tin đăng nhập!" });
        }
      } catch (error) {
        console.error("Lỗi kết nối server", error);
        setErrors({
          general: error.response?.data?.error || "Lỗi máy chủ! Vui lòng thử lại.",
        });
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96 z-10">
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Nhập</h2>
        {success && <p className="text-green-600 text-center">{success}</p>}
        {errors.general && <p className="text-red-600 text-center">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="relative">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded mt-1"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border rounded mt-1"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Đăng Nhập
          </button>

          {/* Đăng nhập với Facebook */}
          <button
            type="button"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition mt-4 flex items-center justify-center"
          >
            <img src={facebookLogo} alt="Facebook Logo" className="w-6 h-6 mr-2" />
            Đăng nhập bằng Facebook
          </button>

          {/* Đăng nhập với Google */}
          <button
            type="button"
            className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 transition mt-4 flex items-center justify-center"
          >
            <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
            Đăng nhập bằng Gmail
          </button>
        </form>

        {/* Đăng ký tài khoản */}
        <p className="text-center text-sm mt-4">
          Chưa có tài khoản?
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Đăng ký ngay
          </Link>
        </p>

        {/* Quên mật khẩu */}
        <p className="text-center text-sm mt-4">
          Quên mật khẩu?
          <Link to="/forget_password" className="text-blue-500 hover:underline ml-1">
            Nhấn vào đây
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

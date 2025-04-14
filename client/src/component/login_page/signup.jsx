import { useState } from "react";
import logo from "../../assets/image/dream-plane-logo-60a581b7-d1d5-4b64-97a8-6af52b192b1c.jpg";
import facebookLogo from "../../assets/image/facebook.png";
import googleLogo from "../../assets/image/gg.png";
import backgroundImage from "../../assets/image/bg.jpg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isCheckingEmail, setIsCheckingEmail] = useState(false); // Loading state

  // Hàm xử lý nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    if(name == "email"){
      checkEmailExistence(value);
    }
  };

  // Hàm kiểm tra email tồn tại
  const checkEmailExistence = async (email) => {
    if (!email.includes("@gmail.com")) return; // Nếu chưa nhập email hợp lệ thì không kiểm tra

    setIsCheckingEmail(true); // Hiển thị trạng thái loading

    try {
      const response = await fetch("http://localhost:3000/api/users/checkemail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prevErrors) => ({ ...prevErrors, email: data.error }));
      }
    } catch (error) {
      console.error("Lỗi kết nối server:", error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Hàm kiểm tra dữ liệu trước khi submit
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Tên không được để trống!";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ!";
    if (formData.password.length < 6) newErrors.password = "Mật khẩu ít nhất 6 ký tự!";
    if (errors.email) newErrors.email = errors.email; // Nếu email đã tồn tại, không cho đăng ký

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await fetch("http://localhost:3000/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message);

          setTimeout(() => { 
            navigate("/signin"); 
          }, 1000); 
        } else { 
          setErrors({ general: data.error }); 
        }

      } catch (error) {
        console.error("Lỗi kết nối server!", error);
        setErrors({ general: "Lỗi kết nối server!" });
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
      <div className="bg-white p-6 rounded-lg shadow-md w-96 z-10" style={{ opacity: 1 }}>
        <div className="text-center mb-4">
          <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Đăng Ký</h2>

        {success && <p className="text-green-600 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="relative">
          <div className="mb-4">
            <label className="block text-gray-700">Họ và Tên</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded mt-1"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded mt-1"
              value={formData.email}
              onChange={handleChange}
            />
            {isCheckingEmail && <p className="text-gray-500 text-sm">Đang kiểm tra...</p>}
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
            Đăng Ký
          </button>

          <button
            type="button"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition mt-4 flex items-center justify-center"
          >
            <img src={facebookLogo} alt="Facebook Logo" className="w-6 h-6 mr-2" />
            Đăng ký bằng Facebook
          </button>

          <button
            type="button"
            className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 transition mt-4 flex items-center justify-center"
          >
            <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
            Đăng ký bằng Gmail
          </button>

          <p className="text-center text-sm mt-4">
            Đã có tài khoản?
            <Link to="/signin" className="text-blue-500 hover:underline ml-1">
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

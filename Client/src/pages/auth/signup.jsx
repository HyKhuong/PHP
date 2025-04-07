import { useState } from 'react';
import logo from '../../assets/image/logo.jpg';
import facebookLogo from '../../assets/image/facebook.png';
import googleLogo from '../../assets/image/gg.png';
import backgroundImage from '../../assets/image/bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        user_name: '',  // Changed from 'name' to match backend
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [isCheckingEmail, setIsCheckingEmail] = useState(false); // Loading state

    // Hàm xử lý nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });

        if (name === 'email') {
            checkEmailExistence(value);
        }
    };

    // Hàm kiểm tra email tồn tại
    const checkEmailExistence = async (email) => {
        if (!email || !email.includes('@')) return; // Basic email validation

        setIsCheckingEmail(true);
        try {
            const response = await axios.get(`http://localhost/PHP/server/public/api/check-email/${email}`);
            if (response.data.exists) {
                setErrors(prev => ({ ...prev, email: 'Email này đã được đăng ký' }));
            }
        } catch (error) {
            console.error('Lỗi kiểm tra email:', error);
        } finally {
            setIsCheckingEmail(false);
        }
    };

    // Hàm kiểm tra dữ liệu trước khi submit
    const validate = () => {
        let newErrors = {};
        if (!formData.user_name) newErrors.user_name = 'Tên không được để trống!';
        if (!formData.email) newErrors.email = 'Email không được để trống!';
        if (!formData.email.includes('@')) newErrors.email = 'Email không hợp lệ!';
        if (!formData.password) newErrors.password = 'Mật khẩu không được để trống!';
        if (formData.password.length < 6) newErrors.password = 'Mật khẩu ít nhất 6 ký tự!';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post(
                "http://localhost/PHP/server/public/api/register",
                formData
            );

            if (response.data.message) {
                setSuccess(response.data.message);
                setTimeout(() => navigate('/signin'), 2000);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors({ general: error.response.data.errors[0] });
            } else {
                setErrors({ general: "Lỗi kết nối server" });
            }
        }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-gray-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="z-10 w-96 rounded-lg bg-white p-6 shadow-md"
                style={{ opacity: 1 }}
            >
                <div className="mb-4 text-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto h-24 w-24"
                    />
                </div>

                <h2 className="mb-4 text-center text-2xl font-bold">Đăng Ký</h2>

                {success && <p className="text-center text-green-600">{success}</p>}

                <form
                    onSubmit={handleSubmit}
                    className="relative"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Họ và Tên</label>
                        <input
                            type="text"
                            name="user_name"  // Changed from 'name'
                            className="mt-1 w-full rounded border p-2"
                            value={formData.user_name}  // Changed from formData.name
                            onChange={handleChange}
                        />
                        {errors.user_name && <p className="text-sm text-red-500">{errors.user_name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded border p-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {isCheckingEmail && <p className="text-sm text-gray-500">Đang kiểm tra...</p>}
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 w-full rounded border p-2"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded py-2 font-semibold text-white shadow-md"
                        style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                    >
                        Đăng Ký
                    </button>

                    <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center rounded bg-blue-800 py-2 text-white transition hover:bg-blue-700"
                    >
                        <img
                            src={facebookLogo}
                            alt="Facebook Logo"
                            className="mr-2 h-6 w-6"
                        />
                        Đăng ký bằng Facebook
                    </button>

                    <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center rounded bg-red-700 py-2 text-white transition hover:bg-red-600"
                    >
                        <img
                            src={googleLogo}
                            alt="Google Logo"
                            className="mr-2 h-6 w-6"
                        />
                        Đăng ký bằng Gmail
                    </button>

                    <p className="mt-4 text-center text-sm">
                        Đã có tài khoản?
                        <Link
                            to="/signin"
                            className="ml-1 text-blue-500 hover:underline"
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;

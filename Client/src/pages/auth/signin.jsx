import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';

// Import hình ảnh từ thư mục assets
import logo from '../../assets/image/logo.jpg';
import facebookLogo from '../../assets/image/facebook.png';
import googleLogo from '../../assets/image/gg.png';
import backgroundImage from '../../assets/image/bg1.jpg';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { updateUser } = useUser();
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Xử lý nhập liệu
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // Kiểm tra dữ liệu
    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email không được để trống';
        if (!formData.password) newErrors.password = 'Mật khẩu không được để trống';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Xử lý khi submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            console.log('Sending login request with:', formData);
            const response = await axios.post(
                "http://localhost/PHP/server/public/api/login",
                formData
            );

            console.log('Login response:', response.data);

            if (response.data.user) {
                const userData = response.data.user;
                localStorage.setItem('user', JSON.stringify(userData));
                updateUser(userData);
                setSuccess('Đăng nhập thành công');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data);
            setErrors({
                general: error.response?.data?.errors?.[0] || "Lỗi kết nối server"
            });
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
            <div className="z-10 w-96 rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 text-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="mx-auto h-24 w-24"
                    />
                </div>

                <h2 className="mb-4 text-center text-2xl font-bold">Đăng Nhập</h2>
                {success && <p className="text-center text-green-600">{success}</p>}
                {errors.general && <p className="text-center text-red-600">{errors.general}</p>}

                <form
                    onSubmit={handleSubmit}
                    className="relative"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded border p-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
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
                        Đăng Nhập
                    </button>

                    {/* Đăng nhập với Facebook */}
                    <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center rounded bg-blue-800 py-2 text-white transition hover:bg-blue-700"
                    >
                        <img
                            src={facebookLogo}
                            alt="Facebook Logo"
                            className="mr-2 h-6 w-6"
                        />
                        Đăng nhập bằng Facebook
                    </button>

                    {/* Đăng nhập với Google */}
                    <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center rounded bg-red-700 py-2 text-white transition hover:bg-red-600"
                    >
                        <img
                            src={googleLogo}
                            alt="Google Logo"
                            className="mr-2 h-6 w-6"
                        />
                        Đăng nhập bằng Gmail
                    </button>
                </form>

                {/* Đăng ký tài khoản */}
                <p className="mt-4 text-center text-sm">
                    Chưa có tài khoản?
                    <Link
                        to="/signup"
                        className="ml-1 text-blue-500 hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </p>

                {/* Quên mật khẩu */}
                <p className="mt-4 text-center text-sm">
                    Quên mật khẩu?
                    <Link
                        to="/forget_password"
                        className="ml-1 text-blue-500 hover:underline"
                    >
                        Nhấn vào đây
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;

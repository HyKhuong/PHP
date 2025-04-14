import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra email hợp lệ
        if (!email.includes('@')) {
            setError('Email không hợp lệ!');
            setSuccess('');
            return;
        }

        // Nếu email hợp lệ, giả sử gửi yêu cầu về server
        setSuccess('Email đã được gửi đến bạn. Hãy kiểm tra hộp thư!');
        setError('');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-96 rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-center text-2xl font-bold">Quên Mật Khẩu</h2>

                {success && <p className="text-center text-green-600">{success}</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded border p-2"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded py-2 font-semibold text-white shadow-md"
                        style={{ background: 'linear-gradient(to right, rgb(137, 165, 199), #AFD7E6)' }}
                    >
                        Gửi
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

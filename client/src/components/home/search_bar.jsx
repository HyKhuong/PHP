import { useState } from 'react';
import TourList from "../TourList"; // new import

const SearchBar = () => {
    // Input search
    const [location, setLocation] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const [error, setError] = useState(''); // State for error message

    // Danh sách tours trả về từ API
    const [tours, setTours] = useState([]);

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6; // Số tour trên 1 trang

    // Hàm gọi API
    const handleSearch = async () => {
        // Validation: Ensure at least one field is filled
        if (!location && !endDate && maxPrice === 0) {
            setError('Please fill in at least one search field.');
            setTours([]); // Reset tours when all fields are cleared
            return;
        }

        setError(''); // Clear error message if validation passes

        try {
            let query = '?';
            if (location) query += `location=${encodeURIComponent(location)}&`;
            if (endDate) query += `endDate=${encodeURIComponent(endDate)}&`;
            if (maxPrice) query += `maxPrice=${encodeURIComponent(maxPrice)}&`;

            const res = await fetch(`http://localhost/server/public/search${query}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();

            // Lưu toàn bộ tours vào state
            setTours(data.data || []);

            // Reset về trang 1 mỗi khi tìm kiếm
            setCurrentPage(1);

        } catch (error) {
            console.error('Error when searching tours:', error);
            setError('An error occurred while fetching tours. Please try again.');
        }
    };

    // Tính tổng số trang
    const totalPages = Math.ceil(tours.length / pageSize);

    // Lấy danh sách tour cho trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedTours = tours.slice(startIndex, endIndex);

    // Xử lý chuyển trang
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex w-full flex-col items-center bg">
            {/* Overlay Text */}
            <h1 className="z-10 mb-10 rounded-lg px-6 py-3 text-8xl font-medium text-white">
                Let’s Book Your Own Trip
            </h1>
            {/* Search Bar Container */}

            <div className=" top-0 z-20 w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">

                    {/* Search your destination */}
                    <div className="flex-1">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Search your destination
                        </label>
                        <input
                            type="text"
                            placeholder="Dublin"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Select your date */}
                    <div className="flex-1">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Select your date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Max price (Slider) */}
                    <div className="flex-1">
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Max price:{' '}
                            <span className="font-semibold">
                                {Number(maxPrice).toLocaleString()} VND
                            </span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="100"
                            // Slider nhận giá trị số
                            value={maxPrice}
                            // Khi thay đổi, parse về số
                            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                            className="w-full cursor-pointer"
                        />
                    </div>

                    {/* Button */}
                    <button
                        className="from-custom-blue-start to-custom-blue-end ml-3 flex items-center rounded-lg bg-gradient-to-r px-5 py-2.5 text-base font-semibold text-white shadow-lg"
                        onClick={handleSearch}
                    >
                        🔍 Explore Now
                    </button>
                </div>
                {/* Error Message */}
                {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            </div>
            {/* Danh sách tours */}
            <div className="w-full max-w-5xl mt-6 bg-white">
                {displayedTours.length === 0 ? (
                    <p className="text-white"></p>
                ) : (
                    <TourList tours={displayedTours} />
                )}
            </div>
            {/* Nút chuyển trang */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-4 z-50">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="rounded-md bg-gray-300 px-3 py-1 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-white">
                        Page {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded-md bg-gray-300 px-3 py-1 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>

    );
};

export default SearchBar;

const SearchBar = () => {
    return (
        <div className="relative flex w-full flex-col items-center">
            {/* Overlay Text */}
            <h1 className="z-10 mb-10 rounded-lg px-6 py-3 text-4xl font-bold text-white">Let’s Book Your Own Trip</h1>

            {/* Search Bar Container */}
            <div className="w-full max-w-5xl">
                <div className="flex items-center rounded-lg bg-gray-200 p-4 shadow-sm">
                    {' '}
                    {/* Giảm p-6 thành p-4, giữ rounded-lg */}
                    {/* Location */}
                    <div className="flex flex-1 flex-col items-start px-4">
                        <span className="flex items-center gap-2 text-base font-medium text-gray-600">📍 Location</span>{' '}
                        {/* Giảm text-lg thành text-base */}
                        <input
                            type="text"
                            placeholder="Where do you want to go?"
                            className="h-12 w-full bg-transparent text-base text-gray-700 focus:outline-none"
                        />
                    </div>
                    {/* Date */}
                    <div className="flex flex-1 flex-col items-start px-4">
                        <span className="flex items-center gap-2 text-base font-medium text-gray-600">📅 Date</span>{' '}
                        {/* Giảm text-lg thành text-base */}
                        <input
                            type="date"
                            className="h-12 w-full bg-transparent text-base text-gray-700 focus:outline-none"
                        />
                    </div>
                    {/* Pricing */}
                    <div className="flex flex-1 flex-col items-start px-4">
                        <span className="flex items-center gap-2 text-base font-medium text-gray-600">💰 Pricing</span>{' '}
                        {/* Giảm text-lg thành text-base */}
                        <select className="h-12 w-full bg-transparent text-base text-gray-700 focus:outline-none">
                            {' '}
                            {/* Giảm h-16 thành h-12 */}
                            <option>Choose your budget</option>
                            <option>$ - Budget</option>
                            <option>$$ - Mid-range</option>
                            <option>$$$ - Luxury</option>
                        </select>
                    </div>
                    {/* Button */}
                    <button className="from-custom-blue-start to-custom-blue-end ml-3 flex items-center rounded-lg bg-gradient-to-r px-5 py-2.5 text-base font-semibold text-white shadow-lg">
                        🔍 Explore Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;

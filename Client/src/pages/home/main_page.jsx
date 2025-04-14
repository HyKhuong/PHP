import Logo2 from '../../assets/video/sky.mp4';
import SearchBar from '../../components/home/search_bar';
import Categories from '../../components/home/popular_categories';
import Location from '../../components/home/popular_location';
import AutoSlideImage from '../../components/home/image_slide';

const Home = () => {
    return (
        <div className="relative">
            {/* Background Image */}
            <video
                src={Logo2}
                className="h-auto w-full"
                autoPlay
                loop
                muted
                playsInline
            >
                Your browser does not support the video tag.
            </video>

            {/* Overlay Container */}
            <div className="absolute left-1/2 top-[20%] z-[1] flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 transform flex-col items-center space-y-6">
                {/* Search Bar */}
                <SearchBar />
            </div>

            <div className="mt-20">
                <Categories />
            </div>

            {/* Corrected Image Tag */}
            <div className="flex justify-center">
                <AutoSlideImage />
            </div>

            <div className="mt-20">
                <Location />
            </div>
        </div>
    );
};

export default Home;

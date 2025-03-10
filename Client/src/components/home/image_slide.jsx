import { useState, useEffect } from 'react';
import logo1 from '../../assets/image/1.jpg';
import logo2 from '../../assets/image/main.jpg';
import logo3 from '../../assets/image/2.jpg';
import logo4 from '../../assets/image/japan.jpg';
import logo5 from '../../assets/image/hawaii.jpg';

const AutoSlideImage = () => {
    const images = [logo1, logo2, logo3, logo4, logo5];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop around when the last image is reached
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [currentIndex]);

    return (
        <div className="relative mx-auto w-full max-w-4xl overflow-hidden p-4">
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${(currentIndex + 1) * 50}%)`, // Adjust the transform to slide two items at once
                }}
            >
                {/* Duplicate images at the end for circular loop */}
                {[...images, ...images].map((image, index) => (
                    <div
                        key={index}
                        className="w-1/2 flex-shrink-0 px-2"
                        style={{
                            marginRight: index !== images.length - 1 ? '1rem' : '0', // Add spacing between images
                        }}
                    >
                        <img
                            src={image}
                            alt={`Slider Image ${index + 1}`}
                            className="h-80 w-full rounded-lg object-cover shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AutoSlideImage;

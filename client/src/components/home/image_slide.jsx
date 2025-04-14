import { useState, useEffect } from "react";
import logo1 from "../../assets/image/1.jpg";
import logo2 from "../../assets/image/main.jpg";
import logo3 from "../../assets/image/2.jpg";
import logo4 from "../../assets/image/japan.jpg";
import logo5 from "../../assets/image/hawaii.jpg";

const images = [logo1, logo2, logo3, logo4, logo5];
const extendedImages = [...images, ...images]; // Duplicate images for smooth looping

const AutoSlideImage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionDuration = 1000; // 1-second transition

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === images.length) {
      setTimeout(() => {
        setIsTransitioning(false); // Disable transition for instant reset
        setCurrentIndex(0);
  
        // Re-enable transition AFTER resetting to prevent flicker
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50); 
      }, transitionDuration);
    }
  }, [currentIndex]);

  return (
    <div className="relative mx-auto w-full max-w-6xl overflow-hidden p-4">
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : "none",
        }}
      >
        {extendedImages.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 px-2">
            <img
              src={image}
              alt={`Slider Image ${index + 1}`}
              className="h-80 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex % images.length ? "bg-blue-500 scale-125" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AutoSlideImage;

"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const images = [
  'https://via.placeholder.com/600x400?text=Image+1',
  'https://via.placeholder.com/600x400?text=Image+2',
  'https://via.placeholder.com/600x400?text=Image+3',
  'https://via.placeholder.com/600x400?text=Image+4',
  'https://via.placeholder.com/600x400?text=Image+5',
  'https://via.placeholder.com/600x400?text=Image+6',
  'https://via.placeholder.com/600x400?text=Image+7',
  'https://via.placeholder.com/600x400?text=Image+8',
  'https://via.placeholder.com/600x400?text=Image+9',
  'https://via.placeholder.com/600x400?text=Image+10',
  'https://via.placeholder.com/600x400?text=Image+11',
  'https://via.placeholder.com/600x400?text=Image+12',
  'https://via.placeholder.com/600x400?text=Image+13',
  'https://via.placeholder.com/600x400?text=Image+14'
];

const itemsPerSlide = 6;

const SettingsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = (currentIndex - itemsPerSlide + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + itemsPerSlide) % images.length;
    setCurrentIndex(newIndex);
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex + itemsPerSlide >= images.length;


  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const displayedImages = images.slice(currentIndex, currentIndex + itemsPerSlide).concat(
    currentIndex + itemsPerSlide > images.length
      ? images.slice(0, (currentIndex + itemsPerSlide) % images.length)
      : []
  );


  const onClick = () => {
    signOut();
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto">
    <div className="overflow-hidden relative">
      <div className="flex transition-transform duration-500">
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-1/6 flex-shrink-0 border"
          />
        ))}
      </div>
    </div>
    <button
      onClick={handlePrev}
      disabled={isPrevDisabled}
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
    >
      &lt;
    </button>
    <button
      onClick={handleNext}
      disabled={isNextDisabled}
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
    >
      &gt;
    </button>
  </div>
);
};

export default SettingsPage;

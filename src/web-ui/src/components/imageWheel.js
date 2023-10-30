import React, { useState, useEffect } from 'react';

const ImageWheel = ({timerSec}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    require("../img/dog1.jpeg"),
    require("../img/cat.jpeg"),
    require("../img/dog2.jpeg"),
    require("../img/cat2.jpg")
  ];

  const switchImage = () => {
    setCurrentImage((prevImage) =>
      prevImage < images.length - 1 ? prevImage + 1 : 0
    );
  };

  useEffect(() => {
    const interval = setInterval(switchImage, 1000 * timerSec);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slideshow-container">
      <img
        src={images[currentImage]}
        alt="image"
        width="150"
        height="auto"
        display="block"
        margin-left="auto"
        margin-right="auto"
      />
    </div>
  );
};

export default ImageWheel;

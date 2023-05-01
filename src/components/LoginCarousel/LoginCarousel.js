import "./LoginCarousel.css";
import { useState } from "react";
import { useEffect } from "react";

const LoginCarousel = (props) => {
  const slideImages = [
    "./images/login-page/first-illustration.png",
    "./images/login-page/second-illustration.png",
    "./images/login-page/third-illustration.png",
  ];

  const slideDescriptions = [
    "Find top candidates quickly!",
    "Manage users efficiently",
    "Streamline application process",
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  function changeSlideIndex(index) {
    setSlideIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((slideIndex + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <div className="login-carousel">
      <div className="slides-container">
        <div className="slide">
          <img src={slideImages[slideIndex]} alt="illustration" />
          <p>{slideDescriptions[slideIndex]}</p>
        </div>
      </div>

      <div className="sliders-container">
        <button
          id={slideIndex === 0 ? "active-slider" : ""}
          onClick={() => changeSlideIndex(0)}
        ></button>
        <button
          id={slideIndex === 1 ? "active-slider" : ""}
          onClick={() => changeSlideIndex(1)}
        ></button>
        <button
          id={slideIndex === 2 ? "active-slider" : ""}
          onClick={() => changeSlideIndex(2)}
        ></button>
      </div>
    </div>
  );
};

export default LoginCarousel;

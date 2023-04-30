import Carousel from "react-bootstrap/Carousel";
import React, { useState } from "react";
import Slide1 from "../../Images/Interview-rafiki 1.svg";
import Slide2 from "../../Images/People search-rafiki 1.svg";
import Slide3 from "../../Images/Podcast-rafiki 1.svg";
import "./LoginSlider.css";

const data = [
  {
    image: Slide1,
    caption: "Find top candidates quickly",
    //description: ''
  },
  {
    image: Slide2,
    caption: "Manage users efficiently",
    //description: ''
  },
  {
    image: Slide3,
    caption: "Streamline application process",
    //description: ''
  },
];

function LoginSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slider-container">
      <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
        {data.map((slide, i) => {
          return (
            <Carousel.Item>
              <img
                className="slider-illustration w-100"
                src={slide.image}
                alt="slides"
              ></img>
              <Carousel.Caption>
                <h5>{slide.caption}</h5>
                {/* <p>{slide.description}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default LoginSlider;

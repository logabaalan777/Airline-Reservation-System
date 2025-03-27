import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";  
import "slick-carousel/slick/slick-theme.css";
import "../styles/ImageCarousel.css";
import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.png";

const ImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <Slider {...settings} className="carousel">
      <div><img src={slide1} alt="Flight 1" /></div>
      <div><img src={slide2} alt="Flight 2" /></div>
      <div><img src={slide3} alt="Flight 3" /></div>
      <div><img src={slide4} alt="Flight 4" /></div>
    </Slider>
  );
};

export default ImageCarousel;

import React from "react";
import ImageCarousel from "../Components/ImageCarousel";
import Services from "../Components/Services";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <ImageCarousel />
      <Services />
    </div>
  );
};

export default LandingPage;

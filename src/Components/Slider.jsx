import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Slider = ({SliderData}) => {
      const [current, setCurrent] = useState(0);
      const length = SliderData.length;
      const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
      const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
      };
      if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
      }

    return (
        <section className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        <a href = "https://trisquare.asia/en/" > 
        <h1 className="home__main__header">
          THE SOCIAL MARKETPLACE WHERE RESELLERS GROUP-BUY TO DISCOUNT WHOLESALE
          PRICES
        </h1>
          <button className="home__main__button">
            <Link to="/cartPage" className="home__main__link">
              Group Buy
            </Link>
          </button>
        {SliderData?.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img src={slide.img} alt="travel image" className="image" />
              )}
            </div>
          );
        })}</a>
      </section>
    )
}
export default Slider;

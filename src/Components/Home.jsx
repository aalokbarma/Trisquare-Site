import React from "react";
import "../css/Home.css";
import Products from "./Products";
import HowItWorks from "./HowItWorks";
import Request from "./Request";
import Slider from './Slider'
import { HomeSlides } from '../SliderData'

const Home = () => {

  return (
    <>
      <p id="timers">
        <span className="spans" id="timer-days"></span>
        <span className="spans" id="timer-hours"></span>
        <span className="spans" id="timer-mins"></span>
        <span className="spans" id="timer-secs"></span>
      </p>
      <Slider SliderData={HomeSlides} />
      <Products />
      <HowItWorks />
      <Request />
    </>
  );
};

export default Home;

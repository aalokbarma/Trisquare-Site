import React from "react";
import Navbar from "./Navbar";
import "../css/Header.css";
import Image from "../Images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <Link to = "/"><img className="header__logo" src={Image} alt="" /></Link>
      </div>
      <div className="header__right">
        <Navbar />
      </div>
    </div>
  );
};
export default Header;

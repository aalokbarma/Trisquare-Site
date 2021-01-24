import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <h1 className="footer__heading">SPEAK TO A MEMBER OF OUR TEAM</h1>
      <a href="https://trisquare.asia/en/contact-us"><button className="footer__button">Contact Us</button></a>
      <h4>or speak to us through live chat</h4>
      <div className="footer__socialIcons">
        <ul>
          <li>
            <a href="https://www.facebook.com/trisquareasia" target="_blank">
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/Trisquareasia" target="_blank">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/channel/UCoYQG5GCxaOXw9UijxiqACQ?guided_help_flow=5" target="_blank">
              <i className="fa fa-youtube" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/trisquareasia" target="_blank">
              <i className="fa fa-instagram" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__bottom">
        <a className="footer__link" href="#">
          CAMPAIGN PRICING
        </a>
        <a className="footer__link" href="#">
          T&CS
        </a>
        |
        <a className="footer__link" href="#">
          PRIVACY
        </a>
        |
        <a className="footer__link" href="#">
          FAQS
        </a>
        |
        <a className="footer__link" href="#">
          SITEMAP
        </a>
      </div>
    </div>
  );
}
export default Footer;

import React from 'react';
import '../css/Footer1.css';
import Icon from '../Images/logo.png';
import Payment from '../Images/payment.png';
import { FaHome } from "react-icons/fa"
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";



function Footer1() {
    return (
        <div className="footer1">
            {/* <div className="footer1__div"> */}
            <div className="footer1__mainSection">
                <div className="footer1__leftSection">
                    <a href="https://trisquare.asia/en/"><img className="footer1__logo" src={Icon} /></a>
                    <p className="footer1__logoPara">If you haven't found it yet, we will find it for you</p>
                </div>
                <div className="footer1__rightSection">
                    <h2 className="footer1__header">Contact Us</h2>
                    <div className="footer1__contactDiv">
                        <FaHome className="footer__contactIcon" />
                        <p className="footer1__contacts">Kenswood Court Hong Kong</p>
                    </div>
                    <div className="footer1__contactDiv">
                        <MdEmail className="footer__contactIcon" />
                        <p className="footer1__contacts">hgh@trisquare.asia</p>
                    </div>
                    <div className="footer1__contactDiv">
                        <FaPhoneAlt className="footer__contactIcon" />
                        <p className="footer1__contacts">+86 13817562813</p>
                    </div>
                    <div className="footer1__contactDiv">
                        <FaWhatsapp className="footer__contactIconW" />
                        <p className="footer1__contacts">+86 13817562813</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer1__footer">
                <div className="footer1__footerIcons">
                    <a href="https://www.facebook.com/trisquareasia" target="_blank">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href="https://twitter.com/Trisquareasia" target="_blank">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.instagram.com/trisquareasia" target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                    <a href="https://www.youtube.com/channel/UCoYQG5GCxaOXw9UijxiqACQ?guided_help_flow=5" target="_blank">
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                </div>
                <div><img className="footer1__footerRight payment" src={Payment} /></div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Footer1;

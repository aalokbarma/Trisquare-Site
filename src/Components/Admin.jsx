import React, { useState, useEffect } from 'react';
import '../css/Admin.css';
import Modal from "react-modal";
import { db, auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import Image from '../Images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import {GiSplitCross} from 'react-icons/gi';

const ProductDetails = ({ Pid, productUrl, businessName, productDesc, productName, email, mob, product }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const approval = () => {
        const data = {
            ...product,
            approval: true,
            time: new Date().getTime(),
        }
        db.collection('sellData').doc(`${Pid}`).set(data);
    }
    const decline = () => {
        db.collection("sellData").doc(`${Pid}`).delete()
    }
    console.log(product.approval)
    if (!product.approval || product.approval === "null") {
        return (
            <>
                <div className="admin__container">
                    <div className='admin__products'>
                        <img className="productImage" style={{ cursor: "pointer", border: "1px solid gray", padding: "3px", borderRadius: "5px" }} onClick={() => setModalIsOpen(true)} src={productUrl} alt="image" />
                        <div className="admin__productAbout">
                            <h4 className="admin__productName">{productName}</h4>
                            <p>{productDesc}</p>
                        </div>
                        <div className="admin__buttons admin__button">
                            <button className=" admin__accept admin__accepts" onClick={approval}>Accept</button>
                            <button className="admin__ignore admin__ignores" onClick={decline}>Ignore</button>
                        </div>
                        <Modal
                            className="orderModal"
                            isOpen={modalIsOpen}
                            shouldCloseOnOverlayClick={true}
                            shouldCloseOnEsc={true}
                            onRequestClose={() => setModalIsOpen(false)}
                        >
                            <div className="adminModal adminModal__header">
                                <h1 className="orderModal__heading">Product Details</h1>
                                <button
                                    className="orderModal__closeButton"
                                    onClick={() => setModalIsOpen(false)}
                                >
                                    X
                        </button>
                            </div>
                            <img className="orderModal__productImage" src={productUrl} alt="image" />
                            <h3 className="orderModal__title">{productName}</h3>
                            <p className="orderModal__productDescription para">{productDesc}</p>
                            <div className="buyerDetails">
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Asia Shipping Price :- </h5><span className="buyerDetails__span">${product.AsiaShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Europe Shipping Price :- </h5><span className="buyerDetails__span">${product.EuropeShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Africa Shipping Price :- </h5><span className="buyerDetails__span">${product.AfricaShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Australia Shipping Price :- </h5><span className="buyerDetails__span">${product.AustraliaShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">North America Shipping Price :-  </h5><span className="buyerDetails__span">$ {product.NorthAmericaShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">South America Shipping Price :- </h5><span className="buyerDetails__span">$ {product.SouthAmericaShippingPrice}</span></div>
                                <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Antarctica Shipping Price :- </h5><span className="buyerDetails__span">$ {product.AntarcticaShippingPrice}</span></div>

                            </div>
                            <div className="orderModal__sellerDescription">
                                <div className="orderModal__sellerName para">{product.country}</div>
                                <div className="orderModal__sellerName para">{businessName}</div>
                                <div className="orderModal__sellerEmail para">{email}</div>
                                <div className="orderModal__sellerMobile para" >{mob}</div>
                            </div>
                        </Modal>
                    </div>

                </div>
            </>
        )
    }
    return (
        <div></div>
    )
}

const Admin = ({ products }) => {
    const [admin, setAdmin] = useState(false)
    const history = useHistory();
    const [disp, setDisp] = useState("none");
    const handleToggle = () => {
        if (disp === "none") {
            setDisp("block")
        } else {
            setDisp("none")
        }
    }
    useEffect(async () => {
        await auth.onAuthStateChanged(user => {
            if (user) {
                user.email === "aalokbarma17@gmail.com" ? setAdmin(true) : setAdmin(false);
            } else {
                console.log("")
            }
        })
    })
    if (admin) {
        return (
            // New User
            // Pre-Orders
            // Purchases
            <div className="admin">
                <p id="timers">
                    <span className="spans" id="timer-days"></span>
                    <span className="spans" id="timer-hours"></span>
                    <span className="spans" id="timer-mins"></span>
                    <span className="spans" id="timer-secs"></span>
                </p>
                <div className="hamburgerIcon" onClick={handleToggle}>
                    {
                        disp === "none"  ? <GiHamburgerMenu className="hamIcon"  />: <GiSplitCross className="crossIcon"/>
                    }
                    
                </div>
                <div className="admin__navbar extraNavbar">
                    <Link to='/admin' className="admin__navbarOption active"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__navbar" style={{ display: `${disp}` }}>
                    <Link to='/admin' className="admin__navbarOption active"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__mainPage">
                    <h4 className="admin__heading">Pending Approvals</h4>
                    {products.map((product) =>
                    (
                        <ProductDetails key={product.id} Pid={product.id} productUrl={product.product.avatar} businessName={product.product.businessName} productDesc={product.product.productAbout} productName={product.product.productName} email={product.product.email} mob={product.product.mob} product={product.product} />)
                    )}
                </div>
            </div>
        )
    } else {
        return <div>Page Not Found</div>
    }
}
export default Admin;

import React, { useState, useEffect } from 'react';
import '../css/AdminPurchases.css';
import Modal from "react-modal";
import { db, auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import Image from '../Images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import {GiSplitCross} from 'react-icons/gi';

const ProductDetails = ({ Pid, productImage, productName, email, mob, product, userName }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const approval = () => {
    //     const data = {
    //         ...product,
    //         approval: true,
    //         time: new Date().getTime(),
    //     }
    //     db.collection('sellData').doc(`${Pid}`).set(data);
    // }
    const decline = () => {
        db.collection("orderHistory").doc(`${Pid}`).delete()
    }
    // console.log(product.approval)
    // if (!product.approval || product.approval === "null") {
    return (
        <div className="admin__container">
            <div className='admin__products'>
                <img className="productImage" style={{ cursor: "pointer", border: "1px solid gray", padding: "3px", borderRadius: "5px" }} onClick={() => setModalIsOpen(true)} src={productImage} alt="image" />
                <div className="admin__productAbout">
                    <h4 className="admin__productName purchases__heading">{productName}</h4>
                    <p className="orderModal__productDescription para">{`${email} purchased ${product.ProductQuantity} units of ${productName}`}</p>
                </div>
                <div className="admin__buttons">
                    <button className="admin__ignore purchases__button" onClick={decline}>REMOVE</button>
                </div>
                <Modal
                    className="orderModal purchase__modal"
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={() => setModalIsOpen(false)}
                >
                    <div className="adminModal purchase__header">
                        <h1 className="orderModal__heading">Product Details</h1>
                        <button
                            className="orderModal__closeButton"
                            onClick={() => setModalIsOpen(false)}
                        >
                            X
                        </button>
                    </div>
                    <img className="orderModal__productImage" src={productImage} alt="image" />
                    <h3 className="orderModal__title ">{productName}</h3>
                    <div className="buyerDetails">
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Order Quantity :- </h5><span className="buyerDetails__span">{product.ProductQuantity}</span></div>
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Total Amount Paid :- </h5><span className="buyerDetails__span">{product.BuyerPaid}</span></div>
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Shipping Price :- </h5><span className="buyerDetails__span">{product.ShippingPrice}</span></div>
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Address :-  </h5><span className="buyerDetails__span">{product.Address}</span></div>
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Pin Code :- </h5><span className="buyerDetails__span">{product.PIN}</span></div>
                        <div className="buyerDetails__rows"><h5 className="buyerDetalis__header">Country :- </h5><span className="buyerDetails__span">{product.Country}</span></div>
                    </div>
                    <div className="orderModal__sellerDescription">
                        <div className="orderModal__sellerEmail para">E-Mail :- {email}</div>
                        <div className="orderModal__sellerMobile para" >Mob:- {mob}</div>
                    </div>
                </Modal>
            </div>
        </div>)
    // }
    // return (
    //     <div></div>
    // )
}

const AdminPurchases = ({ products }) => {
    const [admin, setAdmin] = useState(false)
    const [orderHistory, setOrderHistory] = useState();
    const history = useHistory();
    const [disp, setDisp] = useState("none");
    useEffect(async () => {
        await auth.onAuthStateChanged(user => {
            if (user) {
                user.email === "aalokbarma17@gmail.com" ? setAdmin(true) : setAdmin(false);
            } else {
                console.log("")
                // history.push('/')
            }
        })
    })
    const handleToggle = () => {
        if (disp === "none") {
            setDisp("block")
        } else {
            setDisp("none")
        }
    }
    useEffect(() => {
        db.collection("orderHistory").onSnapshot(snapshot => {
            setOrderHistory(snapshot.docs.map(doc => ({ id: doc.id, orderhistory: doc.data() })))
        })
    }, [])
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
                    <Link to='/admin' className="admin__navbarOption"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption "><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption active"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__navbar" style={{ display: `${disp}`, transition: "0.3s" }}>
                    <Link to='/admin' className="admin__navbarOption"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption active"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__mainPage">
                    <h4 className="admin__heading">Items  Ordered</h4>
                    {orderHistory && orderHistory.map((purchase) =>
                    (
                        <ProductDetails key={purchase.id} Pid={purchase.id} productImage={purchase.orderhistory.ProductImage} productName={purchase.orderhistory.ProductName} email={purchase.orderhistory.Email} mob={purchase.orderhistory.Contact} product={purchase.orderhistory} userName={purchase.orderhistory.Name} />)
                    )}
                </div>
            </div>
        )
    } else {
        return <div>Page Not Found</div>
    }
}
export default AdminPurchases;

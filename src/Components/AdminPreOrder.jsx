import React, { useState, useEffect } from 'react';
import '../css/AdminPreOrder.css';
import Modal from "react-modal";
import { db, auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import Image from '../Images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import {GiSplitCross} from 'react-icons/gi';

const ProductDetails = ({ Pid, productUrl, productName, email, mob, preOrder }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currPrice, setCurrPrice] = useState(0);
    const [productData, setProductData] = useState();


    // const approval = () => {
    //     const data = {
    //         ...product,
    //         approval: true,
    //         time: new Date().getTime(),
    //     }
    //     db.collection('sellData').doc(`${Pid}`).set(data);
    // }
    useEffect(() => {
        db.collection('preOrders').doc(Pid).onSnapshot(snapshot => {
            const ProductId = snapshot.data().ProductId
            db.collection('sellData').doc(ProductId).onSnapshot(snapshot => {
                setCurrPrice(snapshot.data().currentPrice)
            })
        })
    }, [])
    const decline = () => {
        db.collection("preOrders").doc(`${Pid}`).delete()
    }
    console.log(currPrice)
    // console.log(currPrice)
    // console.log(product.approval)
    // if (!product.approval || product.approval === "null") {
    return (
        <div className="admin__container">
            <div className={currPrice <= preOrder.TargetPrice ? "admin__products1" : "admin__products"}>
                <img className="productImage" style={{ cursor: "pointer", border: "1px solid gray", padding: "3px", borderRadius: "5px" }} onClick={() => setModalIsOpen(true)} src={productUrl} alt="image" />
                <div className="admin__productAbout">
                    <p>{`${preOrder.FirstName} requested  ${preOrder.ProductQuantity} units of ${productName}  at target price $${preOrder.TargetPrice}`}</p>
                </div>
                <div className="admin__buttons">
                    {/* <button className="admin__accept" onClick={approval}>Accept</button> */}
                    <button className="admin__ignore preorder__button" onClick={decline}>REMOVE</button>
                </div>
                <Modal
                    className="orderModal"
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    onRequestClose={() => setModalIsOpen(false)}
                >
                    <div className="adminModal">
                        <h1 className="orderModal__heading">Pre-Order Details</h1>
                        <button
                            className="orderModal__closeButton"
                            onClick={() => setModalIsOpen(false)}
                        >
                            X
                    </button>
                    </div>
                    <img className="orderModal__productImage" src={productUrl} alt="ProductImage" />
                    <h3 className="orderModal__title">{productName}</h3>
                    {/* <p className="orderModal__productDescription para">{productDesc}</p> */}
                    <p className="orderModal__productDescription para">{`${preOrder.FirstName} requested  ${preOrder.ProductQuantity} units of  ${productName}  at target price $${preOrder.TargetPrice}`}</p>
                    <div className="orderModal__sellerDescription">
                        <div className="orderModal__sellerName para">{preOrder.FirstName}</div>
                        <div className="orderModal__sellerEmail para">{email}</div>
                        <div className="orderModal__sellerMobile para" >{mob}</div>
                    </div>
                </Modal>
            </div>
        </div>)
    // }
    // return (
    //     <div></div>
    // )
}



const AdminPreOrder = ({ product }) => {
    const [admin, setAdmin] = useState(false);
    const [preOrders, setPreOrders] = useState();
    const history = useHistory();
    const [disp, setDisp] = useState("none");
    console.log(product)
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                user.email === "aalokbarma17@gmail.com" ? setAdmin(true) : setAdmin(false);
            } else {
                console.log("")
                // history.push('/')
            }
        })
    }, [])
    const handleToggle = () => {
        if (disp === "none") {
            setDisp("block")
        } else {
            setDisp("none")
        }
    }
    useEffect(() => {
        db.collection("preOrders").onSnapshot(snapshot => {
            setPreOrders(snapshot.docs.map(doc => ({ id: doc.id, preOrder: doc.data() })))
        })
    }, [])
    console.log(preOrders)


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
                    <Link to='/admin/preorders' className="admin__navbarOption active"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__navbar" style={{ display: `${disp}`, transition: "0.3s" }}>
                    <Link to='/admin' className="admin__navbarOption"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption active"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                {/* <div className="hamburgerIcon">
                    <GiHamburgerMenu className="hamIcon" onClick={handleToggle} />
                </div>
                <nav>
                    <ul className="admin__navbar" style={{ display: `${disp}` , transition: "0.3s" }}>
                        <li><Link to='/admin' className="admin__navbarOption"><h4>Home</h4></Link></li>
                        <li><Link to='/admin/preorders' className="admin__navbarOption active"><h4>Pre-Orders</h4></Link></li>
                        <li><Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link></li>
                        <li><Link to='/admin/requests' className="admin__navbarOption"><h4>Product Requests</h4></Link></li>
                        <li><img src={Image} className="admin__image" /></li>
                    </ul>
                </nav> */}
                <div className="admin__mainPage">
                    <h4 className="admin__heading">Pre-Orders</h4>
                    {preOrders && preOrders.map((preOrder) =>
                    (
                        <ProductDetails key={preOrder.id} Pid={preOrder.id} productUrl={preOrder.preOrder.ProductImage} productName={preOrder.preOrder.ProductName} email={preOrder.preOrder.UserEmail} mob={preOrder.preOrder.Mobile} preOrder={preOrder.preOrder} />)
                    )
                    }
                </div>
            </div>
        )
    } else {
        return <div>Page Not Found</div>
    }
}
export default AdminPreOrder;

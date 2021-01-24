import React, { useState, useEffect } from 'react';
import '../css/AdminRequests.css';
import Modal from "react-modal";
import { db, auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import Image from '../Images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import {GiSplitCross} from 'react-icons/gi';

const ProductDetails = ({ Pid, email, request }) => {
    const decline = () => {
        db.collection("requests").doc(`${Pid}`).delete()
    }
    // console.log(product.approval)
    // if (!product.approval || product.approval === "null") {
    return (
        <div className="admin__container">
            <div className='admin__products'>
                <div className="admin__productAbout">
                    <h4 className="admin__productName request__para">{`The Customer ${email} is requested for a product :- ${request}`}</h4>
                </div>
                <div className="admin__buttons">
                    <button className="admin__ignore requestPage__button" onClick={decline}>Ignore</button>
                </div>
            </div>
        </div>)
    // }
    // return (
    //     <div></div>
    // )
}

const AdminRequests = ({ products }) => {
    const [admin, setAdmin] = useState(false)
    const [request, setRequest] = useState()
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
        db.collection("requests").onSnapshot(snapshot => {
            setRequest(snapshot.docs.map(doc => ({ id: doc.id, requests: doc.data() })))
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
                    <Link to='/admin/preorders' className="admin__navbarOption"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption active"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__navbar" style={{ display: `${disp}`, transition: "0.3s" }}>
                    <Link to='/admin' className="admin__navbarOption"><h4>Home</h4></Link>
                    <Link to='/admin/preorders' className="admin__navbarOption"><h4>Pre-Orders</h4></Link>
                    <Link to='/admin/purchases' className="admin__navbarOption"><h4>Purchases</h4></Link>
                    <Link to='/admin/requests' className="admin__navbarOption active"><h4>Product Requests</h4></Link>
                    <img src={Image} className="admin__image" />
                </div>
                <div className="admin__mainPage">
                    <h4 className="admin__heading">Requested Products</h4>
                    {request && request.map((request) =>
                    (
                        <ProductDetails key={request.id} Pid={request.id} email={request.requests.email} request={request.requests.userRequest} />)
                    )}
                </div>
            </div>
        )
    } else {
        return <div>Page Not Found</div>
    }
}
export default AdminRequests;

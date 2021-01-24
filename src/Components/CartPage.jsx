import React, { useEffect, useState } from 'react';
import '../css/CartPage.css';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, connect } from 'react-redux';
import reducer from '../reducer';
import { db, auth } from '../firebase';
import Card from './Card';
import { Redirect } from 'react-router-dom';
import Modal from "react-modal";
import { Link } from "react-router-dom";

function CartPage({ userIn, userOut, price }) {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch(reducer)
    const [searchVal, setSearchVal] = useState("")
    const [products, setProducts] = useState([]);
    const [pending, setPending] = useState(true);
    const [proProduct, setProProduct] = useState([])
    const [filter, setFilter] = useState("")
    const [emailVerified, setEmailVerified] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const searchItem = (e) => {
        setSearchVal(e.target.value)
        dispatch({
            type: "search",
            searchValue: searchVal,
        })
    }
    useEffect(() => {
        const getData = () => db.collection('sellData').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, product: doc.data() })))
            setProProduct(snapshot.docs.map(doc => ({ id: doc.id, product: doc.data() })))
        })
        getData()
    }, [])

    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            dispatch({
                type: "setUser",
                userIn: true,
                userOut: false,
            });
            setEmailVerified(user.emailVerified)
            console.log(user.emailVerified)
        } else {
            dispatch({
                type: "setUser",
                userOut: true,
                userIn: false,
            })
        }
        setPending(false)
    });
    const filterSelect = (e) => {
        console.log(e.target.value)
        setFilter(e.target.value)
        var val = e.target.value
        setProducts(sortData(products, val))
        console.log(products)
    }
    const sortData = (data, val) => {
        if (data) {
            const sortedData = [...data];
            return sortedData.sort(function (a, b) {
                if (val === "") {
                    console.log("filter na ba ")
                    console.log(proProduct)
                    return a.product.time > b.product.time ? -1 : 1;
                } else if (val === "price__asc") {
                    console.log("filter ==== asce")
                    console.log(a.product.price1)
                    console.log(b.product.price1)
                    return a.product.price1 > b.product.price1 ? 1 : -1;
                } else if (val === "price__des") {
                    console.log("filter ==== desc")
                    return a.product.price1 > b.product.price1 ? -1 : 1;
                } else if (val === "solds") {
                    console.log("filter ==== solds")
                    return a.product.soldProducts > b.product.soldProducts ? -1 : 1;
                } else if (val === "duration") {
                    console.log("filter ==== duration")
                    return a.product.orderDeadline > b.product.orderDeadline ? 1 : -1;
                }
            })
        } else {
            console.log("data na bate")
        }
    };
    const verify = () => {
        const user = auth.currentUser;
        console.log(user)

        user.sendEmailVerification().then(function (data) {
            // Email sent.
            console.log(data)
            alert("Email sent")
        }).catch(function (error) {
            alert(error.message)
        });
    }
    const searchFunction = (e) => {
        setSearchTerm(e.target.value)
        const search = e.target.value
        console.log(search)
        setProducts(products.filter((product) => {
            if (search == "") {
                console.log("run hole baa")
                return product
            } else if (
                product.product.productName.toLowerCase()
                    .includes(search.toLowerCase())) {
                return product
            }
        }))
    }


    console.log(userIn)

    if (pending) return <div>Loading...</div>
    if (!pending) {
        if (userOut) return <Redirect to="/login" />
        if (userIn) {
            if (emailVerified) {
                return (
                    <div className="cartPage">
                        <p id="timers">
                            <span className="spans" id="timer-days"></span>
                            <span className="spans" id="timer-hours"></span>
                            <span className="spans" id="timer-mins"></span>
                            <span className="spans" id="timer-secs"></span>
                        </p>
                        <div className="cartPage__searchBar">
                            <div className="lockIcons">
                                {userIn ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                            </div>
                            <div className="cartPage__searchFilterContainer">
                                <div className="cartPage__filterrs">
                                    <select className="cartPage__filters" name="filter" onChange={filterSelect}>
                                        <option className="cartPage__filter" value="">Sort</option>
                                        <option className="cartPage__filter" value="price__asc">Prices Low to High</option>
                                        <option className="cartPage__filter" value="price__des">Price High to Low</option>
                                        <option className="cartPage__filter" value="duration">Ending Soon</option>
                                        <option className="cartPage__filter" value="solds">Most Units Sold</option>
                                    </select>
                                </div>
                                <form className="cartPage__searchMain">
                                    <input className="cartPage__searchInput" type="text" placeholder="Search Your product here" onChange={(e) => setSearchTerm(e.target.value)} onSubmit={searchFunction} />
                                </form>
                            </div>
                        </div>
                        <div className="cartPage__container">
                            <div className="cartPage__main">
                                <div className="productCard">
                                    {
                                        products.filter((product) => {
                                            if (searchTerm == "") {
                                                return product
                                            } else if (
                                                product.product.productName.toLowerCase()
                                                    .includes(searchTerm.toLowerCase())) {
                                                return product
                                            }
                                        }).map((product) => product.product.approval === true ? (
                                            <Card
                                                key={product.id}
                                                className="productCard__product"
                                                src={product.product.avatar}
                                                title={product.product.productName}
                                                product={product.product}
                                                Pid={product.id}
                                                quantity={product.product.units4}
                                                sold={product.product.soldProducts}
                                            />
                                        ) : (""))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Modal
                            className="orderModal cartPage__modal"
                            isOpen={modalIsOpen}
                            shouldCloseOnOverlayClick={false}
                            shouldCloseOnEsc={true}
                            onRequestClose={() => setModalIsOpen(false)}
                        >
                            <h2 className="orderModal__heading cartPage__modalHeader orderModal__heading1"  >Your E-Mail is not verified</h2>
                            <p className="orderModal__heading orderModal__heading1" >Please Verify Your Email.</p>
                            <div className="cartPage__modalButtons">
                                <div>
                                    <button className="cartPage__modalButton modalButton1" onClick={verify} >Verify E-Mail</button>

                                </div>
                                <div>
                                    <Link to="/" className="cartPage__modalButton modalButton2" onClick={() => window.location.reload()}>Close</Link>

                                </div>
                            </div>
                        </Modal></div>
                )
            }

        }
    }
}
const mapStateToProps = (state) => {
    return {
        userIn: state.userIn,
        userOut: state.userOut,
        loading: state.pending,
    }
}
export default connect(mapStateToProps)(CartPage);
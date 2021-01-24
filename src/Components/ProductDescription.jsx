import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "../css/ProductDescription.css";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from "react-modal";
import Countries from "./Countries"
import Paypal from "./Paypal";
import { db, auth } from '../firebase'
import { connect, useDispatch } from 'react-redux'
import reducer from '../reducer'

function ProductDescription({ product, pId, solds, quantities, countryName }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalWillOpen, setModalWillOpen] = useState(false);
  const [checkout, setCheckout] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [price, setPrice] = useState(product.price1);
  const [cPrice, setCPrice] = useState(price);
  const [address, setAddress] = useState("");
  const [widths, setWidths] = useState(0);
  const [country, setCountry] = useState("USA")
  const [continents, setContinents] = useState("")
  const [newCurr, setNewCurr] = useState("")
  const [targetPriceModal, setTargetPriceModal] = useState(false)
  const [targetPrice, setTargetPrice] = useState(product.price1)
  const [targetTotalCost, setTargetTotalCost] = useState(0)
  const [pin, setPin] = useState("")
  const [contact, setContact] = useState("")
  const [shippingPrice, setShippingPrice] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userFName, setUserFName] = useState("");
  const [userMob, setUserMob] = useState("");
  const [currency, setCurrency] = useState()

  const dispatch = useDispatch(reducer)
  const surCharge = 12


  useEffect(() => {
    const setprice = () => {
      const sold = solds - (-quantity);
      console.log(sold)
      if (sold >= 0 && sold < product.units2) {
        console.log("first")
        setCPrice(product.price1)
      }
      else if (sold >= product.units2 && sold < product.units3) {
        console.log("second")
        setCPrice(product.price2)
      }
      else if (sold >= product.units3 && sold < product.units4) {
        console.log("third")
        setCPrice(product.price3)
      } else {
        console.log("fourth")
        setCPrice(product.price4)
      }
    }
    setprice()
    const subTotal = () => {
      const total = quantity * cPrice;
      setTotalCost(total)
    }
    subTotal()
    // dispatch({
    //   type: "current price",
    //   currPrice: cPrice,
    // })
  }, [quantity, cPrice])


  useEffect(() => {
    const targetTotal = () => {
      const total = quantity * targetPrice;
      setTargetTotalCost(total)
    }
    targetTotal()
  }, [quantity, targetPrice])

  var endDate = new Date(product.orderDeadline).getTime();
  var timer = setInterval(function () {
    let now = new Date().getTime();
    let t = endDate - now;

    if (t >= 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      let secs = Math.floor((t % (1000 * 60)) / 1000);

      document.getElementById("timer-days").innerHTML = days +
        "<span class='labeling'>DAYs</span>";
      document.getElementById("timer-hours").innerHTML = ("0" + hours).slice(-2) +
        "<span class='labeling'>HRs</span>";
      document.getElementById("timer-mins").innerHTML = ("0" + mins).slice(-2) +
        "<span class='labeling'>MINs</span>";
      document.getElementById("timer-secs").innerHTML = ("0" + secs).slice(-2) +
        "<span class='labeling'>SECs</span>";
    } else {
      document.getElementById("timer").innerHTML = "The countdown is over!";
    }
  }, 1000);
  const unit1 = product.units1 - 0;
  const unit2 = product.units2 - product.units1;
  const unit3 = product.units3 - product.units2;
  const unit4 = product.units4 - product.units3;
  var sold1 = solds - 0;
  var sold2 = solds - product.units1;
  var sold3 = solds - product.units2;
  var sold4 = solds - product.units3;
  var wide1 = sold1 / unit1;
  var wide2 = sold2 / unit2;
  var wide3 = sold3 / unit3;
  var wide4 = sold4 / unit4;
  var wides1 = wide1 * 7;
  var wides2 = wide2 * 29;
  var wides3 = wide3 * 29;
  var wides4 = wide4 * 29;
  useEffect(() => {
    const setwidth = () => {
      if (solds >= 0 && solds <= product.units1) {
        setWidths(wides1)
      }
      else if (solds > product.units1 && solds <= product.units2) {
        setWidths(7 + wides2)
      }
      else if (solds > product.units2 && solds <= product.units3) {
        setWidths(36 + wides3)
      }
      else if (solds > product.units3 && solds <= product.units4) {
        setWidths(65 + wides4)
      }
      else {
        setWidths(100)
      }
    }
    setwidth()
  }, [])
  console.log(countryName)
  const calculate = (e) => {
    const curr = e.target.value
    if (grandTotal === isNaN) {
      return
    } else {
      if (currency == "") {
        return
      } else {
        fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
          .then(res => res.json())
          .then(data => {
            const result = (data.rates[curr] * grandTotal).toFixed(2);
            setNewCurr(result)
          });
      }
    }
  }

  useEffect(() => {

    const shippingCost = () => {
      console.log("shipping Price")
      if (continents == "Asia") {
        totalCost > 25 ? setGrandTotal(totalCost + product.AsiaShippingPrice + surCharge) : setGrandTotal(totalCost + product.AsiaShippingPrice)
        return setShippingPrice(product.AsiaShippingPrice)
      }
      else if (continents == "Europe") {
        totalCost < 25 ? setGrandTotal(totalCost + product.EuropeShippingPrice + surCharge) : setGrandTotal(totalCost + product.EuropeShippingPrice)
        return setShippingPrice(product.EuropeShippingPrice)
      }
      else if (continents == "South America") {
        totalCost < 25 ? setGrandTotal(totalCost + product.SouthAmericaShippingPrice + surCharge) : setGrandTotal(totalCost + product.SouthAmericaShippingPrice)
        return setShippingPrice(product.SouthAmericaShippingPrice)
      }
      else if (continents == "Antarctica") {
        totalCost < 25 ? setGrandTotal(totalCost + product.AntarcticaShippingPrice + surCharge) : setGrandTotal(totalCost + product.AntarcticaShippingPrice)
        return setShippingPrice(product.AntarcticaShippingPrice)
      }
      else if (continents == "North America") {
        totalCost < 25 ? setGrandTotal(totalCost + product.NorthAmericaShippingPrice + surCharge) : setGrandTotal(totalCost + product.NorthAmericaShippingPrice)
        return setShippingPrice(product.NorthAmericaShippingPrice)
      }
      else if (continents == "Africa") {
        totalCost < 25 ? setGrandTotal(totalCost + product.AfricaShippingPrice + surCharge) : setGrandTotal(totalCost + product.AfricaShippingPrice)
        return setShippingPrice(product.AfricaShippingPrice)
      }
      else if (continents == "Australia") {
        totalCost < 25 ? setGrandTotal(totalCost + product.AustraliaShippingPrice + surCharge) : setGrandTotal(totalCost + product.AustraliaShippingPrice)
        return setShippingPrice(product.AustraliaShippingPrice)
      }
      else {
        setGrandTotal(0)
        return setShippingPrice(0)
      }
    }
    shippingCost()
  }, [continents])

  useEffect(async () => {
    await auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("data").onSnapshot(snapshot => {
          snapshot.docs.map(doc => {
            if (doc.data().email === user.email) {
              setUserEmail(doc.data().email)
              setUserMob(doc.data().mob)
              setUserFName(doc.data().fname)
            }
          })
        })
      } else {
        console.log("")
      }
    })
  }, [])

  // const preOrders = () => {
  //   db.collection("preOrders").add({
  //     ProductName: product.productName,
  //     ProductImage: product.avatar,
  //     ProductQuantity: quantity,
  //     TargetPrice: targetPrice,
  //     UserEmail: userEmail,
  //     FirstName: userFName,
  //     Mobile: userMob,
  //     ProductId: pId,
  //   })
  //     .then(() => alert("To confirm you are a serious buyer of this product, you will now be invited to pay a fully refundable deposit of $25USD. You will be notified when you're target price and preferred quantity has been reached."))
  //     .then(() => {
  //       setQuantity(0);
  //       setTargetPrice(product.price1)
  //     })
  //     .catch(err => alert(err.meassage))
  // }

  const savedPrice = product.price1 - cPrice;
  const savings = quantity * savedPrice;

  const savePrice = cPrice - targetPrice;
  const saving = quantity * savePrice;
  console.log(product)


  return (
    <div className="productDescription">
      <h1 className="productDescription__heading">{product.productName}</h1>
      <h2 className="productDescription__price">
        <span className="productDescription__mainPrice">${cPrice}</span>
        <span className="productDescription__cutPrice">${product.price1}</span>
      </h2>
      <p className="productDescription__description">
        {product.productAbout}
      </p>
      <div className="productDescription__buttons">
        <a className="description" href={`${product.productUrl}`}  ><Button className="productDescription__button retailerWebsite">
          Visit Product Website
        </Button></a>
        <div className="modal">
          <Button
            className="productDescription__button buyNow"
            onClick={() => setModalIsOpen(true)}
          >
            Buy Now At Current Price
          </Button>
          <Button
            className="productDescription__button buyNow"
            onClick={() => setTargetPriceModal(true)}
          >
            Buy At Your Target Price
          </Button>
          <Modal
            className="orderModal"
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <div className="orderModal__header">
              <h1 className="orderModal__heading">Order Summary</h1>
              <button
                className="orderModal__closeButton"
                onClick={() => setModalIsOpen(false)}
              >
                X
                </button>
            </div>
            <h3 className="orderModal__title">{product.productName}</h3>
            <div className="orderModal__details">
              <div className="orderModal__row">
                <label className="orderModal__label">My Order Quantity</label>
                <input className="orderModal__input" type="number" placeholder="0" value={quantity} onChange={(e) => {
                  setQuantity(e.target.value)
                  // subTotal(e)
                }} />
              </div>
              <div className="orderModal__row">
                <label className="orderModal__label">
                  Current Cost Per Unit
                  </label>
                <input className="orderModal__input active" placeholder={`$ ${price}`} value={(e) => e.target.placeholder} />
              </div>
              <div className="orderModal__row">
                <label className="orderModal__label">
                  Cost Per Unit When My Order is Placed
                  </label>
                <input className="orderModal__input active" placeholder={`$ ${cPrice}`} value={(e) => e.target.placeholder} />
              </div>
              <div className="orderModal__row">
                <label className="orderModal__label">
                  Your Saving
                  </label>
                <input className="orderModal__input active" placeholder={`${savings == "NaN" ? 0 : savings.toFixed(2)}`} disabled={true} />
              </div>

              <div className="orderModal__row">
                <label className="orderModal__label">Total</label>
                <input className="orderModal__input active" value={`$ ${totalCost == 0 ? 0 : totalCost.toFixed(2)}`} />
              </div>
            </div>

            {/* {
              checkout ?
                <Paypal money={totalCost} pId={product.proId} product={product} /> : (( */}
            <Button className="orderModal__checkout" onClick={() => {
              setModalWillOpen(true)
              setModalIsOpen(false)
            }} >
              CHECKOUT
                  </Button>

            {/* } */}

          </Modal>
          <Modal
            className="orderModal shippingModal"
            isOpen={modalWillOpen}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={() => setModalWillOpen(false)}
          >
            <div className="orderModal__header shippingModal__header">
              <h1 className="orderModal__heading">Shipping Address</h1>
              <button
                className="orderModal__closeButton"
                onClick={() => setModalWillOpen(false)}
              >
                X
                </button>
            </div>
            <h3 className="orderModal__title">{product.productName}</h3>

            <div className="continentDiv ">
              <label className="orderModal__label labelDivs1">
                Continents
              </label>
              <select id="continent"
                name="continent"
                className="inputs labelDivs2"
                value={continents}
                onChange={e => {
                  setContinents(e.target.value)
                  // calculateGrandTotal()
                  // calculate(e)
                }}>
                {/* <option value="">currency</option> */}
                <option value="">Continent</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Australia">Australia</option>
                <option value="Antarctica">Antarctica</option>
              </select>
            </div>

            <div className="countryDiv ">
              <label className="orderModal__label labelDivs1">
                Country
              </label>
              <Countries name="country" className="labelDivs2" />
            </div>
            <div className="divRow">
              <div className="divColumn1">
                <label className="orderModal__label mainLabels">
                  Postal Code
                </label>
                <input className="orderModal__input" value={pin} onChange={e => setPin(e.target.value)} />
              </div>
              <div className="divColumn2">
                <label className="orderModal__label mainLabels">
                  Contact no.
                </label>
                <input className="orderModal__input orderModal__inputs" placeholder="Contact No. with Country Code" value={contact} onChange={e => setContact(e.target.value)} />
              </div>
            </div>

            <label className="orderModal__label mainLabels">
              Shipping Address
            </label>
            <textarea className="orderModal__textarea" rows="4" cols="40" placeholder="Type Your Full Address Here..." value={address} onChange={e => setAddress(e.target.value)} />

            <div className="divRow">
              <div className="divColumn1">
                <label className="orderModal__label mainLabels">
                  Shipping Charge
                </label>
                <input className="orderModal__input" disabled={true} placeholder="Shipping Charge" value={shippingPrice} />
              </div>
              <div className="divColumn2">
                <label className="orderModal__label mainLabels">
                  Surcharge (order below $25)
                </label>
                <input className="orderModal__input" disabled={true} placeholder="" value={totalCost >= 25 ? 0 : 12} />
              </div>
            </div>

            <label className="orderModal__label">
              Grand Total
            </label>
            <input className="orderModal__input" disabled={true} placeholder="0" value={grandTotal} />
            <div className="currencyConverter">
              <select id="currency"
                name="currency"
                className="inputs"
                value={currency}
                onChange={e => {
                  setCurrency(e.target.value)
                  calculate(e)
                }}>
                <option value="">currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CNY">CNY</option>
                <option value="GBP">GBP</option>
              </select>
              <input type="number" className="orderModal__input" value={`${newCurr}`} disabled={true} />
            </div>
            {
              checkout ?
                (<Paypal className="paypalButton" money={totalCost} pId={pId} product={product} address={address} PIN={pin} contact={contact} continent={continents} country={countryName} ShippingPrice={shippingPrice} Quantity={quantity} preOrder={true} />) : (
                  <Button className="orderModal__checkout" onClick={() => setCheckout(true)}>
                    ORDER NOW
                  </Button>)
            }
          </Modal>
          <Modal
            className="orderModal"
            isOpen={targetPriceModal}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            onRequestClose={() => setTargetPriceModal(false)}
          >
            <div className="orderModal__header target__header">
              <h1 className="orderModal__heading">Set Your Target Price</h1>
              <button
                className="orderModal__closeButton"
                onClick={() => setTargetPriceModal(false)}
              >
                X
                </button>
            </div>
            <h3 className="orderModal__title">{product.productName}</h3>
            <div className="orderModal__details">
              <div className="orderModal__row">
                <label className="orderModal__label">My Order Quantity</label>
                <input className="orderModal__input" placeholder="0" value={quantity} onChange={(e) => {
                  setQuantity(e.target.value)
                }} />
              </div>
              <div className="orderModal__row targetPriceModal">
                <label className="orderModal__label">
                  Target Price :
                </label>
                <form className="targetPriceModal__form" onChange={(e) => {
                  setTargetPrice(e.target.value)
                }}>
                  <input className="orderModal__input active targetPriceModal__input" type="radio" name="target" value={product.price1} />
                  <label className="orderModal__label targetPriceModal__label">
                    {product.price1}
                  </label>
                  <input className="orderModal__input active targetPriceModal__input" type="radio" name="target" value={product.price2} />
                  <label className="orderModal__label targetPriceModal__label">
                    {product.price2}
                  </label>
                  <input className="orderModal__input active targetPriceModal__input" type="radio" name="target" value={product.price3} />
                  <label className="orderModal__label targetPriceModal__label">
                    {product.price3}
                  </label>
                  <input className="orderModal__input active targetPriceModal__input" type="radio" name="target" value={product.price4} />
                  <label className="orderModal__label targetPriceModal__label">
                    {product.price4}
                  </label>
                </form>
              </div>
              <div className="orderModal__row">
                <label className="orderModal__label">
                  Current Price
                  </label>
                <input className="orderModal__input active" placeholder={`$ ${cPrice}`} value={(e) => e.target.placeholder} />
              </div>
              <div className="orderModal__row">
                <label className="orderModal__label">
                  Your Saving
                  </label>
                <input className="orderModal__input active" placeholder={saving.toFixed(2)} disabled={true} />
              </div>

              <div className="orderModal__row">
                <label className="orderModal__label">Total</label>
                <input className="orderModal__input active" value={`$ ${targetTotalCost == 0 ? 0 : targetTotalCost.toFixed(2)}`} />
              </div>
            </div>
            {
              checkout ?
                (<Paypal className="paypalButton" money={25} pId={pId} product={product} Quantity={quantity} preOrder={true} productName={product.productName} avatar={product.avatar} targetPrice={targetPrice} email={userEmail} userFName={userFName} userMob={userMob} />) : (
                  <Button className="orderModal__checkout" onClick={() => {
                    setCheckout(true)
                    alert("To confirm you are a serious buyer of this product, you will now be invited to pay a fully refundable deposit of $25USD. You will be notified when you're target price and preferred quantity has been reached.")
                    setQuantity(0);
                    setTargetPrice(product.price1)
                  }}>
                    Notify Me
                  </Button>
                )}
          </Modal>
        </div>
      </div>
      <div class="container">
        <div class="skill">
          <div className="container1__price">
            <h5>${product.price1}</h5>
            <h5>${product.price2}</h5>
            <h5>${product.price3}</h5>
            <h5>${product.price4}</h5>
          </div>
          <div class="percent">
            <div className="progress" style={{ width: `${widths}%` }}></div>
          </div>
          <div className="container1__units">
            <div className="container1__units__unit">
              <h5>{product.units1}</h5>
              <h5>{product.units}</h5>
            </div>
            <div className="container1__units__unit">
              <h5>{product.units2}</h5>
              <h5>{product.units}</h5>
            </div>
            <div className="container1__units__unit">
              <h5>{product.units3}</h5>
              <h5>{product.units}</h5>
            </div>
            <div className="container1__units__unit">
              <h5>{product.units4}</h5>
              <h5>{product.units}</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="productDescription__options">
        <div className="productDescription__deration option">
          <HourglassFullIcon className="productDescription__derationIcon icon" />
          <div className="optionDiv">
            <span className="productDescription__span">Time Remaining</span>
            <p id="timer">
              <span className="spans" id="timer-days"></span>
              <span className="spans" id="timer-hours"></span>
              <span className="spans" id="timer-mins"></span>
              <span className="spans" id="timer-secs"></span>
            </p>
          </div>
        </div>
        <div className="productDescription__deration option">
          <ShoppingCartIcon className="productDescription__purchasedIcon icon" />
          <div className="optionDiv">
            <span className="productDescription__span">
              Total {product.units} Purchased
            </span>
            <h4 className="productDescription__purchasedUnits">{`${solds}`}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    countryName: state.country,
  }
}
export default connect(mapStateToProps)(ProductDescription);

import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../css/Sell.css";
import Countries from "./Countries";
import { connect, useDispatch } from "react-redux";
import { db, storage, auth } from "../firebase";
import reducer from "../reducer";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function Sell({ countryName, userIn, userOut }) {
  const dispatch = useDispatch(reducer);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [mob, setMob] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productLength, setProductLength] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productAbout, setProductAbout] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [orderDeadline, setOrderDeadline] = useState();
  const [units1, setUnits1] = useState("");
  const [units2, setUnits2] = useState("");
  const [units3, setUnits3] = useState("");
  const [units4, setUnits4] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [price4, setPrice4] = useState("");
  const [fprice1, setFprice1] = useState("");
  const [fprice2, setFprice2] = useState("");
  const [fprice3, setFprice3] = useState("");
  const [fprice4, setFprice4] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [piecesPerBox, setPiecesPerBox] = useState("");
  const [pin, setPin] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [units, setUnits] = useState("Units");
  const [length, setLength] = useState("cm");
  const [width, setWidth] = useState("cm");
  const [weight, setWeight] = useState("g");
  const [emailVerified, setEmailVerified] = useState(false);
  const [pending, setPending] = useState(true);
  const [continents, setContinents] = useState("");
  const [shipPriceArray, setShipPriceArray] = useState([]);
  const [sPrice1, setSPrice1] = useState()
  const [sPrice2, setSPrice2] = useState()
  const [sPrice3, setSPrice3] = useState()
  const [sPrice4, setSPrice4] = useState()
  const [sPrice5, setSPrice5] = useState()
  const [sPrice6, setSPrice6] = useState()
  const [sPrice7, setSPrice7] = useState()
  const [sPrice11, setSPrice11] = useState()
  const [sPrice22, setSPrice22] = useState()
  const [sPrice33, setSPrice33] = useState()
  const [sPrice44, setSPrice44] = useState()
  const [sPrice55, setSPrice55] = useState()
  const [sPrice66, setSPrice66] = useState()
  const [sPrice77, setSPrice77] = useState()

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const submission = () => {
    db.collection("sellData")
      .add({
        businessName,
        email,
        mob,
        productUrl,
        productName,
        productCategory,
        productLength,
        productWidth,
        productWeight,
        productAbout,
        productQuantity: parseFloat(productQuantity),
        orderDeadline,
        units1: parseInt(units1),
        units2: parseInt(units2),
        units3: parseInt(units3),
        units4: parseInt(units4),
        price1: parseFloat(price1),
        price2: parseFloat(price2),
        price3: parseFloat(price3),
        price4: parseFloat(price4),
        shippingPrice,
        piecesPerBox,
        pin,
        avatar: fileUrl,
        approval: "null",
        soldProducts: 0,
        units,
        continents,
        country: countryName,
        AsiaShippingPrice: parseFloat(sPrice1),
        AustraliaShippingPrice: parseFloat(sPrice7),
        AfricaShippingPrice: parseFloat(sPrice2),
        AntarcticaShippingPrice: parseFloat(sPrice6),
        NorthAmericaShippingPrice: parseFloat(sPrice5),
        SouthAmericaShippingPrice: parseFloat(sPrice4),
        EuropeShippingPrice: parseFloat(sPrice3),
      })
      .then(() => {
        dispatch({
          type: "submission Successful",
        });
      }).then(() => {
        dispatch({
          type: "adminData",
          sellerData: [{
            businessName,
            email,
            mob,
            productUrl,
            productName,
            productCategory,
            productLength,
            productWidth,
            productWeight,
            productAbout,
            productQuantity: parseFloat(productQuantity),
            orderDeadline,
            units1: parseInt(units1),
            units2: parseInt(units2),
            units3: parseInt(units3),
            units4: parseInt(units4),
            price1: parseFloat(price1),
            price2: parseFloat(price2),
            price3: parseFloat(price3),
            price4: parseFloat(price4),
            shippingPrice,
            piecesPerBox,
            pin,
            avatar: fileUrl,
            approval: "null",
            soldProducts: 0,
            units,
            continents,
            country: countryName,
            AsiaShippingPrice: parseFloat(sPrice1),
            AustraliaShippingPrice: parseFloat(sPrice7),
            AfricaShippingPrice: parseFloat(sPrice2),
            AntarcticaShippingPrice: parseFloat(sPrice6),
            NorthAmericaShippingPrice: parseFloat(sPrice5),
            SouthAmericaShippingPrice: parseFloat(sPrice4),
            EuropeShippingPrice: parseFloat(sPrice3),
          }]
        })
      })
      .catch((err) => {
        alert(err);
      });
  };

  const calculate = (e) => {
    const amount = e.target.value
    const name = e.target.name
    if (amount === isNaN) {
      return
    } else {
      if (currency == "") {
        return
      } else {
        fetch(`https://api.exchangeratesapi.io/latest?base=${currency}`)
          .then(res => res.json())
          .then(data => {
            // const date = data.date;
            const result = (data.rates["USD"] * amount).toFixed(2);
            if (name == "price1") {
              setPrice1(result)
            } else if (name == "price2") {
              setPrice2(result)
            } else if (name == "price3") {
              setPrice3(result)
            } else if (name == "price4") {
              setPrice4(result)
            }
            else if (name == "SP1") {
              setSPrice1(result)
            }
            else if (name == "SP2") {
              setSPrice2(result)
            }
            else if (name == "SP3") {
              setSPrice3(result)
            }
            else if (name == "SP4") {
              setSPrice4(result)
            }
            else if (name == "SP5") {
              setSPrice5(result)
            }
            else if (name == "SP6") {
              setSPrice6(result)
            }
            else if (name == "SP7") {
              setSPrice7(result)
            } else {
              return
            }
            console.log(result)
          });
      }
    }
  }
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: "setUser",
        userIn: true,
        userOut: false,
      });
      setEmailVerified(user.emailVerified)
    } else {
      dispatch({
        type: "setUser",
        userOut: true,
        userIn: false,
      })
    }
    setPending(false)
  });
  const verify = () => {
    const user = auth.currentUser;
    user.sendEmailVerification().then(function (data) {
      alert("Email sent")
    }).catch(function (error) {
      alert(error.message)
    });
  }


  useEffect(() => {
    const shippingCost = () => {
      if (continents == "Asia") {
        console.log(shipPriceArray)
        return setShippingPrice(shipPriceArray.Asia)
      } else if (continents == "Europe") {
        return setShippingPrice(shipPriceArray.Europe)
      } else if (continents == "South America") {
        return setShippingPrice(shipPriceArray.SouthAmerica)
      } else if (continents == "Antarctica") {
        return setShippingPrice(shipPriceArray.Antarctica)
      } else if (continents == "North America") {
        return setShippingPrice(shipPriceArray.NorthAmerica)
      } else if (continents == "Africa") {
        return setShippingPrice(shipPriceArray.Africa)
      } else if (continents == "Australia") {
        return setShippingPrice(shipPriceArray.Australia)
      } else {
        return setShippingPrice(0)
      }
    }
    shippingCost()
  }, [continents])


  if (pending) return <div>Loading...</div>
  if (!pending) {
    if (userOut) return <Redirect to="/login" />
    if (userIn) {
      if (emailVerified) {
        return (
          <div className="sell">
            <p id="timers">
              <span className="spans" id="timer-days"></span>
              <span className="spans" id="timer-hours"></span>
              <span className="spans" id="timer-mins"></span>
              <span className="spans" id="timer-secs"></span>
            </p>
            <div className="sell__heading">
              <h1 className="sell__headingMajor">SUBMISSION</h1>
              <h4 className="sell__headerMinor">
                LIST YOUR WHOLESALE PRODUCTS BELOW.
              </h4>
            </div>
            <div className="sell__container">
              <form
                className="sell__form"
                action=""
              >
                <h1 className="sell__formHeading">PRODUCT SUBMISSION FORM</h1>
                <input
                  className="sell__businessName input"
                  type="text"
                  placeholder="Business E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="sell__businessName input"
                  type="number"
                  placeholder="Business Contact Number"
                  value={mob}
                  onChange={(e) => setMob(e.target.value)}
                />
                <input
                  className="sell__businessName input"
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
                <div className="sell__product">
                  <label className="sell__productDescription label">
                    Product Description :-
                </label>
                  <div className="sell__productImage">
                    <label className="imageLabel">Upload a Product Image : - </label>
                    <div className="file_button_container">
                      <input type="file" onChange={onFileChange} />
                    </div>
                  </div>
                  <div className="sell__productInput">
                    <input
                      className="sell__productUrl input"
                      type="url"
                      placeholder="Product Url"
                      value={productUrl}
                      onChange={(e) => setProductUrl(e.target.value)}
                    />
                    <input
                      className="sell__inputName input"
                      type="text"
                      placeholder="Enter Your Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                    <select
                      className="sell__selectCategories input"
                      name="selectCategories"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    >
                      <option value="">Select Product Category</option>
                      <option value="Building & Construction">
                        Building & Construction
                      </option>
                      <option value="PPE & Medical Equipment">
                        PPE & Medical Equipment
                      </option>
                      <option value="Nails & Cosmetics">Nails & Cosmetics</option>
                      <option value="Electrical Appliances">
                        Electrical Appliances
                      </option>
                      <option value="Food & Product Packaging">
                        Food & Product Packaging
                      </option>
                      <option value="Hair & Hair Products">Hair & Hair Products</option>
                      <option value="Sporting Equipment">Sporting Equipment</option>
                      <option value="Footwear">Footwear</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Automobile Parts">Automobile Parts</option>
                      <option value="Machinery & Parts">Machinery & Parts</option>
                      <option value="Chemicals">Chemicals</option>
                      <option value="Textiles">Textiles</option>
                      <option value="Fashion Jewellery">Fashion Jewellery</option>
                      <option value="Promotional & Gifts">Promotional & Gifts</option>
                    </select>
                    <div className="sell__divs">
                      <input
                        className="sell__productLength input"
                        type="number"
                        placeholder={`Product Length in ${length}`}
                        value={productLength}
                        onChange={(e) => setProductLength(e.target.value)}
                      />
                      <select id="length"
                        name="length"
                        className="inputs1"
                        value={length}
                        onChange={e => {
                          setLength(e.target.value)
                        }}>
                        <option value="Cm">Cm</option>
                        <option value="M">M</option>

                      </select>
                    </div>
                    <div className="sell__divs">
                      <input
                        className="sell__productWidth input"
                        type="number"
                        placeholder={`Product Width in ${width}`}
                        value={productWidth}
                        onChange={(e) => setProductWidth(e.target.value)}
                      />
                      <select id="width"
                        name="width"
                        className="inputs1"
                        value={width}
                        onChange={e => {
                          setWidth(e.target.value)
                        }}>
                        <option value="Cm">Cm</option>
                        <option value="M">M</option>
                      </select>
                    </div>
                    <div className="sell__divs">
                      <input
                        className="sell__productWeight input"
                        type="number"
                        placeholder={`Product weight in ${weight}`}
                        value={productWeight}
                        onChange={(e) => setProductWeight(e.target.value)}
                      />
                      <select id="weight"
                        name="weight"
                        className="inputs1"
                        value={weight}
                        onChange={e => {
                          setWeight(e.target.value)
                        }}>
                        <option value="G">G</option>
                        <option value="Kg">Kg</option>
                      </select>
                    </div>
                    <textarea
                      className="signup__address"
                      placeholder="About The Product"
                      value={productAbout}
                      onChange={(e) => setProductAbout(e.target.value)}
                    />
                    <label className="sell__productDescription label" >
                      Set Last date for Ordering.
                  </label>
                    <input
                      className="sell__deadline input"
                      name="deadline"
                      value={orderDeadline}
                      onChange={(e) => setOrderDeadline(e.target.value)} type="date" />
                  </div>
                </div>
                <div className="sell__divs">
                  <label className="sell__wholesaleUnit label">
                    Wholesale Unit Bracket :-
                    </label>
                  <select id="units"
                    name="units"
                    className="inputs0"
                    value={units}
                    onChange={e => {
                      setUnits(e.target.value)
                    }}>
                    <option value="Units">Units</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Kg">Kg</option>
                    <option value="Ktns">Ctns</option>
                    <option value="Mtr">Mtr</option>
                  </select>
                </div>
                <div className="sell__wholesaleUnitDiv">
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={`1 ${units}`}
                    value={units1}
                    onChange={(e) => setUnits1(e.target.value)}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={`10 ${units}`}
                    value={units2}
                    onChange={(e) => setUnits2(e.target.value)}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={`100 ${units}`}
                    value={units3}
                    onChange={(e) => setUnits3(e.target.value)}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={`500+ ${units}`}
                    value={units4}
                    onChange={(e) => setUnits4(e.target.value)}
                  />
                </div>
                <input
                  className="sell__orderQuantity input"
                  type="number"
                  placeholder={`Personal order quantity in ${units}`}
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
                <div className="sell__wholesale">
                  <label className="sell__wholesalePrice label">
                    Wholesale Price Bracket in {currency}:-
                  </label>
                  <select id="currency"
                    name="currency"
                    className="inputs"
                    value={currency}
                    onChange={e => {
                      setCurrency(e.target.value)
                    }}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CNY">CNY</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div className="sell__wholesalePriceDiv">
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={currency}
                    value={fprice1}
                    name="price1"
                    onChange={e => {
                      calculate(e)
                      setFprice1(e.target.value)
                    }}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={currency}
                    value={fprice2}
                    name="price2"
                    onChange={e => {
                      calculate(e)
                      setFprice2(e.target.value)
                    }}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={currency}
                    value={fprice3}
                    name="price3"
                    onChange={e => {
                      calculate(e)
                      setFprice3(e.target.value)
                    }}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder={currency}
                    value={fprice4}
                    name="price4"
                    onChange={e => {
                      calculate(e)
                      setFprice4(e.target.value)
                    }}
                  />
                </div>
                <label className="label">Price Shown In Website in USD($):-</label>
                <div className="sell__wholesalePriceDiv">
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder="$"
                    value={price1}
                    disabled={true}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder="$"
                    value={price2}
                    disabled={true}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder="$"
                    value={price3}
                    disabled={true}
                  />
                  <input
                    className="input smallerInput"
                    type="number"
                    placeholder="$"
                    value={price4}
                    disabled={true}
                  />
                </div>
                <div className="sell__Address">
                  <Countries className="sell__country" name="country" />
                  <input
                    className="sell__postalCode input"
                    type="text"
                    name=""
                    pattern="[0-9a-zA-Z]{6}"
                    placeholder="Postal Code"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>

                <label className="label">Continent wise shipping prices:-</label>
                <div className="sell__shippingPrice">
                  <div className="sell__continents__price">
                    <label className="priceLabel">Asia</label>
                    <input type="number" className="inputs pricetag" value={sPrice11} name="SP1" onChange={e => {
                      setSPrice11(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" placeholder="$" value={sPrice1} disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">Africa</label>
                    <input type="number" className="inputs pricetag" value={sPrice22} name="SP2" onChange={e => {
                      setSPrice22(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice2} placeholder="$" disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">Europe</label>
                    <input type="number" className="inputs pricetag" value={sPrice33} name="SP3" onChange={e => {
                      setSPrice33(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice3} placeholder="$" disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">South America</label>
                    <input type="number" className="inputs pricetag" value={sPrice44} name="SP4" onChange={e => {
                      setSPrice44(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice4} placeholder="$" disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">North America</label>
                    <input type="number" className="inputs pricetag" value={sPrice55} name="SP5" onChange={e => {
                      setSPrice55(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice5} placeholder="$" disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">Antarctica</label>
                    <input type="number" className="inputs pricetag" value={sPrice66} name="SP6" onChange={e => {
                      setSPrice66(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice6} placeholder="$" disabled={true} />
                  </div>
                  <div className="sell__continents__price">
                    <label className="priceLabel">Australia</label>
                    <input type="number" className="inputs pricetag" value={sPrice77} name="SP7" onChange={e => {
                      setSPrice77(e.target.value)
                      calculate(e)
                    }}
                      placeholder={`Shipping Price in ${currency}`} />
                    <input type="number" className="inputs disabledPriceTag" value={sPrice7} placeholder="$" disabled={true} />
                  </div>
                </div>
                <button
                  className="sell__submitButton"
                  type="submit"
                  onClick={submission}
                >
                  SUBMIT
          </button>
              </form>
            </div>
          </div>
        )
      }
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

const mapStateToProps = (state) => {
  return {
    countryName: state.country,
    userIn: state.userIn,
    userOut: state.userOut,
  };
};
export default connect(mapStateToProps)(Sell);
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Signup.css";
import Countries from "./Countries";
import { auth } from "../firebase";
import { useDispatch, connect } from "react-redux";
import reducer from "../reducer";
import { db } from "../firebase";

function Signup({ countryName }) {
  const dispatch = useDispatch(reducer);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [userName, setUserName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [mob, setMob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pin, setPin] = useState("");
  const [userType , setUserType] = useState("Buyer")

  const register = (e) => {
    e.preventDefault();
    console.log(countryName);
    auth
      .createUserWithEmailAndPassword(email, password)
      // .then(() => verify())
      .then((auth) => {
        console.log(auth);
        if (auth) {
          console.log(auth)
          // verify(auth.currentUser)
          history.push("/");
        }
      })
      .then(() => {
        db.collection("data").add({
          countryName: countryName,
          email: email,
          address: address,
          city: city,
          pin: pin,
          businessName: businessName,
          mob: mob,
          fname: fName,
          lName: lName,
          userName: userName,
          userType
        });
      })
      .then(() => {
        dispatch({
          type: "new",
          data: "success",
        });
      })
      .catch((error) => alert(error.message));
    setPassword("");
    setEmail("");
  };

  // const verify = () => {
  //   const user = auth.currentUser;
  //   console.log(user)

  //   user.sendEmailVerification().then(function (data){
  //     // Email sent.
  //     console.log(data)
  //     alert("Email sent") 
  //   }).catch(function (error) {
  //     alert(error.message)
  //   });
  // }


  return (
    <div className="signup">
      <p id="timers">
        <span className="spans" id="timer-days"></span>
        <span className="spans" id="timer-hours"></span>
        <span className="spans" id="timer-mins"></span>
        <span className="spans" id="timer-secs"></span>
      </p>
      <div className="signup__container">
        <form className="signup__form" onSubmit={register}>
          <h1 className="signup__formHeading">
            Sign Up To Your Free Trisquare Account
          </h1>
          <div className = "userType">
            <label className = "userType__label">User Type :- </label>
            <select id="userType__select"
              name="userType__select"
              className="userType__select"
              value = {userType}
              onChange = {(e) => setUserType(e.target.value)}
              >
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>

          </div>

          <div className="signup__name inputDiv">
            
            <div className="div">
              <input
                className="signup__inputName smallInput smallInput1"
                type="text"
                placeholder="First Name"
                value={fName}
                required
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="div">
              <input
                className="signup__inputName smallInput smallInput2"
                type="text"
                placeholder="Last Name"
                value={lName}
                required
                onChange={(e) => setLName(e.target.value)}
              />
            </div>
          </div>
          <input
            className="signup__username input"
            type="text"
            placeholder="Username"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="signup__businessName input"
            type="text"
            placeholder="Business Name"
            value={businessName}
            required
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <input
            className="signup__email input"
            type="email"
            placeholder="Enter Your E-mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="signup__password inputDiv">
            <div className="div">
              <input
                className="signup__inputPassword smallInput smallInput1"
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="div">
              <input
                className="signup__inputPassword smallInput smallInput2"
                type="text"
                placeholder="Confirm Password"
                value={cPassword}
                required
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div> */}
          </div>
          <input
            className="signup__mobile input"
            type="number"
            pattern="[0-9]{10}"
            placeholder="Enter Your Mobile Number"
            value={mob}
            required
            onChange={(e) => setMob(e.target.value)}
          />
          <textarea
            className="signup__address"
            placeholder="Enter your address here"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="signup__cityCountry inputDiv">
            <div className="div">
              <input
                className="signup__city smallInput smallInput1"
                type="text"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <Countries className="signup__country" />
          </div>
          <input
            className="signup__postalCode input"
            type="text"
            name=""
            pattern="[0-9]{6}"
            placeholder="Postal Code"
            value={pin}
            required
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            className="signup__submitButton"
            type="submit"
          >
            Agree and Sign Up
          </button>
          <div className="signup__emptyDiv"></div>

          <h5 className="signup__bottom">
            Already a user?
            <Link className="signup__resetPassword link" to="/login">
              Log In
            </Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    countryName: state.country,
  };
};
export default connect(mapStateToProps)(Signup);

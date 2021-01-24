import React, { useEffect, useState } from "react";
import { useDispatch, connect } from 'react-redux'
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import reducer from '../reducer'
import { auth, db } from '../firebase'


const Navbar = () => {
  const dispatch = useDispatch(reducer)
  const [userData, setUserData] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [userType, setUserType] = useState("Buyer")
  useEffect(async () => {
    await auth.onAuthStateChanged(user => {
      if (user) {
        setUserData(true)
        user.email === "aalokbarma17@gmail.com" ? setAdmin(true) : setAdmin(false);
        db.collection("data").onSnapshot(snapshot => {
          snapshot.docs.map(doc => {
            if (doc.data().email === user.email) {
              setUserType(doc.data().userType)
            }
          })
        })
      } else {
        setUserData(false)
        setAdmin(false)
      }
    })
  })
  const signOut = () => {
    auth.signOut().then(() => {
      dispatch({
        type: "signOut"
      })
    }).catch((err) => {
      alert(err)
    })
  }
  // console.log(userData)
  return (
    <div className="navbar">
      <nav className="navbar__components">
        <div id="marker"></div>
        {admin ? <Link to='/admin' className="navbar__component admin__link">Admin</Link> : ""}
        {userType == "Buyer" ? "" : (<Link to='/sell' className="navbar__component sell__link">Sell</Link>)}
        {userData ? <Link to='/' className="navbar__component login__link" onClick={signOut}>Log Out</Link> : <Link to='/login' className="navbar__component login__link">Login</Link>}
      </nav>
    </div>
  );
};
export default Navbar;

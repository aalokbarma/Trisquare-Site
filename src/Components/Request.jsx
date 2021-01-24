import React, { useEffect, useState } from "react";
import "../css/Request.css";
import { auth, db } from '../firebase';

function Request() {
  const [userRequest, setUserRequest] = useState("");
  const sendEmail = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection("requests").add({
          userRequest,
          email: user.email,
        }).then(() => alert('Request Sent'))
          .catch(err => alert(err.message))
        setUserRequest("")
      }
      else {
        console.log("Email Not Sent")
      }
    })
  }

  return (
    <section className="request">
      <h1 className="request__heading">REQUEST A PRODUCT</h1>
      <h3 className="request__para para1">
        Copy and paste a URL of the product that you want to see listed on
        Trisquare.
      </h3>
      <input className="request__input" placeholder="WWW." value={userRequest} onChange={(e) => setUserRequest(e.target.value)} />
      <h3 className="request__para para2">
        Accepted products will become available for you to group buy with other
        resellers.
      </h3>
      <div>
        <button onClick={sendEmail} className="request__button">Request For This Product</button>
      </div>
    </section>
  );
}
export default Request;

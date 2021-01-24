import React, { useState } from 'react'
import '../css/ForgotPage.css'
import { MdEmail } from "react-icons/md"
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

const ForgotPage = () => {
    const [email, setEmail] = useState("")
    const reset = () => {
        auth.sendPasswordResetEmail(email).then(() => {
            alert("Email has been sent to you, Please check and Chenge Your Password.")
        }).catch((err) => {
            alert(err.message)
        })
    }
    return (
        <div className="forgotPage">
            <div className="forgotPage__modal">
                <h4>Forgot Password?</h4>
                <hr />
                <div className="forgotPage__emailBox">
                    <input type="email" className="forgotPage__email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email...." />
                    <MdEmail className="forgotPage__icon" />
                </div>
                <Link to="/login" className="forgotPage__resetPassword" onClick={reset}>Reset Password</Link>
            </div>
        </div>
    )
}
export default ForgotPage

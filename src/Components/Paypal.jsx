import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import emailjs from 'emailjs-com';
import { auth } from '../firebase'

const Paypal = ({ money, pId, product, address, country, PIN, contact, ShippingPrice, Quantity, preOrder, productName, avatar, targetPrice, email, userFName, userMob }) => {
    const paypal = useRef()
    const [orders, setOrders] = useState(product.soldProducts)
    const [doc, setDoc] = useState()
    // const [userNow, setUserNow] = useState("")
    // console.log(pId)
    // console.log(money)
    // console.log(pId)
    // console.log(address)
    // console.log(country)
    // console.log(PIN)
    // console.log(contact)
    // console.log(ShippingPrice)
    // console.log(Quantity)
    // console.log(product)

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, action, err) => {
                return action.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "My Orders",
                            amount: {
                                currency_code: "USD",
                                value: money,
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, action) => {
                const order = await action.order.capture();
                // console.log(order)
                // emailjs.send('service_1gkgri4', 'template_ki1mc05', order, 'user_pvBd8swTZZ2zeC9gMD50X')
                //     .then((result) => {
                //         order
                //     }, (error) => {
                //         console.log(error.text);
                //     });
                if (preOrder == true) {
                    preOrders()
                } else {
                    sendNotification()
                    getData()
                }
            },
            onError: (err) => {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])

    const preOrders = () => {
        db.collection("preOrders").add({
            ProductName: productName,
            ProductImage: avatar,
            ProductQuantity: Quantity,
            TargetPrice: targetPrice,
            UserEmail: email,
            FirstName: userFName,
            Mobile: userMob,
            ProductId: pId,
        })
            .then(() => alert("To confirm you are a serious buyer of this product, you will now be invited to pay a fully refundable deposit of $25USD. You will be notified when you're target price and preferred quantity has been reached."))
            .catch(err => alert(err.meassage))
    }

    const getData = () => {
        db.collection("sellData").doc(`${pId}`).onSnapshot(snapshot => setDoc(snapshot.data()))
        const data = {
            ...product,
            soldProducts: orders + 1,
        }
        db.collection("sellData").doc(`${pId}`).set(data)
        // console.log(pId)
    }
    const sendNotification = () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                // setUserNow(user.email)
                const nowUser = user.email
                db.collection("orderHistory").add({
                    ProductName: product.productName,
                    ProductQuantity: Quantity,
                    BuyerPaid: money,
                    ShippingPrice,
                    Address: address,
                    PIN,
                    Country: country,
                    Contact: contact,
                    ProductImage: product.avatar,
                    Email: nowUser,
                })
            } else {
                alert("No user is Logged in")
            }
        })

    }

    return (
        <div>
            <p id="timers">
                <span className="spans" id="timer-days"></span>
                <span className="spans" id="timer-hours"></span>
                <span className="spans" id="timer-mins"></span>
                <span className="spans" id="timer-secs"></span>
            </p>
            <div ref={paypal}></div>
        </div>
    )
}
export default Paypal;

// db.collection("data").onSnapshot(snapshot => {
//     // console.log(snapshot.docs.map((doc) => doc.data().address))
//     snapshot.docs.map((document) => {
//         // console.log(nowUser)
//         // console.log(document.data().email)
//         if (document.data().email == nowUser) {
//             const data = {
//                 from_name: document.data().userName,
//                 to_name: "ABC",
//                 message: `
//                     Address: ${document.data().address},
//                     city: ${document.data().city},
//                     pin: ${document.data().pin},
//                     country: ${document.data().countryName},
//                     mobile: ${document.data().mob},
//                 `,
//                 reply_to: "Anushka",
//             }
//             emailjs.send("service_1gkgri4", "template_lnr0ynt", data, "user_pvBd8swTZZ2zeC9gMD50X");
//             console.log("email sent");
//         }
//         else {
//             console.log("email not sent")
//         }
//     })

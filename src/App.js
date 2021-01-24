import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Footer1 from "./Components/Footer1";
import Login from './Components/Login';
import Signup from './Components/Signup';
import Sell from './Components/Sell';
import CartPage from "./Components/CartPage";
import ProductPage from "./Components/ProductPage";
import OrderModal from "./Components/OrderModal";
import ForgotPage from "./Components/ForgotPage";
import Admin from './Components/Admin'
import AdminPreOrder from './Components/AdminPreOrder'
import AdminPurchases from './Components/AdminPurchases'
import AdminRequests from './Components/AdminRequests'

import { useEffect, useState } from "react";
import { db } from "./firebase";

function App() {
  var url = window.location.href;
  const [price1, setPrice1] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    db.collection('sellData').onSnapshot(snapshot => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, product: doc.data() })))
    })
  }, [])
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" >
            <Signup />
          </Route>
          <Route exact path="/sell" >
            <Sell />
          </Route>
          <Route exact path="/cartPage" >
            <CartPage />
          </Route>
          <Route exact path="/product/:id" component={ProductPage} />
          <Route exact path="/modal" >
            <OrderModal />
          </Route>
          <Route exact path="/admin" >
            <Admin products={products} />
          </Route>
          <Route exact path="/admin/preorders" >
            <AdminPreOrder products={products} />
          </Route>
          <Route exact path="/admin/purchases" >
            <AdminPurchases products={products} />
          </Route>
          <Route exact path="/admin/requests" >
            <AdminRequests products={products} />
          </Route>
          <Route exact path="/forgotPassword" >
            <ForgotPage />
          </Route>
        </Switch>
        {/* <Footer /> */}
        <Footer1 />
      </div>
    </BrowserRouter>
  );
}
export default App;

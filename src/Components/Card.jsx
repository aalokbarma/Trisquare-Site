import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Card.css";
import { useDispatch } from 'react-redux';
import reducer from '../reducer'
import { db } from '../firebase'

function Card({ src, title, product, Pid, sold }) {
  const [widths, setWidths] = useState(0);
  const [price, setPrice] = useState(product.price1);

  const unit1 = product.units1 - 0;
  const unit2 = product.units2 - product.units1;
  const unit3 = product.units3 - product.units2;
  const unit4 = product.units4 - product.units3;

  var sold1 = sold - 0;
  var sold2 = sold - product.units1;
  var sold3 = sold - product.units2;
  var sold4 = sold - product.units3;

  var wide1 = sold1 / unit1;
  var wide2 = sold2 / unit2;
  var wide3 = sold3 / unit3;
  var wide4 = sold4 / unit4;

  var wides1 = wide1 * 10;
  var wides2 = wide2 * 27;
  var wides3 = wide3 * 27;
  var wides4 = wide4 * 27;

  useEffect(() => {
    const setwidth = () => {
      if (sold >= 0 && sold <= product.units1) {
        setWidths(wides1)
        setPrice(product.price1)
      }
      else if (sold > product.units1 && sold <= product.units2) {
        setWidths(10 + wides2)
        setPrice(product.price1)
      }
      else if (sold > product.units2 && sold <= product.units3) {
        setWidths(37 + wides3)
        setPrice(product.price2)
      }
      else if (sold > product.units3 && sold <= product.units4) {
        setWidths(64 + wides4)
        setPrice(product.price3)
      }
      else {
        setWidths(100)
        setPrice(product.price4)
      }
    }
    setwidth()
    const data = {
      ...product,
      currentPrice: parseFloat(price),
    }
    console.log(Pid)
    db.collection("sellData").doc(`${Pid}`).set(data)
  }, [Pid, widths])
  const dispatch = useDispatch(reducer);
  const reachProduct = () => {
    dispatch({
      type: "reachProduct",
      productId: Pid,
    })
  }
  const decline = () => {
    db.collection("preOrders").doc(`${Pid}`).delete()
  }
  return (
    <div className="card">
      <img src={src} />
      <div className="card__details">
        <h4>{title}</h4>
        <div className="container2">
          <div className="skill">
            <div className="container3__price">
              <h5>${product.price1}</h5>
              <h5>${product.price2}</h5>
              <h5>${product.price3}</h5>
              <h5>${product.price4}</h5>
            </div>
            <div class="percent">
              <div className="progress" style={{ width: `${widths}%` }}></div>
            </div>
            <div className="container3__units">
              <div className="container3__units__unit">
                <h5 className="productUnit">{product.units1}</h5>
                <h5>{product.units}</h5>
              </div>
              <div className="container3__units__unit">
                <h5 className="productUnit">{product.units2}</h5>
                <h5>{product.units}</h5>
              </div>
              <div className="container3__units__unit">
                <h5 className="productUnit">{product.units3}</h5>
                <h5>{product.units}</h5>
              </div>
              <div className="container3__units__unit">
                <h5 className="productUnit">{product.units4}</h5>
                <h5>{product.units}</h5>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/product/${Pid}`} className="card__Link">
          <button className="card__select" onClick={reachProduct}>Select</button>
        </Link>
      </div>
    </div>
  );
}
export default Card;

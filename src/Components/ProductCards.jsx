import React, { useState, useEffect } from 'react';
import '../css/ProductCards.css'
import Card from './Card';
import { db } from '../firebase'

function ProductCard() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        db.collection('sellData').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => ({ id: doc.id, product: doc.data() })))
        })
    }, [])
    return (
        <div className="productCard">
            {products.map((product) => product.product.approval === true ? (

                < Card width="23%" className="productCard__product" src={product.product.avatar} title={product.product.productName} product={product.product} Pid={product.id} />
            ) : (<div></div>)
            )}
        </div>
    )
}
export default ProductCard

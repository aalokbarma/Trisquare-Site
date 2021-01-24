import React, { useEffect, useState } from 'react';
import '../css/ProductPage.css';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ProductDescription from './ProductDescription';
import Card from './Card';
import Links from './Links';
import { connect } from 'react-redux';
import { db } from '../firebase'


function ProductPage(props) {
    const { productId } = props
    const [productDetails, setProductDetails] = useState()
    const [pId, setPId] = useState(productId)
    useEffect(() => {
        const getData = async () => {
            await db.collection("sellData").doc(`${props.match.params.id}`).onSnapshot(snapshot => {
                setProductDetails(snapshot.data())
            })
        }
        getData();
        setPId(productId);
    }, [])
    if (productDetails) {
        return (
            <div className="productPage">
                <div className="productPage__searchBar">
                    <div className="lockIcons">
                        {props.userIn ? <LockOpenOutlinedIcon /> : <LockOutlinedIcon />}
                    </div>
                    <h1 className="productPage__category">{productDetails.productCategory}</h1>
                </div>
                <div className="productPage__mainSection">
                    <div className="product__leftDiv">
                        <img className="productpage__image" src={productDetails.avatar} alt="" />
                        <Links />
                    </div>
                    <div className="product__rightDiv">
                        <ProductDescription
                            product={productDetails}
                            pId={pId}
                            quantities={productDetails.units4}
                            solds={productDetails.soldProducts}
                        />
                    </div>
                </div>
            </div>
        )
    } return (
        <div className="container">
            <div class="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        productId: state.productId,
        loginInfo: state.login,
        userIn: state.userIn
    }
}
export default connect(mapStateToProps)(ProductPage);

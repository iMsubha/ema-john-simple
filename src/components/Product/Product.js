import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Product = (props) => {
    // console.log(props);
    const { name, price, img, seller, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" srcset="" />
            </div>
            <div className="product-details">
                <h4 className="product-name">
                    <Link to={"/product/" + key}>{name}</Link>
                </h4>
                <p>
                    <small>by {seller}</small>
                </p>
                <h4>${price}</h4>
                <p>
                    <small>only {stock} left in stock</small>
                </p>
                {props.showAddToCart && (
                    <button
                        className="main-button"
                        onClick={() => props.handleAddProduct(props.product)}>
                        <FontAwesomeIcon className="shopping-cart" icon={faShoppingCart} />
                         add to cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;

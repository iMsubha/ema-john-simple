import React, { useEffect } from 'react';
import fakeData from '../../fakeData'
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10)
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        //console.log(productKey);
        const previousCart = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        let count = 1;
        let newCart;
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);

    }
    //console.log(first10);
    return (
        <div className="base-container">
            <div className="product-container">
                {
                    products.map(product => <Product key={product.key} product={product} showAddToCart={true} handleAddProduct={handleAddProduct} />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div >
    );
};

export default Shop;
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlace] = useState(false);
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    const removeProduct = productKey => {
        // console.log("remove clicked", productKey)
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        //console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts)
        //console.log(productKeys)
    }, [])

    let thankYouImage;
    if (orderPlaced) {
        thankYouImage = <img src={happyImage} ></img>
    }
    return (
        <div className="base-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        product={pd}
                        removeProduct={removeProduct}
                    ></ReviewItem>)
                }
                {
                    thankYouImage
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">Place Order</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;
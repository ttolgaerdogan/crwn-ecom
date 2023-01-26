import "./checkout-item.styles.scss"
import React from 'react'

import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"
import { addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action"

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    // const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(CartContext)

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems ,cartItem))
    const addItemHandler = () => dispatch(addItemToCart(cartItems ,cartItem))
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems ,cartItem))

  
  return (
    <div className="checkout-item-container">
        <div className="image-container">
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
            <div className="arrow" onClick={removeItemHandler}>
                &#10094;
            </div>
                <span className="value">{quantity}</span>
            <div className="arrow" onClick={addItemHandler}>
                &#10095;
            </div>
        </span>
        <span className="price">{price}</span>
        <div onClick={clearItemHandler} className="remove-button">&#10005;</div>
    </div>
  )
}

export default CheckoutItem
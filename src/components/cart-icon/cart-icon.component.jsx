import "./cart-icon.styles.jsx"
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import React from 'react'
import { CartIconContainer,ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () => {

  const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);

  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <CartIconContainer>
        <ShoppingIcon onClick={toggleIsCartOpen} className="shopping-icon"/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
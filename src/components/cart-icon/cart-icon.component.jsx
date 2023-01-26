import "./cart-icon.styles.jsx"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import { CartIconContainer,ItemCount, ShoppingIcon } from "./cart-icon.styles.jsx";

const CartIcon = () => {

  // const {isCartOpen,setIsCartOpen, cartCount} = useContext(CartContext);

  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);


  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  }

  return (
    <CartIconContainer>
        <ShoppingIcon onClick={toggleIsCartOpen} className="shopping-icon"/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
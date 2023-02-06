import "./cart-dropdown.styles.jsx"
import Button from '../button/button.component';
import CartItem from "../cart-item/cart-item.component"
import { useSelector } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"

import { useNavigate } from "react-router-dom"
import  { CartDropdownContainer, EmptyMessage, CartItems } from "./cart-dropdown.styles"
import { useCallback } from "react";


const CartDropdown = () => {

  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = useCallback(() => {
    navigate("/checkout")
  }, [])

  return (
    <CartDropdownContainer>
        <CartItems>
          {cartItems.length ? 
          (cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}/>)
          )) :
          (<EmptyMessage >Your Cart is Empty</EmptyMessage>)
          }
        </CartItems>
        <Button onClick={goToCheckoutHandler} style={{padding: "0px"}}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
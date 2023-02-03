import { Outlet } from "react-router-dom"
import { Fragment } from "react";
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg"
// import { CartContext } from "../../contexts/cart.context";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from "./navigation.styles";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";


const Navigation = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    // const {isCartOpen} = useContext(CartContext);

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null);
    // }

    const signOutUser = () =>{
        dispatch(signOutStart())
    }

    return(
        <Fragment>
            <NavigationContainer >
                <LogoContainer  to={"/"}>
                    <CrwnLogo/>
                </LogoContainer>

                <NavLinks>
                    <NavLink to={"/shop"}>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as="span" onClick={signOutUser}>SIGN OUT</NavLink>
                        ) : (
                            <NavLink to={"/auth"}>
                                SIGN IN
                            </NavLink>
                        )
                    }
                    <CartIcon/>                   
                </NavLinks>
                {isCartOpen && <CartDropdown/>}

            </NavigationContainer>
            <Outlet/>
         </Fragment>
    )
  }

  export default Navigation
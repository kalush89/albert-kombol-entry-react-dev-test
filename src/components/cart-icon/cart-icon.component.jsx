import { Component } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/Icon/EmptyCart.svg";

class CartIcon extends Component {

    render(){
        return(
            <div className="cart-icon-container">
                <ShoppingIcon />
            </div>
        );
    }
}

export default CartIcon;
import { Component } from "react";
import SwitchContext from "../../contexts/switch.context";

import { ReactComponent as ShoppingIcon } from "../../assets/Icon/EmptyCart.svg";

class CartIcon extends Component {
    static contextType = SwitchContext;

    toggleOverlayOpen = () => {
        this.context.setIsOverlayOpen(!this.context.isOverlayOpen);
        if(!this.context.isOverlayOpen){
            document.body.classList.add('no-scroll');
        }else {
            document.body.classList.remove('no-scroll');
        }
        
    };

    render(){
        return(
            <div className="cart-icon-container" onClick={this.toggleOverlayOpen}>
                <ShoppingIcon />
            </div>
        );
    }
}

export default CartIcon;
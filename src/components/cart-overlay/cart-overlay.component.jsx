import { Component } from "react";

import SwitchContext from "../../contexts/switch.context";

import Button from "../button/button.component";

import './cart-overlay.styles.scss';

class CartOverlay extends Component {
    static contextType = SwitchContext;

    toggleOverlayOpen = () => {
        this.context.setIsOverlayOpen(!this.context.isOverlayOpen);
       
        if(!this.context.isOverlayOpen){
            document.body.classList.add('no-scroll');
        }else {
            document.body.classList.remove('no-scroll');
        }
    }

    render(){
        return(
            <div className="cart-overlay-container" onClick={this.toggleOverlayOpen}>
                    <div className="cart-overlay-main">
                        <div className="cart-overlay-header">
                        <div className="cart-item-count">
                            <span id="left">My Bag,</span>
                            <span id="right"> 3 items</span>
                        </div>
                        <div className="cart-overlay-items">
                            Cart is empty!
                        </div>
                        </div>
                        <div className="cart-overlay-footer">
                            <Button buttonType={'hollow'}>view bag</Button>
                            <Button buttonType={'primary'}>checkout</Button>
                        </div>
                </div>
            </div>
        );
    }
}

export default CartOverlay;
import { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom"

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import './cart-overlay.styles.scss';


class CartOverlay extends Component {
   

    handleClick = () =>{
        this.props.toggleCartOverlay();
        document.body.classList.toggle("no-scroll");
    }

   
    render(){
        const { cartItems, cartCount, cartTotal, theCurrency } = this.props;
        
        return(
            <div className="cart-overlay-container">
                    <div className="cart-overlay-main">
                        <div className="cart-item-count">
                            <span id="left">My Bag,</span>
                            <span id="right"> {cartCount} {cartCount === 1? ' item':' items'}</span>
                        </div>
                        
                        
                        <div className="cart-overlay-items">
                            {this.props.cartItems.length > 0 ? 
                                cartItems.slice(0).reverse().map((item, index) =>(
                                    <CartItem key={index}
                                     cartItem={item}
                                     uniqueAttributes={item.uniqueAttributes}
                                     theClass='cart-overlay-item-container'
                                     leftCartItemStyle='mini-left-cart-item-container' 
                                     rightCartItemStyle='mini-right-cart-item-container'
                                     selected='selected'
                                     normal='normal'/>
                                )) : 'Cart is empty!'
                             }
                        </div>
                        
                        <div className="total-container-overlay">
                            <div className="total-label">Total</div>
                            <div className="total-amount">{`${theCurrency[0]}${cartTotal}`}</div>
                        </div>
                        
                        <div className="cart-overlay-footer">
                            <Link to="/cart"><Button onClick={()=>this.handleClick()} buttonType={'hollow'} type='button'>view bag</Button></Link>
                            <Button buttonType={'primary'} type='button'>checkout</Button>
                        </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { theCurrency } = state.currencies;
    const { cartItems, isOverlayOpen, cartCount, cartTotal } = state.cart;
    return {
        theCurrency: theCurrency,
        cartItems: cartItems,
        isOverlayOpen: isOverlayOpen,
        cartCount: cartCount,
        cartTotal: cartTotal,
    }
}

export default connect(mapStateToProps, null)(CartOverlay);
import { Component, Fragment } from "react";
import { connect } from "react-redux";

import Button from "../../components/button/button.component";
import CartItem from "../../components/cart-item/cart-item.component";

import { setTax } from "../../store/cart/cart.action";


import "./cart.styles.scss";
class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0, 0)
    }

    render(){
        this.props.setTax();
        const { cartItems, cartCount, cartTotal, theCurrency, tax } = this.props;
        return(
            <div className="large-cart-container">
                        <div className="cart-title">
                            <span>Cart</span>
                        </div>

                        <div className="cart-content">
                            {this.props.cartItems.length > 0 ? 
                                cartItems.slice(0).reverse().map((item, index) =>(
                                    <Fragment key={index}>
                                        <hr className="content-horizontal" />
                                        <CartItem  cartItem={item} uniqueAttributes={item.uniqueAttributes} theClass='cart-item-container' rightCartItemStyle={'right-large-cart-item-container'} leftCartItemStyle={'large-left-cart-item-container'} selected={'large-selected'} normal={'large-normal'}/>
                                    </Fragment>
                                     )) : 'Cart is empty!'
                             }
                        </div>
                       

                        <div className="cart-footer">
                            <hr className="footer-horizontal" />
                            <div className="tax">
                                <span className="tax-label">Tax 21%:</span>
                                <span className="tax-value">{ `\u00A0\u00A0\u00A0${theCurrency[0]}${tax}`}</span>
                            </div>

                            <div className="quantity">
                                <span className="quantity-label">Quantity:</span>
                                <span className="quantity-value">{`\u00A0\u00A0${cartCount}`}</span>
                            </div>
                            
                            <div className="total-container-large">
                                <span className="total-label">Total:</span>
                                <span className="total-value">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${theCurrency[0]}${cartTotal}`}</span>
                            </div>
                            
                            <div className="order">
                                <Button buttonType={'Big'} type='button'>order</Button>
                            </div>
                            
                        </div>
                </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        setTax:() => dispatch(setTax()),
    }
};

const mapStateToProps = state => {
    const { theCurrency } = state.currencies;
    const { cartItems, isOverlayOpen, cartCount, cartTotal, tax } = state.cart;
    
    return {
        theCurrency: theCurrency,
        cartItems: cartItems,
        isOverlayOpen: isOverlayOpen,
        cartCount: cartCount,
        cartTotal: cartTotal,
        tax: tax,
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Cart);
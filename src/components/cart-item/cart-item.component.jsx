import { Component } from 'react';

import { connect } from 'react-redux/es/exports';

import CartItemLeft from '../cart-item-left/cart-item-left.component';
import CartItemRight from '../cart-item-right/cart-item-right.component';

import { 
    increaseItemCount, 
    decreaseItemCount, 
    updateCartTotal, 
    updateCartCount,
    setTax, 
} from '../../store/cart/cart.action';

import { getCurrencyDetails } from '../../utils/util';


import './cart-item.styles.scss';


class CartItem extends Component {

    render(){
        const { cartItem, uniqueAttributes, selected, normal, rightCartItemStyle, leftCartItemStyle, theCurrency } = this.props;
        
        const selectedCurrency = getCurrencyDetails(cartItem.prices, theCurrency[1]);
        
        return(
            <div className={this.props.theClass}>
                <CartItemLeft 
                cartItem={cartItem} 
                uniqueAttributes={uniqueAttributes} 
                rightCartItemStyle={rightCartItemStyle} 
                leftCartItemStyle={leftCartItemStyle} 
                selectedCurrency={selectedCurrency} 
                selected={selected} 
                normal={normal}  />

                <CartItemRight 
                selectedCurrency={selectedCurrency} 
                rightCartItemStyle={rightCartItemStyle} 
                leftCartItemStyle={leftCartItemStyle} 
                theProps={this.props} /> 
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        increaseItemCount:(ownProps) => dispatch(increaseItemCount(ownProps)),
        decreaseItemCount:(ownProps) => dispatch(decreaseItemCount(ownProps)),
        updateCartTotal:(ownProps) => dispatch(updateCartTotal(ownProps)),
        updateCartCount:(ownProps) => dispatch(updateCartCount(ownProps)),
        setTax:() => dispatch(setTax()),
      
    }
};

const mapStateToProps = (state) => {
    const { currencies } = state.currencies;
    const { theCurrency } = state.currencies;

    return {
        currencies: currencies,
        theCurrency: theCurrency,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
import React, { Component } from "react";
import { connect } from "react-redux";

import { setTheCurrency, toggleCurrencyList } from "../../store/currencies/currencies.action";
import { updateCartTotal } from "../../store/cart/cart.action";

import './currency.styles.scss';

class Currency extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    

handleSelect(e){
  const arr =  e.target.innerHTML.split(' ');
  this.props.setTheCurrency(arr);
  this.props.updateCartTotal(arr[0]);
  this.props.toggleCurrencyList();
}

handleOnClickOutside = (e) => {
   if(this.ref.current && !this.ref.current.contains(e.target)){
        this.props.onClickOutside && this.props.onClickOutside();
   }
};

componentDidMount() {
    document.addEventListener('click', this.handleOnClickOutside, true);
}

componentWillUnmount() {
    document.removeEventListener('click', this.handleOnClickOutside, true);
}

    render(){
        const { currencies } = this.props.currencies;
        console.log('outside', this.props.onClickOutside)
        return(
            <div className="currencies-container" ref={this.ref} >
                <ul>
                {
                    currencies.map((currency, index) => (
                        <li key={index} onClick={(e)=>this.handleSelect(e)}>{currency.symbol} {currency.label}</li>
                    ))
                }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { currencies } = state.currencies;
    const { theCurrency } = state.currencies;

    return {
        currencies: currencies,
        theCurrency: theCurrency,
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        setTheCurrency:(ownProps)=> dispatch(setTheCurrency(ownProps)),
        toggleCurrencyList:() => dispatch(toggleCurrencyList()),
        updateCartTotal:(ownProps) => dispatch(updateCartTotal(ownProps)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
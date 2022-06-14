import { Component } from "react";

import ProductContext from "../../contexts/product.context";

import './currency.styles.scss';

class Currency extends Component {
   static contextType = ProductContext;

handleSelect = (e) => {
  const arr =  e.target.innerHTML.split(' ');
  this.context.setTheCurrency(arr);
 
}

    render(){
        const { currencies } = this.context;
        console.log(this.context.theCurrency);
      
        return(
            <div className="currencies-container">
                <ul>
                {currencies.map((currency, index) => (
                    <li key={index} onClick={this.handleSelect}>{currency.symbol} {currency.label}</li>
                ))}
                </ul>
            </div>
        )
    }
}

export default Currency;
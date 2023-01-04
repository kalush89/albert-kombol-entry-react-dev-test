import { Component } from "react";
import { connect } from 'react-redux';

import { getCurrencies } from "../../utils/tilework.utils";
import { getCurrencyDetails } from "../../utils/util";

import { setCurrencies, setTheCurrency } from "../../store/currencies/currencies.action";
import { addToCart, setTax, updateCartTotal, updateCartCount, setAttribute, toggleFlash } from "../../store/cart/cart.action";


import Button from "../button/button.component";
import OutOfStock from "../out-of-stock-card/out-of-stock-card.component";
import AppIcons from "../../assets/app-icons/app-icons";


import './card.styles.scss';

class Card extends Component {
   
    constructor(){
        super();
        this.state = {
            selectedIndex: null
        }
    }

   async componentDidMount() {
    const currencies = await getCurrencies()
    this.props.setCurrencies(currencies)
   }

    handleMouseEnter = (index) => {
       this.setState(()=>({selectedIndex: index}));
    }

    handleMouseLeave =() => {
        this.setState(()=> ({selectedIndex: null}))
    }

    handleAddToCart = e =>{
       const selectedCurr = getCurrencyDetails(this.props.product.prices, this.props.theCurrency[1]);
      
        this.props.setAttribute(this.props.product);
        this.props.addToCart(this.props.product);
        this.props.updateCartTotal(selectedCurr[0].currency.symbol);
        this.props.updateCartCount();
        this.props.toggleFlash();
       
       setTimeout(this.props.toggleFlash, 500);
       e.preventDefault();
       
    }


    render(){
        
        const {brand, name, gallery, inStock} = this.props.product;
        const {index} = this.props;
        const { selectedIndex } = this.state;
      
       const selectedCurrency = getCurrencyDetails(this.props.product.prices, this.props.theCurrency[1]);
        
        return(
            <div className="card-container" 
            onMouseLeave={()=>this.handleMouseLeave()} 
            onMouseEnter={()=>this.handleMouseEnter(index)}
            >
                {inStock === false ? <OutOfStock height="444px" width="386px" /> : ''}
                    <div className='card-background-image'
                        style={{
                            backgroundImage: `url(${gallery[0]})`,
                        }} 
                    />
            
                {selectedIndex === index ?(
                <div className="add-item">
                    <Button buttonType={'cart'} type="button" onClick={e=>inStock === true ? this.handleAddToCart(e): ''} >
                        <AppIcons type={'atcIcon'} />
                    </Button>
                </div>):''
                }

                <span className="card-title">{brand} {name}</span>
                <div className="card-price">
                   
                    <span className="symbol">
                        {
                            selectedCurrency[0].currency.symbol
                        }
                    </span>
                    <span className="amount">
                        {
                            selectedCurrency[0].amount
                        }
                    </span>

                </div>
                
                
            </div>
            
        );
    }
}


const mapStateToProps = (state) => {
    const { currencies } = state.currencies;
    const { theCurrency } = state.currencies;
    const { selectedAttributes, flashIsActive } = state.cart;
    

    return {
        currencies: currencies,
        theCurrency: theCurrency,
        selectedAttributes: selectedAttributes,
        flashIsActive: flashIsActive,
       
    }
}


const mapDispatchToProps = dispatch => {
    
    return {
        setCurrencies: ownProps => dispatch(setCurrencies(ownProps)),
        setTheCurrency: ownProps => dispatch(setTheCurrency(ownProps)),
        addToCart:(ownProps) => dispatch(addToCart(ownProps)),
        updateCartTotal:ownProps => dispatch(updateCartTotal(ownProps)),
        updateCartCount:ownProps => dispatch(updateCartCount(ownProps)),
        setAttribute:ownProps => dispatch(setAttribute(ownProps)),
        setTax:() => dispatch(setTax()),
        toggleFlash:() => dispatch(toggleFlash()),
      
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

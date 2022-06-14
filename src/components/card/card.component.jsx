import { Component } from "react";

import ProductContext from "../../contexts/product.context";

import Button from "../button/button.component";
import { ReactComponent as ShoppingIcon } from "../../assets/Icon/addToCart.svg";

import './card.styles.scss';

class Card extends Component {
    static contextType = ProductContext;
    constructor(){
        super();
        this.state = {
            selectedIndex: null
        }
    }

   

    handleMouseEnter = (index) => {
       this.setState(()=>({selectedIndex: index}));
    }

    handleMouseLeave =() => {
        this.setState(()=> ({selectedIndex: null}))
    }

    findCurrency = () => {
       return this.props.product.prices.filter((price) => price.currency.label === this.context.theCurrency[1]);
    }

    render(){
        const {name, gallery, prices } = this.props.product;
        const {index} = this.props;
        const { selectedIndex } = this.state;
        const { theCurrency } = this.context;
        const selectedCurrency = this.findCurrency();
        
      

        return(
            <div className="card-container" 
            onMouseLeave={()=>this.handleMouseLeave()} 
            onMouseEnter={()=>this.handleMouseEnter(index)}
            >
                <div className='card-background-image'
                        style={{
                        backgroundImage: `url(${gallery[0]})`,
                        }}
                    />
                {selectedIndex === index ?(
                <div className="add-item" >
                    <Button buttonType={'cart'}>
                        <ShoppingIcon  className="shop-icon"/>
                    </Button>
                </div>):''
                }

                <span className="card-title">{name}</span>
                <div className="card-price">
                   
                    <span className="symbol">{selectedCurrency[0].currency.symbol}</span>
                    <span className="amount">{selectedCurrency[0].amount}</span>

                </div>
                
                
            </div>
        );
    }
}

export default Card;
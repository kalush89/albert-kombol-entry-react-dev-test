import { Component } from "react";
import { Link, Outlet} from "react-router-dom";
import { connect } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartOverlay from "../../components/cart-overlay/cart-overlay.component";
import Currency from "../../components/currency/currency.component";

import { toggleCurrencyList } from "../../store/currencies/currencies.action";
import { setActiveCategory } from "../../store/categories/categories.action";


import { ReactComponent as StoreLogo }  from '../../assets/a-logo.svg';
import {  ReactComponent as Chevron } from '../../assets/chev.svg';

import './navigation.styles.scss';

class Navigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCartOverlayOpen : false,
        }
            
        }
    

    componentDidMount(){
        this.props.setActiveCategory('all');
    }

    
    handleClick = (e) => {
        this.props.setActiveCategory(e.target.id );
    };

    toggleCartOverlay = () => {
        this.setState({
            isCartOverlayOpen: !this.state.isCartOverlayOpen
        })
    }

    handleOverlay = () => {   
      if(this.state.isCartOverlayOpen ){
            this.toggleCartOverlay()
            document.body.classList.remove("no-scroll");
      }else {
        this.toggleCartOverlay()
        document.body.classList.add("no-scroll");
      }   
    }

    render(){
        const { toggleCurrencyList, theCurrency, isCurrencyListOpen, activeCategory, cartCount } = this.props;
        return(
                
                        <div className="nav-container">
                            <div className="wrapper">
                            <div className="cat-nav-wrapper">
                            <Link className={`all-link ${activeCategory === 'all' ? 'active':''} label`} id="all" onClick={(e)=>this.handleClick(e)} to="/all">All</Link>
                            <Link className={`tech-link ${activeCategory === 'tech' ? 'active':''} label`} id="tech" onClick={this.handleClick} to="/tech">Tech</Link>
                            <Link className={`tech-link ${activeCategory === 'clothes' ? 'active':''} label`} id="clothes" onClick={this.handleClick} to="/clothes">Clothes</Link>
                            </div>
                            <Link className="logo" to="/">
                                <StoreLogo />
                            </Link>
                            <div className="actions">
                                    <div className="symbol" onClick={toggleCurrencyList}>{theCurrency[0]}</div>
                                    
                                    <Chevron onClick={toggleCurrencyList} className={isCurrencyListOpen ? 'chev-icon' : 'inverted'} />
                                     {isCurrencyListOpen && 
                                        <div className="currency-list">
                                            <Currency onClickOutside={toggleCurrencyList} />
                                        </div>
                                     }
                                <div className="cart-icon-container" onClick={()=>this.handleOverlay()}>
                                     <CartIcon />
                                     <span className={this.props.flashIsActive ? "counter-flash":""}></span>
                                        {
                                            cartCount > 0 ?
                                            <span className='item-counter'>{cartCount}</span> : ''
                                        }
                                </div>
                                {this.state.isCartOverlayOpen && <CartOverlay toggleCartOverlay={this.toggleCartOverlay} />}
                            </div>
                        </div>
{/**activeTab={activeCategory} */}
                    <Outlet  />
                    </div>
                
        );
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        toggleCurrencyList:() => dispatch(toggleCurrencyList()),
        setActiveCategory:(ownProps) => dispatch(setActiveCategory(ownProps)),
    }
};

const mapStateToProps = state => {
    const { theCurrency, isCurrencyListOpen } = state.currencies;
    const { cartItems, isOverlayOpen, cartCount, flashIsActive } = state.cart;
    const { activeCategory } = state.categories;
    return {
        theCurrency: theCurrency,
        isCurrencyListOpen: isCurrencyListOpen,
        cartItems: cartItems,
        isOverlayOpen: isOverlayOpen,
        activeCategory:activeCategory,
        cartCount: cartCount,
        flashIsActive: flashIsActive,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
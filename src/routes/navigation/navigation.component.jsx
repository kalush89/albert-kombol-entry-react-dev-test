import { Component, Fragment } from "react";
import { Link, Outlet, useOutlet, useOutletContext } from "react-router-dom";

import SwitchContext from "../../contexts/switch.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartOverlay from "../../components/cart-overlay/cart-overlay.component";


import { ReactComponent as StoreLogo }  from '../../assets/a-logo.svg';
import {  ReactComponent as Chevron } from '../../assets/Vector.svg';

import './navigation.styles.scss';
import Currency from "../../components/currency/currency.component";
class Navigation extends Component {
    static contextType = SwitchContext;

    componentDidMount(){
        this.context.setActiveTab('all');
    }
    
    handleClick = (e) => {
        this.context.setActiveTab(e.target.id );
    };

    handleCurrency = () => {
        this.context.setShowCurrencies(!this.context.showCurrencies);
    };

    render(){
        const { activeTab, isOverlayOpen, showCurrencies } = this.context;
            console.log(showCurrencies);
        return(
                <Fragment>
                        <div className="nav-container">
                            <div className="wrapper">
                            <div className="cat-nav-wrapper">
                                <span className={`${activeTab === 'all' ? 'active':''} label`} id="all" onClick={this.handleClick}>All</span>
                                <span className={`${activeTab === 'tech' ? 'active':''} label`} id="tech" onClick={this.handleClick}>Tech</span>
                                <span className={`${activeTab === 'clothes' ? 'active':''} label`} id="clothes" onClick={this.handleClick}>Clothes</span>
                            </div>
                            <Link className="logo" to="/">
                                <StoreLogo />
                            </Link>
                            <div className="actions">
                            <div className="currency-wrapper" onClick={this.handleCurrency}>
                                    <span className="symbol">$</span>
                                    
                                    <Chevron className={showCurrencies ? 'inverted' :'chev-icon'}  />
                                     {showCurrencies && 
                                     <div className="currency-list"><Currency /></div>
                                     }
                                </div>
                                <div className="cart-icon">
                                     <CartIcon  />
                                </div>
                                {isOverlayOpen && <CartOverlay />}
                            </div>
                        </div>
                    <Outlet activeTab={activeTab}/>
                    </div>
                </Fragment>
        );
    }
}

export default Navigation;
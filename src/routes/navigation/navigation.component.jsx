import { Component, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import { ReactComponent as StoreLogo }  from '../../assets/a-logo.svg';
import {  ReactComponent as Chevron } from '../../assets/Vector.svg';

import './navigation.styles.scss';

class Navigation extends Component {
    constructor(){
        super();
        this.state = {
            activeTab: 'all',
        };
    }

    handleClick = (e) => {
        this.setState(()=>{
            return {
                activeTab: e.target.id
            }
        });
        
    };

    render(){
        return(
                <Fragment>
                        <div className="nav-container">
                            <div className="wrapper">
                            <div className="cat-nav-wrapper">
                                
                                <span className={`${this.state.activeTab === 'all' ? 'active':''} label`} id="all" onClick={this.handleClick}>All</span>
                                <span className={`${this.state.activeTab === 'tech' ? 'active':''} label`} id="tech" onClick={this.handleClick}>Tech</span>
                                <span className={`${this.state.activeTab === 'clothes' ? 'active':''} label`} id="clothes" onClick={this.handleClick}>Clothes</span>
                            </div>
                            <Link className="logo" to="/">
                                <StoreLogo />
                            </Link>
                            <div className="actions">
                                <div className="currency-wrapper">
                                    <span className="symbol">$</span>
                                    <Chevron className="chev-icon" />
                                </div>
                                <div className="cart-icon">
                                     <CartIcon  />
                                </div>
                            </div>
                        </div>
                    <Outlet />
                    </div>
                </Fragment>
        );
    }
}

export default Navigation;
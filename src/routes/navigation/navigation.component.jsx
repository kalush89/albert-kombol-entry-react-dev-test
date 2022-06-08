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

        };
    }

    render(){
        return(
                <Fragment>
                        <div className="nav-container">
                            <div className="wrapper">
                            <div className="cat-nav-wrapper">
                                <span className="label">All</span>
                                <span className="label">Tech</span>
                                <span className="label">Clothes</span>
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
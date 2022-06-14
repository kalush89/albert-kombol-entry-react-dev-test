import React, { Component } from "react";

const CartContext = React.createContext();

class CartProvider extends Component {
  
  state = {
    isOverlayOpen: false,
  }

  setIsOverlayOpen = (isOverlayOpen) => {
    this.setState(() => ({isOverlayOpen}), () =>console.log(isOverlayOpen))
  }

  render(){
    const{ children } = this.props
    const{ isOverlayOpen } = this.state
    const{ setIsOverlayOpen } = this
    const value = { isOverlayOpen, setIsOverlayOpen };
    return (
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
  }
}

export default CartContext;

export { CartProvider };
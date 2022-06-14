import React, { Component } from "react";

const SwitchContext = React.createContext();

class SwitchProvider extends Component {
  
  state = {
    activeTab: '',
    isOverlayOpen: false,
    showCartIcon: false,
    showCurrencies: false,
  }

  setActiveTab = (activeTab) => {
    this.setState(() => ({activeTab}));
  }

  setIsOverlayOpen = (isOverlayOpen) => {
    this.setState(() => ({isOverlayOpen}));
  }

  setShowCurrencies = (showCurrencies) => {
    this.setState(() => ({showCurrencies}));
  }

  render(){
    const{ children } = this.props;
    const{ activeTab, isOverlayOpen, showCurrencies } = this.state;
    const{ setActiveTab, setIsOverlayOpen, setShowCurrencies } = this;
    const value = { activeTab, isOverlayOpen, showCurrencies, setActiveTab, setIsOverlayOpen, setShowCurrencies };
    return (
      <SwitchContext.Provider value={value}>{children}</SwitchContext.Provider>
    )
  }
}

export default SwitchContext;

export { SwitchProvider };
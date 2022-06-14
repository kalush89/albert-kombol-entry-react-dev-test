import React, { Component } from "react";

import { 
    runQuery, 
    GET_ALL_PRODUCTS, 
    GET_TECH_PRODUCTS, 
    GET_CLOTH_PRODUCTS,
    GET_ALL_CURRENCIES,
} from "../utils/apollo/apollo.utils";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  
  state = {
    allProducts: [],
    techProducts: [],
    clothesProducts: [],
    currencies:[],
    theCurrency:['$', 'USD'],
  }

  setAllProducts = (allProducts) => {
    this.setState(() => ({allProducts}));
  }

  setTechProducts = (techProducts) => {
    this.setState(() => ({techProducts}));
  }

  setClothesProducts = (clothesProducts) => {
    this.setState(() => ({clothesProducts}));
  }

  setCurrencies = (currencies) => {
    this.setState(() => ({currencies}));
  }

  setTheCurrency = (theCurrency) => {
    this.setState(() => ({theCurrency}));
  }


componentDidMount(){
    const allResults = runQuery(GET_ALL_PRODUCTS);
    const techResults = runQuery(GET_TECH_PRODUCTS);
    const clothesResults = runQuery(GET_CLOTH_PRODUCTS);
    const currencyResults = runQuery(GET_ALL_CURRENCIES);
    
    if(allResults && techResults && clothesResults && currencyResults){
        
        allResults.then(res => this.setAllProducts(res.data.category.products)).catch(error => {
            console.log('Error setting all products',error);
        }); 

        techResults.then(res => this.setTechProducts(res.data.category.products)).catch(error => {
            console.log('Error setting tech products',error);
        }); 

        clothesResults.then(res => this.setClothesProducts(res.data.category.products)).catch(error => {
            console.log('Error setting clothes products',error);
        }); 

        currencyResults.then(res => this.setCurrencies(res.data.currencies)).catch(error => {
          console.log('Error setting currencies',error);
      }); 
    }  
}

  render(){
    const{ children } = this.props;
    const{ allProducts, techProducts, clothesProducts, currencies, theCurrency } = this.state;
    const { setTheCurrency } = this;
    const value = { allProducts, techProducts, clothesProducts, currencies, theCurrency, setTheCurrency };
    
    return (
      <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
    )
  }
}

export default ProductContext;

export { ProductProvider };
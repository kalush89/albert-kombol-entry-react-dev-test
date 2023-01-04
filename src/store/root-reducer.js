import { combineReducers } from "redux";

import { productsReducer } from "./products/products.reducer";
import { currenciesReducer } from "./currencies/currencies.reducer";
import { cartReducer } from "./cart/cart.reducer";

import { categoriesReducer } from "./categories/categories.reducer";

export const saveToLocalStorage = (state) => {
    try {
      localStorage.setItem('state', JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };
  
  export const loadFromLocalStorage = () => {
    try {
      const stateStr = localStorage.getItem('state');
      return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

export const rootReducer = combineReducers({
    products: productsReducer,
    currencies: currenciesReducer,
    cart: cartReducer,
    categories: categoriesReducer,
});
import { CURRENCY_ACTION_TYPES } from "./currencies.types";

const INITIAL_STATE = {
    currencies:[],
    theCurrency:['$', 'USD'],
    isCurrencyListOpen: false,
};

export const currenciesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CURRENCY_ACTION_TYPES.SET_CURRENCIES:
            return { ...state, currencies: payload };
        case CURRENCY_ACTION_TYPES.SET_THE_CURRENCY:
            return { ...state, theCurrency: payload };
        case CURRENCY_ACTION_TYPES.OPEN_CURRENCY_LIST:
            return {  ...state, 
                isCurrencyListOpen: !state.isCurrencyListOpen 
             };
        default:
            return state;
    }
};
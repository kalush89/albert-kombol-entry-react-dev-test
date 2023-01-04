import { CURRENCY_ACTION_TYPES } from "./currencies.types"

export const setCurrencies = (currencies) =>({
    type:CURRENCY_ACTION_TYPES.SET_CURRENCIES,
    payload: currencies,
});

export const setTheCurrency = (currencies) =>({
    type:CURRENCY_ACTION_TYPES.SET_THE_CURRENCY,
    payload: currencies,
});

export const toggleCurrencyList = () =>({
    type:CURRENCY_ACTION_TYPES.OPEN_CURRENCY_LIST
});
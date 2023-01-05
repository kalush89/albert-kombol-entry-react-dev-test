export const getCurrencyDetails = (prices, label) => {
       return prices.filter((price) => price.currency.label === label);
    }


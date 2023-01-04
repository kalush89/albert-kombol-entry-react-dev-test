import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    cartItems: [],
    cartTotal: 0,
    cartCount: 0,
    selectedAttributes: [],
    sliderMainImages: [],
    tax: 0,
    flashIsActive: false,
};

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
            case CART_ACTION_TYPES.ADD_TO_CART:
                return { 
                    ...state,
                    cartItems: addItemToCart(state.cartItems, state.selectedAttributes, payload)
                };
       
            case CART_ACTION_TYPES.INCREASE_CART_ITEM:
                return {
                    ...state,
                    cartItems: increaseCartItemCount(state.cartItems, payload)
                };

            case CART_ACTION_TYPES.DECREASE_CART_ITEM:
                return {
                    ...state, 
                    cartItems: decreaseCartItemCount(state.cartItems, payload) 
                };

            case CART_ACTION_TYPES.UPDATE_CART_TOTAL:
                return {
                    ...state, 
                    cartTotal: updateCartTotal(state.cartItems, payload) 
                };

            case CART_ACTION_TYPES.UPDATE_CART_COUNT:
                return {
                    ...state, 
                    cartCount: updateCartCount(state.cartItems) 
                };

            case CART_ACTION_TYPES.SET_ATTRIBUTE:
                return {
                    ...state, 
                    selectedAttributes: setItemAttribute(state.selectedAttributes, payload) 
                };

            case CART_ACTION_TYPES.SET_TAX:
                return {
                    ...state, 
                    tax: setTax(state.cartTotal) 
                };

            case CART_ACTION_TYPES.SET_SLIDER_MAIN_IMAGE:
                return { 
                    ...state,
                    sliderMainImages: setMainImage(state.sliderMainImages, payload) 
                };

                case CART_ACTION_TYPES.FLASH_IS_ACTIVE:
                return {
                     ...state, 
                     flashIsActive: !state.flashIsActive  
                };

               
        default:
            return state;
    }

};  


const addItemToCart = (cartItems, selectedAttributes, itemToAdd) => {
    //get attribute(s) of the variant(itemToAdd) that was previously stored in the selectedAttributes object
    const variantAttributes = selectedAttributes.filter(item => item.productId === itemToAdd.id);
    //check if the variant exists in the cart
    const existingItem = cartItems.find(item => {
       // console.log('the boolean', JSON.stringify(item.uniqueAttributes) === JSON.stringify(variantAttributes))
       return item.id === itemToAdd.id && JSON.stringify(item.uniqueAttributes) === JSON.stringify(variantAttributes)
     } );
    
    //if variant exists increase count by one
    if (existingItem) {
        return cartItems.map(cartItem =>{
            return cartItem.id === itemToAdd.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(variantAttributes) ? { ...cartItem, count: cartItem.count + 1 } : cartItem;

         });
    } else {
         //If it doesn't, then add it
         const uniqueAttributes = [];
         variantAttributes.map(attribute => uniqueAttributes.push({
            productId: attribute.productId,
            attributeId: attribute.attributeId,
            attributeType: attribute.attributeType, 
            attributeItemValue: attribute.attributeItemValue} ) )
        return [...cartItems, { ...itemToAdd, count: 1, uniqueAttributes: uniqueAttributes }]
    }
};

const increaseCartItemCount = (cartItems, itemToIncrease) => {
    //check if the variant exists in the cart
    const existingItem = cartItems.find(item => {
        return item.id === itemToIncrease.id && JSON.stringify(item.uniqueAttributes) === JSON.stringify(itemToIncrease.uniqueAttributes)
      } );

      //if variant exists increase count by one
    if (existingItem) {
        return cartItems.map(cartItem =>
            cartItem.id === itemToIncrease.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(itemToIncrease.uniqueAttributes) ? { ...cartItem, count: cartItem.count + 1 } : cartItem
         );
        }
        return cartItems;
}



const decreaseCartItemCount = ((cartItems, itemToRemove) => {
     //check if the variant exists in the cart
     const existingItem = cartItems.find(item => {
        return item.id === itemToRemove.id && JSON.stringify(item.uniqueAttributes) === JSON.stringify(itemToRemove.uniqueAttributes)
      } );

    //if one matching item is left, remove it
    if(existingItem.count === 1) {
       return cartItems.filter(cartItem => JSON.stringify(cartItem.uniqueAttributes) !== JSON.stringify(itemToRemove.uniqueAttributes));
    }

    //else decrement cart item quantity by 1
    return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id && JSON.stringify(cartItem.uniqueAttributes) === JSON.stringify(itemToRemove.uniqueAttributes)  ? { ...cartItem, count: cartItem.count - 1 }
    : cartItem
    );
});

const updateCartTotal = (cartItems, currency) => {
    //flatten cartitems object
    const prices = cartItems.map(item => item.prices).flat();

    //select cartitem prices based on currency selected
    const theOnes = prices.filter(price => price.currency.symbol === currency);
    
    
 //selected cartitems prices
    const amounts = theOnes.map(theOne => theOne.amount);

//selected cartitems quantities
    const quantities = cartItems.map(anItem => anItem.count);
   
    let theItems=[];
    
    //create new object carrying each cartitem's price and count/quantity
    theItems = amounts.map((el, index) => {
            return {amount: el, count: quantities[index]};
    });

    //reduce to total cost of cartitems
    const theTotalPrice = theItems.reduce((total, item) =>  total + item.amount * item.count, 0);
   
    return theTotalPrice.toFixed(2);
}

const updateCartCount = cartItems => cartItems.reduce((total, cartItem)=> total + cartItem.count, 0);

//set attributes
const setItemAttribute = (selectedAttributes, {
    item,
    attributeId,
    value
}) => {
    
    // check if product has attributes
    if (item.attributes.length > 0) {
        
//if it does, check if the attribute already exists
        const existingAttribute = selectedAttributes.find(selectedAttribute => attributeId === selectedAttribute.attributeId && selectedAttribute.productId === item.id);
        //if it does, update it's value
        if (existingAttribute) {
            return selectedAttributes.map(selectedAttribute => {
                return attributeId === selectedAttribute.attributeId && selectedAttribute.productId === item.id ? {
                    ...selectedAttribute,
                    attributeItemValue: value
                } : selectedAttribute;
            });

            //if it dosen't, then add it to the object
        } else {
            
            return item.attributes.map(attribute => (
                    [{
                        productId: item.id, 
                        attributeId: attribute.id, 
                        attributeType: attribute.type, 
                        attributeItemValue: attribute.items[0].value
                    }]
           )).flat();
        }
    } else {
        return selectedAttributes;
    }
};

const setMainImage = (sliderMainImages, { image, uniqueAttributes }) => {
    const exists = sliderMainImages.find( mainImage => mainImage.id === uniqueAttributes)
    if(exists){
       return  sliderMainImages.map(mainImage =>  
        mainImage.id === uniqueAttributes ? {...mainImage, image: image}: mainImage
    )}
    return [...sliderMainImages, {image: image, id: uniqueAttributes}]
    
}

const setTax = (cartTotal) => {
   return ((21/100) * cartTotal).toFixed(2);
}


    

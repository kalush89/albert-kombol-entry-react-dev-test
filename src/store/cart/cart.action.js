import { CART_ACTION_TYPES } from "./cart.types"

export const addToCart = (itemToAdd) =>({
    type:CART_ACTION_TYPES.ADD_TO_CART,
    payload: itemToAdd
});

export const increaseItemCount = (itemToIncrease) =>({
    type:CART_ACTION_TYPES.INCREASE_CART_ITEM,
    payload: itemToIncrease
});

export const decreaseItemCount = (itemToRemove) =>({
    type:CART_ACTION_TYPES.DECREASE_CART_ITEM,
    payload: itemToRemove
});

export const updateCartTotal = currency =>({
    type:CART_ACTION_TYPES.UPDATE_CART_TOTAL,
    payload: currency,
});

export const updateCartCount = () =>({
    type:CART_ACTION_TYPES.UPDATE_CART_COUNT,
});

export const setAttribute = (item, attributeId, value) =>({
    type:CART_ACTION_TYPES.SET_ATTRIBUTE,
    payload: { item, attributeId, value }
});

export const setMainImage = (image, uniqueAttributes) =>({
    type:CART_ACTION_TYPES.SET_SLIDER_MAIN_IMAGE,
    payload: {image, uniqueAttributes}
});

export const setTax = () =>({
    type:CART_ACTION_TYPES.SET_TAX,
});

export const toggleFlash = () =>({
    type:CART_ACTION_TYPES.FLASH_IS_ACTIVE,
});






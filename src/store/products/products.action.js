import { PRODUCTS_ACTION_TYPES } from "./products.types"

export const setAllProducts = (products) =>({
    type:PRODUCTS_ACTION_TYPES.SET_ALL_PRODUCTS,
    payload: products,
});

export const setTechProducts = (products) =>({
    type:PRODUCTS_ACTION_TYPES.SET_TECH_PRODUCTS,
    payload: products,
});

export const setClothProducts = (products) =>({
    type:PRODUCTS_ACTION_TYPES.SET_CLOTH_PRODUCTS,
    payload: products,
});

export const setProductDetailImg = (image) =>({
    type:PRODUCTS_ACTION_TYPES.SET_PRODUCT_DETAIL_IMG,
    payload: image,
});

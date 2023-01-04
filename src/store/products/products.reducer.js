import { PRODUCTS_ACTION_TYPES } from "./products.types";

const INITIAL_STATE = {
    allProducts: [],
    techProducts:[],
    clothProducts:[],
    selectedImage:'',
    mainImages: [],
};

export const productsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case PRODUCTS_ACTION_TYPES.SET_ALL_PRODUCTS:
            return { ...state, allProducts: payload };
        case PRODUCTS_ACTION_TYPES.SET_TECH_PRODUCTS:
            return { ...state, techProducts: payload };
        case PRODUCTS_ACTION_TYPES.SET_CLOTH_PRODUCTS:
            return { ...state, clothProducts: payload };
        case PRODUCTS_ACTION_TYPES.SET_PRODUCT_DETAIL_IMG:
            return { ...state, selectedImage: payload };
        default:
            return state;
    }
 
};


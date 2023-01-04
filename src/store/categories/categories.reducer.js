import { CATEGORY_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
        categories:[],
    activeCategory: '',
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return { 
                ...state,
                categories: payload,
            };
        case CATEGORY_ACTION_TYPES.SET_ACTIVE_CATEGORY:
            return {
                 ...state, 
                 activeCategory: payload,
            };
           
        default:
            return state;
    }

};


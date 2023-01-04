import { CATEGORY_ACTION_TYPES } from "./categories.types"

export const setCategories = category =>({
    type:CATEGORY_ACTION_TYPES.SET_CATEGORIES,
    payload: category,
});

export const setActiveCategory = category =>({
    type:CATEGORY_ACTION_TYPES.SET_ACTIVE_CATEGORY,
    payload: category,
});


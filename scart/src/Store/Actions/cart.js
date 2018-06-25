import { ADD_TO_CART, REMOVE_CART_ITEM, CHANGE_NUMBER_OF_ITEMS } from './actionsTypes';

export const addToCart = (data) => {
    return {
        type: ADD_TO_CART,
        payLoad: data
    }
}

export const removeCartItem = id => {
    return {
        type: REMOVE_CART_ITEM,
        payLoad: id
    }
}

export const changeNumberOfItems = (value, id) => {
    value = value > 1 ? value : 1;
    return {
        type: CHANGE_NUMBER_OF_ITEMS,
        payLoad: { value, id }
    }
}
import { ADD_TO_CART, REMOVE_CART_ITEM, CHANGE_NUMBER_OF_ITEMS } from '../Actions/actionsTypes';
import { reactLocalStorage } from 'reactjs-localstorage';


const iniitalState = {
    cartitems: reactLocalStorage.getObject('cartItems').cartitems
}

const cartReducer = (state = iniitalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            reactLocalStorage.setObject('cartItems', { ...state, cartitems: { ...state.cartitems, ...action.payLoad } });
            return { ...state, cartitems: { ...state.cartitems, ...action.payLoad } };

        case REMOVE_CART_ITEM:
            const cartItemsCopy = { ...state.cartitems };
            delete cartItemsCopy[action.payLoad];
            reactLocalStorage.setObject('cartItems', { ...state, cartitems: { ...cartItemsCopy } });
            return { ...state, cartitems: { ...cartItemsCopy } };

        case CHANGE_NUMBER_OF_ITEMS:
            const cartItemsCopyToChangeCount = { ...state.cartitems };
            cartItemsCopyToChangeCount[action.payLoad.id].count = +action.payLoad.value;
            reactLocalStorage.setObject('cartItems', { ...state, cartitems: { ...cartItemsCopyToChangeCount } });
            return { ...state, cartitems: { ...cartItemsCopyToChangeCount } }

        default:
            return state;
    }
}

export default cartReducer;
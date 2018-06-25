import {GET_SINGLE_PRODUCT, SET_PRODUCTS_READY_TO_CART, SET_PRODUCT_COUNT, SET_PRODUCTS_NAME} from '../Actions/actionsTypes';

const createNameObj = (payLoad, cartReadyPro) => {
    payLoad.forEach(item => {
        cartReadyPro[item.id].product = item;
    });
    return cartReadyPro;
}

const initialState = {
    product: null,
    productReadyToCart: {}
};

const singleProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SINGLE_PRODUCT:
        return {...state, product: action.payLoad }

        case SET_PRODUCTS_READY_TO_CART:
        return {...state, productReadyToCart: {...state.productReadyToCart, ...action.payLoad}}

        case SET_PRODUCT_COUNT: 
        return {...state, productReadyToCart: {...state.productReadyToCart, [action.payLoad.id]: {...state.productReadyToCart[action.payLoad.id], count: +action.payLoad.value}}};

        case SET_PRODUCTS_NAME:
        const payLoad = createNameObj(action.payLoad, state.productReadyToCart);
        return {...state, productReadyToCart: {...payLoad}};

        default:
        return state;
    }
}
export default singleProductReducer;
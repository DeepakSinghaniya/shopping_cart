import {INITIAL_LOAD_PRODUCTS} from '../Actions/actionsTypes';

const initialState = {
    products: []
}
const shopReducer = (state = initialState, action) => {
    console.log(action.payLoad);
    switch(action.type) {
        case INITIAL_LOAD_PRODUCTS:
        return {...state, products: [...action.payLoad]};
        default:
        return state;
    }
}

export default shopReducer;
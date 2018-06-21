import {GET_SINGLE_PRODUCT} from '../Actions/actionsTypes';

const initialState = {
    product: null
};

const singleProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SINGLE_PRODUCT:
        return {...state, product: action.payLoad }

        default:
        return state;
    }
}
export default singleProductReducer;
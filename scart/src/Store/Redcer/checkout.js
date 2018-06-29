import {FATCH_USER} from '../Actions/actionsTypes';

const initialState = {
    user: {}
};


const checkoutReducer = (state = initialState, action) => {
    switch(action.type) {
        case FATCH_USER:  
        return {...state, user: action.payLoad};
        default:
        return state;
    }
}

export default checkoutReducer;
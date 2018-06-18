import {GET_PRODUCT_CATEGORIES} from '../Actions/actionsTypes';

const initialState = {
    categories: [],   
}
const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PRODUCT_CATEGORIES:
		return {...state, categories: [...action.payLoad]}
		default:
        return state;
    }
}

export default filterReducer;
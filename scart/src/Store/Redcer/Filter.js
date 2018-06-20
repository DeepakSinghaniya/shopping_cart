import { GET_PRODUCT_CATEGORIES, FILTERED_QUERY, GET_SHORT } from '../Actions/actionsTypes';

const initialState = {
    categories: [],
    attributes: [],
    query: {}
}
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES:
            return { ...state, categories: [...action.payLoad] }
            
        case FILTERED_QUERY:
            return { ...state, query: action.payLoad }

        case GET_SHORT:
        return {...state, query: {...state.query, ...action.payLoad}}

        default:
            return state;
    }
}

export default filterReducer;
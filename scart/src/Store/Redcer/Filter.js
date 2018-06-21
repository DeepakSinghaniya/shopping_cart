import { GET_PRODUCT_CATEGORIES, SET_QUERY } from '../Actions/actionsTypes';

const initialState = {
    categories: [],
    query: {
        search: '',
        category: '',
        min_price: 0,
        max_price: 0,
        order: 'desc',
        orderby: 'date'
    }
}
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORIES:
            return { ...state, categories: [...action.payLoad] };

        case SET_QUERY:
            return { ...state, query: { ...state.query, ...action.payLoad } };

        default:
            return state;
    }
}

export default filterReducer;
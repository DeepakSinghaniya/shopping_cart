import {GET_PRODUCT_CATEGORIES, SET_QUERY} from './actionsTypes';
import {get}  from '../../http/http';

export const fatchProductCateories = (data) => {
    return {
        type: GET_PRODUCT_CATEGORIES,
        payLoad: data
    };
}

export const initialLoadCategories = () => {
    return (dispatch, getStore) => {
        get('/products/categories/', {orderby:'name', exclude:15}).then(responce => {
			if(responce.status === 200) {
				dispatch(fatchProductCateories(responce.data));
			}
        });
    }
} 


export const setQuery = (query) => {
    return {
        type: SET_QUERY,
        payLoad: query
    }
} 
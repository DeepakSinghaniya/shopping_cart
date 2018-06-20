import {GET_PRODUCT_CATEGORIES, FILTERED_QUERY} from './actionsTypes';
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

export const filteredQuery = (query) => {
    return {
        type: FILTERED_QUERY,
        payLoad: query
    };
}
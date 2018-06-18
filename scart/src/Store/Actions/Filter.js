import {GET_PRODUCT_CATEGORIES} from './actionsTypes';
import http  from '../../http/http';

export const fatchProductCateories = (data) => {
    return {
        type: GET_PRODUCT_CATEGORIES,
        payLoad: data
    };
}

export const initialLoadCategories = (offset) => {
    return (dispatch, getStore) => {
        http.get('/products/categories/?orderby=name&exclude=15').then(responce => {
			if(responce.status === 200) {
				dispatch(fatchProductCateories(responce.data));
			}
        });
    }
} 
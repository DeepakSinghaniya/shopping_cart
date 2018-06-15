import {INITIAL_LOAD_PRODUCTS} from './actionsTypes';
import http  from '../../http/http';

export const fatchProducts = (data) => {
    return {
        type: INITIAL_LOAD_PRODUCTS,
        payLoad: data
    };
}

export const initialLoadProducts = () => {
    return (dispatch, getStore) => {
        http.get('/products/?per_page=20').then(responce => {
            dispatch(fatchProducts(responce.data));
        });
    }
} 
import {INITIAL_LOAD_PRODUCTS, SHOW_LOADER, HIDE_LOADER} from './actionsTypes';
import http  from '../../http/http';
import {PER_PAGE} from '../../utility/config';

export const fatchProducts = (data) => {
    return {
        type: INITIAL_LOAD_PRODUCTS,
        payLoad: data
    };
}
export const showLoader = () => {
    return {
        type: SHOW_LOADER,
    };
}

export const hideLoader = () => {
    return {
        type: HIDE_LOADER,
    };
}

export const initialLoadProducts = (offset) => {
    return (dispatch, getStore) => {
		dispatch(showLoader());
        http.get('/products/?per_page='+PER_PAGE+'&offset='+offset).then(responce => {
			if(responce.status === 200) {
				dispatch(fatchProducts(responce.data));
			}
			dispatch(hideLoader());
        });
    }
} 
import {INITIAL_LOAD_PRODUCTS, SHOW_LOADER, HIDE_LOADER, LOAD_MORE} from './actionsTypes';
import http  from '../../http/http';
import { stringify } from 'query-string';
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
        const store = getStore();
        let query = {...store.filter.query};
        Object.keys(store.filter.query).forEach((key) => {
            if(!query[key]) {
                delete query[key]
            }
        }); 
        const queryString = stringify({...query, per_page: PER_PAGE, offset: offset});
		dispatch(showLoader());
        http.get('/products/?'+queryString).then(responce => {
			if(responce.status === 200) {
				dispatch(fatchProducts(responce.data));
			}
			dispatch(hideLoader());
        });
    }
} 


export const loadMoreProducts = (data) => {
    return {
        type: LOAD_MORE,
        payLoad: data
    }
}

export const loadMore = (offset) => {
    return (dispatch, getStore) => {
        const store = getStore();
        let query = {...store.filter.query};
        Object.keys(store.filter.query).forEach((key) => {
            if(!query[key]) {
                delete query[key]
            }
        }); 
        const queryString = stringify({...query, per_page: PER_PAGE, offset: offset});
		dispatch(showLoader());
        http.get('/products/?'+queryString).then(responce => {
			if(responce.status === 200) {
				dispatch(loadMoreProducts(responce.data));
			}
			dispatch(hideLoader());
        });
    }
}
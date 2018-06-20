import {INITIAL_LOAD_PRODUCTS, SHOW_LOADER, HIDE_LOADER, LOAD_MORE, GET_SHORT} from './actionsTypes';
import {get}  from '../../http/http';
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

        const querydata = {...query, per_page: PER_PAGE, offset: offset};
		dispatch(showLoader());
        get('/products/', querydata).then(responce => {
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
        const queryData = {...query, per_page: PER_PAGE, offset: offset};
		dispatch(showLoader());
        get('/products/', queryData).then(responce => {
			if(responce.status === 200) {
				dispatch(loadMoreProducts(responce.data));
			}
			dispatch(hideLoader());
        });
    }
}




export const getShort = (short) => {
    return {
        type: GET_SHORT,
        payLoad: short
    };
}
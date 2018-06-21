import {GET_SINGLE_PRODUCT, HIDE_LOADER, SHOW_LOADER} from './actionsTypes';
import {get} from '../../http/http';


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

export const setSingleProduct = data => {
    return {
        type: GET_SINGLE_PRODUCT,
        payLoad: data
    }
}

export const getSingleProduct = (id) => {
    return (dispatch, getStore) => {
        dispatch(showLoader());
        get('/products/'+id).then(responce => {
            dispatch(setSingleProduct(responce.data));
            dispatch(hideLoader());
        });
    }
}
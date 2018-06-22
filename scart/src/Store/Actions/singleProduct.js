import {GET_SINGLE_PRODUCT, HIDE_LOADER, SHOW_LOADER, SET_PRODUCTS_READY_TO_CART, SET_PRODUCT_COUNT, SET_PRODUCTS_NAME} from './actionsTypes';
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
        console.log('test');
        get('/products/'+id).then(responce => {
            dispatch(setSingleProduct(responce.data));
            console.log(responce.data.type);
            if(responce.data.type === 'grouped') {
                dispatch(getProductsName(responce.data.grouped_products));
            }
            dispatch(hideLoader());
        });
    }
}

export const setProductsReadyToCart = (data) => {
    return {
        type: SET_PRODUCTS_READY_TO_CART,
        payLoad: data
    }
}

export const setProductCount = (data) => {
    console.log(data);
    return {
        type: SET_PRODUCT_COUNT,
        payLoad: data
    }
}


export const setProductsName = (data) => {
    return {
        type: SET_PRODUCTS_NAME,
        payLoad: data
    }
}
export const getProductsName = (ids) => {
    const query = {include: ids.join(',')}
    return (dispatch, getState) => {
        get('/products/', query).then(responce => {
            if (responce.status === 200) {
                dispatch(setProductsName(responce.data));
            }
        });
    }

}

        
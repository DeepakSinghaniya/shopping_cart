import {FATCH_USER} from './actionsTypes';
import {get, post} from '../../http/http';


export const setuser = (data) => {  
    return {
        type: FATCH_USER,
        payLoad: data
    }
}


export const fatchUser = () => {
    return (dispatch, getState) => {
        get('/customers/1/').then(responce => {
            dispatch(setuser(responce.data));
        });
    }
}

export const createOrder = (order) => {
    return (dispatch, getState) => {
        post('/orders/', order).then(responce => {
           console.log(responce);  
        });
    }
}
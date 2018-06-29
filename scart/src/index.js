import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import shopReducer from './Store/Redcer/Shop';
import filterReducer from './Store/Redcer/Filter';
import cartReducer from './Store/Redcer/cart';
import checkoutReducer from './Store/Redcer/checkout';
import singleProductReducer from './Store/Redcer/SingleProduct';
import registerServiceWorker from './registerServiceWorker';
import { SHOW_LOADER, HIDE_LOADER } from './Store/Actions/actionsTypes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    shop: shopReducer,
    filter: filterReducer,
    sinPro: singleProductReducer,
    cart: cartReducer,
    checkout: checkoutReducer
});

const loader = store => next => action => {
    if ('function' === typeof (action)) {
        next(action);
        next({ type: SHOW_LOADER });
    } else {
        next({ type: HIDE_LOADER });
        next(action);
    }
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(loader, thunk)));
const appObj = <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>;
ReactDOM.render(appObj, document.getElementById('root'));
registerServiceWorker();

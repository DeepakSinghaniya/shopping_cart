import { INITIAL_LOAD_PRODUCTS, SHOW_LOADER, HIDE_LOADER, LOAD_MORE, SHOW_LOAD_MORE } from '../Actions/actionsTypes';
import {PER_PAGE} from '../../utility/config';

const initialState = {
	products: [],
	loader: false,
	offset: 0,
	showLoadMore: true
}
const shopReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIAL_LOAD_PRODUCTS:
			let productCount = action.payLoad.length;
			let initShowLoadMore = action.payLoad.length < PER_PAGE ? false: true;
			return { ...state, products: [...action.payLoad], offset: productCount, showLoadMore:  initShowLoadMore };

		case LOAD_MORE:
			let productLoadCount = state.offset + action.payLoad.length;
			let showLoadMore = action.payLoad.length < PER_PAGE ? false: true;
			return { ...state, products: [...state.products, ...action.payLoad], offset: productLoadCount, showLoadMore:  showLoadMore};

		case SHOW_LOAD_MORE:
		return { ...state, showLoadMore: action.payLoad };

		case SHOW_LOADER:
			return { ...state, loader: true }

		case HIDE_LOADER:
			return { ...state, loader: false }

		default:
			return state;
	}
}

export default shopReducer;
import { INITIAL_LOAD_PRODUCTS, SHOW_LOADER, HIDE_LOADER, LOAD_MORE } from '../Actions/actionsTypes';

const initialState = {
	products: [],
	loader: false,
	offset: 0
}
const shopReducer = (state = initialState, action) => {
	switch (action.type) {
		case INITIAL_LOAD_PRODUCTS:
			let productCount = action.payLoad.length;
			return { ...state, products: [...action.payLoad], offset: productCount };

		case LOAD_MORE:
			let productLoadCount = state.offset + action.payLoad.length;
			return { ...state, products: [...state.products, ...action.payLoad], offset: productLoadCount };

		case SHOW_LOADER:
			return { ...state, loader: true }

		case HIDE_LOADER:
			return { ...state, loader: false }

		default:
			return state;
	}
}

export default shopReducer;
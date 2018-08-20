import { handleActions } from 'redux-actions';
import { fromJS, List, Map } from 'immutable';

import { 
	WIPE_STATE,
	LOAD_BATCH,
	FETCH_PRODUCTS_REQUEST,
	FETCH_PRODUCTS_SUCCESS,
	FETCH_PRODUCTS_FAILED,
	FETCH_AD_REQUEST,
	FETCH_AD_SUCCESS,
	FETCH_AD_FAILED,
	END_OF_PRODUCTS,
	RESET_PRODUCTS,
	SET_SORT,
} from '../actions/types';

import { constants } from '../i18n/constants';

const initialState = fromJS({
	items: [],

	products: [],
	sort: constants.SORTS.PRICE, // move to constants file
	totalFetched: 0,
	isFetchingProd: false,

	ads: [],
	stopFetching: false,
	isFetchingAd: false,
	nextAd: 0,
});

const globalReducer = handleActions({
	[LOAD_BATCH]: (state, action) => {
		let newItems = state.get('products', List([])).take(19);
		const ads = state.get('ads', List([]));
		const nextAd = state.get('nextAd', 0);
		if (newItems.size === 19  && ads.size) {
			newItems = newItems.push(ads.get(nextAd % ads.size));
		}
		return state.merge({
			items: state.get('items', List([]))
				 					.push(...newItems),
			products: state.get('products', List([])).slice(19),
			nextAd: nextAd + 1,
		});
	},
	[SET_SORT]: (state, action) => {
		return state.set('sort', action.payload.sort);
	},
	[RESET_PRODUCTS]: state => {
		return state.merge({
			items: List([]),
			products: List([]),
			stopFetching: false,
			totalFetched: 0,
		});
	},
	[FETCH_PRODUCTS_REQUEST]: state => {
		return state.set('isFetchingProd', true);
	},
	[FETCH_PRODUCTS_SUCCESS]: (state, action) => {
		return state.merge({
			products: state.get('products', List([]))
						   			 .push(...action.payload.products),
			isFetchingProd: false,
			totalFetched: state.get('totalFetched', 0) + action.payload.products.size,
		});
	},
	[FETCH_PRODUCTS_FAILED]: (state, action) => {
		return state.set('isFetchingProd', false);
	},
	[FETCH_AD_REQUEST]: state => {
		return state.set('isFetchingAd', true);
	},
	[FETCH_AD_SUCCESS]: (state, action) => {
		return state.merge({
			ads: fromJS(action.payload.ads),
			isFetchingAd: false,
		});
	},
	[FETCH_AD_FAILED]: (state, action) => {
		return state.set('isFetchingAd', false);
	},
	[END_OF_PRODUCTS]: (state) => {
		return state.merge({
			products: state.get('products', List([]))
						   			 .push(Map({id: 'end'})),
			stopFetching: true,
		});
	},
	[WIPE_STATE]: state => {
		return initialState;
	}
}, initialState);

export default globalReducer;
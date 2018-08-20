import { fromJS } from 'immutable';

import {
		WIPE_STATE,
		LOAD_BATCH,
		FETCH_PRODUCTS_REQUEST,
		FETCH_PRODUCTS_FAILED,
		FETCH_PRODUCTS_SUCCESS,
		FETCH_AD_REQUEST,
		FETCH_AD_FAILED,
		FETCH_AD_SUCCESS,
		PRELOAD_ITEMS,
		LOAD_ITEMS,
		END_OF_PRODUCTS,
		SET_SORT,
		RESET_PRODUCTS,
} from './types';

export function setSort(sort) {
		return {
				type: SET_SORT,
				payload: {
						sort
				}
		}
}

export function preloadItems() {
		return {
				type: PRELOAD_ITEMS,
		}
}

export function loadItems() {
		return {
				type: LOAD_ITEMS,
		}
}

export function reqProductsFetch() {
		return {
				type: FETCH_PRODUCTS_REQUEST
		}
}

export function productsFetched(products) {
		return {
				type: FETCH_PRODUCTS_SUCCESS,
				payload: {
						products,
				}
		}
}

export function failedProductFetch() {
		return {
				type: FETCH_PRODUCTS_FAILED
		}
}

export function reqAdFetch() {
		return {
				type: FETCH_AD_REQUEST
		}
}

export function adsFetched(ads) {
		return {
				type: FETCH_AD_SUCCESS,
				payload: {
						ads,
				}
		}
}

export function failedAdFetch() {
		return {
				type: FETCH_AD_FAILED
		}
}

export function loadBatch() {
		return {
				type: LOAD_BATCH
		}
}

export function endOfProducts() {
		return {
				type: END_OF_PRODUCTS
		}
}

export function reset() {
		return {
				type: RESET_PRODUCTS
		}
}


export function wipeState() {
		return {
				type: WIPE_STATE
		}
}
import {
		call,
		put,
		select,
		delay,
		all,
		race,
		take,
} from "redux-saga/effects";
import {
		List,
		fromJS,
} from 'immutable';

import {
		PRELOAD_ITEMS,
		LOAD_ITEMS,
		SET_SORT,
} from '../actions/types';
import {
		getProducts,
		getAds,
} from '../middleware/api';
import {
		failedProductFetch,
		productsFetched,
		reqProductsFetch,
		failedAdFetch,
		adsFetched,
		reqAdFetch,
		loadBatch,
		endOfProducts,
		loadItems,
		reset,
} from '../actions/global';
import { constants } from '../i18n/constants';

function* fetchProducts() {
		const LIMIT = 40;
		try {
				const isFetching = yield select(state => state.global.get('isFetchingProd', false));
				if (isFetching) return;
				yield put(reqProductsFetch());
				const skip = yield select(state => state.global.get('totalFetched', 0));
				const sort = yield select(state => state.global.get('sort', constants.SORTS.PRICE));
				const resp = yield call(getProducts, sort, LIMIT, skip);
				if (resp.size < LIMIT) {
						yield put(endOfProducts());
				}
				yield put(productsFetched(resp));
		} catch (err) {
				yield put(failedProductFetch());

				yield call(delay, 1000);
				yield call(fetchProducts); // TODO: backoff instead of delay?
		}
}

function* fetchAds() {
		try {
				const isFetching = yield select(state => state.global.get('isFetchingAd', false));
				if (isFetching) return;

				yield put(reqAdFetch());
				const resp = yield call(getAds, 16);
				yield put(adsFetched(resp));
		} catch (err) {
				yield put(failedAdFetch());

				yield call(delay, 1000);
				yield call(fetchAds); // TODO: backoff instead of delay?
		}
}

function* preloadItems() {
		try {
				while(true) {
						yield take(PRELOAD_ITEMS);
						yield call(fetchProducts);
				}
		} catch (err) {
				console.error(err);
		}
}

function* load() {
		try {
				while(true) {
						yield take(LOAD_ITEMS);
						yield put(loadBatch());
				}
		} catch (err) {
			 console.error(err);
		}
}

function* reinit() {
		try {
				while(true) {
						yield take(SET_SORT);
						yield put(reset());
						yield call(fetchProducts);
						yield put(loadBatch());
				}
		} catch (err) {
				console.error(err);
		}
}

function* initialLoad() {
		try {
				yield call(fetchProducts);
				yield call(fetchAds);
				yield put(loadBatch());
		} catch (err) {
				console.error(err);
		}
}

export function* rootSaga() {
  while (true) {
	  	yield call(initialLoad);
	    try {
		      const tasks = {
			        preload: call(preloadItems),
			        load: call(load),
			        reinit: call(reinit),
		      };
		      yield race(tasks);
	    } catch (err) {
	    		console.error(err);
	    }
  }
}


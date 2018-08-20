import axios from 'axios';
import {
		JSONStreamToArray,
		getInt
} from '../utility/utility';
import { fromJS, List, Map } from 'immutable';

export async function getAd(id) {
		const resp = await axios(
				`/ad/?r=${id}`,
				{ 
						method: 'get',
				}
		);
		return resp;
}

export async function getAds(n) {
		// TODO: maybe filter the list for empties afterwards and move on.
		let ads = List([]);
		for (let i = 0; i < n; i++) {
				const ad = await getAd(i);
				if (ad.error) {
					i--;
					continue;
				}
				ads = ads.push(Map({id: 'ad', src: ad.request.responseURL}));
		}
		return ads;
}

export async function getProducts(sort, limit, skip) {
		const resp = await axios(
				`/api/products?sort=${sort}&limit=${limit}&skip=${skip}`,
				{ 
						method: 'get',
						responseType: 'stream',
				}
		);
		return fromJS(JSONStreamToArray(resp.data)); 
}
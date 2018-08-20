// LOGIN UNIT TESTS
import { List, Map, fromJS } from 'immutable';
import globalReducer from './global';
import assert from 'assert';
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  FETCH_AD_REQUEST,
  FETCH_AD_SUCCESS,
  FETCH_AD_FAILED,
  END_OF_PRODUCTS,
  RESET_PRODUCTS,
  SET_SORT,
  LOAD_BATCH,
} from '../actions/types';
import { constants } from '../i18n/constants';


/* INITIAL STATE */
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


/* PRODUCT */
const productPayload = fromJS([
    {"id":"76773-4118mkyb5dvwwed6wcdeso47vi","size":17,"price":1,"face":"( .-. )"},
    {"id":"25351-1vwrges43wng1npvmwwds1nhfr","size":37,"price":1,"face":"( .o.)"},
    {"id":"25182-ydw7gjj9ur3sqmwwo6v9rudi","size":17,"price":1,"face":"( `·´ )"},
    {"id":"79988-w2uvuvi6myq88elu88gaxlxr","size":26,"price":1,"face":"( ° ͜ ʖ °)"},
    {"id":"69332-oxgahxy632scijiunvmdbzkt9","size":19,"price":1,"face":"( ͡° ͜ʖ ͡°)"},
    {"id":"27131-wk3fsmtz0s22flqlpjwtgldi","size":32,"price":1,"face":"( ⚆ _ ⚆ )"},
    {"id":"64360-4hs7ecch0getq7tkapwwwgsyvi","size":35,"price":1,"face":"( ︶︿︶)"},
    {"id":"61367-p1pxa05yrznnvp44qzty5jyvi","size":32,"price":1,"face":"( ﾟヮﾟ)"},
    {"id":"87240-tylv09vo7liar4gf438wu3di","size":12,"price":1,"face":"(\\/)(°,,,°)(\\/)"},
    {"id":"39572-c4vzfnnyq0dv6fkilbmd9529","size":30,"price":1,"face":"(¬_¬)"},
    {"id":"98796-di2xtmgr6k2phluv02s79o1or","size":18,"price":2,"face":"(¬º-°)¬"},
    {"id":"76096-1g6nggva3pbmgj9pcqcysqbyb9","size":36,"price":2,"face":"(¬‿¬)"},
    {"id":"16266-k36ayw9te7zo6xltwn6k73nmi","size":40,"price":2,"face":"(°ロ°)☝"},
    {"id":"78017-jllxvnm3id9n0ca7jznz5mi","size":41,"price":2,"face":"(´・ω・)っ"},
    {"id":"52278-smobg3vtvodfttyanh4jcerk9","size":12,"price":2,"face":"(ó ì_í)"},
    {"id":"82808-jlbnkvzq0epv9rcf8uya7zaor","size":31,"price":2,"face":"(ʘᗩʘ')"},
    {"id":"12992-7rwi4w5djk3j90r4yxyrlr3sor","size":26,"price":2,"face":"(ʘ‿ʘ)"},
    {"id":"85509-scv2tazr2ckx4fiz19m12lnmi","size":41,"price":2,"face":"(̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄"},
    {"id":"73961-lv2pl4ypxjleligky8kw3ik9","size":31,"price":2,"face":"(͡° ͜ʖ ͡°)"},
    {"id":"41529-72cpd8trmkxz6crazlrgsexw29","size":24,"price":2,"face":"ᕦ( ͡° ͜ʖ ͡°)ᕤ"},
    {"id":"97980-kgcnsul85z6uql6lubnsif6r","size":36,"price":3,"face":"(ಠ_ಠ)"},
    {"id":"76728-arbu7nadvqq7u5lpk1mgf1or","size":38,"price":3,"face":"(ಠ‿ಠ)"},
    {"id":"80060-o0bn9k03irqu6lmn1rdon7b9","size":34,"price":3,"face":"(ಠ⌣ಠ)"},
    {"id":"37362-m6lpey8zrtm48j5vw0xav2t9","size":31,"price":3,"face":"(ಥ_ಥ)"},
    {"id":"27653-w0eaq1chotihrc2gzohb5u3di","size":29,"price":3,"face":"(ಥ﹏ಥ)"},
    {"id":"23231-19mq4qrxhbjo04bazrihzuayvi","size":38,"price":3,"face":"(ง ͠° ͟ل͜ ͡°)ง"},
    {"id":"32732-enxxhwp40tbtr50dwtqgz4zpvi","size":31,"price":3,"face":"(ง ͡ʘ ͜ʖ ͡ʘ)ง"},
    {"id":"90223-o42s8nk8cqwlpkzmxqi79zfr","size":36,"price":3,"face":"(ง •̀_•́)ง"},
    {"id":"1846-a92iqy4wnpac3589qi0c3ow29","size":19,"price":3,"face":"(ง'̀-'́)ง"},
    {"id":"51001-w8a4n41egyypn8ye01mdkj4i","size":25,"price":3,"face":"(ง°ل͜°)ง"},
    {"id":"78475-ojekhgi00reia68n0ntofajor","size":16,"price":4,"face":"(ง⌐□ل͜□)ง"},
    {"id":"1990-ndppxw22ufb4ip6dmkuoywrk9","size":38,"price":4,"face":"(ღ˘⌣˘ღ)"},
    {"id":"67221-iybp13xuxxtch6oh3b47psyvi","size":23,"price":4,"face":"(ᵔᴥᵔ)"},
    {"id":"81932-0lmihbiq3vy8wlq2s9cjvy4x6r","size":36,"price":4,"face":"(•ω•)"},
    {"id":"45524-zhtzc20u5pgfe7doncx2sm7vi","size":21,"price":4,"face":"(•◡•)/"},
    {"id":"55881-5bpkqbq6lobpev8ywweuhm2t9","size":33,"price":4,"face":"(⊙ω⊙)"},
    {"id":"88185-y88ti8xt6p5e2b636561or","size":32,"price":4,"face":"(⌐■_■)"},
    {"id":"41180-8m6wsowc6efhfotmgu33j714i","size":33,"price":4,"face":"(─‿‿─)"},
    {"id":"12726-2rt8t12hfredez7c2y7s24kj4i","size":24,"price":4,"face":"(╯°□°）╯"},
    {"id":"13508-uzfqg3mmw5zanx3mg12pxecdi","size":14,"price":4,"face":"(◕‿◕)"},
]);
const reqProducts = initialState.merge({
    isFetchingProd: true,
}).toJS();
const productsFetched = initialState.merge({
    isFetchingProd: false,
    products: productPayload,
    totalFetched: productPayload.size,
}).toJS()
const failedProductsReq = initialState.merge({
    isFetchingProd: false,
}).toJS();
const resetProductsState = initialState.merge({
    items: List([]),
    products: List([]),
    stopFetching: false,
    totalFetched: 0,
}).toJS();
const endOfProductsState = initialState.merge({
    products: [ {id: 'end'} ],
    stopFetching: true,
}).toJS();

/* ADS */
const adsPayload = fromJS([
    {id: "ad", src: "http://placekitten.com/320/200?image=1"},
    {id: "ad", src: "http://placekitten.com/320/200?image=2"},
    {id: "ad", src: "http://placekitten.com/320/200?image=3"},
    {id: "ad", src: "http://placekitten.com/320/200?image=4"},
    {id: "ad", src: "http://placekitten.com/320/200?image=5"},
]);
const reqAds = initialState.merge({
    isFetchingAd: true,
}).toJS();
const adsFetched = initialState.merge({
    isFetchingAd: false,
    ads: adsPayload,
}).toJS()
const failedAdsReq = initialState.merge({
    isFetchingAd: false,
}).toJS();


/* COMPONENT */
const setSortToSize = initialState.merge({
    sort: 'size',
}).toJS();


/* MISC */
const batchLoaded = initialState.merge({
    items: List([
        ...productPayload.take(19),
        adsPayload.first()
    ]),
    products: productPayload.slice(19),
    totalFetched: productPayload.size,
    ads: adsPayload,
    nextAd: 1,
}).toJS();
const fetchedAll = initialState.merge({
    products: productPayload,
    totalFetched: productPayload.size,
    ads: adsPayload,
}).toJS();

/*  MOCK INFO */
let state = globalReducer(undefined, {});
describe('global reducer', () => {
    beforeEach(() => {
        state = globalReducer(undefined, {});
    });

    describe('inital state', () => {
        it('should be a Map', () => {
            assert.strictEqual(Map.isMap(state), true);
        });
    });

    // PRODUCT FETCHING START
    describe('FETCH_PRODUCTS_REQUEST', () => {
        it('show pending state', () => {
            state = fireAction(state, { type: FETCH_PRODUCTS_REQUEST });
            assert.deepEqual(state.toJS(), reqProducts);
        });
    });
    describe('FETCH_PRODUCTS_SUCCESS', () => {
        it('show resolved state after product fetch', () => {
            state = fireAction(state, { type: FETCH_PRODUCTS_REQUEST });
            assert.deepEqual(state.toJS(), reqProducts);
            state = fireAction(state, {
                type: FETCH_PRODUCTS_SUCCESS,
                payload: { products: productPayload },
            });
            assert.deepEqual(state.toJS(), productsFetched);
        });
    });
    describe('FETCH_PRODUCTS_FAILED', () => {
        it('show failed product fetch state', () => {
            state = fireAction(state, { type: FETCH_PRODUCTS_REQUEST });
            assert.deepEqual(state.toJS(), reqProducts);
            state = fireAction(state, { type: FETCH_PRODUCTS_FAILED });
            assert.deepEqual(state.toJS(), failedProductsReq);
        });
    });
    // PRODUCT FETCHING END


    // AD FETCHING START
    describe('FETCH_AD_REQUEST', () => {
        it('show pending state', () => {
            state = fireAction(state, { type: FETCH_AD_REQUEST });
            assert.deepEqual(state.toJS(), reqAds);
        });
    });
    describe('FETCH_AD_SUCCESS', () => {
        it('show resolved state after ads fetch', () => {
            state = fireAction(state, { type: FETCH_AD_REQUEST });
            assert.deepEqual(state.toJS(), reqAds);
            state = fireAction(state, {
                type: FETCH_AD_SUCCESS,
                payload: { ads: adsPayload },
            });
            assert.deepEqual(state.toJS(), adsFetched);
        });
    });
    describe('FETCH_AD_FAILED', () => {
        it('show failed ads fetch state', () => {
            state = fireAction(state, { type: FETCH_AD_REQUEST });
            assert.deepEqual(state.toJS(), reqAds);
            state = fireAction(state, { type: FETCH_AD_FAILED });
            assert.deepEqual(state.toJS(), failedAdsReq);
        });
    });
    // AD FETCHING END

    describe('END_OF_PRODUCTS', () => {
        it('end of products state', () => {
            state = fireAction(state, { type: END_OF_PRODUCTS });
            assert.deepEqual(state.toJS(), endOfProductsState);
        });
    });

    describe('RESET_PRODUCTS', () => {
        it('reset products state', () => {
            state = fireAction(state, { type: RESET_PRODUCTS });
            assert.deepEqual(state.toJS(), resetProductsState);
        });
    });

    describe('SET_SORT', () => {
        it('state after setting sort type to [size]', () => {
            state = fireAction(state, {
                type: SET_SORT,
                payload: { sort: 'size' }
            });
            assert.deepEqual(state.toJS(), setSortToSize);
        });
    });

    describe('LOAD_BATCH', () => {
        it('loading a batch of products and ads after fetching both', () => {
            // fetching products
            state = fireAction(state, {
                type: FETCH_PRODUCTS_SUCCESS,
                payload: { products: productPayload },
            });
            assert.deepEqual(state.toJS(), productsFetched);

            // fetching ads
            state = fireAction(state, {
                type: FETCH_AD_SUCCESS,
                payload: { ads: adsPayload },
            });
            assert.deepEqual(state.toJS(), fetchedAll);

            // loading a batch
            state = fireAction(state, { type: LOAD_BATCH });
            assert.deepEqual(state.toJS(), batchLoaded);
        });
    });

});

function fireAction(currentState, action) {
  return globalReducer(currentState, action);
}

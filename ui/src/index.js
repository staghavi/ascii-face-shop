import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import createSagaMiddleware from "redux-saga";
import { rootSaga } from './sagas/sagas';

import reducers from './reducers/';
import App from './containers/App';

import './styles/style.css';
import './styles/animations.css';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  	reducers,
  	Map({}),
  	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

render(
  	<Provider store={ store }>
  		  <App />
  	</Provider>,
  	document.getElementById('root')
);
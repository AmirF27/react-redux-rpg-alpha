import '../scss/main.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from './state/reducers';
import Game from './containers/Game';

// -------------------
import rootSaga from './sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();
// --------------------


const createStoreWithMiddleware = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

// --------------------
sagaMiddleware.run(rootSaga);
// --------------------


ReactDOM.render((
  <Provider store={createStoreWithMiddleware}>
    <Game />
  </Provider>
  ),
  document.getElementById('game')
);

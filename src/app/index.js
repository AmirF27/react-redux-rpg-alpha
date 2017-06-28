import '../scss/main.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from './state/reducers';
import Main from './containers/Main';

// -------------------
import rootSaga from './sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();
// --------------------


export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware),
));

// --------------------
sagaMiddleware.run(rootSaga);
// --------------------


ReactDOM.render((
  <Provider store={store}>
    <Main />
  </Provider>
  ),
  document.getElementById('game')
);

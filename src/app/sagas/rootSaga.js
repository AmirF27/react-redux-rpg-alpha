import { all } from 'redux-saga/effects';

// Sagas
import gameSaga from './gameSaga'

// Single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    gameSaga()
  ]);
}

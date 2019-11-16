import { all } from 'redux-saga/effects';
import homeSaga from './app/modules/HomePage/sagas';

export default function* rootSaga() {
  yield all([homeSaga()]);
}

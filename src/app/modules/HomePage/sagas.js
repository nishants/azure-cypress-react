import { takeLatest } from 'redux-saga/effects';

import { HOME_ACTIONS } from './actions';

function setSearckKyInUrl({ payload: { searchString } }) {
  window.location.hash = searchString
    ? `${window.location.hash.split('?')[0]}?search=${searchString}`
    : window.location.hash.split('?')[0];
}

export default function* missionsSagas() {
  yield takeLatest(HOME_ACTIONS.SEARCH_FOR_KEY, setSearckKyInUrl);
}

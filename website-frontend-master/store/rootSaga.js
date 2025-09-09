import { all, fork } from 'redux-saga/effects';
import productSaga from './products/productSaga';
import comicSaga from './comics/comicSaga';
import audioStorySaga from './audioStories/audioStorySaga';
import videoSaga from './videos/videoSaga';
import customerStorySaga from './customerStories/customerStorySaga';
import competitionSaga from './competition/competitionSaga';

export default function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(comicSaga),
    fork(audioStorySaga),
    fork(videoSaga),
    fork(customerStorySaga),
    fork(competitionSaga),
  ]);
} 
import { combineReducers } from 'redux';
import productReducer from './products/productReducer';
import comicReducer from './comics/comicReducer';
import audioStoryReducer from './audioStories/audioStoryReducer';
import videoReducer from './videos/videoReducer';
import customerStoryReducer from './customerStories/customerStoryReducer';
import competitionReducer from './competition/competitionReducer';

const rootReducer = combineReducers({
  products: productReducer,
  comics: comicReducer,
  audioStories: audioStoryReducer,
  videos: videoReducer,
  customerStories: customerStoryReducer,
  competitions: competitionReducer,
});

export default rootReducer; 
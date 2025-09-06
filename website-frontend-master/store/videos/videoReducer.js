import * as types from './videoActionTypes';

const initialState = {
  videos: [],
  featuredVideos: [],
  presenters: [],
  ages: [],
  videosByPresenter: {
    videos: [],
    presenter: '',
  },
  videosByDuration: {
    videos: [],
    sortedBy: '',
  },
  searchResults: {
    results: [],
    query: '',
  },
  currentVideo: null,
  error: {
    videos: null,
    featuredVideos: null,
    presenters: null,
    ages: null,
    videosByPresenter: null,
    videosByDuration: null,
    searchResults: null,
    currentVideo: null,
  },
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all videos
    case types.FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        error: { ...state.error, videos: null },
      };
    case types.FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload,
      };
    case types.FETCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: { ...state.error, videos: action.payload },
      };

    // Fetch featured videos
    case types.FETCH_FEATURED_VIDEOS_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredVideos: null },
      };
    case types.FETCH_FEATURED_VIDEOS_SUCCESS:
      return {
        ...state,
        featuredVideos: action.payload,
      };
    case types.FETCH_FEATURED_VIDEOS_FAILURE:
      return {
        ...state,
        error: { ...state.error, featuredVideos: action.payload },
      };

    // Fetch presenters
    case types.FETCH_PRESENTERS_REQUEST:
      return {
        ...state,
        error: { ...state.error, presenters: null },
      };
    case types.FETCH_PRESENTERS_SUCCESS:
      return {
        ...state,
        presenters: action.payload,
      };
    case types.FETCH_PRESENTERS_FAILURE:
      return {
        ...state,
        error: { ...state.error, presenters: action.payload },
      };

    // Fetch video ages
    case types.FETCH_VIDEO_AGES_REQUEST:
      return {
        ...state,
        error: { ...state.error, ages: null },
      };
    case types.FETCH_VIDEO_AGES_SUCCESS:
      return {
        ...state,
        ages: action.payload,
      };
    case types.FETCH_VIDEO_AGES_FAILURE:
      return {
        ...state,
        error: { ...state.error, ages: action.payload },
      };

    // Fetch videos by presenter
    case types.FETCH_VIDEOS_BY_PRESENTER_REQUEST:
      return {
        ...state,
        error: { ...state.error, videosByPresenter: null },
      };
    case types.FETCH_VIDEOS_BY_PRESENTER_SUCCESS:
      return {
        ...state,
        videosByPresenter: {
          videos: action.payload.videos || [],
          presenter: action.payload.presenter || '',
        },
      };
    case types.FETCH_VIDEOS_BY_PRESENTER_FAILURE:
      return {
        ...state,
        error: { ...state.error, videosByPresenter: action.payload },
      };

    // Fetch videos by duration
    case types.FETCH_VIDEOS_BY_DURATION_REQUEST:
      return {
        ...state,
        error: { ...state.error, videosByDuration: null },
      };
    case types.FETCH_VIDEOS_BY_DURATION_SUCCESS:
      return {
        ...state,
        videosByDuration: {
          videos: action.payload.videos || [],
          sortedBy: action.payload.sortedBy || '',
        },
      };
    case types.FETCH_VIDEOS_BY_DURATION_FAILURE:
      return {
        ...state,
        error: { ...state.error, videosByDuration: action.payload },
      };

    // Search videos
    case types.SEARCH_VIDEOS_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null },
      };
    case types.SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results || [],
          query: action.payload.query || '',
        },
      };
    case types.SEARCH_VIDEOS_FAILURE:
      return {
        ...state,
        error: { ...state.error, searchResults: action.payload },
      };

    // Fetch video by slug
    case types.FETCH_VIDEO_BY_SLUG_REQUEST:
      return {
        ...state,
        error: { ...state.error, currentVideo: null },
      };
    case types.FETCH_VIDEO_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentVideo: action.payload,
      };
    case types.FETCH_VIDEO_BY_SLUG_FAILURE:
      return {
        ...state,
        error: { ...state.error, currentVideo: action.payload },
      };

    default:
      return state;
  }
};

export default videoReducer; 
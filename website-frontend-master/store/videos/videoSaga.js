import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './videoActionTypes';
import * as actions from './videoActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/videos';

// Retry fetch function
async function fetchWithRetry(url, options = {}, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API call attempt ${i + 1} failed:`, error);
      
      if (i === attempts - 1) {
        throw error;
      }
      
      // Exponential backoff: wait 1s, then 2s, then 4s
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// API Service Functions with retry logic
const apiService = {
  // Get all videos with optional filters
  async getAllVideos(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchWithRetry(url);
  },

  // Get featured videos
  async getFeaturedVideos() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  // Get presenters
  async getPresenters() {
    return fetchWithRetry(`${API_BASE_URL}/presenters`);
  },

  // Get video ages
  async getVideoAges() {
    return fetchWithRetry(`${API_BASE_URL}/ages`);
  },

  // Get videos by presenter
  async getVideosByPresenter(presenter) {
    return fetchWithRetry(`${API_BASE_URL}/by-presenter/${encodeURIComponent(presenter)}`);
  },

  // Get videos by duration
  async getVideosByDuration(order = 'asc') {
    const queryParams = new URLSearchParams({ order });
    return fetchWithRetry(`${API_BASE_URL}/by-duration?${queryParams.toString()}`);
  },

  // Search videos
  async searchVideos(query, limit = 10) {
    const queryParams = new URLSearchParams({ search: query, limit });
    return fetchWithRetry(`${API_BASE_URL}?${queryParams.toString()}`);
  },

  // Get video by slug
  async getVideoBySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/slug/${slug}`);
  },
};

// Helper function to normalize video data from API response
function normalizeVideoData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// Helper function to normalize single video data from API response
function normalizeSingleVideoData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return apiResponse.data;
  }
  return null;
}

// Saga Workers
function* fetchVideosSaga() {
  try {
    const response = yield call(apiService.getAllVideos);
    const videos = normalizeVideoData(response);
    yield put(actions.fetchVideosSuccess(videos));
  } catch (error) {
    console.error('Failed to fetch videos after 3 attempts:', error);
    yield put(actions.fetchVideosFailure(error.message));
  }
}

function* fetchFeaturedVideosSaga() {
  try {
    const response = yield call(apiService.getFeaturedVideos);
    const featuredVideos = normalizeVideoData(response);
    yield put(actions.fetchFeaturedVideosSuccess(featuredVideos));
  } catch (error) {
    console.error('Failed to fetch featured videos after 3 attempts:', error);
    yield put(actions.fetchFeaturedVideosFailure(error.message));
  }
}

function* fetchPresentersSaga() {
  try {
    const response = yield call(apiService.getPresenters);
    const presenters = response.success && response.data ? response.data : [];
    yield put(actions.fetchPresentersSuccess(presenters));
  } catch (error) {
    console.error('Failed to fetch presenters after 3 attempts:', error);
    yield put(actions.fetchPresentersFailure(error.message));
  }
}

function* fetchVideoAgesSaga() {
  try {
    const response = yield call(apiService.getVideoAges);
    const ages = response.success && response.data ? response.data : [];
    yield put(actions.fetchVideoAgesSuccess(ages));
  } catch (error) {
    console.error('Failed to fetch video ages after 3 attempts:', error);
    yield put(actions.fetchVideoAgesFailure(error.message));
  }
}

function* fetchVideosByPresenterSaga(action) {
  try {
    const { presenter } = action.payload;
    const response = yield call(apiService.getVideosByPresenter, presenter);
    const videos = normalizeVideoData(response);
    yield put(actions.fetchVideosByPresenterSuccess({
      videos: videos,
      presenter: response.presenter || presenter
    }));
  } catch (error) {
    console.error('Failed to fetch videos by presenter after 3 attempts:', error);
    yield put(actions.fetchVideosByPresenterFailure(error.message));
  }
}

function* fetchVideosByDurationSaga(action) {
  try {
    const { order } = action.payload;
    const response = yield call(apiService.getVideosByDuration, order);
    const videos = normalizeVideoData(response);
    yield put(actions.fetchVideosByDurationSuccess({
      videos: videos,
      sortedBy: response.sortedBy || `duration (${order}ending)`
    }));
  } catch (error) {
    console.error('Failed to fetch videos by duration after 3 attempts:', error);
    yield put(actions.fetchVideosByDurationFailure(error.message));
  }
}

function* searchVideosSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchVideos, query, limit);
    const searchResults = normalizeVideoData(response);
    yield put(actions.searchVideosSuccess({
      results: searchResults,
      query: response.searchQuery || query
    }));
  } catch (error) {
    console.error('Failed to search videos after 3 attempts:', error);
    yield put(actions.searchVideosFailure(error.message));
  }
}

function* fetchVideoBySlugSaga(action) {
  try {
    const { slug } = action.payload;
    const response = yield call(apiService.getVideoBySlug, slug);
    const video = normalizeSingleVideoData(response);
    yield put(actions.fetchVideoBySlugSuccess(video));
  } catch (error) {
    console.error(`Failed to fetch video by slug after 3 attempts:`, error);
    yield put(actions.fetchVideoBySlugFailure(error.message));
  }
}

// Root Saga Watcher
export default function* videoSaga() {
  yield takeEvery(types.FETCH_VIDEOS_REQUEST, fetchVideosSaga);
  yield takeEvery(types.FETCH_FEATURED_VIDEOS_REQUEST, fetchFeaturedVideosSaga);
  yield takeEvery(types.FETCH_PRESENTERS_REQUEST, fetchPresentersSaga);
  yield takeEvery(types.FETCH_VIDEO_AGES_REQUEST, fetchVideoAgesSaga);
  yield takeEvery(types.FETCH_VIDEOS_BY_PRESENTER_REQUEST, fetchVideosByPresenterSaga);
  yield takeEvery(types.FETCH_VIDEOS_BY_DURATION_REQUEST, fetchVideosByDurationSaga);
  yield takeEvery(types.SEARCH_VIDEOS_REQUEST, searchVideosSaga);
  yield takeEvery(types.FETCH_VIDEO_BY_SLUG_REQUEST, fetchVideoBySlugSaga);
}
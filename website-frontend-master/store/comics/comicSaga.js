import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './comicActionTypes';
import * as actions from './comicActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/comics';

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
  // Get all comics with optional filters
  async getAllComics(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchWithRetry(url);
  },

  // Get featured comics
  async getFeaturedComics() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  // Get comic of the month
  async getComicOfMonth() {
    return fetchWithRetry(`${API_BASE_URL}/comic-of-month`);
  },

  // Get comic moods
  async getComicMoods() {
    return fetchWithRetry(`${API_BASE_URL}/moods`);
  },

  // Get comic ages
  async getComicAges() {
    return fetchWithRetry(`${API_BASE_URL}/ages`);
  },

  // Search comics
  async searchComics(query, limit = 10) {
    const queryParams = new URLSearchParams({ search: query, limit });
    return fetchWithRetry(`${API_BASE_URL}?${queryParams.toString()}`);
  },

  // Get comic by slug
  async getComicBySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/slug/${slug}`);
  },
};

// Helper function to normalize comic data from API response
function normalizeComicData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// Helper function to normalize single comic data from API response
function normalizeSingleComicData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return apiResponse.data;
  }
  return null;
}

// Saga Workers
function* fetchComicsSaga() {
  try {
    const response = yield call(apiService.getAllComics);
    const comics = normalizeComicData(response);
    yield put(actions.fetchComicsSuccess(comics));
  } catch (error) {
    console.error('Failed to fetch comics after 3 attempts:', error);
    yield put(actions.fetchComicsFailure(error.message));
  }
}

function* fetchFeaturedComicsSaga() {
  try {
    const response = yield call(apiService.getFeaturedComics);
    const featuredComics = normalizeComicData(response);
    yield put(actions.fetchFeaturedComicsSuccess(featuredComics));
  } catch (error) {
    console.error('Failed to fetch featured comics after 3 attempts:', error);
    yield put(actions.fetchFeaturedComicsFailure(error.message));
  }
}

function* fetchComicOfMonthSaga() {
  try {
    const response = yield call(apiService.getComicOfMonth);
    const comicOfMonth = normalizeSingleComicData(response);
    yield put(actions.fetchComicOfMonthSuccess(comicOfMonth));
  } catch (error) {
    console.error('Failed to fetch comic of the month after 3 attempts:', error);
    yield put(actions.fetchComicOfMonthFailure(error.message));
  }
}

function* fetchComicMoodsSaga() {
  try {
    const response = yield call(apiService.getComicMoods);
    const moods = response.success && response.data ? response.data : [];
    yield put(actions.fetchComicMoodsSuccess(moods));
  } catch (error) {
    console.error('Failed to fetch comic moods after 3 attempts:', error);
    yield put(actions.fetchComicMoodsFailure(error.message));
  }
}

function* fetchComicAgesSaga() {
  try {
    const response = yield call(apiService.getComicAges);
    const ages = response.success && response.data ? response.data : [];
    yield put(actions.fetchComicAgesSuccess(ages));
  } catch (error) {
    console.error('Failed to fetch comic ages after 3 attempts:', error);
    yield put(actions.fetchComicAgesFailure(error.message));
  }
}

function* searchComicsSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchComics, query, limit);
    const searchResults = normalizeComicData(response);
    yield put(actions.searchComicsSuccess({
      results: searchResults,
      query: response.searchQuery || query
    }));
  } catch (error) {
    console.error('Failed to search comics after 3 attempts:', error);
    yield put(actions.searchComicsFailure(error.message));
  }
}

function* fetchComicBySlugSaga(action) {
  try {
    const { slug } = action.payload;
    const response = yield call(apiService.getComicBySlug, slug);
    const comic = normalizeSingleComicData(response);
    yield put(actions.fetchComicBySlugSuccess(comic));
  } catch (error) {
    console.error(`Failed to fetch comic by slug after 3 attempts:`, error);
    yield put(actions.fetchComicBySlugFailure(error.message));
  }
}

// Root Saga Watcher
export default function* comicSaga() {
  yield takeEvery(types.FETCH_COMICS_REQUEST, fetchComicsSaga);
  yield takeEvery(types.FETCH_FEATURED_COMICS_REQUEST, fetchFeaturedComicsSaga);
  yield takeEvery(types.FETCH_COMIC_OF_MONTH_REQUEST, fetchComicOfMonthSaga);
  yield takeEvery(types.FETCH_COMIC_MOODS_REQUEST, fetchComicMoodsSaga);
  yield takeEvery(types.FETCH_COMIC_AGES_REQUEST, fetchComicAgesSaga);
  yield takeEvery(types.SEARCH_COMICS_REQUEST, searchComicsSaga);
  yield takeEvery(types.FETCH_COMIC_BY_SLUG_REQUEST, fetchComicBySlugSaga);
} 
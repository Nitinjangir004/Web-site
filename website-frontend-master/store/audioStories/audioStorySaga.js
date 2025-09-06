import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './audioStoryActionTypes';
import * as actions from './audioStoryActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/audiostories';

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
  // Get all audio stories with optional filters
  async getAllAudioStories(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchWithRetry(url);
  },

  // Get featured audio stories
  async getFeaturedAudioStories() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  // Get narrators
  async getNarrators() {
    return fetchWithRetry(`${API_BASE_URL}/narrators`);
  },

  // Get audio story ages
  async getAudioStoryAges() {
    return fetchWithRetry(`${API_BASE_URL}/ages`);
  },

  // Get audio stories by narrator
  async getAudioStoriesByNarrator(narrator) {
    return fetchWithRetry(`${API_BASE_URL}/by-narrator/${encodeURIComponent(narrator)}`);
  },

  // Search audio stories
  async searchAudioStories(query, limit = 10) {
    const queryParams = new URLSearchParams({ search: query, limit });
    return fetchWithRetry(`${API_BASE_URL}?${queryParams.toString()}`);
  },

  // Get audio story by slug
  async getAudioStoryBySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/slug/${slug}`);
  },
};

// Helper function to normalize audio story data from API response
function normalizeAudioStoryData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// Helper function to normalize single audio story data from API response
function normalizeSingleAudioStoryData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return apiResponse.data;
  }
  return null;
}

// Saga Workers
function* fetchAudioStoriesSaga() {
  try {
    const response = yield call(apiService.getAllAudioStories);
    const audioStories = normalizeAudioStoryData(response);
    yield put(actions.fetchAudioStoriesSuccess(audioStories));
  } catch (error) {
    console.error('Failed to fetch audio stories after 3 attempts:', error);
    yield put(actions.fetchAudioStoriesFailure(error.message));
  }
}

function* fetchFeaturedAudioStoriesSaga() {
  try {
    const response = yield call(apiService.getFeaturedAudioStories);
    const featuredAudioStories = normalizeAudioStoryData(response);
    yield put(actions.fetchFeaturedAudioStoriesSuccess(featuredAudioStories));
  } catch (error) {
    console.error('Failed to fetch featured audio stories after 3 attempts:', error);
    yield put(actions.fetchFeaturedAudioStoriesFailure(error.message));
  }
}

function* fetchNarratorsSaga() {
  try {
    const response = yield call(apiService.getNarrators);
    const narrators = response.success && response.data ? response.data : [];
    yield put(actions.fetchNarratorsSuccess(narrators));
  } catch (error) {
    console.error('Failed to fetch narrators after 3 attempts:', error);
    yield put(actions.fetchNarratorsFailure(error.message));
  }
}

function* fetchAudioStoryAgesSaga() {
  try {
    const response = yield call(apiService.getAudioStoryAges);
    const ages = response.success && response.data ? response.data : [];
    yield put(actions.fetchAudioStoryAgesSuccess(ages));
  } catch (error) {
    console.error('Failed to fetch audio story ages after 3 attempts:', error);
    yield put(actions.fetchAudioStoryAgesFailure(error.message));
  }
}

function* fetchAudioStoriesByNarratorSaga(action) {
  try {
    const { narrator } = action.payload;
    const response = yield call(apiService.getAudioStoriesByNarrator, narrator);
    const audioStories = normalizeAudioStoryData(response);
    yield put(actions.fetchAudioStoriesByNarratorSuccess({
      stories: audioStories,
      narrator: response.narrator || narrator
    }));
  } catch (error) {
    console.error('Failed to fetch audio stories by narrator after 3 attempts:', error);
    yield put(actions.fetchAudioStoriesByNarratorFailure(error.message));
  }
}

function* searchAudioStoriesSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchAudioStories, query, limit);
    const searchResults = normalizeAudioStoryData(response);
    yield put(actions.searchAudioStoriesSuccess({
      results: searchResults,
      query: response.searchQuery || query
    }));
  } catch (error) {
    console.error('Failed to search audio stories after 3 attempts:', error);
    yield put(actions.searchAudioStoriesFailure(error.message));
  }
}

function* fetchAudioStoryBySlugSaga(action) {
  try {
    const { slug } = action.payload;
    const response = yield call(apiService.getAudioStoryBySlug, slug);
    const audioStory = normalizeSingleAudioStoryData(response);
    yield put(actions.fetchAudioStoryBySlugSuccess(audioStory));
  } catch (error) {
    console.error(`Failed to fetch audio story by slug after 3 attempts:`, error);
    yield put(actions.fetchAudioStoryBySlugFailure(error.message));
  }
}

// Root Saga Watcher
export default function* audioStorySaga() {
  yield takeEvery(types.FETCH_AUDIO_STORIES_REQUEST, fetchAudioStoriesSaga);
  yield takeEvery(types.FETCH_FEATURED_AUDIO_STORIES_REQUEST, fetchFeaturedAudioStoriesSaga);
  yield takeEvery(types.FETCH_NARRATORS_REQUEST, fetchNarratorsSaga);
  yield takeEvery(types.FETCH_AUDIO_STORY_AGES_REQUEST, fetchAudioStoryAgesSaga);
  yield takeEvery(types.FETCH_AUDIO_STORIES_BY_NARRATOR_REQUEST, fetchAudioStoriesByNarratorSaga);
  yield takeEvery(types.SEARCH_AUDIO_STORIES_REQUEST, searchAudioStoriesSaga);
  yield takeEvery(types.FETCH_AUDIO_STORY_BY_SLUG_REQUEST, fetchAudioStoryBySlugSaga);
} 
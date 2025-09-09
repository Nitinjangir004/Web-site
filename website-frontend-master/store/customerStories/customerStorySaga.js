import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './customerStoryActionTypes';
import * as actions from './customerStoryActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/customerstories';

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
  // Get all customer stories with optional filters
  async getAllCustomerStories(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchWithRetry(url);
  },

  // Get featured customer stories
  async getFeaturedCustomerStories() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  // Get authors
  async getAuthors() {
    return fetchWithRetry(`${API_BASE_URL}/authors`);
  },

  // Get customer stories by author
  async getCustomerStoriesByAuthor(author) {
    return fetchWithRetry(`${API_BASE_URL}/by-author/${encodeURIComponent(author)}`);
  },

  // Search customer stories
  async searchCustomerStories(query, limit = 10) {
    const queryParams = new URLSearchParams({ search: query, limit });
    return fetchWithRetry(`${API_BASE_URL}?${queryParams.toString()}`);
  },

  // Get customer story by slug
  async getCustomerStoryBySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/slug/${slug}`);
  },
};

// Helper function to normalize customer story data from API response
function normalizeCustomerStoryData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// Helper function to normalize single customer story data from API response
function normalizeSingleCustomerStoryData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return apiResponse.data;
  }
  return null;
}

// Saga Workers
function* fetchCustomerStoriesSaga() {
  try {
    const response = yield call(apiService.getAllCustomerStories);
    const customerStories = normalizeCustomerStoryData(response);
    yield put(actions.fetchCustomerStoriesSuccess(customerStories));
  } catch (error) {
    console.error('Failed to fetch customer stories after 3 attempts:', error);
    yield put(actions.fetchCustomerStoriesFailure(error.message));
  }
}

function* fetchFeaturedCustomerStoriesSaga() {
  try {
    const response = yield call(apiService.getFeaturedCustomerStories);
    const featuredCustomerStories = normalizeCustomerStoryData(response);
    yield put(actions.fetchFeaturedCustomerStoriesSuccess(featuredCustomerStories));
  } catch (error) {
    console.error('Failed to fetch featured customer stories after 3 attempts:', error);
    yield put(actions.fetchFeaturedCustomerStoriesFailure(error.message));
  }
}

function* fetchAuthorsSaga() {
  try {
    const response = yield call(apiService.getAuthors);
    const authors = response.success && response.data ? response.data : [];
    yield put(actions.fetchAuthorsSuccess(authors));
  } catch (error) {
    console.error('Failed to fetch authors after 3 attempts:', error);
    yield put(actions.fetchAuthorsFailure(error.message));
  }
}

function* fetchCustomerStoriesByAuthorSaga(action) {
  try {
    const { author } = action.payload;
    const response = yield call(apiService.getCustomerStoriesByAuthor, author);
    const customerStories = normalizeCustomerStoryData(response);
    yield put(actions.fetchCustomerStoriesByAuthorSuccess({
      stories: customerStories,
      author: response.author || author
    }));
  } catch (error) {
    console.error('Failed to fetch customer stories by author after 3 attempts:', error);
    yield put(actions.fetchCustomerStoriesByAuthorFailure(error.message));
  }
}

function* searchCustomerStoriesSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchCustomerStories, query, limit);
    const searchResults = normalizeCustomerStoryData(response);
    yield put(actions.searchCustomerStoriesSuccess({
      results: searchResults,
      query: response.searchQuery || query
    }));
  } catch (error) {
    console.error('Failed to search customer stories after 3 attempts:', error);
    yield put(actions.searchCustomerStoriesFailure(error.message));
  }
}

function* fetchCustomerStoryBySlugSaga(action) {
  try {
    const { slug } = action.payload;
    const response = yield call(apiService.getCustomerStoryBySlug, slug);
    const customerStory = normalizeSingleCustomerStoryData(response);
    yield put(actions.fetchCustomerStoryBySlugSuccess(customerStory));
  } catch (error) {
    console.error(`Failed to fetch customer story by slug after 3 attempts:`, error);
    yield put(actions.fetchCustomerStoryBySlugFailure(error.message));
  }
}

// Root Saga Watcher
export default function* customerStorySaga() {
  yield takeEvery(types.FETCH_CUSTOMER_STORIES_REQUEST, fetchCustomerStoriesSaga);
  yield takeEvery(types.FETCH_FEATURED_CUSTOMER_STORIES_REQUEST, fetchFeaturedCustomerStoriesSaga);
  yield takeEvery(types.FETCH_AUTHORS_REQUEST, fetchAuthorsSaga);
  yield takeEvery(types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_REQUEST, fetchCustomerStoriesByAuthorSaga);
  yield takeEvery(types.SEARCH_CUSTOMER_STORIES_REQUEST, searchCustomerStoriesSaga);
  yield takeEvery(types.FETCH_CUSTOMER_STORY_BY_SLUG_REQUEST, fetchCustomerStoryBySlugSaga);
} 
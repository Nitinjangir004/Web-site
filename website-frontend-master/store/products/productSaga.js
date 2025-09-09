import { call, put, takeEvery, delay } from 'redux-saga/effects';
import * as types from './productActionTypes';
import * as actions from './productActions';

// API Base URL
const API_BASE_URL = 'https://api.churanchacha.in/api/products';

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
  // Get all products with optional filters
  async getAllProducts(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });
    
    const url = `${API_BASE_URL}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return fetchWithRetry(url);
  },

  // Get featured products
  async getFeaturedProducts() {
    return fetchWithRetry(`${API_BASE_URL}/featured`);
  },

  // Get trial pack products
  async getTrialPackProducts() {
    return fetchWithRetry(`${API_BASE_URL}?isTrialPack=true`);
  },

  // Get combo products
  async getComboProducts() {
    return fetchWithRetry(`${API_BASE_URL}?isCombo=true`);
  },

  // Search products
  async searchProducts(query, limit = 10) {
    const queryParams = new URLSearchParams({ q: query, limit });
    return fetchWithRetry(`${API_BASE_URL}/search?${queryParams.toString()}`);
  },

  // Get product by slug
  async getProductBySlug(slug) {
    return fetchWithRetry(`${API_BASE_URL}/${slug}`);
  },

  // Get product categories
  async getCategories() {
    return fetchWithRetry(`${API_BASE_URL}/categories`);
  }
};

// Helper function to normalize product data from API response
function normalizeProductData(apiResponse) {
  if (apiResponse.success && apiResponse.data) {
    return Array.isArray(apiResponse.data) ? apiResponse.data : [apiResponse.data];
  }
  return [];
}

// Saga Workers
function* fetchProductsSaga() {
  try {
    const response = yield call(apiService.getAllProducts);
    const products = normalizeProductData(response);
    yield put(actions.fetchProductsSuccess(products));
  } catch (error) {
    console.error('Failed to fetch products after 3 attempts:', error);
    yield put(actions.fetchProductsFailure(error.message));
  }
}

function* fetchFeaturedProductsSaga() {
  try {
    const response = yield call(apiService.getFeaturedProducts);
    const featuredProducts = normalizeProductData(response);
    yield put(actions.fetchFeaturedProductsSuccess(featuredProducts));
  } catch (error) {
    console.error('Failed to fetch featured products after 3 attempts:', error);
    yield put(actions.fetchFeaturedProductsFailure(error.message));
  }
}

function* fetchTrialPackSaga() {
  try {
    const response = yield call(apiService.getTrialPackProducts);
    const trialPackProducts = normalizeProductData(response);
    // Return first trial pack product or null
    const trialPack = trialPackProducts.length > 0 ? trialPackProducts[0] : null;
    yield put(actions.fetchTrialPackSuccess(trialPack));
  } catch (error) {
    console.error('Failed to fetch trial pack after 3 attempts:', error);
    yield put(actions.fetchTrialPackFailure(error.message));
  }
}

function* fetchComboProductsSaga() {
  try {
    const response = yield call(apiService.getComboProducts);
    const comboProducts = normalizeProductData(response);
    yield put(actions.fetchComboProductsSuccess(comboProducts));
  } catch (error) {
    console.error('Failed to fetch combo products after 3 attempts:', error);
    yield put(actions.fetchComboProductsFailure(error.message));
  }
}

function* searchProductsSaga(action) {
  try {
    const { query, limit } = action.payload;
    const response = yield call(apiService.searchProducts, query, limit);
    const searchResults = normalizeProductData(response);
    yield put(actions.searchProductsSuccess({
      results: searchResults,
      query: response.searchQuery || query
    }));
  } catch (error) {
    console.error('Failed to search products after 3 attempts:', error);
    yield put(actions.searchProductsFailure(error.message));
  }
}

function* fetchProductBySlugSaga(action) {
  try {
    const { slug } = action.payload;
    const response = yield call(apiService.getProductBySlug, slug);
    const product = response.success && response.data ? response.data : null;
    yield put(actions.fetchProductBySlugSuccess(product));
  } catch (error) {
    console.error(`Failed to fetch product by slug after 3 attempts:`, error);
    yield put(actions.fetchProductBySlugFailure(error.message));
  }
}

// Root Saga Watcher
export default function* productSaga() {
  yield takeEvery(types.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeEvery(types.FETCH_FEATURED_PRODUCTS_REQUEST, fetchFeaturedProductsSaga);
  yield takeEvery(types.FETCH_TRIAL_PACK_REQUEST, fetchTrialPackSaga);
  yield takeEvery(types.FETCH_COMBO_PRODUCTS_REQUEST, fetchComboProductsSaga);
  yield takeEvery(types.SEARCH_PRODUCTS_REQUEST, searchProductsSaga);
  yield takeEvery(types.FETCH_PRODUCT_BY_SLUG_REQUEST, fetchProductBySlugSaga);
} 
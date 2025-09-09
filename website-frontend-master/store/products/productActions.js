import * as types from './productActionTypes';

// Fetch all products
export const fetchProductsRequest = () => ({
  type: types.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: types.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching all products
export const fetchProducts = () => fetchProductsRequest();

// Fetch featured products
export const fetchFeaturedProductsRequest = () => ({
  type: types.FETCH_FEATURED_PRODUCTS_REQUEST,
});

export const fetchFeaturedProductsSuccess = (products) => ({
  type: types.FETCH_FEATURED_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchFeaturedProductsFailure = (error) => ({
  type: types.FETCH_FEATURED_PRODUCTS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching featured products
export const fetchFeaturedProducts = () => fetchFeaturedProductsRequest();

// Fetch combo products
export const fetchComboProductsRequest = () => ({
  type: types.FETCH_COMBO_PRODUCTS_REQUEST,
});

export const fetchComboProductsSuccess = (products) => ({
  type: types.FETCH_COMBO_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchComboProductsFailure = (error) => ({
  type: types.FETCH_COMBO_PRODUCTS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching combo products
export const fetchComboProducts = () => fetchComboProductsRequest();

// Fetch trial pack
export const fetchTrialPackRequest = () => ({
  type: types.FETCH_TRIAL_PACK_REQUEST,
});

export const fetchTrialPackSuccess = (product) => ({
  type: types.FETCH_TRIAL_PACK_SUCCESS,
  payload: product,
});

export const fetchTrialPackFailure = (error) => ({
  type: types.FETCH_TRIAL_PACK_FAILURE,
  payload: error,
});

// Convenience action creator for fetching trial pack
export const fetchTrialPack = () => fetchTrialPackRequest();

// Search products
export const searchProductsRequest = (query, limit = 10) => ({
  type: types.SEARCH_PRODUCTS_REQUEST,
  payload: { query, limit },
});

export const searchProductsSuccess = (data) => ({
  type: types.SEARCH_PRODUCTS_SUCCESS,
  payload: data,
});

export const searchProductsFailure = (error) => ({
  type: types.SEARCH_PRODUCTS_FAILURE,
  payload: error,
});

// Convenience action creator for searching products
export const searchProducts = (query, limit) => searchProductsRequest(query, limit);

// Fetch product by slug
export const fetchProductBySlugRequest = (slug) => ({
  type: types.FETCH_PRODUCT_BY_SLUG_REQUEST,
  payload: { slug },
});

export const fetchProductBySlugSuccess = (product) => ({
  type: types.FETCH_PRODUCT_BY_SLUG_SUCCESS,
  payload: product,
});

export const fetchProductBySlugFailure = (error) => ({
  type: types.FETCH_PRODUCT_BY_SLUG_FAILURE,
  payload: error,
});

// Convenience action creator for fetching product by slug
export const fetchProductBySlug = (slug) => fetchProductBySlugRequest(slug); 
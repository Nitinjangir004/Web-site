import * as types from './productActionTypes';

const initialState = {
  products: [],
  featuredProducts: [],
  comboProducts: [],
  trialPack: null,
  searchResults: {
    results: [],
    query: '',
  },
  currentProduct: null,
  error: {
    products: null,
    featuredProducts: null,
    comboProducts: null,
    trialPack: null,
    searchResults: null,
    currentProduct: null,
  },
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all products
    case types.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        error: { ...state.error, products: null },
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: { ...state.error, products: action.payload },
      };

    // Fetch featured products
    case types.FETCH_FEATURED_PRODUCTS_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredProducts: null },
      };
    case types.FETCH_FEATURED_PRODUCTS_SUCCESS:
      return {
        ...state,
        featuredProducts: action.payload,
      };
    case types.FETCH_FEATURED_PRODUCTS_FAILURE:
      return {
        ...state,
        error: { ...state.error, featuredProducts: action.payload },
      };

    // Fetch combo products
    case types.FETCH_COMBO_PRODUCTS_REQUEST:
      return {
        ...state,
        error: { ...state.error, comboProducts: null },
      };
    case types.FETCH_COMBO_PRODUCTS_SUCCESS:
      return {
        ...state,
        comboProducts: action.payload,
      };
    case types.FETCH_COMBO_PRODUCTS_FAILURE:
      return {
        ...state,
        error: { ...state.error, comboProducts: action.payload },
      };

    // Fetch trial pack
    case types.FETCH_TRIAL_PACK_REQUEST:
      return {
        ...state,
        error: { ...state.error, trialPack: null },
      };
    case types.FETCH_TRIAL_PACK_SUCCESS:
      return {
        ...state,
        trialPack: action.payload,
      };
    case types.FETCH_TRIAL_PACK_FAILURE:
      return {
        ...state,
        error: { ...state.error, trialPack: action.payload },
      };

    // Search products
    case types.SEARCH_PRODUCTS_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null },
      };
    case types.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results || [],
          query: action.payload.query || '',
        },
      };
    case types.SEARCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: { ...state.error, searchResults: action.payload },
      };

    // Fetch product by slug
    case types.FETCH_PRODUCT_BY_SLUG_REQUEST:
      return {
        ...state,
        error: { ...state.error, currentProduct: null },
      };
    case types.FETCH_PRODUCT_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case types.FETCH_PRODUCT_BY_SLUG_FAILURE:
      return {
        ...state,
        error: { ...state.error, currentProduct: action.payload },
      };

    default:
      return state;
  }
};

export default productReducer; 
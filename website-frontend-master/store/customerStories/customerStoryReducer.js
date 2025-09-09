import * as types from './customerStoryActionTypes';

const initialState = {
  customerStories: [],
  featuredCustomerStories: [],
  authors: [],
  customerStoriesByAuthor: {
    stories: [],
    author: '',
  },
  searchResults: {
    results: [],
    query: '',
  },
  currentCustomerStory: null,
  error: {
    customerStories: null,
    featuredCustomerStories: null,
    authors: null,
    customerStoriesByAuthor: null,
    searchResults: null,
    currentCustomerStory: null,
  },
};

const customerStoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all customer stories
    case types.FETCH_CUSTOMER_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, customerStories: null },
      };
    case types.FETCH_CUSTOMER_STORIES_SUCCESS:
      return {
        ...state,
        customerStories: action.payload,
      };
    case types.FETCH_CUSTOMER_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, customerStories: action.payload },
      };

    // Fetch featured customer stories
    case types.FETCH_FEATURED_CUSTOMER_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredCustomerStories: null },
      };
    case types.FETCH_FEATURED_CUSTOMER_STORIES_SUCCESS:
      return {
        ...state,
        featuredCustomerStories: action.payload,
      };
    case types.FETCH_FEATURED_CUSTOMER_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, featuredCustomerStories: action.payload },
      };

    // Fetch authors
    case types.FETCH_AUTHORS_REQUEST:
      return {
        ...state,
        error: { ...state.error, authors: null },
      };
    case types.FETCH_AUTHORS_SUCCESS:
      return {
        ...state,
        authors: action.payload,
      };
    case types.FETCH_AUTHORS_FAILURE:
      return {
        ...state,
        error: { ...state.error, authors: action.payload },
      };

    // Fetch customer stories by author
    case types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_REQUEST:
      return {
        ...state,
        error: { ...state.error, customerStoriesByAuthor: null },
      };
    case types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_SUCCESS:
      return {
        ...state,
        customerStoriesByAuthor: {
          stories: action.payload.stories || [],
          author: action.payload.author || '',
        },
      };
    case types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_FAILURE:
      return {
        ...state,
        error: { ...state.error, customerStoriesByAuthor: action.payload },
      };

    // Search customer stories
    case types.SEARCH_CUSTOMER_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null },
      };
    case types.SEARCH_CUSTOMER_STORIES_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results || [],
          query: action.payload.query || '',
        },
      };
    case types.SEARCH_CUSTOMER_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, searchResults: action.payload },
      };

    // Fetch customer story by slug
    case types.FETCH_CUSTOMER_STORY_BY_SLUG_REQUEST:
      return {
        ...state,
        error: { ...state.error, currentCustomerStory: null },
      };
    case types.FETCH_CUSTOMER_STORY_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentCustomerStory: action.payload,
      };
    case types.FETCH_CUSTOMER_STORY_BY_SLUG_FAILURE:
      return {
        ...state,
        error: { ...state.error, currentCustomerStory: action.payload },
      };

    default:
      return state;
  }
};

export default customerStoryReducer; 
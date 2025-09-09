import * as types from './customerStoryActionTypes';

// Fetch all customer stories
export const fetchCustomerStoriesRequest = () => ({
  type: types.FETCH_CUSTOMER_STORIES_REQUEST,
});

export const fetchCustomerStoriesSuccess = (customerStories) => ({
  type: types.FETCH_CUSTOMER_STORIES_SUCCESS,
  payload: customerStories,
});

export const fetchCustomerStoriesFailure = (error) => ({
  type: types.FETCH_CUSTOMER_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching all customer stories
export const fetchCustomerStories = () => fetchCustomerStoriesRequest();

// Fetch featured customer stories
export const fetchFeaturedCustomerStoriesRequest = () => ({
  type: types.FETCH_FEATURED_CUSTOMER_STORIES_REQUEST,
});

export const fetchFeaturedCustomerStoriesSuccess = (customerStories) => ({
  type: types.FETCH_FEATURED_CUSTOMER_STORIES_SUCCESS,
  payload: customerStories,
});

export const fetchFeaturedCustomerStoriesFailure = (error) => ({
  type: types.FETCH_FEATURED_CUSTOMER_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching featured customer stories
export const fetchFeaturedCustomerStories = () => fetchFeaturedCustomerStoriesRequest();

// Fetch authors
export const fetchAuthorsRequest = () => ({
  type: types.FETCH_AUTHORS_REQUEST,
});

export const fetchAuthorsSuccess = (authors) => ({
  type: types.FETCH_AUTHORS_SUCCESS,
  payload: authors,
});

export const fetchAuthorsFailure = (error) => ({
  type: types.FETCH_AUTHORS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching authors
export const fetchAuthors = () => fetchAuthorsRequest();

// Fetch customer stories by author
export const fetchCustomerStoriesByAuthorRequest = (author) => ({
  type: types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_REQUEST,
  payload: { author },
});

export const fetchCustomerStoriesByAuthorSuccess = (data) => ({
  type: types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_SUCCESS,
  payload: data,
});

export const fetchCustomerStoriesByAuthorFailure = (error) => ({
  type: types.FETCH_CUSTOMER_STORIES_BY_AUTHOR_FAILURE,
  payload: error,
});

// Convenience action creator for fetching customer stories by author
export const fetchCustomerStoriesByAuthor = (author) => fetchCustomerStoriesByAuthorRequest(author);

// Search customer stories
export const searchCustomerStoriesRequest = (query, limit = 10) => ({
  type: types.SEARCH_CUSTOMER_STORIES_REQUEST,
  payload: { query, limit },
});

export const searchCustomerStoriesSuccess = (data) => ({
  type: types.SEARCH_CUSTOMER_STORIES_SUCCESS,
  payload: data,
});

export const searchCustomerStoriesFailure = (error) => ({
  type: types.SEARCH_CUSTOMER_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for searching customer stories
export const searchCustomerStories = (query, limit) => searchCustomerStoriesRequest(query, limit);

// Fetch customer story by slug
export const fetchCustomerStoryBySlugRequest = (slug) => ({
  type: types.FETCH_CUSTOMER_STORY_BY_SLUG_REQUEST,
  payload: { slug },
});

export const fetchCustomerStoryBySlugSuccess = (customerStory) => ({
  type: types.FETCH_CUSTOMER_STORY_BY_SLUG_SUCCESS,
  payload: customerStory,
});

export const fetchCustomerStoryBySlugFailure = (error) => ({
  type: types.FETCH_CUSTOMER_STORY_BY_SLUG_FAILURE,
  payload: error,
});

// Convenience action creator for fetching customer story by slug
export const fetchCustomerStoryBySlug = (slug) => fetchCustomerStoryBySlugRequest(slug); 
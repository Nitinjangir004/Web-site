import * as types from './comicActionTypes';

// Fetch all comics
export const fetchComicsRequest = () => ({
  type: types.FETCH_COMICS_REQUEST,
});

export const fetchComicsSuccess = (comics) => ({
  type: types.FETCH_COMICS_SUCCESS,
  payload: comics,
});

export const fetchComicsFailure = (error) => ({
  type: types.FETCH_COMICS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching all comics
export const fetchComics = () => fetchComicsRequest();

// Fetch featured comics
export const fetchFeaturedComicsRequest = () => ({
  type: types.FETCH_FEATURED_COMICS_REQUEST,
});

export const fetchFeaturedComicsSuccess = (comics) => ({
  type: types.FETCH_FEATURED_COMICS_SUCCESS,
  payload: comics,
});

export const fetchFeaturedComicsFailure = (error) => ({
  type: types.FETCH_FEATURED_COMICS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching featured comics
export const fetchFeaturedComics = () => fetchFeaturedComicsRequest();

// Fetch comic of the month
export const fetchComicOfMonthRequest = () => ({
  type: types.FETCH_COMIC_OF_MONTH_REQUEST,
});

export const fetchComicOfMonthSuccess = (comic) => ({
  type: types.FETCH_COMIC_OF_MONTH_SUCCESS,
  payload: comic,
});

export const fetchComicOfMonthFailure = (error) => ({
  type: types.FETCH_COMIC_OF_MONTH_FAILURE,
  payload: error,
});

// Convenience action creator for fetching comic of the month
export const fetchComicOfMonth = () => fetchComicOfMonthRequest();

// Fetch comic moods
export const fetchComicMoodsRequest = () => ({
  type: types.FETCH_COMIC_MOODS_REQUEST,
});

export const fetchComicMoodsSuccess = (moods) => ({
  type: types.FETCH_COMIC_MOODS_SUCCESS,
  payload: moods,
});

export const fetchComicMoodsFailure = (error) => ({
  type: types.FETCH_COMIC_MOODS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching comic moods
export const fetchComicMoods = () => fetchComicMoodsRequest();

// Fetch comic ages
export const fetchComicAgesRequest = () => ({
  type: types.FETCH_COMIC_AGES_REQUEST,
});

export const fetchComicAgesSuccess = (ages) => ({
  type: types.FETCH_COMIC_AGES_SUCCESS,
  payload: ages,
});

export const fetchComicAgesFailure = (error) => ({
  type: types.FETCH_COMIC_AGES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching comic ages
export const fetchComicAges = () => fetchComicAgesRequest();

// Search comics
export const searchComicsRequest = (query, limit = 10) => ({
  type: types.SEARCH_COMICS_REQUEST,
  payload: { query, limit },
});

export const searchComicsSuccess = (data) => ({
  type: types.SEARCH_COMICS_SUCCESS,
  payload: data,
});

export const searchComicsFailure = (error) => ({
  type: types.SEARCH_COMICS_FAILURE,
  payload: error,
});

// Convenience action creator for searching comics
export const searchComics = (query, limit) => searchComicsRequest(query, limit);

// Fetch comic by slug
export const fetchComicBySlugRequest = (slug) => ({
  type: types.FETCH_COMIC_BY_SLUG_REQUEST,
  payload: { slug },
});

export const fetchComicBySlugSuccess = (comic) => ({
  type: types.FETCH_COMIC_BY_SLUG_SUCCESS,
  payload: comic,
});

export const fetchComicBySlugFailure = (error) => ({
  type: types.FETCH_COMIC_BY_SLUG_FAILURE,
  payload: error,
});

// Convenience action creator for fetching comic by slug
export const fetchComicBySlug = (slug) => fetchComicBySlugRequest(slug); 
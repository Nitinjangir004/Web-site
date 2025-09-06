import * as types from './comicActionTypes';

const initialState = {
  comics: [],
  featuredComics: [],
  comicOfMonth: null,
  moods: [],
  ages: [],
  searchResults: {
    results: [],
    query: '',
  },
  currentComic: null,
  error: {
    comics: null,
    featuredComics: null,
    comicOfMonth: null,
    moods: null,
    ages: null,
    searchResults: null,
    currentComic: null,
  },
};

const comicReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all comics
    case types.FETCH_COMICS_REQUEST:
      return {
        ...state,
        error: { ...state.error, comics: null },
      };
    case types.FETCH_COMICS_SUCCESS:
      return {
        ...state,
        comics: action.payload,
      };
    case types.FETCH_COMICS_FAILURE:
      return {
        ...state,
        error: { ...state.error, comics: action.payload },
      };

    // Fetch featured comics
    case types.FETCH_FEATURED_COMICS_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredComics: null },
      };
    case types.FETCH_FEATURED_COMICS_SUCCESS:
      return {
        ...state,
        featuredComics: action.payload,
      };
    case types.FETCH_FEATURED_COMICS_FAILURE:
      return {
        ...state,
        error: { ...state.error, featuredComics: action.payload },
      };

    // Fetch comic of the month
    case types.FETCH_COMIC_OF_MONTH_REQUEST:
      return {
        ...state,
        error: { ...state.error, comicOfMonth: null },
      };
    case types.FETCH_COMIC_OF_MONTH_SUCCESS:
      return {
        ...state,
        comicOfMonth: action.payload,
      };
    case types.FETCH_COMIC_OF_MONTH_FAILURE:
      return {
        ...state,
        error: { ...state.error, comicOfMonth: action.payload },
      };

    // Fetch comic moods
    case types.FETCH_COMIC_MOODS_REQUEST:
      return {
        ...state,
        error: { ...state.error, moods: null },
      };
    case types.FETCH_COMIC_MOODS_SUCCESS:
      return {
        ...state,
        moods: action.payload,
      };
    case types.FETCH_COMIC_MOODS_FAILURE:
      return {
        ...state,
        error: { ...state.error, moods: action.payload },
      };

    // Fetch comic ages
    case types.FETCH_COMIC_AGES_REQUEST:
      return {
        ...state,
        error: { ...state.error, ages: null },
      };
    case types.FETCH_COMIC_AGES_SUCCESS:
      return {
        ...state,
        ages: action.payload,
      };
    case types.FETCH_COMIC_AGES_FAILURE:
      return {
        ...state,
        error: { ...state.error, ages: action.payload },
      };

    // Search comics
    case types.SEARCH_COMICS_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null },
      };
    case types.SEARCH_COMICS_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results || [],
          query: action.payload.query || '',
        },
      };
    case types.SEARCH_COMICS_FAILURE:
      return {
        ...state,
        error: { ...state.error, searchResults: action.payload },
      };

    // Fetch comic by slug
    case types.FETCH_COMIC_BY_SLUG_REQUEST:
      return {
        ...state,
        error: { ...state.error, currentComic: null },
      };
    case types.FETCH_COMIC_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentComic: action.payload,
      };
    case types.FETCH_COMIC_BY_SLUG_FAILURE:
      return {
        ...state,
        error: { ...state.error, currentComic: action.payload },
      };

    default:
      return state;
  }
};

export default comicReducer; 
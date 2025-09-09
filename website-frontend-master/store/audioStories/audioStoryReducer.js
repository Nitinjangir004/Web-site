import * as types from './audioStoryActionTypes';

const initialState = {
  audioStories: [],
  featuredAudioStories: [],
  narrators: [],
  ages: [],
  audioStoriesByNarrator: {
    stories: [],
    narrator: '',
  },
  searchResults: {
    results: [],
    query: '',
  },
  currentAudioStory: null,
  error: {
    audioStories: null,
    featuredAudioStories: null,
    narrators: null,
    ages: null,
    audioStoriesByNarrator: null,
    searchResults: null,
    currentAudioStory: null,
  },
};

const audioStoryReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all audio stories
    case types.FETCH_AUDIO_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, audioStories: null },
      };
    case types.FETCH_AUDIO_STORIES_SUCCESS:
      return {
        ...state,
        audioStories: action.payload,
      };
    case types.FETCH_AUDIO_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, audioStories: action.payload },
      };

    // Fetch featured audio stories
    case types.FETCH_FEATURED_AUDIO_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, featuredAudioStories: null },
      };
    case types.FETCH_FEATURED_AUDIO_STORIES_SUCCESS:
      return {
        ...state,
        featuredAudioStories: action.payload,
      };
    case types.FETCH_FEATURED_AUDIO_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, featuredAudioStories: action.payload },
      };

    // Fetch narrators
    case types.FETCH_NARRATORS_REQUEST:
      return {
        ...state,
        error: { ...state.error, narrators: null },
      };
    case types.FETCH_NARRATORS_SUCCESS:
      return {
        ...state,
        narrators: action.payload,
      };
    case types.FETCH_NARRATORS_FAILURE:
      return {
        ...state,
        error: { ...state.error, narrators: action.payload },
      };

    // Fetch audio story ages
    case types.FETCH_AUDIO_STORY_AGES_REQUEST:
      return {
        ...state,
        error: { ...state.error, ages: null },
      };
    case types.FETCH_AUDIO_STORY_AGES_SUCCESS:
      return {
        ...state,
        ages: action.payload,
      };
    case types.FETCH_AUDIO_STORY_AGES_FAILURE:
      return {
        ...state,
        error: { ...state.error, ages: action.payload },
      };

    // Fetch audio stories by narrator
    case types.FETCH_AUDIO_STORIES_BY_NARRATOR_REQUEST:
      return {
        ...state,
        error: { ...state.error, audioStoriesByNarrator: null },
      };
    case types.FETCH_AUDIO_STORIES_BY_NARRATOR_SUCCESS:
      return {
        ...state,
        audioStoriesByNarrator: {
          stories: action.payload.stories || [],
          narrator: action.payload.narrator || '',
        },
      };
    case types.FETCH_AUDIO_STORIES_BY_NARRATOR_FAILURE:
      return {
        ...state,
        error: { ...state.error, audioStoriesByNarrator: action.payload },
      };

    // Search audio stories
    case types.SEARCH_AUDIO_STORIES_REQUEST:
      return {
        ...state,
        error: { ...state.error, searchResults: null },
      };
    case types.SEARCH_AUDIO_STORIES_SUCCESS:
      return {
        ...state,
        searchResults: {
          results: action.payload.results || [],
          query: action.payload.query || '',
        },
      };
    case types.SEARCH_AUDIO_STORIES_FAILURE:
      return {
        ...state,
        error: { ...state.error, searchResults: action.payload },
      };

    // Fetch audio story by slug
    case types.FETCH_AUDIO_STORY_BY_SLUG_REQUEST:
      return {
        ...state,
        error: { ...state.error, currentAudioStory: null },
      };
    case types.FETCH_AUDIO_STORY_BY_SLUG_SUCCESS:
      return {
        ...state,
        currentAudioStory: action.payload,
      };
    case types.FETCH_AUDIO_STORY_BY_SLUG_FAILURE:
      return {
        ...state,
        error: { ...state.error, currentAudioStory: action.payload },
      };

    default:
      return state;
  }
};

export default audioStoryReducer; 
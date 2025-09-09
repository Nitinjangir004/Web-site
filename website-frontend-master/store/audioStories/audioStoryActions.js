import * as types from './audioStoryActionTypes';

// Fetch all audio stories
export const fetchAudioStoriesRequest = () => ({
  type: types.FETCH_AUDIO_STORIES_REQUEST,
});

export const fetchAudioStoriesSuccess = (audioStories) => ({
  type: types.FETCH_AUDIO_STORIES_SUCCESS,
  payload: audioStories,
});

export const fetchAudioStoriesFailure = (error) => ({
  type: types.FETCH_AUDIO_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching all audio stories
export const fetchAudioStories = () => fetchAudioStoriesRequest();

// Fetch featured audio stories
export const fetchFeaturedAudioStoriesRequest = () => ({
  type: types.FETCH_FEATURED_AUDIO_STORIES_REQUEST,
});

export const fetchFeaturedAudioStoriesSuccess = (audioStories) => ({
  type: types.FETCH_FEATURED_AUDIO_STORIES_SUCCESS,
  payload: audioStories,
});

export const fetchFeaturedAudioStoriesFailure = (error) => ({
  type: types.FETCH_FEATURED_AUDIO_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching featured audio stories
export const fetchFeaturedAudioStories = () => fetchFeaturedAudioStoriesRequest();

// Fetch narrators
export const fetchNarratorsRequest = () => ({
  type: types.FETCH_NARRATORS_REQUEST,
});

export const fetchNarratorsSuccess = (narrators) => ({
  type: types.FETCH_NARRATORS_SUCCESS,
  payload: narrators,
});

export const fetchNarratorsFailure = (error) => ({
  type: types.FETCH_NARRATORS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching narrators
export const fetchNarrators = () => fetchNarratorsRequest();

// Fetch audio story ages
export const fetchAudioStoryAgesRequest = () => ({
  type: types.FETCH_AUDIO_STORY_AGES_REQUEST,
});

export const fetchAudioStoryAgesSuccess = (ages) => ({
  type: types.FETCH_AUDIO_STORY_AGES_SUCCESS,
  payload: ages,
});

export const fetchAudioStoryAgesFailure = (error) => ({
  type: types.FETCH_AUDIO_STORY_AGES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching audio story ages
export const fetchAudioStoryAges = () => fetchAudioStoryAgesRequest();

// Fetch audio stories by narrator
export const fetchAudioStoriesByNarratorRequest = (narrator) => ({
  type: types.FETCH_AUDIO_STORIES_BY_NARRATOR_REQUEST,
  payload: { narrator },
});

export const fetchAudioStoriesByNarratorSuccess = (data) => ({
  type: types.FETCH_AUDIO_STORIES_BY_NARRATOR_SUCCESS,
  payload: data,
});

export const fetchAudioStoriesByNarratorFailure = (error) => ({
  type: types.FETCH_AUDIO_STORIES_BY_NARRATOR_FAILURE,
  payload: error,
});

// Convenience action creator for fetching audio stories by narrator
export const fetchAudioStoriesByNarrator = (narrator) => fetchAudioStoriesByNarratorRequest(narrator);

// Search audio stories
export const searchAudioStoriesRequest = (query, limit = 10) => ({
  type: types.SEARCH_AUDIO_STORIES_REQUEST,
  payload: { query, limit },
});

export const searchAudioStoriesSuccess = (data) => ({
  type: types.SEARCH_AUDIO_STORIES_SUCCESS,
  payload: data,
});

export const searchAudioStoriesFailure = (error) => ({
  type: types.SEARCH_AUDIO_STORIES_FAILURE,
  payload: error,
});

// Convenience action creator for searching audio stories
export const searchAudioStories = (query, limit) => searchAudioStoriesRequest(query, limit);

// Fetch audio story by slug
export const fetchAudioStoryBySlugRequest = (slug) => ({
  type: types.FETCH_AUDIO_STORY_BY_SLUG_REQUEST,
  payload: { slug },
});

export const fetchAudioStoryBySlugSuccess = (audioStory) => ({
  type: types.FETCH_AUDIO_STORY_BY_SLUG_SUCCESS,
  payload: audioStory,
});

export const fetchAudioStoryBySlugFailure = (error) => ({
  type: types.FETCH_AUDIO_STORY_BY_SLUG_FAILURE,
  payload: error,
});

// Convenience action creator for fetching audio story by slug
export const fetchAudioStoryBySlug = (slug) => fetchAudioStoryBySlugRequest(slug); 
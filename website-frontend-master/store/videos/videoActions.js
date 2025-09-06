import * as types from './videoActionTypes';

// Fetch all videos
export const fetchVideosRequest = () => ({
  type: types.FETCH_VIDEOS_REQUEST,
});

export const fetchVideosSuccess = (videos) => ({
  type: types.FETCH_VIDEOS_SUCCESS,
  payload: videos,
});

export const fetchVideosFailure = (error) => ({
  type: types.FETCH_VIDEOS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching all videos
export const fetchVideos = () => fetchVideosRequest();

// Fetch featured videos
export const fetchFeaturedVideosRequest = () => ({
  type: types.FETCH_FEATURED_VIDEOS_REQUEST,
});

export const fetchFeaturedVideosSuccess = (videos) => ({
  type: types.FETCH_FEATURED_VIDEOS_SUCCESS,
  payload: videos,
});

export const fetchFeaturedVideosFailure = (error) => ({
  type: types.FETCH_FEATURED_VIDEOS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching featured videos
export const fetchFeaturedVideos = () => fetchFeaturedVideosRequest();

// Fetch presenters
export const fetchPresentersRequest = () => ({
  type: types.FETCH_PRESENTERS_REQUEST,
});

export const fetchPresentersSuccess = (presenters) => ({
  type: types.FETCH_PRESENTERS_SUCCESS,
  payload: presenters,
});

export const fetchPresentersFailure = (error) => ({
  type: types.FETCH_PRESENTERS_FAILURE,
  payload: error,
});

// Convenience action creator for fetching presenters
export const fetchPresenters = () => fetchPresentersRequest();

// Fetch video ages
export const fetchVideoAgesRequest = () => ({
  type: types.FETCH_VIDEO_AGES_REQUEST,
});

export const fetchVideoAgesSuccess = (ages) => ({
  type: types.FETCH_VIDEO_AGES_SUCCESS,
  payload: ages,
});

export const fetchVideoAgesFailure = (error) => ({
  type: types.FETCH_VIDEO_AGES_FAILURE,
  payload: error,
});

// Convenience action creator for fetching video ages
export const fetchVideoAges = () => fetchVideoAgesRequest();

// Fetch videos by presenter
export const fetchVideosByPresenterRequest = (presenter) => ({
  type: types.FETCH_VIDEOS_BY_PRESENTER_REQUEST,
  payload: { presenter },
});

export const fetchVideosByPresenterSuccess = (data) => ({
  type: types.FETCH_VIDEOS_BY_PRESENTER_SUCCESS,
  payload: data,
});

export const fetchVideosByPresenterFailure = (error) => ({
  type: types.FETCH_VIDEOS_BY_PRESENTER_FAILURE,
  payload: error,
});

// Convenience action creator for fetching videos by presenter
export const fetchVideosByPresenter = (presenter) => fetchVideosByPresenterRequest(presenter);

// Fetch videos by duration
export const fetchVideosByDurationRequest = (order = 'asc') => ({
  type: types.FETCH_VIDEOS_BY_DURATION_REQUEST,
  payload: { order },
});

export const fetchVideosByDurationSuccess = (data) => ({
  type: types.FETCH_VIDEOS_BY_DURATION_SUCCESS,
  payload: data,
});

export const fetchVideosByDurationFailure = (error) => ({
  type: types.FETCH_VIDEOS_BY_DURATION_FAILURE,
  payload: error,
});

// Convenience action creator for fetching videos by duration
export const fetchVideosByDuration = (order) => fetchVideosByDurationRequest(order);

// Search videos
export const searchVideosRequest = (query, limit = 10) => ({
  type: types.SEARCH_VIDEOS_REQUEST,
  payload: { query, limit },
});

export const searchVideosSuccess = (data) => ({
  type: types.SEARCH_VIDEOS_SUCCESS,
  payload: data,
});

export const searchVideosFailure = (error) => ({
  type: types.SEARCH_VIDEOS_FAILURE,
  payload: error,
});

// Convenience action creator for searching videos
export const searchVideos = (query, limit) => searchVideosRequest(query, limit);

// Fetch video by slug
export const fetchVideoBySlugRequest = (slug) => ({
  type: types.FETCH_VIDEO_BY_SLUG_REQUEST,
  payload: { slug },
});

export const fetchVideoBySlugSuccess = (video) => ({
  type: types.FETCH_VIDEO_BY_SLUG_SUCCESS,
  payload: video,
});

export const fetchVideoBySlugFailure = (error) => ({
  type: types.FETCH_VIDEO_BY_SLUG_FAILURE,
  payload: error,
});

// Convenience action creator for fetching video by slug
export const fetchVideoBySlug = (slug) => fetchVideoBySlugRequest(slug); 
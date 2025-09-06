import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS,
  FETCH_COMPETITIONS_FAILURE,
  FETCH_FEATURED_COMPETITIONS_REQUEST,
  FETCH_FEATURED_COMPETITIONS_SUCCESS,
  FETCH_FEATURED_COMPETITIONS_FAILURE,
  FETCH_ACTIVE_COMPETITIONS_REQUEST,
  FETCH_ACTIVE_COMPETITIONS_SUCCESS,
  FETCH_ACTIVE_COMPETITIONS_FAILURE,
  FETCH_UPCOMING_COMPETITIONS_REQUEST,
  FETCH_UPCOMING_COMPETITIONS_SUCCESS,
  FETCH_UPCOMING_COMPETITIONS_FAILURE,
  FETCH_COMPETITION_BY_SLUG_REQUEST,
  FETCH_COMPETITION_BY_SLUG_SUCCESS,
  FETCH_COMPETITION_BY_SLUG_FAILURE,
  FETCH_COMPETITION_STATUSES_REQUEST,
  FETCH_COMPETITION_STATUSES_SUCCESS,
  FETCH_COMPETITION_STATUSES_FAILURE,
  FETCH_COMPETITIONS_BY_STATUS_REQUEST,
  FETCH_COMPETITIONS_BY_STATUS_SUCCESS,
  FETCH_COMPETITIONS_BY_STATUS_FAILURE,
  SEARCH_COMPETITIONS_REQUEST,
  SEARCH_COMPETITIONS_SUCCESS,
  SEARCH_COMPETITIONS_FAILURE,
  CREATE_COMPETITION_REQUEST,
  CREATE_COMPETITION_SUCCESS,
  CREATE_COMPETITION_FAILURE,
  UPDATE_COMPETITION_REQUEST,
  UPDATE_COMPETITION_SUCCESS,
  UPDATE_COMPETITION_FAILURE,
  UPDATE_PARTICIPANTS_REQUEST,
  UPDATE_PARTICIPANTS_SUCCESS,
  UPDATE_PARTICIPANTS_FAILURE,
  DELETE_COMPETITION_REQUEST,
  DELETE_COMPETITION_SUCCESS,
  DELETE_COMPETITION_FAILURE
} from './competitionActionTypes';

// Fetch all competitions
export const fetchCompetitionsRequest = (filters = {}) => ({
  type: FETCH_COMPETITIONS_REQUEST,
  payload: filters
});

export const fetchCompetitionsSuccess = (competitions, pagination = null) => ({
  type: FETCH_COMPETITIONS_SUCCESS,
  payload: { competitions, pagination }
});

export const fetchCompetitionsFailure = (error) => ({
  type: FETCH_COMPETITIONS_FAILURE,
  payload: error
});

// Fetch featured competitions
export const fetchFeaturedCompetitionsRequest = () => ({
  type: FETCH_FEATURED_COMPETITIONS_REQUEST
});

export const fetchFeaturedCompetitionsSuccess = (competitions) => ({
  type: FETCH_FEATURED_COMPETITIONS_SUCCESS,
  payload: competitions
});

export const fetchFeaturedCompetitionsFailure = (error) => ({
  type: FETCH_FEATURED_COMPETITIONS_FAILURE,
  payload: error
});

// Fetch active competitions
export const fetchActiveCompetitionsRequest = () => ({
  type: FETCH_ACTIVE_COMPETITIONS_REQUEST
});

export const fetchActiveCompetitionsSuccess = (competitions) => ({
  type: FETCH_ACTIVE_COMPETITIONS_SUCCESS,
  payload: competitions
});

export const fetchActiveCompetitionsFailure = (error) => ({
  type: FETCH_ACTIVE_COMPETITIONS_FAILURE,
  payload: error
});

// Fetch upcoming competitions
export const fetchUpcomingCompetitionsRequest = () => ({
  type: FETCH_UPCOMING_COMPETITIONS_REQUEST
});

export const fetchUpcomingCompetitionsSuccess = (competitions) => ({
  type: FETCH_UPCOMING_COMPETITIONS_SUCCESS,
  payload: competitions
});

export const fetchUpcomingCompetitionsFailure = (error) => ({
  type: FETCH_UPCOMING_COMPETITIONS_FAILURE,
  payload: error
});

// Fetch competition by slug
export const fetchCompetitionBySlugRequest = (slug) => ({
  type: FETCH_COMPETITION_BY_SLUG_REQUEST,
  payload: slug
});

export const fetchCompetitionBySlugSuccess = (competition) => ({
  type: FETCH_COMPETITION_BY_SLUG_SUCCESS,
  payload: competition
});

export const fetchCompetitionBySlugFailure = (error) => ({
  type: FETCH_COMPETITION_BY_SLUG_FAILURE,
  payload: error
});

// Fetch competition statuses
export const fetchCompetitionStatusesRequest = () => ({
  type: FETCH_COMPETITION_STATUSES_REQUEST
});

export const fetchCompetitionStatusesSuccess = (statuses) => ({
  type: FETCH_COMPETITION_STATUSES_SUCCESS,
  payload: statuses
});

export const fetchCompetitionStatusesFailure = (error) => ({
  type: FETCH_COMPETITION_STATUSES_FAILURE,
  payload: error
});

// Fetch competitions by status
export const fetchCompetitionsByStatusRequest = (status) => ({
  type: FETCH_COMPETITIONS_BY_STATUS_REQUEST,
  payload: status
});

export const fetchCompetitionsByStatusSuccess = (competitions, status) => ({
  type: FETCH_COMPETITIONS_BY_STATUS_SUCCESS,
  payload: { competitions, status }
});

export const fetchCompetitionsByStatusFailure = (error) => ({
  type: FETCH_COMPETITIONS_BY_STATUS_FAILURE,
  payload: error
});

// Search competitions
export const searchCompetitionsRequest = (query, limit = 10) => ({
  type: SEARCH_COMPETITIONS_REQUEST,
  payload: { query, limit }
});

export const searchCompetitionsSuccess = (results, query, pagination = null) => ({
  type: SEARCH_COMPETITIONS_SUCCESS,
  payload: { results, query, pagination }
});

export const searchCompetitionsFailure = (error) => ({
  type: SEARCH_COMPETITIONS_FAILURE,
  payload: error
});

// Create competition
export const createCompetitionRequest = (competitionData) => ({
  type: CREATE_COMPETITION_REQUEST,
  payload: competitionData
});

export const createCompetitionSuccess = (competition) => ({
  type: CREATE_COMPETITION_SUCCESS,
  payload: competition
});

export const createCompetitionFailure = (error) => ({
  type: CREATE_COMPETITION_FAILURE,
  payload: error
});

// Update competition
export const updateCompetitionRequest = (id, competitionData) => ({
  type: UPDATE_COMPETITION_REQUEST,
  payload: { id, competitionData }
});

export const updateCompetitionSuccess = (competition) => ({
  type: UPDATE_COMPETITION_SUCCESS,
  payload: competition
});

export const updateCompetitionFailure = (error) => ({
  type: UPDATE_COMPETITION_FAILURE,
  payload: error
});

// Update participants
export const updateParticipantsRequest = (id, participants) => ({
  type: UPDATE_PARTICIPANTS_REQUEST,
  payload: { id, participants }
});

export const updateParticipantsSuccess = (competition) => ({
  type: UPDATE_PARTICIPANTS_SUCCESS,
  payload: competition
});

export const updateParticipantsFailure = (error) => ({
  type: UPDATE_PARTICIPANTS_FAILURE,
  payload: error
});

// Delete competition
export const deleteCompetitionRequest = (id) => ({
  type: DELETE_COMPETITION_REQUEST,
  payload: id
});

export const deleteCompetitionSuccess = (id) => ({
  type: DELETE_COMPETITION_SUCCESS,
  payload: id
});

export const deleteCompetitionFailure = (error) => ({
  type: DELETE_COMPETITION_FAILURE,
  payload: error
});

// Convenience action creators (main API calls)
export const fetchCompetitions = (filters = {}) => fetchCompetitionsRequest(filters);
export const fetchFeaturedCompetitions = () => fetchFeaturedCompetitionsRequest();
export const fetchActiveCompetitions = () => fetchActiveCompetitionsRequest();
export const fetchUpcomingCompetitions = () => fetchUpcomingCompetitionsRequest();
export const fetchCompetitionBySlug = (slug) => fetchCompetitionBySlugRequest(slug);
export const fetchCompetitionStatuses = () => fetchCompetitionStatusesRequest();
export const fetchCompetitionsByStatus = (status) => fetchCompetitionsByStatusRequest(status);
export const searchCompetitions = (query, limit = 10) => searchCompetitionsRequest(query, limit); 